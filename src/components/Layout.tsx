import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  Twitter,
  X as XClose,
  Youtube,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.77a4.85 4.85 0 0 1-1.01-.08z" />
    </svg>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Services", href: "#services" },
    { name: "Pricing", href: "#pricing" },
    { name: "Sample Report", href: "#proof" },
    { name: "FAQ", href: "#faq" },
  ];

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary selection:text-primary-foreground">
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 border-b border-transparent transition-all duration-300",
          scrolled
            ? "border-b border-primary/30 bg-background/95 py-1 backdrop-blur-md"
            : "bg-transparent py-2"
        )}
      >
        <div className="container mx-auto flex h-10 items-center justify-between px-4">
          <Link href="/" className="group flex min-w-0 items-center gap-2">
            <div className="relative h-6 w-6 shrink-0 overflow-hidden border border-primary/50 transition-colors group-hover:border-primary">
              <img
                src="https://res.cloudinary.com/dsxpcwjwb/image/upload/w_200,f_auto,q_80/v1776452124/official_badgr-logo_mfsyri.png"
                alt="BADGRTechnologies LLC logo"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="min-w-0 leading-none">
              <span className="block truncate font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-white">
                BADGR<span className="text-primary">TECH</span>
              </span>
              <span className="hidden truncate text-[9px] uppercase tracking-[0.18em] text-zinc-500 lg:block">
                BADGRTechnologies LLC
              </span>
            </div>
          </Link>
          <div className="hidden items-center gap-6 md:flex">
            {navItems.map(item => (
              <button
                key={item.name}
                type="button"
                onClick={() => scrollToSection(item.href)}
                className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/80 transition-colors hover:text-primary"
              >
                {item.name}
              </button>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="h-6 rounded-none border-primary/50 px-3 font-mono text-[10px] uppercase tracking-wider text-primary hover:bg-primary/10 hover:text-primary"
              onClick={() => scrollToSection("#audit")}
            >
              Book Triage
            </Button>
          </div>
          <button
            className="p-2 text-foreground md:hidden"
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <XClose /> : <Menu />}
          </button>
        </div>

        {isMenuOpen && (
          <div
            id="mobile-nav"
            className="animate-in slide-in-from-top-5 absolute top-full left-0 right-0 flex flex-col gap-4 border-b border-primary bg-background p-4 md:hidden"
          >
            {navItems.map(item => (
              <button
                key={item.name}
                type="button"
                onClick={() => scrollToSection(item.href)}
                className="border-l-2 border-transparent py-2 pl-4 text-left text-lg font-medium transition-all hover:border-primary hover:text-primary"
              >
                {item.name}
              </button>
            ))}
            <Button
              className="mt-4 w-full bg-primary font-mono uppercase text-primary-foreground"
              onClick={() => scrollToSection("#audit")}
            >
              Book Triage
            </Button>
          </div>
        )}
      </nav>

      <main className="pt-20">{children}</main>

      <footer className="mt-20 border-t border-primary/30 bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 border border-primary/50 p-1">
                  <img
                    src="https://res.cloudinary.com/dsxpcwjwb/image/upload/w_200,f_auto,q_80/v1776452124/official_badgr-logo_mfsyri.png"
                    alt="BADGRTechnologies LLC logo"
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="leading-none">
                  <span className="block font-mono text-lg font-bold">
                    BADGR<span className="text-primary">TECH</span>
                  </span>
                  <span className="block text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                    BADGRTechnologies LLC
                  </span>
                </div>
              </div>
              <p className="max-w-xs text-sm text-muted-foreground">
                Atlanta-based web optimization for small businesses that need a
                clearer, faster, more trustworthy path from website visit to
                booked conversation.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="https://www.instagram.com/badgrtech/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                  aria-label="BADGRTechnologies on Instagram"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/company/109228065/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                  aria-label="BADGRTechnologies on LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="https://www.youtube.com/channel/UCAbCRiyUh3JTUIrj8l9ADow"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                  aria-label="BADGRTechnologies on YouTube"
                >
                  <Youtube size={20} />
                </a>
                <a
                  href="https://www.tiktok.com/@badgrtech2.5"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                  aria-label="BADGRTechnologies on TikTok"
                >
                  <TikTokIcon size={20} />
                </a>
                <a
                  href="https://x.com/40n33Ba6R"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                  aria-label="BADGRTechnologies on X"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61581099610296"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                  aria-label="BADGRTechnologies on Facebook"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="https://github.com/Ch405-L9"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                  aria-label="BADGRTechnologies on GitHub"
                >
                  <Github size={20} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="mb-4 font-mono text-lg font-bold text-primary">
                Focus
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#services"
                    className="transition-colors hover:text-foreground"
                  >
                    Website Optimization
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="transition-colors hover:text-foreground"
                  >
                    One-Time Packages
                  </a>
                </li>
                <li>
                  <a
                    href="#proof"
                    className="transition-colors hover:text-foreground"
                  >
                    Sample Report
                  </a>
                </li>
                <li>
                  <a
                    href="/additional-services"
                    className="transition-colors hover:text-foreground"
                  >
                    Follow-On Services
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-mono text-lg font-bold text-primary">
                Navigation
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#audit"
                    className="transition-colors hover:text-foreground"
                  >
                    Free Lead Leak Preview
                  </a>
                </li>
                <li>
                  <a
                    href="#results"
                    className="transition-colors hover:text-foreground"
                  >
                    What We Fix
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="transition-colors hover:text-foreground"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <Link
                    href="/sample-report"
                    className="transition-colors hover:text-foreground"
                  >
                    Open Sample Report
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-mono text-lg font-bold text-primary">
                More
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="/privacy"
                    className="transition-colors hover:text-foreground"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    className="transition-colors hover:text-foreground"
                  >
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-3 border-t border-primary/10 pt-8 text-sm text-muted-foreground md:grid-cols-3">
            <div className="flex items-start gap-3">
              <MapPin size={16} className="mt-1 text-primary" />
              <span>
                8735 Dunwoody Place, Suite N
                <br />
                Atlanta, GA 30350
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-primary" />
              <a href="tel:+14702236127" className="hover:text-foreground">
                (470) 223-6127
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-primary" />
              <a href="mailto:hello@badgrtech.com" className="hover:text-foreground">
                hello@badgrtech.com
              </a>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-primary/10 pt-8 text-xs text-muted-foreground md:flex-row">
            <p>
              &copy; {new Date().getFullYear()} BADGR Technologies LLC. All
              rights reserved.
            </p>
            <div className="flex gap-6">
              <span>Transparent Scopes</span>
              <span>Trust-First Messaging</span>
              <span>Web Performance Focused</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
