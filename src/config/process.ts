export interface ProcessStep {
  number: number;
  name: string;
  title: string;
  description: string;
  image: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: 1,
    name: 'Discovery',
    title: 'Free Consultation',
    description: 'We discuss your goals via email, phone, or Zoom. Response within 2 hours guaranteed.',
    image: '/images/service-webdev.webp'
  },
  {
    number: 2,
    name: 'Drafting',
    title: 'Concept Review',
    description: 'See early sketches, wireframes, or logo concepts. You approve direction before we build.',
    image: '/images/service-branding.webp'
  },
  {
    number: 3,
    name: 'Kickoff',
    title: 'Project Start',
    description: 'Contract signed, deposit paid. Your project officially begins with clear milestones.',
    image: '/images/service-content-edit.webp'
  },
  {
    number: 4,
    name: 'Build & Revise',
    title: 'Development & Launch',
    description: '3 revisions included. Lighthouse 90+ guaranteed. Final product delivered on time.',
    image: '/images/service-webdev.webp'
  }
];
