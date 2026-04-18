/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STRIPE_PUBLISHABLE_KEY?: string;
  readonly VITE_APP_URL?: string;
  readonly VITE_USE_STRIPE_MOCK?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
