export interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
  children?: NavigationItem[];
}

export interface CTAButton {
  text: string;
  href: string;
  variant: 'primary' | 'secondary' | 'accent';
  external?: boolean;
}

export interface HeroConfig {
  headline: string;
  subheadline: string;
  description: string;
  variant: 'banner' | 'hero' | 'split-left' | 'split-right' | 'minimal';
  backgroundImage?: string;
  ctaButtons: CTAButton[];
}

export interface ContactInfo {
  email: string;
  phone?: string;
  address?: string;
  ctaHref?: string;
  ctaText?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    instagram?: string;
  };
}

import { ServicesConfig } from './services';

export interface SiteConfig {
  title: string;
  tagline: string;
  description: string;
  logo?: string;
  navigation: NavigationItem[];
  hero: HeroConfig;
  contact: ContactInfo;
  theme?: {
    primaryColor?: string;
    secondaryColor?: string;
    accentColor?: string;
  };
  services?: ServicesConfig;
}
