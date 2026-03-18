import Layout from "@/components/Layout";
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
                <CardDescription>Enter your URL to see your Core Web Vitals score</CardDescription>
              </CardHeader>
              <CardContent>
                {!auditScore ? (
                  <form onSubmit={handleAudit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="url">Website URL</Label>
                      <div className="flex gap-2">
                        <Input 
                          id="url" 
                          placeholder="example.com" 
                          className="bg-background/50 border-primary/30 focus:border-primary h-12 font-mono"
                          value={siteUrl}
                          onChange={(e) => setSiteUrl(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full h-12 font-bold text-lg" disabled={auditLoading}>
                      {auditLoading ? (
                        <span className="flex items-center gap-2">
                          <Clock className="animate-spin h-5 w-5" /> ANALYZING...
                        </span>
                      ) : (
                        "ANALYZE NOW"
                      )}
                    </Button>
                  </form>
                ) : (
                  <div className="space-y-6 text-center animate-in zoom-in-95 duration-300">
                    <div className="flex justify-center gap-8">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-red-500 mb-1">62</div>
                        <div className="text-xs uppercase tracking-wider text-muted-foreground">Current Score</div>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-green-500 mb-1">98</div>
                        <div className="text-xs uppercase tracking-wider text-muted-foreground">Potential</div>
                      </div>
                    </div>
                    
                    <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg text-left">
                      <h4 className="font-bold text-red-400 flex items-center gap-2 mb-2">
                        <Shield className="h-4 w-4" /> Critical Issues Found
                      </h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• LCP (Largest Contentful Paint) is too slow (4.2s)</li>
                        <li>• Images are not optimized for mobile</li>
                        <li>• Unused JavaScript is blocking rendering</li>
                      </ul>
                    </div>

                    <div className="pt-2">
                      <p className="text-sm mb-4">BADGR Fix Cost: <span className="font-bold text-primary">$4,680</span> (One-time)</p>
                      <Button className="w-full h-12 bg-black border border-green-500/50 text-green-400 hover:bg-green-500/10 hover:text-green-300 font-bold tracking-widest uppercase rounded-none shadow-[0_0_20px_rgba(0,255,136,0.1)]">
                        LOCK IN 10% SAVINGS NOW
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SERVICES & PRICING SECTION */}
      <section id="pricing" className="py-24 bg-zinc-950 relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-mono font-bold mb-6">TIERED OPTIMIZATION</h2>
            <p className="text-muted-foreground text-lg">
              Transparent pricing. No hidden fees. 10% below market average.
            </p>
            
            <div className="flex items-center justify-center gap-4 mt-8">
              <span className={cn("text-sm font-bold", !isAnnual ? "text-white" : "text-muted-foreground")}>ONE-TIME</span>
              <div 
                className="w-14 h-7 bg-zinc-800 rounded-full relative cursor-pointer border border-primary/30"
                onClick={() => setIsAnnual(!isAnnual)}
              >
                <div className={cn(
                  "absolute top-1 w-5 h-5 bg-primary rounded-full transition-all duration-300",
                  isAnnual ? "left-8" : "left-1"
                )}></div>
              </div>
              <span className={cn("text-sm font-bold", isAnnual ? "text-white" : "text-muted-foreground")}>RETAINER (SAVE 20%)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tier 1 */}
            <Card className="bg-zinc-900/50 border-zinc-800 hover:border-primary/50 transition-all duration-300 group">
              <CardHeader>
                <Badge className="w-fit mb-4 bg-zinc-800 text-zinc-400 border-zinc-700">STARTER</Badge>
                <CardTitle className="text-2xl font-mono">SPEED FIX</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$1,499</span>
                  <span className="text-muted-foreground">/one-time</span>
                </div>
                <CardDescription className="mt-2">For small sites needing a quick boost.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Core Web Vitals Audit</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Image Compression</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Caching Setup</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> 7-Day Turnaround</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-zinc-700 hover:bg-zinc-800">SELECT STARTER</Button>
              </CardFooter>
            </Card>

            {/* Tier 2 - Featured */}
            <Card className="bg-zinc-900/80 border-primary shadow-[0_0_30px_rgba(0,0,255,0.15)] relative transform md:-translate-y-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 text-xs font-bold uppercase tracking-widest rounded-full">
                Most Popular
              </div>
              <CardHeader>
                <Badge className="w-fit mb-4 bg-primary/20 text-primary border-primary/50">GROWTH</Badge>
                <CardTitle className="text-2xl font-mono">FULL OPTIMIZATION</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$2,999</span>
                  <span className="text-muted-foreground">/one-time</span>
                </div>
                <CardDescription className="mt-2">Complete overhaul for maximum performance.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Everything in Starter</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Code Minification</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Database Optimization</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> CRM Setup</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Monthly Reporting</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-black border border-primary text-primary hover:bg-primary/20 hover:text-white font-bold tracking-widest uppercase rounded-none shadow-[0_0_20px_rgba(0,0,255,0.2)]">
                  SELECT GROWTH
                </Button>
              </CardFooter>
            </Card>

            {/* Tier 3 */}
            <Card className="bg-zinc-900/50 border-zinc-800 hover:border-primary/50 transition-all duration-300 group">
              <CardHeader>
                <Badge className="w-fit mb-4 bg-zinc-800 text-zinc-400 border-zinc-700">ENTERPRISE</Badge>
                <CardTitle className="text-2xl font-mono">AI SCALE</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">Custom</span>
                </div>
                <CardDescription className="mt-2">For high-traffic sites needing AI integration.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Everything in Growth</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Custom AI Chatbot</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Predictive Analytics</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Dedicated Support</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-zinc-700 hover:bg-zinc-800">CONTACT SALES</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* AI SOLUTIONS SECTION */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -inset-4 bg-primary/20 rounded-full blur-3xl"></div>
                <img 
                  src="/images/ai-dashboard-holo.png" 
                  alt="AI Dashboard Hologram" 
                  className="relative rounded-xl border border-zinc-800 shadow-2xl"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-8">
              <Badge variant="outline" className="border-primary text-primary">AI IMPLEMENTATION</Badge>
              <h2 className="text-4xl md:text-6xl font-mono font-bold leading-tight">
                STOP GUESSING. <br/>
                <span className="text-primary">START PREDICTING.</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                We don't just speed up your site. We implement AI agents that capture leads, schedule appointments, and analyze traffic patterns 24/7.
              </p>
              
              <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <BarChart3 className="text-primary" /> ROI Calculator
                </h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Monthly Leads</span>
                      <span className="font-mono font-bold text-primary">{leadCount}</span>
                    </div>
                    <Slider 
                      defaultValue={[50]} 
                      max={500} 
                      step={10} 
                      onValueChange={setLeadCount}
                      className="py-4"
                    />
                  </div>
                  <div className="pt-4 border-t border-zinc-800">
                    <div className="flex justify-between items-end">
                      <span className="text-sm text-muted-foreground">Est. Annual Revenue Increase</span>
                      <span className="text-3xl font-mono font-bold text-green-500">
                        ${calculateROI(leadCount[0])}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS SECTION */}
      <section className="py-24 bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-mono font-bold">REAL ATLANTA RESULTS</h2>
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">300% Speed Increase</h3>
                    <p className="text-muted-foreground">For a local Buckhead law firm, reducing load time from 6s to 1.2s.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">2.5x Lead Conversion</h3>
                    <p className="text-muted-foreground">Midtown dental practice saw leads double within 30 days of optimization.</p>
                  </div>
                </div>
              </div>
              <Button variant="link" className="text-primary p-0 h-auto font-bold text-lg group">
                READ CASE STUDY <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors z-10 flex items-center justify-center">
                <div className="w-20 h-20 bg-primary/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="h-8 w-8 text-white fill-white ml-1" />
                </div>
              </div>
              <img 
                src="/images/atlanta-traffic-blur.png" 
                alt="Client Testimonial Video" 
                className="w-full rounded-xl shadow-2xl border border-zinc-800"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/90"></div>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-7xl font-mono font-bold mb-8 tracking-tight">
            READY TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">SCALE?</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-12">
            Schedule your free 15-minute strategy call. No sales pressure, just technical facts.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold text-lg px-12 h-16 shadow-2xl">
              BOOK AUDIT NOW
            </Button>
            <Button variant="outline" size="lg" className="border-white/20 hover:bg-white/10 text-lg h-16 px-12">
              VIEW PRICING
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
