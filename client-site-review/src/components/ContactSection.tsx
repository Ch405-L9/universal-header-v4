import { contactConfig } from "@/config/contact";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useState } from "react";

const iconMap = {
  phone: Phone,
  mail: Mail,
  "map-pin": MapPin,
  clock: Clock,
};

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 text-secondary">
            {contactConfig.title}
          </h2>
          <p className="text-xl text-gray-700">{contactConfig.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div>
            <h3 className="text-3xl font-bold mb-8 text-secondary">
              Get In Touch
            </h3>
            <div className="space-y-6">
              {contactConfig.info.map((item) => {
                const Icon = iconMap[item.icon as keyof typeof iconMap];
                return (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Icon className="text-primary" size={24} />
                    </div>
                    <div>
                      <div className="font-semibold text-lg text-secondary mb-1">
                        {item.label}
                      </div>
                      {item.link ? (
                        <a
                          href={item.link}
                          className="text-primary hover:text-primary/80 text-lg"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <div className="text-gray-700 text-lg">
                          {item.value}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <form className="space-y-6 mt-10" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold mb-2 text-secondary"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none text-lg"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold mb-2 text-secondary"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none text-lg"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold mb-2 text-secondary"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none text-lg"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold mb-2 text-secondary"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="Your Message"
                  rows={5}
                  className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none text-lg"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg text-xl font-semibold transition-colors shadow-lg hover:shadow-xl"
              >
                {contactConfig.form.submitText}
              </button>
              {submitted && (
                <div className="bg-green-100 border-2 border-green-500 text-green-700 px-6 py-4 rounded-lg text-center">
                  {contactConfig.form.successMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
