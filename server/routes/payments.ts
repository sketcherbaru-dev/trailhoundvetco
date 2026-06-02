import { Router, raw } from "express";
import Stripe from "stripe";
import { sql } from "../lib/db";

function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key);
}

function getOrigin(req: { headers: Record<string, any>; protocol: string }) {
  const explicit = process.env.PUBLIC_BASE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const origin = req.headers["origin"];
  if (typeof origin === "string" && origin) return origin.replace(/\/$/, "");
  const host = req.headers["host"];
  const proto = (req.headers["x-forwarded-proto"] as string) || req.protocol || "https";
  return `${proto}://${host}`;
}

// ---------- Checkout (public) ----------
export const checkout = Router();

checkout.post("/checkout", async (req, res) => {
  const stripe = getStripe();
  if (!stripe) {
    return res
      .status(500)
      .json({ error: "Payments are not configured (missing STRIPE_SECRET_KEY)." });
  }

  const { type, id } = req.body ?? {};
  if ((type !== "product" && type !== "course") || !id) {
    return res.status(400).json({ error: "Invalid checkout request" });
  }

  try {
    let name = "";
    let amount = 0;
    let image = "";

    if (type === "product") {
      const rows = await sql`SELECT * FROM products WHERE id = ${id} AND published = TRUE`;
      const p = rows[0];
      if (!p) return res.status(404).json({ error: "Product not found" });
      if (p.purchase_type !== "stripe") {
        return res.status(400).json({ error: "This product is not purchasable on-site." });
      }
      name = p.name;
      amount = p.price_cents;
      image = p.image;
    } else {
      const rows = await sql`SELECT * FROM courses WHERE id = ${id} AND published = TRUE`;
      const c = rows[0];
      if (!c) return res.status(404).json({ error: "Course not found" });
      if (!c.registration_open) {
        return res.status(400).json({ error: "Registration is not open for this course." });
      }
      name = c.title;
      amount = c.price_cents;
      image = c.thumbnail;
    }

    if (!amount || amount < 50) {
      return res.status(400).json({ error: "This item has no valid price set." });
    }

    const origin = getOrigin(req as any);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: amount,
            product_data: {
              name,
              images: image ? [image] : undefined,
            },
          },
        },
      ],
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
      metadata: { item_type: type, item_id: String(id), item_name: name },
    });

    // Record a pending order; finalized by the webhook.
    await sql`
      INSERT INTO orders (stripe_session_id, item_type, item_id, item_name, amount_cents, status)
      VALUES (${session.id}, ${type}, ${id}, ${name}, ${amount}, 'pending')
      ON CONFLICT (stripe_session_id) DO NOTHING
    `;

    res.json({ url: session.url });
  } catch (err) {
    console.error("[v0] checkout error", err);
    res.status(500).json({ error: "Could not start checkout" });
  }
});

// Public: look up a completed session for the success page
checkout.get("/checkout/session/:id", async (req, res) => {
  const rows = await sql`
    SELECT item_name, amount_cents, status, customer_email, customer_name
    FROM orders WHERE stripe_session_id = ${req.params.id}
  `;
  if (rows.length === 0) return res.status(404).json({ error: "Not found" });
  res.json(rows[0]);
});

// ---------- Webhook (raw body, mounted separately) ----------
export const webhook = Router();

webhook.post("/webhook", raw({ type: "application/json" }), async (req, res) => {
  const stripe = getStripe();
  if (!stripe) return res.status(500).send("Stripe not configured");

  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const sig = req.headers["stripe-signature"];
  let event: Stripe.Event;

  try {
    if (secret && sig) {
      event = stripe.webhooks.constructEvent(req.body, sig as string, secret);
    } else {
      // Fallback for environments without a configured signing secret.
      event = JSON.parse((req.body as Buffer).toString("utf8"));
    }
  } catch (err) {
    console.error("[v0] webhook signature verification failed", err);
    return res.status(400).send("Webhook Error");
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    try {
      await sql`
        UPDATE orders SET
          status = 'paid',
          customer_email = ${session.customer_details?.email ?? ""},
          customer_name = ${session.customer_details?.name ?? ""}
        WHERE stripe_session_id = ${session.id}
      `;
    } catch (err) {
      console.error("[v0] webhook db update failed", err);
    }
  }

  res.json({ received: true });
});
