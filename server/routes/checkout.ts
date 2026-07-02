import { RequestHandler } from 'express';
import Stripe from 'stripe';
import { supabaseAnonClient } from '../lib/supabase.js';

export const createCheckoutSession: RequestHandler = async (req, res) => {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    res.status(500).json({ error: 'Stripe is not configured. Please set STRIPE_SECRET_KEY.' });
    return;
  }

  try {
    const { productId, quantity = 1 } = req.body;
    if (!productId) {
      res.status(400).json({ error: 'productId is required' });
      return;
    }

    const { data: product, error } = await supabaseAnonClient
      .from('products')
      .select('id, name, description, price, image')
      .eq('id', productId)
      .single();

    if (error || !product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    if (!product.price || product.price <= 0) {
      res.status(400).json({ error: 'This product is not available for purchase' });
      return;
    }

    const stripe = new Stripe(stripeKey);
    const origin = (req.headers.origin as string) || 'https://trailhoundvetco.com';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: product.description || undefined,
              ...(product.image ? { images: [product.image] } : {}),
            },
            unit_amount: Math.round(product.price * 100),
          },
          quantity: Number(quantity) || 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/shop/success?session_id={CHECKOUT_SESSION_ID}&product=${encodeURIComponent(product.name)}`,
      cancel_url: `${origin}/shop`,
    });

    res.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Checkout failed';
    res.status(500).json({ error: message });
  }
};
