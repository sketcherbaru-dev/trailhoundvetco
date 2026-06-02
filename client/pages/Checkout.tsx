import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
}

export default function Checkout() {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name required";
    if (!formData.email.trim()) newErrors.email = "Email required";
    if (!formData.phone.trim()) newErrors.phone = "Phone required";
    if (!formData.address.trim()) newErrors.address = "Address required";
    if (!formData.city.trim()) newErrors.city = "City required";
    if (!formData.state.trim()) newErrors.state = "State required";
    if (!formData.zip.trim()) newErrors.zip = "ZIP code required";
    if (!formData.cardName.trim()) newErrors.cardName = "Cardholder name required";
    if (!formData.cardNumber.replace(/\s/g, "")) newErrors.cardNumber = "Card number required";
    if (!formData.expiry.trim()) newErrors.expiry = "Expiry date required";
    if (!formData.cvc.trim()) newErrors.cvc = "CVC required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsProcessing(true);

    try {
      // TODO: Integrate with Stripe payment processing
      // For now, simulate successful payment after 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Redirect to success page
      navigate("/order-confirmation");
    } catch (error) {
      alert("Payment processing failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-th-cream">
      <Navbar />

      {/* Checkout Section */}
      <section className="flex-1 max-w-screen-2xl mx-auto px-6 md:px-12 py-16 w-full">
        <h1 className="font-heading text-4xl font-black text-th-dark mb-12">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">
            {/* Shipping Information */}
            <div className="bg-white rounded-lg border border-th-warm-mid p-6">
              <h2 className="font-body font-bold text-lg text-th-dark mb-6">
                Shipping Information
              </h2>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block font-body text-sm font-semibold text-th-dark mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg font-body outline-none transition-colors ${
                      errors.firstName
                        ? "border-red-500 focus:border-red-600"
                        : "border-th-warm-mid focus:border-th-teal"
                    }`}
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs font-body mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block font-body text-sm font-semibold text-th-dark mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg font-body outline-none transition-colors ${
                      errors.lastName
                        ? "border-red-500 focus:border-red-600"
                        : "border-th-warm-mid focus:border-th-teal"
                    }`}
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs font-body mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-4 mb-4">
                <div>
                  <label className="block font-body text-sm font-semibold text-th-dark mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg font-body outline-none transition-colors ${
                      errors.email
                        ? "border-red-500 focus:border-red-600"
                        : "border-th-warm-mid focus:border-th-teal"
                    }`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs font-body mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block font-body text-sm font-semibold text-th-dark mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg font-body outline-none transition-colors ${
                      errors.phone
                        ? "border-red-500 focus:border-red-600"
                        : "border-th-warm-mid focus:border-th-teal"
                    }`}
                    placeholder="(555) 000-0000"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs font-body mt-1">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block font-body text-sm font-semibold text-th-dark mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg font-body outline-none transition-colors ${
                      errors.address
                        ? "border-red-500 focus:border-red-600"
                        : "border-th-warm-mid focus:border-th-teal"
                    }`}
                    placeholder="123 Main St"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs font-body mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-body text-sm font-semibold text-th-dark mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg font-body outline-none transition-colors ${
                        errors.city
                          ? "border-red-500 focus:border-red-600"
                          : "border-th-warm-mid focus:border-th-teal"
                      }`}
                      placeholder="New York"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-xs font-body mt-1">
                        {errors.city}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block font-body text-sm font-semibold text-th-dark mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg font-body outline-none transition-colors ${
                        errors.state
                          ? "border-red-500 focus:border-red-600"
                          : "border-th-warm-mid focus:border-th-teal"
                      }`}
                      placeholder="NY"
                    />
                    {errors.state && (
                      <p className="text-red-500 text-xs font-body mt-1">
                        {errors.state}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block font-body text-sm font-semibold text-th-dark mb-2">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg font-body outline-none transition-colors ${
                        errors.zip
                          ? "border-red-500 focus:border-red-600"
                          : "border-th-warm-mid focus:border-th-teal"
                      }`}
                      placeholder="10001"
                    />
                    {errors.zip && (
                      <p className="text-red-500 text-xs font-body mt-1">
                        {errors.zip}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-lg border border-th-warm-mid p-6">
              <h2 className="font-body font-bold text-lg text-th-dark mb-6">
                Payment Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block font-body text-sm font-semibold text-th-dark mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg font-body outline-none transition-colors ${
                      errors.cardName
                        ? "border-red-500 focus:border-red-600"
                        : "border-th-warm-mid focus:border-th-teal"
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.cardName && (
                    <p className="text-red-500 text-xs font-body mt-1">
                      {errors.cardName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-body text-sm font-semibold text-th-dark mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg font-body outline-none transition-colors ${
                      errors.cardNumber
                        ? "border-red-500 focus:border-red-600"
                        : "border-th-warm-mid focus:border-th-teal"
                    }`}
                    placeholder="4111 1111 1111 1111"
                  />
                  {errors.cardNumber && (
                    <p className="text-red-500 text-xs font-body mt-1">
                      {errors.cardNumber}
                    </p>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-body text-sm font-semibold text-th-dark mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="expiry"
                      value={formData.expiry}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg font-body outline-none transition-colors ${
                        errors.expiry
                          ? "border-red-500 focus:border-red-600"
                          : "border-th-warm-mid focus:border-th-teal"
                      }`}
                      placeholder="MM/YY"
                    />
                    {errors.expiry && (
                      <p className="text-red-500 text-xs font-body mt-1">
                        {errors.expiry}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block font-body text-sm font-semibold text-th-dark mb-2">
                      CVC
                    </label>
                    <input
                      type="text"
                      name="cvc"
                      value={formData.cvc}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg font-body outline-none transition-colors ${
                        errors.cvc
                          ? "border-red-500 focus:border-red-600"
                          : "border-th-warm-mid focus:border-th-teal"
                      }`}
                      placeholder="123"
                    />
                    {errors.cvc && (
                      <p className="text-red-500 text-xs font-body mt-1">
                        {errors.cvc}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Link
                to="/cart"
                className="flex-1 py-3 border border-th-warm-mid text-th-dark font-body font-semibold rounded-lg hover:bg-th-warm transition-colors text-center"
              >
                Back to Cart
              </Link>
              <button
                type="submit"
                disabled={isProcessing}
                className="flex-1 py-3 bg-th-orange text-white font-body font-semibold rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? "Processing..." : "Complete Order"}
              </button>
            </div>
          </form>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-th-warm-mid p-6 sticky top-24">
              <h2 className="font-body font-bold text-lg text-th-dark mb-6">
                Order Summary
              </h2>
              <p className="font-body text-th-teal text-sm mb-4">
                (Your cart items will appear here once integrated)
              </p>
              <div className="border-t border-th-warm-mid pt-4">
                <div className="flex justify-between font-body font-bold text-th-dark">
                  <span>Total</span>
                  <span>$0.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
