import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight, Zap, Shield, BarChart3, Cpu, Users, Clock, ChevronRight, Play } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Home() {
  const [siteUrl, setSiteUrl] = useState("");
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditScore, setAuditScore] = useState<number | null>(null);
  const [leadCount, setLeadCount] = useState([50]);
  const [isAnnual, setIsAnnual] = useState(false);

  const handleAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!siteUrl) return;
    setAuditLoading(true);
    // Simulate audit
    setTimeout(() => {
      setAuditLoading(false);
      setAuditScore(62);
    }, 2000);
  };

  const calculateROI = (leads: number) => {
    return (leads * 0.68 * 500).toLocaleString(); // Simplified ROI calc
  };

  return (
    <Layout>
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-10">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero-atlanta-cyber.png" 
            alt="Atlanta Skyline Cyberpunk" 
            className="w-full h-full object-cover opacity-60" 
          />
          {/* Reduced overlay opacity to let BG shine */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent"></div>
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
          
          {/* Sun Animation */}
          <div className="absolute top-1/3 left-1/2 w-32 h-32 bg-yellow-100/20 rounded-full blur-[80px] animate-pulse duration-[4000ms]"></div>
        </div>

        <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Offset text to the left (col-span-7) */}
          <div className="lg:col-span-7 space-y-10 animate-in slide-in-from-left-10 duration-700 pl-4 md:pl-12">
            <Badge variant="outline" className="border-primary/50 text-primary px-4 py-1 text-xs uppercase tracking-[0.2em] bg-black/40 backdrop-blur-sm rounded-none">
              Atlanta Site Speed Fix
            </Badge>
            
            {/* Typo-Complex Style */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-mono font-bold leading-[0.9] tracking-tight uppercase text-white drop-shadow-2xl">
              From I-85<br/>
              Traffic To<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-primary animate-gradient-x">Lightning Speed</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-zinc-300 max-w-xl font-sans font-light leading-relaxed">
              BADGR fixes Atlanta SMB sites in 7 days. <span className="text-white font-medium">10% below market rates.</span> Guaranteed performance lift or your money back.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              {/* Refined Button: Dark with Blue Glow, no solid block */}
              <Button size="lg" className="bg-black/80 hover:bg-primary/20 text-white font-bold text-lg px-10 h-16 border border-primary shadow-[0_0_30px_rgba(0,0,255,0.2)] hover:shadow-[0_0_50px_rgba(0,0,255,0.4)] transition-all rounded-none tracking-widest uppercase group">
                Score My Site Free
                <Zap className="ml-3 h-5 w-5 text-primary group-hover:text-white transition-colors" />
              </Button>
              <Button variant="outline" size="lg" className="border-white/10 hover:border-white/30 hover:bg-white/5 text-lg h-16 px-8 rounded-none tracking-widest uppercase text-zinc-400 hover:text-white transition-all">
                View Demo
              </Button>
            </div>

            <div className="flex items-center gap-6 text-sm text-zinc-400 pt-4 border-t border-white/5 w-fit pr-12">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-500">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <p className="font-mono text-xs tracking-wider uppercase">Trusted by many Atlanta SMB and SBA</p>
            </div>
          </div>

          {/* Interactive Audit Card - Pushed to right */}
          <div className="lg:col-span-5 relative animate-in slide-in-from-right-10 duration-700 delay-200">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-cyan-500 rounded-xl blur opacity-30"></div>
            <Card className="relative bg-card/80 backdrop-blur-xl border-primary/50 shadow-2xl">
              <CardHeader>
                <CardTitle className="font-mono text-2xl">INSTANT SITE AUDIT</CardTitle>
