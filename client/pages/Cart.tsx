import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 10 : 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen flex flex-col bg-th-cream">
      <Navbar />

      {/* Cart Section */}
      <section className="flex-1 max-w-screen-2xl mx-auto px-6 md:px-12 py-16 w-full">
        <h1 className="font-heading text-4xl font-black text-th-dark mb-12">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="font-body text-xl text-th-teal mb-6">
              Your cart is empty
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center px-6 py-3 bg-th-orange text-white font-body font-semibold rounded-lg hover:bg-orange-600 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-white rounded-lg border border-th-warm-mid"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-body font-semibold text-th-dark">
                        {item.name}
                      </h3>
                      <p className="font-body text-th-teal mt-1">
                        ${item.price.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-2 py-1 border border-th-warm-mid rounded hover:bg-th-warm"
                        >
                          −
                        </button>
                        <span className="font-body w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-2 py-1 border border-th-warm-mid rounded hover:bg-th-warm"
                        >
                          +
                        </button>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="ml-auto text-th-teal hover:text-th-dark text-sm font-semibold"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-th-warm-mid p-6 sticky top-24">
                <h2 className="font-body font-bold text-th-dark mb-6">
                  Order Summary
                </h2>
                <div className="space-y-3 border-b border-th-warm-mid pb-6 mb-6">
                  <div className="flex justify-between font-body text-th-teal">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-body text-th-teal">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex justify-between font-body font-bold text-lg text-th-dark mb-6">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button className="w-full py-3 bg-th-orange text-white font-body font-semibold rounded-lg hover:bg-orange-600 transition-colors">
                  Proceed to Checkout
                </button>
                <Link
                  to="/shop"
                  className="block text-center mt-4 text-th-teal hover:text-th-dark font-body font-semibold text-sm"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
