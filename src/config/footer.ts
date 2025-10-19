import { badgrTechBusiness } from './business';

export const badgerTechFooter = {
  companyName: 'BADGRTechnologies LLC',
  tagline: 'CTRL+ALT+Deliver',
  description:
    'We create exceptional digital experiences that help ambitious small businesses thrive in competitive markets through superior technology implementation.',

  sections: [
    {
      title: 'Services',
      links: [
        {
          label: 'Full-Stack Development',
          href: '/#services',
        },
        {
          label: 'Strategic Branding',
          href: '/#services',
        },
        {
          label: 'Visual Content Creation',
          href: '/#services',
        },
      ],
    },
    {
      title: 'Company',
      links: [
        {
          label: 'About Us',
          href: '/#about',
        },
        {
          label: 'Our Process',
          href: '/#process',
        },
        {
          label: 'Case Studies',
          href: '/#case-studies',
        },
        {
          label: 'Contact',
          href: '/#contact',
        },
      ],
    },
    {
      title: 'Resources',
      links: [
        {
          label: 'SaaS Integration',
          href: '/#saas',
        },
        {
          label: 'Documentation',
          href: '/#documentation',
        },
        {
          label: 'Support',
          href: '/#support',
        },
        {
          label: 'FAQ',
          href: '/#faq',
        },
        {
          label: 'Blog',
          href: '/#blog',
        },
      ],
    },
    {
      title: 'More',
      links: [
        {
          label: 'Investors',
          href: '#',
        },
        {
          label: 'Partners',
          href: '#',
        },
        {
          label: 'Gallery/Portfolio',
          href: '#',
        },
        {
          label: 'Other Services',
          href: '#',
        },
      ],
    },
  ],

  socialLinks: [
    {
      name: 'LinkedIn',
      href: badgrTechBusiness.social.linkedin.url,
      iconType: 'linkedin',
    },
    {
      name: 'Twitter',
      href: badgrTechBusiness.social.twitter.url,
      iconType: 'twitter',
    },
    {
      name: 'GitHub',
      href: badgrTechBusiness.social.github.url,
      iconType: 'github',
    },
  ],

  legal: {
    copyright: 'BADGRTechnologies LLC',
    trademark: 'CTRL+ALT+Deliver is a trademark of BADGRTechnologies LLC',
    privacyPolicy: '/privacy',
    termsOfService: '/terms',
  },

  contact: {
    email: badgrTechBusiness.contact.email.primary,
    phone: badgrTechBusiness.contact.phone.primary,
    address: `${badgrTechBusiness.contact.address.street}, ${badgrTechBusiness.contact.address.city}, ${badgrTechBusiness.contact.address.state} ${badgrTechBusiness.contact.address.zip}`,
  },
};
