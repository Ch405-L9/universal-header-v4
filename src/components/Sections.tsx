import React from 'react';
import { cn } from '@/utils/cn';

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, className, children }) => (
  <section id={id} className={cn('section', className)}>
    <div className="container">{children}</div>
  </section>
);

export const ServicesSection: React.FC = () => (
  <Section id="services" className="bg-gray-50">
    <div className="text-center mb-12">
      <h2 className="text-responsive-xl font-bold mb-4">Our Services</h2>
      <p className="text-responsive-base text-neutral max-w-2xl mx-auto">
        Professional solutions tailored to your business needs
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          title: 'Web Development',
          desc: 'Modern, responsive websites built with the latest technologies',
        },
        {
          title: 'UI/UX Design',
          desc: 'Beautiful, user-friendly designs that convert visitors to customers',
        },
        {
          title: 'Digital Strategy',
          desc: 'Comprehensive digital solutions to grow your business online',
        },
      ].map((service, index) => (
        <div key={index} className="card p-6 text-center hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold mb-3">{service.title}</h3>
          <p className="text-neutral">{service.desc}</p>
        </div>
      ))}
    </div>
  </Section>
);

export const AboutSection: React.FC = () => (
  <Section id="about">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-responsive-xl font-bold mb-6">About Our Company</h2>
        <p className="text-responsive-base text-neutral mb-6 leading-relaxed">
          We are a team of passionate professionals dedicated to creating exceptional digital
          experiences. With years of experience in web development and design, we help businesses
          establish a strong online presence.
        </p>
        <p className="text-responsive-base text-neutral leading-relaxed">
          Our approach combines technical expertise with creative vision to deliver solutions that
          not only look great but also drive real business results.
        </p>
      </div>
      <div className="bg-gradient-to-br from-primary to-accent rounded-lg h-64 lg:h-80"></div>
    </div>
  </Section>
);

export const ContactSection: React.FC = () => (
  <Section id="contact" className="bg-gray-50">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-responsive-xl font-bold mb-4">Get In Touch</h2>
        <p className="text-responsive-base text-neutral">
          Ready to start your project? We'd love to hear from you.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h3 className="text-lg font-semibold mb-6">Contact Information</h3>
          <div className="space-y-4">
            <div>
              <p className="font-medium">Email</p>
              <a href="mailto:hello@badgrtech.com" className="text-primary hover:underline">
                hello@badgrtech.com
              </a>
            </div>
            <div>
              <p className="font-medium">Phone</p>
              <a href="tel:+14044235493" className="text-primary hover:underline">
                +1 (404) 423-5493
              </a>
            </div>
            <div>
              <p className="font-medium">Address</p>
              <p className="text-neutral">
                8735 Dunwoody Place, Suite N<br />
                Atlanta, GA 30350
              </p>
            </div>
          </div>
        </div>
        <div>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input type="text" id="name" className="input" placeholder="Your name" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input type="email" id="email" className="input" placeholder="your@email.com" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="input"
                placeholder="Your message"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  </Section>
);

export const Footer: React.FC = () => (
  <footer className="bg-secondary text-white py-12">
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold mb-4">BADGRTechnologies LLC</h3>
          <p className="text-gray-300 mb-4">
            Professional digital solutions that drive real results for your business.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-300">
            <li>
              <a href="#services" className="hover:text-white transition-colors">
                Services
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-white transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-white transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Connect</h4>
          <ul className="space-y-2 text-gray-300">
            <li>
              <a href="mailto:hello@badgrtech.com" className="hover:text-white transition-colors">
                Email
              </a>
            </li>
            <li>
              <a href="tel:+14044235493" className="hover:text-white transition-colors">
                Phone
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
        <p>&copy; 2025 BADGRTechnologies LLC. All rights reserved.</p>
      </div>
    </div>
  </footer>
);
