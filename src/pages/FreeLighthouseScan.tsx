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
  concern: string;
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
  concern: "",
  websiteUrl: "",
  consent: false,
  website: "",
};

const auditChecks: { icon: LucideIcon; text: string }[] = [
  { icon: Gauge, text: "Page speed on phones and computers" },
  { icon: Smartphone, text: "Mobile layout, call buttons, and booking links" },
  { icon: Shield, text: "Contact forms and broken links" },
  { icon: Zap, text: "Page titles, descriptions, and Google Business Profile basics" },
];

function normalizeHttpsUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  if (trimmed.startsWith("http://")) return `https://${trimmed.slice(7)}`;
  if (!trimmed.startsWith("https://")) return `https://${trimmed}`;
  return trimmed;
}

function validateForm(formData: FormData): FormErrors {
  const errors: FormErrors = {};
  const practiceName = formData.practiceName.trim();
  const contactName = formData.contactName.trim();
  const email = formData.email.trim();
  const phone = formData.phone.trim();
  const concern = formData.concern.trim();
  const websiteUrl = normalizeHttpsUrl(formData.websiteUrl);

  // Only website and email are required; optional fields are checked when filled in.
  if (practiceName) {
    if (practiceName.length < 2) {
      errors.practiceName = "Business name must be at least 2 characters.";
    } else if (practiceName.length > 100) {
      errors.practiceName = "Business name must be 100 characters or less.";
    } else if (!/^[\p{L}\p{N}\s&'.,()/-]+$/u.test(practiceName)) {
      errors.practiceName = "Use letters, numbers, spaces, and basic punctuation.";
    }
  }

  if (contactName) {
    if (contactName.length < 2) {
      errors.contactName = "Your name must be at least 2 characters.";
    } else if (contactName.length > 100) {
      errors.contactName = "Your name must be 100 characters or less.";
    } else if (!/^[\p{L}\s'.-]+$/u.test(contactName)) {
      errors.contactName = "Use letters, spaces, apostrophes, periods, or hyphens.";
    }
  }

  if (!email) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (phone && !/^[0-9+().\-\s]{7,20}$/.test(phone)) {
    errors.phone = "Enter a valid phone number.";
  }

  if (concern.length > 500) {
    errors.concern = "Main concern must be 500 characters or less.";
  }

  if (!websiteUrl) {
    errors.websiteUrl = "Website URL is required.";
  } else {
    try {
      const parsedUrl = new URL(websiteUrl);
      if (parsedUrl.protocol !== "https:") {
        errors.websiteUrl = "Enter a secure website URL.";
      }
    } catch {
      errors.websiteUrl = "Enter a valid website domain or URL.";
    }
  }

  if (!formData.consent) {
    errors.consent = "Please confirm the audit request terms.";
  }

  return errors;
}

export default function FreeLighthouseScan() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successEmail, setSuccessEmail] = useState("");
  const [submitError, setSubmitError] = useState("");

  usePageMeta({
    title: "Free Website Check | BADGRTechnologies",
    description:
      "Request a free website check from BADGRTechnologies: one public page reviewed and up to three issues sent by email. No credit card, no account access.",
  });

  useJsonLd(
    buildGraph(
      orgEntity,
      websiteEntity,
      buildWebPageSchema({
        id: "https://badgrtech.com/website-check#page",
        name: "Free Website Check",
        description:
          "Request a free website check from BADGRTechnologies.",
        url: "https://badgrtech.com/website-check",
        breadcrumb: [
          { name: "Home", url: "https://badgrtech.com/" },
          {
            name: "Free Website Check",
            url: "https://badgrtech.com/website-check",
          },
        ],
      }),
    ),
    "website-check-graph",
  );

  const errorSummary = useMemo(
    () => Object.values(errors).filter(Boolean).join(" "),
    [errors],
  );

  useEffect(() => {
    const requestedUrl = new URLSearchParams(window.location.search).get("url");
    if (!requestedUrl) return;

    setFormData(current => ({
      ...current,
      websiteUrl: requestedUrl,
    }));
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

    const normalizedFormData = {
      ...formData,
      websiteUrl: normalizeHttpsUrl(formData.websiteUrl),
    };
    const nextErrors = validateForm(normalizedFormData);
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
        body: JSON.stringify(normalizedFormData),
      });
      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || "Request failed.");
      }

      setSuccessEmail(normalizedFormData.email.trim().toLowerCase());
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
        <div className="absolute inset-0 -z-10 bg-[url('/grid-pattern.svg')] opacity-[0.06]" />
        <div className="absolute left-1/2 top-0 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
        <div className="container mx-auto grid items-center gap-12 px-4 lg:grid-cols-12">
          <div className="max-w-4xl lg:col-span-7">
            <Badge
              variant="outline"
              className="mb-6 rounded-none border-primary-bright/70 bg-black/40 px-4 py-1 text-xs uppercase tracking-[0.18em] text-primary-bright"
            >
              Free website check
            </Badge>
            <h1 className="font-mono text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl">
              Fix the website problems getting in your customers' way.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300 md:text-xl">
              Send your website address. We review one public page and email
              you up to three issues we found, in plain English. If you want
              them fixed, the Tune-Up is $349 for up to three pages.
            </p>
            <div className="mt-8 grid max-w-2xl gap-3 text-sm text-zinc-300 sm:grid-cols-3">
              {[
                "No credit card",
                "No account access needed",
                "Up to 3 issues by email",
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
              className="mt-10 rounded-none px-8 font-bold"
            >
              <a href="#scan-form">Request my free website check</a>
            </Button>
          </div>

          <Card className="border-primary/40 bg-card/80 shadow-2xl backdrop-blur-xl lg:col-span-5">
            <CardHeader>
              <CardTitle className="font-mono text-xl">
                What we look at
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

      <section id="scan-form" className="border-t border-primary/20 bg-zinc-950 py-20">
        <div className="container mx-auto max-w-2xl px-4">
          <div className="mb-10 text-center">
            <h2 className="font-sans text-3xl font-bold uppercase tracking-[0.06em] text-white md:text-4xl">
              Request my free website check
            </h2>
            <p className="mt-4 text-zinc-400">
              Business information only. No passwords, payment details, or
              customer or patient records.
            </p>
          </div>

          {successEmail ? (
            <div className="border border-green-500/40 bg-green-500/10 p-8 text-center">
              <Check className="mx-auto mb-4 h-12 w-12 text-green-400" />
              <h3 className="font-mono text-2xl font-bold uppercase text-white">
                Request Submitted
              </h3>
              <p className="mt-3 text-zinc-300">
                Thank you. We will send your free website check findings to{" "}
                <strong className="text-white">{successEmail}</strong> within 48 hours.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild variant="outline" className="rounded-none">
                  <Link href="/">Back to home</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-none">
                  <Link href="/#pricing">View services</Link>
                </Button>
              </div>
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
                <Label htmlFor="practiceName">Business Name <span className="text-zinc-400">(optional)</span></Label>
                <Input
                  id="practiceName"
                  name="practiceName"
                  autoComplete="organization"
                  value={formData.practiceName}
                  onChange={(event) => updateField("practiceName", event.target.value)}
                  aria-invalid={Boolean(errors.practiceName)}
                  aria-describedby={errors.practiceName ? "practiceName-error" : undefined}
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
                  <Label htmlFor="contactName">Your Name <span className="text-zinc-400">(optional)</span></Label>
                  <Input
                    id="contactName"
                    name="contactName"
                    autoComplete="name"
                    value={formData.contactName}
                    onChange={(event) => updateField("contactName", event.target.value)}
                    aria-invalid={Boolean(errors.contactName)}
                    aria-describedby={errors.contactName ? "contactName-error" : undefined}
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
                  <Label htmlFor="phone">Phone Number <span className="text-zinc-400">(optional)</span></Label>
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
                  <Label htmlFor="concern">Main Concern <span className="text-zinc-400">(optional)</span></Label>
                  <Input
                    id="concern"
                    name="concern"
                    maxLength={500}
                    placeholder="Slow on phones, form not working, outdated info"
                    value={formData.concern}
                    onChange={(event) => updateField("concern", event.target.value)}
                    aria-invalid={Boolean(errors.concern)}
                    aria-describedby={errors.concern ? "concern-error" : undefined}
                    className={cn(
                      "h-12 border-primary/30 bg-background/60",
                      errors.concern && "border-red-500 focus:border-red-500",
                    )}
                  />
                  {errors.concern ? (
                    <p id="concern-error" className="text-sm text-red-400" role="alert">
                      {errors.concern}
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
                    I agree to be contacted about this request. I will only send
                    business information: no passwords, payment details, or
                    customer or patient records.
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
                  LLC regarding your free website check. We do not sell your information.
                  See the{" "}
                  <Link href="/privacy" className="text-primary-bright underline underline-offset-4">
                    Privacy Policy
                  </Link>
                  {" "}and{" "}
                  <Link href="/terms" className="text-primary-bright underline underline-offset-4">
                    Terms
                  </Link>
                  . Your details are used only to prepare and follow up on this review.
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
                  "Request My Free Check"
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
              <h2 className="mb-2 font-sans text-sm font-bold uppercase tracking-[0.16em] text-white">
                Privacy First
              </h2>
              <p>
                The form asks only for business contact details and the website
                address to review. Please do not send passwords, payment
                details, or customer or patient records.
              </p>
            </div>
            <div className="border border-zinc-800 bg-zinc-950/70 p-5">
              <h2 className="mb-2 font-sans text-sm font-bold uppercase tracking-[0.16em] text-white">
                What the check covers
              </h2>
              <p>
                The free check reviews one public page for speed, phone
                layout, contact paths, and search basics, and emails up to three
                issues. It is not a full technical audit, a security audit, or
                legal or compliance advice.
              </p>
            </div>
            <div className="border border-zinc-800 bg-zinc-950/70 p-5">
              <h2 className="mb-2 font-sans text-sm font-bold uppercase tracking-[0.16em] text-white">
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
