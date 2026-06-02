import { Check, Clock, Gauge, Lock, Shield, Smartphone, Zap, type LucideIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";

import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { buildGraph, buildWebPageSchema, orgEntity, websiteEntity } from "@/lib/schema";
import { useJsonLd, usePageMeta } from "@/lib/seo";
import { cn } from "@/lib/utils";

type FormData = {
  practiceName: string;
  contactName: string;
  email: string;
  phone: string;
  practiceType: string;
  websiteUrl: string;
  consent: boolean;
  website: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const initialFormData: FormData = {
  practiceName: "",
  contactName: "",
  email: "",
  phone: "",
  practiceType: "",
  websiteUrl: "",
  consent: false,
  website: "",
};

const practiceTypes = [
  "Med-Spa / Aesthetics",
  "Cosmetic Dental",
  "General Dental",
  "Chiropractic / PT",
  "Other",
];

const proofCards = [
  {
    label: "Desktop",
    imageAvif: "/images/lighthouse-scan-desktop-100.avif",
    imageWebp: "/images/lighthouse-scan-desktop-100.webp",
    imageAlt:
      "Lighthouse desktop report showing 100 Performance, 96 Accessibility, 96 Best Practices, and 100 SEO.",
    width: 1200,
    height: 628,
    scores: [
      ["Performance", "100"],
      ["Accessibility", "96"],
      ["Best Practices", "96"],
      ["SEO", "100"],
    ],
    vitals: [
      ["FCP", "0.5s"],
      ["LCP", "0.8s"],
      ["CLS", "0"],
      ["TBT", "0ms"],
    ],
  },
  {
    label: "Mobile",
    imageAvif: "/images/lighthouse-scan-mobile-91.avif",
    imageWebp: "/images/lighthouse-scan-mobile-91.webp",
    imageAlt:
      "Lighthouse mobile report showing 91 Performance, 96 Accessibility, 96 Best Practices, and 69 SEO.",
    width: 1200,
    height: 630,
    scores: [
      ["Performance", "91"],
      ["Accessibility", "96"],
      ["Best Practices", "96"],
      ["SEO", "69"],
    ],
    vitals: [
      ["FCP", "1.7s"],
      ["LCP", "3.6s"],
      ["CLS", "0"],
      ["TBT", "0ms"],
    ],
  },
];

const auditChecks: { icon: LucideIcon; text: string }[] = [
  { icon: Gauge, text: "Lighthouse performance and Core Web Vitals" },
  { icon: Smartphone, text: "Mobile tap-to-call and booking friction" },
  { icon: Shield, text: "Trust, policy, and HIPAA-aware form signals" },
  { icon: Zap, text: "Online scheduling and local visibility gaps" },
];

function validateForm(formData: FormData): FormErrors {
  const errors: FormErrors = {};
  const practiceName = formData.practiceName.trim();
  const contactName = formData.contactName.trim();
  const email = formData.email.trim();
  const phone = formData.phone.trim();
  const practiceType = formData.practiceType.trim();
  const websiteUrl = formData.websiteUrl.trim();

  if (!practiceName) {
    errors.practiceName = "Practice name is required.";
  } else if (practiceName.length < 2) {
    errors.practiceName = "Practice name must be at least 2 characters.";
  } else if (practiceName.length > 100) {
    errors.practiceName = "Practice name must be 100 characters or less.";
  } else if (!/^[a-zA-Z0-9\s&'.-]+$/.test(practiceName)) {
    errors.practiceName = "Use letters, numbers, spaces, ampersands, apostrophes, periods, or hyphens.";
  }

  if (!contactName) {
    errors.contactName = "Your name is required.";
  } else if (contactName.length < 2) {
    errors.contactName = "Your name must be at least 2 characters.";
  } else if (contactName.length > 100) {
    errors.contactName = "Your name must be 100 characters or less.";
  } else if (!/^[a-zA-Z\s'.-]+$/.test(contactName)) {
    errors.contactName = "Use letters, spaces, apostrophes, periods, or hyphens.";
  }

  if (!email) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!phone) {
    errors.phone = "Phone number is required.";
  } else if (!/^[0-9+().\-\s]{7,20}$/.test(phone)) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!practiceType) {
    errors.practiceType = "Practice type is required.";
  } else if (!practiceTypes.includes(practiceType)) {
    errors.practiceType = "Choose a listed practice type.";
  }

  if (!websiteUrl) {
    errors.websiteUrl = "Website URL is required.";
  } else {
    try {
      const parsedUrl = new URL(websiteUrl);
      if (parsedUrl.protocol !== "https:") {
        errors.websiteUrl = "Please include https:// at the beginning.";
      }
    } catch {
      errors.websiteUrl = "Enter a valid URL, including https://.";
    }
  }

  if (!formData.consent) {
    errors.consent = "Please confirm the audit request terms.";
  }

  return errors;
}

function MetricGrid({
  items,
  variant = "score",
}: {
  items: string[][];
  variant?: "score" | "vital";
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map(([label, value]) => (
        <div
          key={label}
          className="border border-zinc-800 bg-black/35 p-3 text-center"
        >
          <div
            className={cn(
              "font-mono font-bold",
              variant === "score" ? "text-3xl text-green-400" : "text-lg text-white",
            )}
          >
            {value}
          </div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-zinc-400">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function FreeLighthouseScan() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showHeroImage, setShowHeroImage] = useState(false);
  const [successEmail, setSuccessEmail] = useState("");
  const [submitError, setSubmitError] = useState("");

  usePageMeta({
    title: "Free Lead Leak Audit for Medical Practices | BADGRTechnologies",
    description:
      "Claim a free BADGRTechnologies lead leak audit for Atlanta med-spas, dental practices, chiropractic, and PT practices.",
  });

  useJsonLd(
    buildGraph(
      orgEntity,
      websiteEntity,
      buildWebPageSchema({
        id: "https://badgrtech.com/free-lighthouse-scan#page",
        name: "Free Lead Leak Audit",
        description:
          "Request a free website lead leak audit from BADGRTechnologies.",
        url: "https://badgrtech.com/free-lighthouse-scan",
        breadcrumb: [
          { name: "Home", url: "https://badgrtech.com/" },
          {
            name: "Free Lead Leak Audit",
            url: "https://badgrtech.com/free-lighthouse-scan",
          },
        ],
      }),
    ),
    "free-lighthouse-scan-graph",
  );

  const errorSummary = useMemo(
    () => Object.values(errors).filter(Boolean).join(" "),
    [errors],
  );

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setShowHeroImage(true), 250);
    return () => window.clearTimeout(timeoutId);
  }, []);

  const updateField = (field: keyof FormData, value: string | boolean) => {
    const nextFormData = { ...formData, [field]: value };
    setFormData(nextFormData);
    if (errors[field]) {
      setErrors(validateForm(nextFormData));
    }
    setSubmitError("");
  };

  const submitScanRequest = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.website) {
      return;
    }

    const nextErrors = validateForm(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/lighthouse-scan-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || "Request failed.");
      }

      setSuccessEmail(formData.email.trim().toLowerCase());
      setFormData(initialFormData);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="relative isolate overflow-hidden border-b border-primary/20 bg-zinc-950 py-20 md:py-28">
        {showHeroImage ? (
          <picture>
            <source srcSet="/images/lighthouse-hero-bg.avif" type="image/avif" />
            <source srcSet="/images/lighthouse-hero-bg.webp" type="image/webp" />
            <img
              src="/images/lighthouse-hero-bg.webp"
              alt=""
              width="640"
              height="640"
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              className="absolute right-0 top-0 -z-10 h-full w-full object-cover opacity-30 blur-sm"
            />
          </picture>
        ) : null}
        <div className="absolute inset-0 -z-10 bg-[url('/grid-pattern.svg')] opacity-[0.06]" />
        <div className="absolute left-1/2 top-0 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
        <div className="container mx-auto grid items-center gap-12 px-4 lg:grid-cols-12">
          <div className="max-w-4xl lg:col-span-7">
            <Badge
              variant="outline"
              className="mb-6 rounded-none border-primary-bright/70 bg-black/40 px-4 py-1 text-[10px] uppercase tracking-[0.24em] text-primary-bright"
            >
              Free Lead Leak Audit
            </Badge>
            <h1 className="font-mono text-4xl font-bold uppercase leading-[0.95] tracking-tight text-white md:text-6xl">
              Your Website Is Losing Patients. Let's Find The Leak.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300 md:text-xl">
              Claim a free new-patient lead leak audit for Atlanta-area
              med-spas, dental practices, chiropractic, and PT practices.
              See where speed, mobile friction, and booking flow may be costing
              you inquiries. Results vary.
            </p>
            <div className="mt-8 grid max-w-2xl gap-3 text-sm text-zinc-300 sm:grid-cols-3">
              {[
                "No credit card required",
                "HIPAA-aware fields",
                "48-hour turnaround",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <Button
              asChild
              size="lg"
              className="mt-10 rounded-none px-8 font-bold uppercase tracking-[0.16em]"
            >
              <a href="#scan-form">Get My Free Lead Leak Audit</a>
            </Button>
          </div>

          <Card className="border-primary/40 bg-card/80 shadow-2xl backdrop-blur-xl lg:col-span-5">
            <CardHeader>
              <CardTitle className="font-mono text-xl uppercase">
                What We Check First
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {auditChecks.map(({ icon: ItemIcon, text }) => {
                return (
                  <div key={text} className="flex gap-3 border border-zinc-800 bg-black/30 p-4">
                    <ItemIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary-bright" />
                    <span className="text-sm leading-6 text-zinc-300">{text}</span>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-t border-primary/20 bg-black py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                title: "Most practices do not know where bookings leak",
                text: "Slow pages, hard-to-tap buttons, and unclear booking paths can push new patients back to search before they ever call.",
              },
              {
                title: "Ad spend gets wasted on friction",
                text: "A free audit helps identify whether the website is keeping the traffic you already paid to attract. Results vary.",
              },
              {
                title: "Medical trust has to show up fast",
                text: "We look for speed, mobile usability, contact clarity, and HIPAA-aware form signals before recommending bigger work.",
              },
            ].map((item) => (
              <div key={item.title} className="border border-zinc-800 bg-zinc-950/70 p-5">
                <h2 className="mb-3 font-sans text-lg font-bold uppercase tracking-[0.04em] text-white">
                  {item.title}
                </h2>
                <p className="text-sm leading-7 text-zinc-400">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-primary/20 bg-zinc-950 py-16">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <Badge
            variant="outline"
            className="mb-5 rounded-none border-primary-bright/70 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-primary-bright"
          >
            What You Get
          </Badge>
          <h2 className="font-sans text-3xl font-bold uppercase tracking-[0.06em] text-white md:text-4xl">
            A Free Audit That Shows Where Your Site Is Leaking New-Patient Bookings
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
            We review public website signals and return practical notes on page
            speed, mobile tap-to-call, HIPAA-aware booking forms, online
            scheduling friction, and obvious local visibility gaps. Free, no
            credit card, 48-hour target turnaround.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 rounded-none px-8 font-bold uppercase tracking-[0.16em]"
          >
            <a href="#scan-form">Claim My Free Audit</a>
          </Button>
        </div>
      </section>

      <section id="lighthouse-proof" className="bg-black py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <Badge
              variant="outline"
              className="mb-5 rounded-none border-primary-bright/70 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-primary-bright"
            >
              Real Site Proof
            </Badge>
            <h2 className="font-sans text-3xl font-bold uppercase tracking-[0.06em] text-white md:text-4xl">
              Scores From Our Own Production Site
            </h2>
            <p className="mt-4 text-zinc-400">
              The audit process starts with the same performance lens used to
              harden badgrtech.com.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {proofCards.map((card) => (
              <Card key={card.label} className="border-zinc-800 bg-zinc-950/80">
                <CardHeader>
                  <CardTitle className="font-mono text-2xl uppercase text-white">
                    {card.label} Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <picture>
                    <source srcSet={card.imageAvif} type="image/avif" />
                    <source srcSet={card.imageWebp} type="image/webp" />
                    <img
                      src={card.imageWebp}
                      alt={card.imageAlt}
                      width={card.width}
                      height={card.height}
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                      sizes="(min-width: 768px) 50vw, 100vw"
                      style={{ aspectRatio: `${card.width}/${card.height}` }}
                      className="w-full border border-zinc-800 object-cover"
                    />
                  </picture>
                  <MetricGrid items={card.scores} />
                  <div className="border-t border-zinc-800 pt-5">
                    <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                      Core Web Vitals
                    </h3>
                    <MetricGrid items={card.vitals} variant="vital" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="scan-form" className="border-t border-primary/20 bg-zinc-950 py-20">
        <div className="container mx-auto max-w-2xl px-4">
          <div className="mb-10 text-center">
            <h2 className="font-sans text-3xl font-bold uppercase tracking-[0.06em] text-white md:text-4xl">
              Claim My Free Audit
            </h2>
            <p className="mt-4 text-zinc-400">
              Business information only. No patient data, no health questions,
              no passwords.
            </p>
          </div>

          {successEmail ? (
            <div className="border border-green-500/40 bg-green-500/10 p-8 text-center">
              <Check className="mx-auto mb-4 h-12 w-12 text-green-400" />
              <h3 className="font-mono text-2xl font-bold uppercase text-white">
                Request Submitted
              </h3>
              <p className="mt-3 text-zinc-300">
                Thank you. We will send your lead leak audit to{" "}
                <strong className="text-white">{successEmail}</strong> within 48 hours.
              </p>
            </div>
          ) : (
            <form
              className="space-y-6 border border-zinc-800 bg-black/40 p-6 md:p-8"
              onSubmit={submitScanRequest}
              noValidate
            >
              <p className="sr-only" role="alert" aria-live="assertive">
                {errorSummary}
              </p>

              <div className="space-y-2">
                <Label htmlFor="practiceName">Practice Name</Label>
                <Input
                  id="practiceName"
                  name="practiceName"
                  autoComplete="organization"
                  value={formData.practiceName}
                  onChange={(event) => updateField("practiceName", event.target.value)}
                  aria-invalid={Boolean(errors.practiceName)}
                  aria-describedby={errors.practiceName ? "practiceName-error" : undefined}
                  required
                  className={cn(
                    "h-12 border-primary/30 bg-background/60",
                    errors.practiceName && "border-red-500 focus:border-red-500",
                  )}
                />
                {errors.practiceName ? (
                  <p id="practiceName-error" className="text-sm text-red-400" role="alert">
                    {errors.practiceName}
                  </p>
                ) : null}
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contactName">Your Name</Label>
                  <Input
                    id="contactName"
                    name="contactName"
                    autoComplete="name"
                    value={formData.contactName}
                    onChange={(event) => updateField("contactName", event.target.value)}
                    aria-invalid={Boolean(errors.contactName)}
                    aria-describedby={errors.contactName ? "contactName-error" : undefined}
                    required
                    className={cn(
                      "h-12 border-primary/30 bg-background/60",
                      errors.contactName && "border-red-500 focus:border-red-500",
                    )}
                  />
                  {errors.contactName ? (
                    <p id="contactName-error" className="text-sm text-red-400" role="alert">
                      {errors.contactName}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={(event) => updateField("phone", event.target.value)}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    required
                    className={cn(
                      "h-12 border-primary/30 bg-background/60",
                      errors.phone && "border-red-500 focus:border-red-500",
                    )}
                  />
                  {errors.phone ? (
                    <p id="phone-error" className="text-sm text-red-400" role="alert">
                      {errors.phone}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    required
                    className={cn(
                      "h-12 border-primary/30 bg-background/60",
                      errors.email && "border-red-500 focus:border-red-500",
                    )}
                  />
                  {errors.email ? (
                    <p id="email-error" className="text-sm text-red-400" role="alert">
                      {errors.email}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="practiceType">Practice Type</Label>
                  <select
                    id="practiceType"
                    name="practiceType"
                    value={formData.practiceType}
                    onChange={(event) => updateField("practiceType", event.target.value)}
                    aria-invalid={Boolean(errors.practiceType)}
                    aria-describedby={errors.practiceType ? "practiceType-error" : undefined}
                    required
                    className={cn(
                      "h-12 w-full rounded-none border border-primary/30 bg-background/60 px-3 text-sm text-foreground outline-none transition-colors focus:border-primary",
                      errors.practiceType && "border-red-500 focus:border-red-500",
                    )}
                  >
                    <option value="">Choose one</option>
                    {practiceTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.practiceType ? (
                    <p id="practiceType-error" className="text-sm text-red-400" role="alert">
                      {errors.practiceType}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="websiteUrl">Website URL</Label>
                <Input
                  id="websiteUrl"
                  name="websiteUrl"
                  type="url"
                  inputMode="url"
                  placeholder="https://www.example.com"
                  autoComplete="url"
                  value={formData.websiteUrl}
                  onChange={(event) => updateField("websiteUrl", event.target.value)}
                  aria-invalid={Boolean(errors.websiteUrl)}
                  aria-describedby={errors.websiteUrl ? "websiteUrl-error" : undefined}
                  required
                  className={cn(
                    "h-12 border-primary/30 bg-background/60",
                    errors.websiteUrl && "border-red-500 focus:border-red-500",
                  )}
                />
                {errors.websiteUrl ? (
                  <p id="websiteUrl-error" className="text-sm text-red-400" role="alert">
                    {errors.websiteUrl}
                  </p>
                ) : null}
              </div>

              <div className="hidden" aria-hidden="true">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={(event) => updateField("website", event.target.value)}
                />
              </div>

              <div className="border border-primary/30 bg-primary/5 p-4">
                <label className="flex gap-3 text-sm leading-6 text-zinc-300">
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(event) => updateField("consent", event.target.checked)}
                    aria-invalid={Boolean(errors.consent)}
                    aria-describedby={errors.consent ? "consent-error" : "audit-notice"}
                    required
                    className="mt-1 h-4 w-4 shrink-0 accent-primary"
                  />
                  <span>
                    I understand this is a free lead leak audit based on public
                    website signals, not legal, medical, security, or HIPAA
                    compliance advice. I will not submit patient information,
                    PHI, passwords, or confidential medical details through this
                    form.
                  </span>
                </label>
                {errors.consent ? (
                  <p id="consent-error" className="mt-2 text-sm text-red-400" role="alert">
                    {errors.consent}
                  </p>
                ) : null}
              </div>

              <p id="audit-notice" className="flex items-start gap-2 text-xs leading-5 text-zinc-400">
                <Lock className="mt-0.5 h-4 w-4 shrink-0 text-primary-bright" />
                <span>
                  By submitting, you agree to be contacted by BADGRTechnologies
                  LLC regarding your free audit. We do not sell your information.
                  See the{" "}
                  <Link href="/privacy" className="text-primary-bright underline underline-offset-4">
                    Privacy Policy
                  </Link>
                  {" "}and{" "}
                  <Link href="/terms" className="text-primary-bright underline underline-offset-4">
                    Terms
                  </Link>
                  . Your details are used only to prepare and follow up on this audit.
                </span>
              </p>

              {submitError ? (
                <div className="border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200" role="alert">
                  {submitError}
                </div>
              ) : null}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-14 w-full rounded-none font-bold uppercase tracking-[0.16em]"
                aria-busy={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Clock className="h-5 w-5 animate-spin" />
                    Submitting
                  </span>
                ) : (
                  "Claim My Free Audit"
                )}
              </Button>
            </form>
          )}
        </div>
      </section>

      <section className="border-t border-primary/20 bg-black py-14">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="grid gap-5 text-sm leading-7 text-zinc-400 md:grid-cols-3">
            <div className="border border-zinc-800 bg-zinc-950/70 p-5">
              <h2 className="mb-2 font-mono text-sm font-bold uppercase tracking-[0.16em] text-white">
                Privacy First
              </h2>
              <p>
                The form asks only for business contact details, practice type,
                and the website URL being audited. Do not submit PHI, patient
                records, passwords, or private medical details.
              </p>
            </div>
            <div className="border border-zinc-800 bg-zinc-950/70 p-5">
              <h2 className="mb-2 font-mono text-sm font-bold uppercase tracking-[0.16em] text-white">
                Audit Scope
              </h2>
              <p>
                A free lead leak audit is an initial website performance,
                usability, and public trust-signal review. It is not a full
                security audit, legal review, medical advice, or compliance
                certification. Results vary.
              </p>
            </div>
            <div className="border border-zinc-800 bg-zinc-950/70 p-5">
              <h2 className="mb-2 font-mono text-sm font-bold uppercase tracking-[0.16em] text-white">
                Follow-Up
              </h2>
              <p>
                BADGRTechnologies may use the submitted contact details to send
                the audit and limited follow-up about the reviewed website.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
