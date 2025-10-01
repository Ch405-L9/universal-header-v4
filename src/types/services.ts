export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  price: {
    starting: number;
    currency: string;
    period?: string;
  };
  cta: {
    text: string;
    href: string;
    type: 'email' | 'phone' | 'link';
  };
  image?: string;
  popular?: boolean;
}

export interface ServicesConfig {
  title: string;
  subtitle: string;
  description: string;
  services: Service[];
  ctaSection?: {
    title: string;
    description: string;
    primaryCta: {
      text: string;
      href: string;
    };
    secondaryCta?: {
      text: string;
      href: string;
    };
  };
}
