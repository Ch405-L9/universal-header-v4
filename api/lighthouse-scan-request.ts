import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";
import { z } from "zod";

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 3;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

const scanRequestSchema = z.object({
  practiceName: z
    .string()
    .trim()
    .min(2, "Practice name must be at least 2 characters")
    .max(100, "Practice name must be 100 characters or less")
    .regex(/^[a-zA-Z0-9\s&'.-]+$/, "Practice name contains unsupported characters"),
  contactName: z
    .string()
    .trim()
    .min(2, "Your name must be at least 2 characters")
    .max(100, "Your name must be 100 characters or less")
    .regex(/^[a-zA-Z\s'.-]+$/, "Your name contains unsupported characters"),
  email: z.string().trim().email("Email address must be valid").max(254),
  phone: z
    .string()
    .trim()
    .min(7, "Phone number must be valid")
    .max(20, "Phone number must be 20 characters or less")
    .regex(/^[0-9+().\-\s]+$/, "Phone number contains unsupported characters"),
  practiceType: z.enum([
    "Med-Spa / Aesthetics",
    "Cosmetic Dental",
    "General Dental",
    "Chiropractic / PT",
    "Other",
  ]),
  businessType: z
    .string()
    .trim()
    .min(2, "Business type must be at least 2 characters")
    .max(80, "Business type must be 80 characters or less")
    .regex(/^[a-zA-Z0-9\s,&'./-]+$/, "Business type contains unsupported characters")
    .optional(),
  websiteUrl: z
    .string()
    .trim()
    .url("Website URL must be valid")
    .refine((value) => value.startsWith("https://"), {
      message: "Website URL must start with https://",
    }),
  consent: z.boolean().refine((value) => value === true, {
    message: "You must confirm the audit request terms before submitting.",
  }),
  website: z.string().optional(),
});

type ScanRequest = {
  practiceName: string;
  contactName: string;
  email: string;
  phone: string;
  practiceType: string;
  businessType?: string;
  websiteUrl: string;
  consent: boolean;
  submittedAt: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getEnv(name: string) {
  const value = process.env[name]?.trim();
  return value || undefined;
}

function getEmailTo() {
  return (
    getEnv("SCAN_REQUEST_TO") ??
    getEnv("RESEND_TO") ??
    getEnv("EMAIL_TO") ??
    getEnv("OWNER_EMAIL") ??
    "antgrant4781@proton.me"
  );
}

function getResendFrom() {
  return (
    getEnv("RESEND_FROM") ??
    getEnv("FROM") ??
    getEnv("SCAN_REQUEST_FROM") ??
    getEnv("EMAIL_FROM") ??
    "BADGRTechnologies <onboarding@resend.dev>"
  );
}

function getResendApiKey() {
  return getEnv("RESEND_API_KEY") ?? getEnv("RESEND_KEY") ?? getEnv("RESEND_API");
}

function getSmtpConfig() {
  const host = getEnv("SMTP_HOST");
  const port = Number(getEnv("SMTP_PORT") ?? 587);
  const user = getEnv("SMTP_USER");
  const pass = getEnv("SMTP_PASS");

  if (!host) return null;

  return {
    host,
    port,
    user,
    pass,
    secure: process.env.SMTP_SECURE === "true",
    requireTLS: process.env.SMTP_REQUIRE_TLS !== "false",
    rejectUnauthorized: process.env.SMTP_REJECT_UNAUTHORIZED === "true",
  };
}

async function sendScanRequestEmail(request: ScanRequest, ip: string) {
  if (getResendApiKey()) {
    return sendWithResend(request, ip);
  }

  const smtp = getSmtpConfig();
  const to = getEmailTo();
  const from = getEnv("SCAN_REQUEST_FROM") ?? getEnv("SMTP_FROM") ?? getEnv("FROM") ?? to;

  if (!smtp) {
    console.warn("[lighthouse-scan] email delivery is not configured", {
      hasResendApiKey: Boolean(getResendApiKey()),
      hasResendFrom: Boolean(getResendFrom()),
      hasSmtpHost: Boolean(getEnv("SMTP_HOST")),
      acceptedApiKeyNames: ["RESEND_API_KEY", "RESEND_KEY", "RESEND_API"],
      acceptedFromNames: ["RESEND_FROM", "FROM", "SCAN_REQUEST_FROM", "EMAIL_FROM"],
    });
    return { sent: false, reason: "smtp_not_configured" };
  }

  if ((smtp.user && !smtp.pass) || (!smtp.user && smtp.pass)) {
    throw new Error("SMTP_USER and SMTP_PASS must both be set when SMTP auth is used.");
  }

  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    requireTLS: smtp.requireTLS,
    auth: smtp.user && smtp.pass ? { user: smtp.user, pass: smtp.pass } : undefined,
    tls: {
      rejectUnauthorized: smtp.rejectUnauthorized,
    },
  });

  const subject = `New lead leak audit request: ${request.practiceName}`;
  const text = [
    "New Lead Leak Audit Request",
    "",
    `Practice Name: ${request.practiceName}`,
    `Contact Name: ${request.contactName}`,
    `Email Address: ${request.email}`,
    `Phone Number: ${request.phone}`,
    `Practice Type: ${request.practiceType}`,
    request.businessType ? `Business Type: ${request.businessType}` : null,
    `Website URL: ${request.websiteUrl}`,
    `Consent Confirmed: ${request.consent ? "Yes" : "No"}`,
    `Submitted: ${request.submittedAt}`,
    `IP Address: ${ip}`,
    "",
    "Visitor notice shown: Business information only. Do not submit PHI, patient records, passwords, or confidential medical details.",
  ].filter(Boolean).join("\n");

  const html = `
    <h2>New Lead Leak Audit Request</h2>
    <p><strong>Practice Name:</strong> ${escapeHtml(request.practiceName)}</p>
    <p><strong>Contact Name:</strong> ${escapeHtml(request.contactName)}</p>
    <p><strong>Email Address:</strong> ${escapeHtml(request.email)}</p>
    <p><strong>Phone Number:</strong> ${escapeHtml(request.phone)}</p>
    <p><strong>Practice Type:</strong> ${escapeHtml(request.practiceType)}</p>
    ${request.businessType ? `<p><strong>Business Type:</strong> ${escapeHtml(request.businessType)}</p>` : ""}
    <p><strong>Website URL:</strong> <a href="${escapeHtml(request.websiteUrl)}">${escapeHtml(request.websiteUrl)}</a></p>
    <p><strong>Consent Confirmed:</strong> ${request.consent ? "Yes" : "No"}</p>
    <p><strong>Submitted:</strong> ${escapeHtml(request.submittedAt)}</p>
    <p><strong>IP Address:</strong> ${escapeHtml(ip)}</p>
    <hr />
    <p><strong>Visitor notice shown:</strong> Business information only. Do not submit PHI, patient records, passwords, or confidential medical details.</p>
  `;

  await transporter.sendMail({
    from,
    to,
    replyTo: request.email,
    subject,
    text,
    html,
  });

  return { sent: true };
}

async function sendWithResend(request: ScanRequest, ip: string) {
  const apiKey = getResendApiKey();
  const to = getEmailTo();
  const from = getResendFrom();
  const subject = `New lead leak audit request: ${request.practiceName}`;
  const text = [
    "New Lead Leak Audit Request",
    "",
    `Practice Name: ${request.practiceName}`,
    `Contact Name: ${request.contactName}`,
    `Email Address: ${request.email}`,
    `Phone Number: ${request.phone}`,
    `Practice Type: ${request.practiceType}`,
    request.businessType ? `Business Type: ${request.businessType}` : null,
    `Website URL: ${request.websiteUrl}`,
    `Consent Confirmed: ${request.consent ? "Yes" : "No"}`,
    `Submitted: ${request.submittedAt}`,
    `IP Address: ${ip}`,
    "",
    "Visitor notice shown: Business information only. Do not submit PHI, patient records, passwords, or confidential medical details.",
  ].filter(Boolean).join("\n");
  const html = `
    <h2>New Lead Leak Audit Request</h2>
    <p><strong>Practice Name:</strong> ${escapeHtml(request.practiceName)}</p>
    <p><strong>Contact Name:</strong> ${escapeHtml(request.contactName)}</p>
    <p><strong>Email Address:</strong> ${escapeHtml(request.email)}</p>
    <p><strong>Phone Number:</strong> ${escapeHtml(request.phone)}</p>
    <p><strong>Practice Type:</strong> ${escapeHtml(request.practiceType)}</p>
    ${request.businessType ? `<p><strong>Business Type:</strong> ${escapeHtml(request.businessType)}</p>` : ""}
    <p><strong>Website URL:</strong> <a href="${escapeHtml(request.websiteUrl)}">${escapeHtml(request.websiteUrl)}</a></p>
    <p><strong>Consent Confirmed:</strong> ${request.consent ? "Yes" : "No"}</p>
    <p><strong>Submitted:</strong> ${escapeHtml(request.submittedAt)}</p>
    <p><strong>IP Address:</strong> ${escapeHtml(ip)}</p>
    <hr />
    <p><strong>Visitor notice shown:</strong> Business information only. Do not submit PHI, patient records, passwords, or confidential medical details.</p>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "User-Agent": "BADGRTechnologies website form",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: request.email,
      subject,
      text,
      html,
    }),
  });

  const responseBody = (await response.json().catch(() => null)) as unknown;

  if (!response.ok) {
    console.error("[lighthouse-scan] Resend error", response.status, responseBody);
    throw new Error("Resend email delivery failed.");
  }

  return { sent: true, provider: "resend" };
}

function getClientIp(req: VercelRequest) {
  const forwardedFor = req.headers["x-forwarded-for"];
  if (typeof forwardedFor === "string" && forwardedFor.length > 0) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }
  return req.socket.remoteAddress || "unknown";
}

function isWithinRateLimit(ip: string) {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count += 1;
  return true;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed" });
  }

  const ip = getClientIp(req);

  if (!isWithinRateLimit(ip)) {
    return res.status(429).json({
      message: "Too many audit requests. Please try again later.",
    });
  }

  const parsed = scanRequestSchema.safeParse(req.body ?? {});

  if (!parsed.success) {
    return res.status(400).json({
      message: parsed.error.issues[0]?.message ?? "Please check the form and try again.",
    });
  }

  if (parsed.data.website) {
    console.warn("[lighthouse-scan] honeypot submission blocked", { ip });
    return res.status(200).json({ message: "Request received." });
  }

  const request: ScanRequest = {
    practiceName: parsed.data.practiceName,
    contactName: parsed.data.contactName,
    email: parsed.data.email.toLowerCase(),
    phone: parsed.data.phone,
    practiceType: parsed.data.practiceType,
    businessType: parsed.data.businessType,
    websiteUrl: parsed.data.websiteUrl,
    consent: parsed.data.consent,
    submittedAt: new Date().toISOString(),
  };

  console.info("[lighthouse-scan] new request", {
    websiteHost: new URL(request.websiteUrl).host,
    emailDomain: request.email.split("@")[1] ?? "unknown",
    practiceType: request.practiceType,
    consent: request.consent,
    ip,
  });

  try {
    const emailResult = await sendScanRequestEmail(request, ip);
    console.info("[lighthouse-scan] email result", emailResult);
    if (!emailResult.sent) {
      return res.status(503).json({
        message: "Email delivery is not configured yet. Please email hello@badgrtech.com or call (470) 223-6127.",
      });
    }
  } catch (error) {
    console.error("[lighthouse-scan] email send failed:", error);
    return res.status(500).json({
      message: "Request received, but email delivery failed. Please try again or email hello@badgrtech.com.",
    });
  }

  return res.status(200).json({
    message: `Thank you. We'll send your lead leak audit to ${request.email} within 48 hours.`,
  });
}
