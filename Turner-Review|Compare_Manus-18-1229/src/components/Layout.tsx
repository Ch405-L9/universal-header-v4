import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, MapPin, Phone, Mail, Twitter, Linkedin, Github } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Services", href: "#services" },
    { name: "Pricing", href: "#pricing" },
    { name: "AI Solutions", href: "#ai-solutions" },
    { name: "Results", href: "#results" },
  ];

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      {/* Sticky Navigation */}
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
          scrolled ? "bg-background/95 backdrop-blur-md border-b border-primary/30 py-1" : "bg-transparent py-2"
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between h-8"> {/* Constrained height */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-6 h-6 overflow-hidden border border-primary/50 group-hover:border-primary transition-colors">
              <img src="/images/logo.png" alt="BADGR Logo" className="object-contain w-full h-full" />
            </div>
            <span className="font-mono font-bold text-sm tracking-widest">BADGR<span className="text-primary">TECH</span></span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-[10px] font-bold hover:text-primary transition-colors uppercase tracking-[0.15em] text-muted-foreground/80"
              >
                {item.name}
              </button>
            ))}
            <Button 
              variant="outline" 
              size="sm"
              className="h-6 text-[10px] px-3 border-primary/50 text-primary hover:bg-primary/10 hover:text-primary font-mono uppercase tracking-wider rounded-none"
              onClick={() => scrollToSection("#audit")}
            >
              Free Audit
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-primary p-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-left text-lg font-medium hover:text-primary py-2 border-l-2 border-transparent hover:border-primary pl-4 transition-all"
              >
                {item.name}
              </button>
            ))}
            <Button 
              className="w-full mt-4 bg-primary text-primary-foreground font-mono uppercase"
              onClick={() => scrollToSection("#audit")}
            >
              Get Free Audit
            </Button>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-primary/30 mt-20 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 border border-primary/50 p-1">
                  <img src="/images/logo.png" alt="BADGR Logo" className="w-full h-full object-contain" />
                </div>
                <span className="font-mono font-bold text-lg">BADGR<span className="text-primary">TECH</span></span>
              </div>
              <p className="text-muted-foreground text-sm max-w-xs">
                Optimizing Atlanta's digital infrastructure with AI-driven solutions and high-performance web engineering.
              </p>
              <div className="flex gap-4 pt-2">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter size={20} /></a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin size={20} /></a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Github size={20} /></a>
              </div>
            </div>

            <div>
              <h3 className="font-mono font-bold text-lg mb-4 text-primary">Services</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Web Optimization</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">AI Implementation</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Lead Generation</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Custom CRM</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-mono font-bold text-lg mb-4 text-primary">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Case Studies</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-mono font-bold text-lg mb-4 text-primary">Contact</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="text-primary mt-1" />
                  <span>Atlanta, GA<br/>Serving Metro Area</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-primary" />
                  <a href="tel:4045552234" className="hover:text-foreground">(404) 555-BADGR</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={16} className="text-primary" />
                  <a href="mailto:hello@badgrtech.com" className="hover:text-foreground">hello@badgrtech.com</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-primary/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} BADGR Technologies LLC. All rights reserved.</p>
            <div className="flex gap-6">
              <span>GA/ADA Compliant</span>
              <span>Core Web Vitals Optimized</span>
              <span>100% Secure</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

