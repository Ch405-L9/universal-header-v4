import { SiteConfig } from '@/types';
import { badgerTechServices } from './services';
import { badgrTechBusiness } from './business';

export const defaultSiteConfig: SiteConfig = {
  title: badgrTechBusiness.company.name,
  tagline: badgrTechBusiness.branding.taglines.primary,
  description: badgrTechBusiness.branding.taglines.extended,
  logo: badgrTechBusiness.assets.logo,

  navigation: [
    { label: "Home", href: "/" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],

  hero: {
    headline: "Transform Your Digital Presence",
    subheadline: badgrTechBusiness.branding.taglines.extended,
    description: "We deliver enterprise-grade web development and strategic digital solutions for ambitious small businesses ready to dominate their market.",
    variant: "banner",
    backgroundImage: badgrTechBusiness.assets.hero.background,
    ctaButtons: [
      {
        text: "Get My Custom Digital Audit",
        href: `mailto:${badgrTechBusiness.contact.email.primary}?subject=Custom Digital Audit Request`,
        variant: "primary"
      },
      {
        text: "View Our Services",
        href: "#services",
        variant: "secondary"
      }
    ]
  },

  contact: {
    email: badgrTechBusiness.contact.email.primary,
    phone: badgrTechBusiness.contact.phone.primary,
    address: badgrTechBusiness.contact.address.full,
    ctaHref: "#services",
    ctaText: "Get Started",
    social: {
      twitter: badgrTechBusiness.social.twitter.url,
      linkedin: badgrTechBusiness.social.linkedin.url,
      github: badgrTechBusiness.social.github.url,
      instagram: badgrTechBusiness.social.instagram.url
    }
  },

  theme: {
    primaryColor: badgrTechBusiness.branding.colors.primary,
    secondaryColor: badgrTechBusiness.branding.colors.secondary,
    accentColor: badgrTechBusiness.branding.colors.accent
  },

  services: badgerTechServices
};
