#!/usr/bin/env bash
# header_v4C2_about_contact.sh - Phase C-2: About & Contact Sections
# Continues the proven automation pattern for content-heavy sections
set -euo pipefail

APP_DIR="universal-header-v4"
DRY_RUN=false
VERBOSE=true

while [[ $# -gt 0 ]]; do
  case "$1" in
    --dir) APP_DIR="${2:-universal-header-v4}"; shift 2;;
    --dry-run) DRY_RUN=true; shift;;
    --quiet) VERBOSE=false; shift;;
    *) echo "Usage: $0 [--dir DIR] [--dry-run] [--quiet]"; exit 1;;
  esac
done

log(){ [[ "$VERBOSE" == true ]] && echo "[$0] $*"; }
fail(){ echo "ERROR: $*" >&2; exit 1; }

[[ -d "$APP_DIR" ]] || fail "App dir '$APP_DIR' not found."
cd "$APP_DIR"

# Validate previous phases completed
[[ -f "src/components/ServicesSection.tsx" ]] || fail "Services section missing. Run Phase C-1 first."

ensure_dir(){ [[ -d "$1" ]] || { mkdir -p "$1"; log "Created directory: $1"; }; }
create_file(){
  local fp="$1"
  if [[ "$DRY_RUN" == true ]]; then log "Would create: $fp"; cat > /dev/null; return 0; fi
  ensure_dir "$(dirname "$fp")"
  cat > "$fp"
  log "Created file: $fp ($(wc -l < "$fp") lines)"
}

log "Phase C-2: Adding About and Contact Sections..."

# Create About section component
create_file "src/components/AboutSection.tsx" <<'ABOUTSECTION'
import React from 'react';
import { cn } from '@/utils/cn';

interface AboutConfig {
  title: string;
  subtitle: string;
  description: string[];
  highlights: {
    title: string;
    items: string[];
  };
  team?: {
    title: string;
    description: string;
  };
  cta?: {
    text: string;
    href: string;
  };
}

interface AboutSectionProps {
  config: AboutConfig;
  className?: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ config, className = '' }) => {
  return (
    <section className={cn('py-20 bg-white', className)} id="about">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-wide">
              {config.title}
            </h2>
            <p className="text-xl md:text-2xl text-blue-600 font-medium mb-8 tracking-wide">
              {config.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Main Description */}
            <div>
              <div className="space-y-6">
                {config.description.map((paragraph, index) => (
                  <p key={index} className="text-lg text-gray-600 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {config.cta && (
                <div className="mt-8">
                  <a
                    href={config.cta.href}
                    className={cn(
                      'inline-flex items-center bg-blue-600 text-white font-semibold py-4 px-8 rounded-sm',
                      'hover:bg-blue-700 transition-colors duration-200 text-lg',
                      'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                    )}
                  >
                    {config.cta.text}
                    <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              )}
            </div>

            {/* Highlights & Team Info */}
            <div className="space-y-12">
              {/* Highlights Box */}
              <div className="bg-gray-50 p-8 rounded-sm border-2 border-blue-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {config.highlights.title}
                </h3>
                <ul className="space-y-4">
                  {config.highlights.items.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700 text-lg leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Team Info */}
              {config.team && (
                <div className="bg-blue-50 p-8 rounded-sm border-2 border-blue-600">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {config.team.title}
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {config.team.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
ABOUTSECTION

# Create Contact form component
create_file "src/components/ContactForm.tsx" <<'CONTACTFORM'
import React, { useState } from 'react';
import { cn } from '@/utils/cn';

interface ContactFormProps {
  className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ className = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Create mailto link with form data
    const subject = encodeURIComponent(`Contact Form: Message from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Company: ${formData.company || 'Not provided'}\n\n` +
      `Message:\n${formData.message}`
    );
    
    const mailtoLink = `mailto:hello@badgetechnologies.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Reset form after a brief delay
    setTimeout(() => {
      setFormData({ name: '', email: '', company: '', message: '' });
      setIsSubmitting(false);
      // Show success message (you could add a toast notification here)
      alert('Thank you! Your default email client should now open with your message pre-filled.');
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-6', className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={cn(
              'w-full px-4 py-3 border-2 rounded-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors',
              errors.name ? 'border-red-500' : 'border-gray-300'
            )}
            placeholder="Your full name"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={cn(
              'w-full px-4 py-3 border-2 rounded-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors',
              errors.email ? 'border-red-500' : 'border-gray-300'
            )}
            placeholder="your.email@company.com"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
          Company (Optional)
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="Your company name"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={formData.message}
          onChange={handleChange}
          className={cn(
            'w-full px-4 py-3 border-2 rounded-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical',
            errors.message ? 'border-red-500' : 'border-gray-300'
          )}
          placeholder="Tell us about your project or how we can help you..."
        />
        {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          'w-full bg-blue-600 text-white font-semibold py-4 px-8 rounded-sm',
          'hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          'transition-colors duration-200 text-lg',
          isSubmitting && 'opacity-50 cursor-not-allowed'
        )}
      >
        {isSubmitting ? 'Opening Email Client...' : 'Send Message'}
      </button>
    </form>
  );
};

export default ContactForm;
CONTACTFORM

# Create Contact section component
create_file "src/components/ContactSection.tsx" <<'CONTACTSECTION'
import React from 'react';
import ContactForm from './ContactForm';
import { cn } from '@/utils/cn';

interface ContactInfo {
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  hours: {
    weekdays: string;
    weekends: string;
  };
  social?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

interface ContactConfig {
  title: string;
  subtitle: string;
  description: string;
  info: ContactInfo;
}

interface ContactSectionProps {
  config: ContactConfig;
  className?: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({ config, className = '' }) => {
  return (
    <section className={cn('py-20 bg-gray-50', className)} id="contact">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-wide">
              {config.title}
            </h2>
            <p className="text-xl md:text-2xl text-blue-600 font-medium mb-6 tracking-wide">
              {config.subtitle}
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {config.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div className="bg-white p-8 rounded-sm border-2 border-blue-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Get in Touch</h3>
              
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-sm flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">Email</h4>
                    <a 
                      href={`mailto:${config.info.email}`}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {config.info.email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-sm flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">Phone</h4>
                    <a 
                      href={`tel:${config.info.phone}`}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {config.info.phone}
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-sm flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">Address</h4>
                    <div className="text-gray-600">
                      <p>{config.info.address.street}</p>
                      <p>{config.info.address.city}, {config.info.address.state} {config.info.address.zip}</p>
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-sm flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">Business Hours</h4>
                    <div className="text-gray-600">
                      <p>Weekdays: {config.info.hours.weekdays}</p>
                      <p>Weekends: {config.info.hours.weekends}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              {config.info.social && (
                <div className="mt-8 pt-8 border-t-2 border-gray-100">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Connect With Us</h4>
                  <div className="flex space-x-4">
                    {config.info.social.linkedin && (
                      <a
                        href={config.info.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-sm flex items-center justify-center transition-colors"
                      >
                        <span className="sr-only">LinkedIn</span>
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                        </svg>
                      </a>
                    )}
                    {config.info.social.twitter && (
                      <a
                        href={config.info.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-sm flex items-center justify-center transition-colors"
                      >
                        <span className="sr-only">Twitter</span>
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                    )}
                    {config.info.social.github && (
                      <a
                        href={config.info.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-sm flex items-center justify-center transition-colors"
                      >
                        <span className="sr-only">GitHub</span>
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-sm border-2 border-blue-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
CONTACTSECTION

# Create configuration files for About and Contact
create_file "src/config/about.ts" <<'ABOUTCONFIG'
export const badgerTechAbout = {
  title: "About BadgerTech",
  subtitle: "Your Digital Innovation Partner",
  description: [
    "BadgerTech Technologies LLC is a forward-thinking digital agency that specializes in creating exceptional web experiences and digital solutions for businesses of all sizes. We combine technical expertise with creative innovation to deliver results that exceed expectations.",
    "Our mission is simple: to help businesses thrive in the digital landscape through cutting-edge technology, strategic thinking, and personalized service. We believe that every business deserves a digital presence that truly represents their brand and drives measurable results.",
    "Whether you're a startup looking to make your first digital impression or an established business ready to modernize your online presence, we're here to guide you through every step of your digital transformation journey."
  ],
  highlights: {
    title: "Why Choose BadgerTech?",
    items: [
      "10+ years of combined web development experience",
      "Proven track record with 100+ successful projects",
      "Cutting-edge technologies and best practices",
      "Personalized service with direct client communication",
      "Fast turnaround times without compromising quality",
      "Ongoing support and maintenance included",
      "SEO optimization and performance focus",
      "Mobile-first, responsive design approach"
    ]
  },
  team: {
    title: "Our Commitment",
    description: "We're not just developers – we're strategic partners invested in your success. Every project receives our full attention, from initial planning through launch and beyond."
  },
  cta: {
    text: "Start Your Project Today",
    href: "mailto:hello@badgetechnologies.com?subject=New Project Inquiry"
  }
};
ABOUTCONFIG

create_file "src/config/contact.ts" <<'CONTACTCONFIG'
export const badgerTechContact = {
  title: "Contact",
  subtitle: "Let's Build Something Amazing Together",
  description: "Ready to transform your digital presence? We're here to help. Get in touch to discuss your project, ask questions, or learn more about how we can help your business succeed online.",
  info: {
    email: "hello@badgetechnologies.com",
    phone: "+1 (555) 123-4567",
    address: {
      street: "123 Innovation Drive, Suite 100",
      city: "Tech City",
      state: "GA",
      zip: "30309"
    },
    hours: {
      weekdays: "Monday - Friday, 9:00 AM - 6:00 PM EST",
      weekends: "Saturday - Sunday, By appointment only"
    },
    social: {
      linkedin: "https://linkedin.com/company/badgetechnologies",
      twitter: "https://twitter.com/badgetechnologies", 
      github: "https://github.com/badgetechnologies"
    }
  }
};
CONTACTCONFIG

# Update App.tsx to include new sections
log "Updating App.tsx to include About and Contact sections..."

if [[ -f "src/App.tsx" ]]; then
    # Add imports
    if ! grep -q "AboutSection" src/App.tsx; then
        sed -i.bak '/import.*ServicesSection/a\
import AboutSection from '\''@/components/AboutSection'\'';\
import ContactSection from '\''@/components/ContactSection'\'';' src/App.tsx
        rm -f src/App.tsx.bak
    fi
    
    # Add config imports
    if ! grep -q "badgerTechAbout" src/App.tsx; then
        sed -i.bak '/import.*defaultSiteConfig/a\
import { badgerTechAbout } from '\''@/config/about'\'';\
import { badgerTechContact } from '\''@/config/contact'\'';' src/App.tsx
        rm -f src/App.tsx.bak
    fi
    
    # Add components after services section
    if ! grep -q "AboutSection" src/App.tsx; then
        sed -i.bak '/ServicesSection.*\/>/a\
        <AboutSection config={badgerTechAbout} />\
        <ContactSection config={badgerTechContact} />' src/App.tsx
        rm -f src/App.tsx.bak
        
        log "Added About and Contact sections to App.tsx"
    fi
fi

# Verify the integration
log "Verifying component integration..."

# Detect package manager
if command -v pnpm >/dev/null 2>&1; then
    PM="pnpm"
elif command -v yarn >/dev/null 2>&1; then
    PM="yarn"
else
    PM="npm"
fi

log ""
log "🎉 Phase C-2 Complete: About and Contact Sections Added!"
log ""
log "📁 New Files Created:"
log "  • src/components/AboutSection.tsx - Company information section"
log "  • src/components/ContactForm.tsx - Interactive contact form" 
log "  • src/components/ContactSection.tsx - Contact information and form"
log "  • src/config/about.ts - About section configuration"
log "  • src/config/contact.ts - Contact section configuration"
log ""
log "🔧 Updated Files:"
log "  • src/App.tsx - Added About and Contact sections"
log ""
log "🚀 Next Steps:"
log "  1. Test the new sections: '$PM run dev'"
log "  2. Customize content in src/config/about.ts and src/config/contact.ts"
log "  3. Run Phase C-3 for Footer and final integration"
log ""
log "💡 Features Added:"
log "  • Professional About section with company highlights"
log "  • Interactive contact form with email integration"
log "  • Contact information with social media links"
log "  • Form validation and user feedback"
log "  • Mobile-responsive design throughout"