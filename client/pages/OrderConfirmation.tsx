import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function OrderConfirmation() {
  return (
    <div className="min-h-screen flex flex-col bg-th-cream">
      <Navbar />

      <section className="flex-1 max-w-screen-2xl mx-auto px-6 md:px-12 py-16 w-full">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-green-600"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </div>

          <h1 className="font-heading text-4xl font-black text-th-dark mb-4">
            Order Confirmed!
          </h1>

          <p className="font-body text-xl text-th-teal mb-8">
            Thank you for your purchase. Your order has been successfully processed.
          </p>

          <div className="bg-white rounded-lg border border-th-warm-mid p-8 mb-8">
            <div className="mb-6 pb-6 border-b border-th-warm-mid">
              <p className="font-body text-sm text-th-teal mb-2">Order Number</p>
              <p className="font-body font-bold text-2xl text-th-dark">
                #TRH-{Math.random().toString(36).substring(7).toUpperCase()}
              </p>
            </div>

            <div className="space-y-4 text-left">
              <div>
                <p className="font-body text-sm text-th-teal mb-1">Order Date</p>
                <p className="font-body text-th-dark">
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div>
                <p className="font-body text-sm text-th-teal mb-1">Estimated Delivery</p>
                <p className="font-body text-th-dark">5-7 business days</p>
              </div>

              <div>
                <p className="font-body text-sm text-th-teal mb-1">Order Total</p>
                <p className="font-body text-th-dark text-xl font-bold">$0.00</p>
              </div>
            </div>
          </div>

          <div className="bg-th-light-peach rounded-lg p-6 mb-8">
            <h2 className="font-body font-bold text-th-dark mb-4">What's Next?</h2>
            <ul className="font-body text-th-teal space-y-2 text-left">
              <li>✓ Order confirmation has been sent to your email</li>
              <li>✓ We'll notify you when your order ships</li>
              <li>✓ Track your order status anytime from your account</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/shop"
              className="px-8 py-3 bg-th-orange text-white font-body font-semibold rounded-lg hover:bg-orange-600 transition-colors"
            >
              Continue Shopping
            </Link>
            <Link
              to="/"
              className="px-8 py-3 border border-th-warm-mid text-th-dark font-body font-semibold rounded-lg hover:bg-th-warm transition-colors"
            >
              Return to Home
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-th-warm-mid">
            <p className="font-body text-th-teal mb-3">Need help?</p>
            <p className="font-body text-sm text-th-teal mb-3">
              Our customer support team is here to assist you
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center text-th-orange font-body font-semibold hover:text-orange-600"
            >
              Contact Support →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
