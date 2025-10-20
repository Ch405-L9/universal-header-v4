export const footerConfig = {
  sections: [
    {
      title: 'Quick Links',
      links: [
        { label: 'Menu', href: '#services' },
        { label: 'About Us', href: '#about' },
        { label: 'Gallery', href: '#gallery' },
        { label: 'Contact', href: '#contact' }
      ]
    },
    {
      title: 'Services',
      links: [
        { label: 'Custom Cakes', href: '#services' },
        { label: 'Catering', href: '#services' },
        { label: 'Wholesale', href: '#services' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Allergen Info', href: '/allergens' }
      ]
    }
  ],
  newsletter: {
    title: 'Weekly Specials',
    description: 'Get our weekly menu and special offers',
    placeholder: 'Enter your email',
    buttonText: 'Subscribe'
  },
  legal: {
    copyright: '© 2024 Acme Bakery LLC. All rights reserved.',
    disclaimer: 'Allergen information available upon request. We handle tree nuts, dairy, eggs, and wheat.',
    businessInfo: 'Licensed & Insured | Food Service Permit #12345'
  }
};
