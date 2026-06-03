import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface FormData {
  name: string;
  email: string;
  subject: string;
  category: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    category: "general",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    { value: "general", label: "General Inquiry" },
    { value: "support", label: "Customer Support" },
    { value: "order", label: "Order Issue" },
    { value: "product", label: "Product Question" },
    { value: "partnership", label: "Partnership Opportunity" },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", category: "general", message: "" });

      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      alert("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-th-cream">
      <Navbar />

      <section className="relative py-16 md:py-24 bg-gradient-to-br from-th-teal/5 to-th-peach/5">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <h1 className="font-heading text-4xl md:text-5xl font-black text-th-dark mb-4">
            Get in Touch
          </h1>
          <p className="font-body text-xl text-th-teal max-w-2xl">
            Have a question or feedback? We'd love to hear from you. Our team is here to help.
          </p>
        </div>
      </section>

      <section className="flex-1 max-w-screen-2xl mx-auto px-6 md:px-12 py-16 w-full">
        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-1">
            <h2 className="font-body font-bold text-2xl text-th-dark mb-8">
              Contact Information
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="font-body font-semibold text-th-dark mb-2">
                  Email
                </h3>
                <a
                  href="mailto:hello@trailhoundvet.com"
                  className="font-body text-th-teal hover:text-th-dark transition-colors break-all"
                >
                  hello@trailhoundvet.com
                </a>
              </div>

              <div>
                <h3 className="font-body font-semibold text-th-dark mb-2">
                  Phone
                </h3>
                <a
                  href="tel:+15551234567"
                  className="font-body text-th-teal hover:text-th-dark transition-colors"
                >
                  (555) 123-4567
                </a>
              </div>

              <div>
                <h3 className="font-body font-semibold text-th-dark mb-2">
                  Business Hours
                </h3>
                <div className="font-body text-th-teal">
                  <p>Monday - Friday: 9am - 6pm EST</p>
                  <p>Saturday: 10am - 4pm EST</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>

              <div>
                <h3 className="font-body font-semibold text-th-dark mb-4">
                  Follow Us
                </h3>
                <div className="flex gap-4">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-th-orange text-white hover:bg-orange-600 transition-colors"
                  >
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.117.6c-.779.267-1.439.645-2.083 1.289-.644.644-1.022 1.304-1.289 2.083-.267.788-.468 1.658-.528 2.936C.015 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.528 2.936.267.779.645 1.438 1.289 2.082.644.644 1.304 1.023 2.083 1.29.788.267 1.659.468 2.936.528 1.28.058 1.689.072 4.947.072s3.668-.015 4.947-.072c1.280-.06 2.147-.261 2.936-.528.79-.267 1.438-.646 2.083-1.29.644-.644 1.023-1.304 1.29-2.082.267-.788.468-1.659.528-2.936.058-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.261-2.148-.528-2.936-.267-.779-.646-1.438-1.289-2.083-.645-.644-1.304-1.022-2.083-1.289-.788-.267-1.659-.468-2.936-.528C15.667.015 15.26 0 12 0zm0 2.16c3.203 0 3.585.009 4.849.064 1.17.054 1.805.244 2.227.408.56.217.96.477 1.382.896.419.42.679.822.896 1.381.164.422.354 1.057.408 2.227.055 1.266.064 1.645.064 4.849s-.009 3.585-.064 4.849c-.054 1.17-.244 1.805-.408 2.227-.217.56-.477.96-.896 1.382-.42.419-.822.679-1.381.896-.422.164-1.057.354-2.227.408-1.266.055-1.645.064-4.849.064s-3.585-.009-4.849-.064c-1.17-.054-1.805-.244-2.227-.408-.56-.217-.96-.477-1.382-.896-.419-.42-.679-.822-.896-1.381-.164-.422-.354-1.057-.408-2.227-.055-1.266-.064-1.645-.064-4.849s.009-3.585.064-4.849c.054-1.17.244-1.805.408-2.227.217-.56.477-.96.896-1.382.42-.419.822-.679 1.381-.896.422-.164 1.057-.354 2.227-.408 1.266-.055 1.645-.064 4.849-.064z" />
                      <circle cx="12" cy="12" r="3.846" />
                    </svg>
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-th-orange text-white hover:bg-orange-600 transition-colors"
                  >
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-th-orange text-white hover:bg-orange-600 transition-colors"
                  >
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.66 1.94 2.89 2.89 0 0 1 5.66-1.94v-3.45a6.35 6.35 0 0 0-5.79 3.31A6.52 6.52 0 0 0 2.43 12a6.55 6.55 0 0 0 6.55 6.55 6.42 6.42 0 0 0 4.6-1.89A6.48 6.48 0 0 0 15.07 12" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-th-warm-mid p-8">
              <h2 className="font-body font-bold text-2xl text-th-dark mb-6">
                Send us a Message
              </h2>

              {submitted && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 rounded-lg">
                  <p className="font-body text-green-800">
                    Thank you! We've received your message and will get back to you soon.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-body text-sm font-semibold text-th-dark mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-th-warm-mid rounded-lg font-body outline-none focus:border-th-teal transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block font-body text-sm font-semibold text-th-dark mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-th-warm-mid rounded-lg font-body outline-none focus:border-th-teal transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-body text-sm font-semibold text-th-dark mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-th-warm-mid rounded-lg font-body outline-none focus:border-th-teal transition-colors"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-body text-sm font-semibold text-th-dark mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-th-warm-mid rounded-lg font-body outline-none focus:border-th-teal transition-colors"
                    placeholder="What is this about?"
                  />
                </div>

                <div>
                  <label className="block font-body text-sm font-semibold text-th-dark mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-th-warm-mid rounded-lg font-body outline-none focus:border-th-teal transition-colors resize-none"
                    placeholder="Tell us more..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-th-orange text-white font-body font-semibold rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
