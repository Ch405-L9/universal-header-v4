import { badgrTechBusiness } from './business';

export const badgerTechContact = {
  title: 'Contact',
  subtitle: "Let's Build Something Amazing Together",
  description:
    "Ready to transform your digital presence? We're here to help. Get in touch to discuss your project, ask questions, or learn more about how we can help your business succeed online.",

  info: {
    email: badgrTechBusiness.contact.email.primary,
    phone: badgrTechBusiness.contact.phone.primary,
    address: {
      street: badgrTechBusiness.contact.address.street,
      city: badgrTechBusiness.contact.address.city,
      state: badgrTechBusiness.contact.address.state,
      zip: badgrTechBusiness.contact.address.zip,
    },
    hours: {
      weekdays: badgrTechBusiness.contact.hours.weekdays,
      weekends: badgrTechBusiness.contact.hours.weekends,
    },
    social: {
      linkedin: badgrTechBusiness.social.linkedin.url,
      twitter: badgrTechBusiness.social.twitter.url,
      github: badgrTechBusiness.social.github.url,
      instagram: badgrTechBusiness.social.instagram.url,
    },
  },
};
