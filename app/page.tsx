"use client";

import React, { useState, MouseEvent, useEffect } from "react";
import { 
  motion, useMotionTemplate, useMotionValue, AnimatePresence, 
  useScroll, useSpring 
} from "framer-motion";
import { 
  Plane, CreditCard, Globe, Shield, Sparkles, ChevronRight, 
  Smartphone, Download, Apple, X, CheckCircle2, Lock,
  ChevronDown, Quote, Star, Zap, Crown, ArrowRight, TrendingUp, Activity
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- UTILITIES ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- ACETERNITY-INSPIRED UI COMPONENTS ---

const MovingBorderButton = ({ children, onClick, className, type = "button" }: { children: React.ReactNode; onClick?: () => void, className?: string, type?: "button" | "submit" | "reset" }) => (
  <button 
    type={type}
    onClick={onClick}
    className={cn("relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black", className)}
  >
    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#eab308_50%,#E2CBFF_100%)]" />
    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-black px-8 py-1 text-sm font-medium text-yellow-500 backdrop-blur-3xl transition-colors hover:bg-zinc-900 hover:text-yellow-400">
      {children}
    </span>
  </button>
);

const SpotlightCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn(
        "group relative flex flex-col items-start justify-start overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 px-8 py-10 shadow-2xl transition-colors hover:border-yellow-500/30",
        className
      )}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(234, 179, 8, 0.12),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};

// --- PAGE SECTIONS ---

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-[400px] z-[100] p-6 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2 text-white font-medium">
              <Shield className="w-4 h-4 text-yellow-500" />
              <span>Your Privacy Matters</span>
            </div>
            <button onClick={() => setIsVisible(false)} className="text-zinc-500 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
            We use necessary cookies to ensure Vault Security and performance cookies to optimize your experience.
          </p>
          <div className="flex gap-3">
            <button onClick={() => setIsVisible(false)} className="flex-1 py-2 text-sm font-semibold text-black bg-white rounded-lg hover:bg-zinc-200 transition-colors">
              Accept All
            </button>
            <button onClick={() => setIsVisible(false)} className="flex-1 py-2 text-sm font-semibold text-white bg-zinc-900 border border-white/10 rounded-lg hover:bg-zinc-800 transition-colors">
              Manage
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const LiveFXTicker = () => {
  const rates = [
    "USD/NGN 1,580.50", "EUR/NGN 1,720.10", "GBP/NGN 2,010.80", 
    "USD/KES 131.50", "USD/ZAR 18.90", "BTC/USD 64,200.00",
    "USD/NGN 1,580.50", "EUR/NGN 1,720.10", "GBP/NGN 2,010.80",
  ];

  return (
    <div className="w-full bg-yellow-500 text-black py-1.5 overflow-hidden border-b border-yellow-600/50 relative z-40 mt-[73px]">
      <motion.div 
        className="flex gap-8 whitespace-nowrap text-xs font-mono font-bold tracking-wider uppercase"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 25, repeat: Infinity }}
      >
        {rates.map((rate, i) => (
          <span key={i} className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
            {rate}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black/60 backdrop-blur-2xl border-b border-white/5 h-[73px]">
    <div className="flex items-center gap-3">
      <div className="relative flex items-center gap-2 cursor-pointer">
        <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-zinc-900 border border-white/10">
          <img src="/logo.png" alt="Vodium Logo" className="w-full h-full object-cover" 
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.innerHTML = '<span class="text-yellow-500 font-bold">V</span>';
            }} 
          />
        </div>
        <span className="text-xl font-bold tracking-tight text-white hidden sm:block">Vodium</span>
      </div>
    </div>
    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
      <a href="#features" className="hover:text-yellow-500 transition-colors">Perks</a>
      <a href="#tiers" className="hover:text-yellow-500 transition-colors">Tiers</a>
      <a href="#app" className="hover:text-yellow-500 transition-colors">The App</a>
      <a href="#faq" className="hover:text-yellow-500 transition-colors">FAQ</a>
    </div>
    <div className="hidden md:block">
      <button className="px-6 py-2 text-sm font-semibold text-black bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full hover:shadow-[0_0_20px_rgba(234,179,8,0.4)] transition-all">
        Request Invite
      </button>
    </div>
  </nav>
);

const Hero = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(email) setSubmitted(true);
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-6 pt-20 overflow-hidden text-center bg-black">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-yellow-500/10 rounded-[100%] blur-[120px] -z-10 pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl space-y-8 z-10 flex flex-col items-center mt-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-wide text-yellow-500 uppercase border rounded-full border-yellow-500/30 bg-yellow-500/10 backdrop-blur-sm">
          <Sparkles className="w-3 h-3" />
          <span>Vodium Beta is Live</span>
        </div>
        
        <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight text-white leading-[1.05]">
          The Standard for <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600">
            Global Wealth.
          </span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-400">
          Zero FX fees. Infinite limits. Unlimited access to the world&apos;s most exclusive airport lounges directly from your smartphone.
        </p>
        
        <div className="pt-4 w-full max-w-md mx-auto">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onSubmit={handleSubmit}
                className="flex items-center w-full bg-zinc-900/50 border border-white/10 rounded-full p-1.5 backdrop-blur-md focus-within:border-yellow-500/50 focus-within:bg-zinc-900 transition-all shadow-xl"
              >
                <input 
                  type="email" 
                  required
                  placeholder="Enter your email address..." 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent border-none text-white text-sm px-4 focus:outline-none focus:ring-0 placeholder:text-zinc-500"
                />
                <MovingBorderButton type="submit" className="h-10 px-6 sm:px-8">
                  <span className="hidden sm:inline">Join Waitlist</span>
                  <ArrowRight className="w-4 h-4 sm:hidden" />
                </MovingBorderButton>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-2 w-full bg-yellow-500/10 border border-yellow-500/30 rounded-full py-3 px-6 text-yellow-500 font-medium text-sm"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>You&apos;re on the list. Keep an eye on your inbox.</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50, rotateX: 30, rotateY: -10 }}
        animate={{ opacity: 1, y: 0, rotateX: 15, rotateY: 5 }}
        transition={{ duration: 1, delay: 0.3, type: "spring", bounce: 0.4 }}
        whileHover={{ rotateX: 0, rotateY: 0, scale: 1.05 }}
        className="relative w-full max-w-md h-72 mt-20 rounded-2xl bg-gradient-to-br from-yellow-900 via-yellow-600 to-yellow-300 p-[1px] shadow-[0_20px_50px_rgba(234,179,8,0.3)] cursor-pointer"
      >
        <div className="w-full h-full bg-gradient-to-br from-zinc-900 to-black rounded-2xl flex flex-col justify-between p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
          <div className="flex justify-between items-start text-yellow-500 z-10">
            <Sparkles className="w-8 h-8" />
            <CreditCard className="w-8 h-8" />
          </div>
          <div className="space-y-2 z-10 text-left">
            <p className="text-sm font-medium text-yellow-500/80 uppercase tracking-widest">Vodium Gold</p>
            <p className="text-2xl font-mono text-white tracking-widest drop-shadow-md">**** **** **** 8892</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const BackedBy = () => (
  <section className="py-12 border-y border-white/5 bg-zinc-950/50 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <p className="text-center text-sm font-semibold text-zinc-500 uppercase tracking-widest mb-8">
        Backed by top-tier global accelerators & funds
      </p>
      <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
        <div className="flex items-center gap-2 font-bold text-xl text-white">
          <div className="w-8 h-8 bg-[#ff6600] text-white flex items-center justify-center rounded-sm">Y</div>
          Combinator
        </div>
        <div className="flex items-center gap-2 font-bold text-xl text-white">
          <span className="text-green-500">▲</span> Techstars
        </div>
        <div className="flex items-center gap-2 font-bold text-xl text-white tracking-tighter">
          500 <span className="font-light">GLOBAL</span>
        </div>
        <div className="hidden md:flex items-center gap-2 font-bold text-xl text-white">
          <span className="text-blue-500">a16z</span> crypto
        </div>
      </div>
    </div>
  </section>
);

const MetricsSection = () => (
  <section className="py-16 bg-black border-b border-white/5">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5">
        <div className="text-center px-4">
          <div className="flex justify-center mb-3"><TrendingUp className="w-6 h-6 text-yellow-500" /></div>
          <h4 className="text-4xl font-bold text-white mb-1">$0</h4>
          <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">FX Markup Fees</p>
        </div>
        <div className="text-center px-4">
          <div className="flex justify-center mb-3"><Globe className="w-6 h-6 text-yellow-500" /></div>
          <h4 className="text-4xl font-bold text-white mb-1">150+</h4>
          <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Currencies Supported</p>
        </div>
        <div className="text-center px-4">
          <div className="flex justify-center mb-3"><Plane className="w-6 h-6 text-yellow-500" /></div>
          <h4 className="text-4xl font-bold text-white mb-1">1,300+</h4>
          <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Global Lounges</p>
        </div>
        <div className="text-center px-4">
          <div className="flex justify-center mb-3"><Activity className="w-6 h-6 text-yellow-500" /></div>
          <h4 className="text-4xl font-bold text-white mb-1">99.99%</h4>
          <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Uptime Reliability</p>
        </div>
      </div>
    </div>
  </section>
);

const TiersSection = () => {
  const [activeTier, setActiveTier] = useState(2); 

  const tiers = [
    {
      id: "standard",
      name: "Standard",
      price: "Free",
      tagline: "Essential global spending.",
      cardColors: "from-zinc-400 to-zinc-600",
      accent: "text-zinc-400",
      shadow: "shadow-[0_20px_50px_rgba(161,161,170,0.15)]",
      perks: [
        { icon: <Globe className="w-4 h-4" />, text: "Mid-market FX rates (0.5% markup)" },
        { icon: <CreditCard className="w-4 h-4" />, text: "1 Physical + 1 Virtual Card" },
        { icon: <Shield className="w-4 h-4" />, text: "Basic Vault Security" },
      ]
    },
    {
      id: "plus",
      name: "Plus",
      price: "$15/mo",
      tagline: "For the frequent traveler.",
      cardColors: "from-blue-600 to-purple-900",
      accent: "text-purple-400",
      shadow: "shadow-[0_20px_50px_rgba(147,51,234,0.2)]",
      perks: [
        { icon: <Globe className="w-4 h-4" />, text: "Zero FX markup on all spend" },
        { icon: <Plane className="w-4 h-4" />, text: "4 Free Lounge passes annually" },
        { icon: <CreditCard className="w-4 h-4" />, text: "Up to 5 Virtual Cards" },
        { icon: <Zap className="w-4 h-4" />, text: "Priority 24/7 Support" },
      ]
    },
    {
      id: "gold",
      name: "Gold",
      price: "Invite Only",
      tagline: "Infinite global wealth.",
      cardColors: "from-yellow-900 via-yellow-600 to-yellow-300",
      accent: "text-yellow-500",
      shadow: "shadow-[0_20px_50px_rgba(234,179,8,0.3)]",
      perks: [
        { icon: <Globe className="w-4 h-4" />, text: "True Zero FX with highest limits" },
        { icon: <Crown className="w-4 h-4" />, text: "Unlimited Global Lounge Access" },
        { icon: <Shield className="w-4 h-4" />, text: "Heavy Solid Metal Card" },
        { icon: <Star className="w-4 h-4" />, text: "Dedicated Lifestyle Concierge" },
      ]
    }
  ];

  const active = tiers[activeTier];

  return (
    <section id="tiers" className="py-32 px-6 bg-black border-t border-white/5 relative overflow-hidden">
      <div className={cn("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] -z-10 transition-colors duration-700 opacity-20", 
        activeTier === 0 ? "bg-zinc-500" : activeTier === 1 ? "bg-purple-600" : "bg-yellow-500"
      )} />

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Choose your tier</h2>
          <p className="text-zinc-400 text-lg">From essential spending to unlimited access.</p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-2 p-1.5 bg-zinc-900/80 backdrop-blur-md rounded-full border border-white/10">
            {tiers.map((tier, idx) => (
              <button
                key={tier.id}
                onClick={() => setActiveTier(idx)}
                className={cn(
                  "relative px-6 py-2.5 text-sm font-semibold rounded-full transition-all duration-300",
                  activeTier === idx ? "text-black" : "text-zinc-400 hover:text-white"
                )}
              >
                {activeTier === idx && (
                  <motion.div
                    layoutId="active-tier"
                    className={cn("absolute inset-0 rounded-full", tier.id === 'gold' ? 'bg-yellow-500' : 'bg-white')}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {tier.name === 'Gold' && <Sparkles className={cn("w-3 h-3", activeTier === idx ? "text-black" : "text-yellow-500")} />}
                  {tier.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center bg-zinc-950/50 border border-white/5 p-8 md:p-12 rounded-[2.5rem]">
          <div className="flex justify-center perspective-[1000px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, rotateY: 90, scale: 0.9 }}
                animate={{ opacity: 1, rotateY: 15, rotateX: 5, scale: 1 }}
                exit={{ opacity: 0, rotateY: -90, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className={cn(
                  "relative w-full max-w-sm h-64 rounded-2xl p-[1px] cursor-pointer",
                  active.cardColors, active.shadow
                )}
                style={{ background: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}
              >
                <div className="w-full h-full bg-gradient-to-br from-zinc-900 to-black rounded-2xl flex flex-col justify-between p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
                  <div className={cn("flex justify-between items-start z-10", active.accent)}>
                    {active.name === 'Gold' ? <Sparkles className="w-8 h-8" /> : <Zap className="w-8 h-8" />}
                    <CreditCard className="w-8 h-8" />
                  </div>
                  <div className="space-y-1 z-10 text-left">
                    <p className={cn("text-xs font-bold uppercase tracking-widest", active.accent)}>Vodium {active.name}</p>
                    <p className="text-xl font-mono text-white tracking-widest drop-shadow-md">**** **** **** {activeTier === 0 ? '1124' : activeTier === 1 ? '5092' : '8892'}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id + "-content"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-4xl font-bold text-white mb-2">{active.price}</h3>
                  <p className="text-zinc-400">{active.tagline}</p>
                </div>
                
                <ul className="space-y-4">
                  {active.perks.map((perk, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-zinc-300">
                      <div className={cn("w-6 h-6 rounded-full flex items-center justify-center bg-zinc-900 border border-white/5", active.accent)}>
                        {perk.icon}
                      </div>
                      <span className="text-sm font-medium">{perk.text}</span>
                    </li>
                  ))}
                </ul>

                <button className={cn(
                  "w-full py-4 rounded-xl font-bold text-sm transition-all",
                  active.id === 'gold' 
                    ? "bg-yellow-500 text-black hover:bg-yellow-400 shadow-[0_0_20px_rgba(234,179,8,0.3)]" 
                    : "bg-white text-black hover:bg-zinc-200"
                )}>
                  {active.id === 'gold' ? 'Request Invite' : `Get Vodium ${active.name}`}
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

const BetaAppSection = () => (
  <section id="app" className="py-32 px-6 max-w-7xl mx-auto bg-black relative border-t border-white/5">
    <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 to-transparent opacity-50 pointer-events-none" />
    <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
      <div className="space-y-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
          Your wealth, <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">in your pocket.</span>
        </h2>
        <p className="text-lg text-zinc-400">
          We are currently rolling out Vodium Beta to our early adopters. The mobile experience features instant card freezing, real-time FX tracking, and direct lounge QR access.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          
          {/* EXPO DOWNLOAD LINK INTEGRATED HERE */}
          <a 
            href="https://expo.dev/accounts/olamilekan42424242/projects/vodium/builds/e0c811aa-9c81-4367-ac8e-e174167d0f60"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-zinc-900 border border-yellow-500/30 hover:bg-zinc-800 hover:border-yellow-500 transition-all group shadow-[0_0_20px_rgba(234,179,8,0.1)] hover:shadow-[0_0_30px_rgba(234,179,8,0.2)]"
          >
            <Smartphone className="w-6 h-6 text-yellow-500 group-hover:animate-bounce" />
            <div className="text-left">
              <p className="text-xs text-zinc-400">Exclusive Beta</p>
              <p className="text-sm font-bold text-white">Download APK (Android)</p>
            </div>
            <Download className="w-4 h-4 text-zinc-500 ml-2" />
          </a>

          <div className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-black border border-white/10 opacity-60 cursor-not-allowed">
            <Apple className="w-6 h-6 text-zinc-400" />
            <div className="text-left">
              <p className="text-xs text-zinc-500">App Store</p>
              <p className="text-sm font-bold text-zinc-400">Coming Soon</p>
            </div>
            <Lock className="w-4 h-4 text-zinc-600 ml-2" />
          </div>
        </div>
      </div>
      
      {/* Dynamic Phone Mockup */}
      <div className="relative h-[500px] w-full max-w-sm mx-auto rounded-[2.5rem] border-8 border-zinc-900 bg-black overflow-hidden shadow-[0_0_50px_rgba(234,179,8,0.1)]">
        <div className="absolute top-0 inset-x-0 h-6 bg-zinc-900 rounded-b-3xl w-40 mx-auto z-20" /> 
        <div className="p-8 pt-16 h-full flex flex-col gap-6 relative">
          
          {/* Floating Transaction Notification */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.6, type: "spring" }}
            className="absolute top-24 right-4 left-4 bg-zinc-800/90 backdrop-blur-md rounded-xl p-3 border border-white/10 shadow-xl z-30 flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
              <Plane className="w-4 h-4 text-green-500" />
            </div>
            <div>
              <p className="text-xs font-medium text-white">Heathrow Lounge Pass</p>
              <p className="text-[10px] text-zinc-400">Zero FX Applied</p>
            </div>
            <span className="ml-auto text-sm font-bold text-white">-$0.00</span>
          </motion.div>

          <div className="space-y-2">
            <p className="text-zinc-500 text-sm">Total Balance</p>
            <p className="text-4xl font-bold text-white">$124,500.00</p>
          </div>
          <div className="w-full h-48 rounded-2xl bg-gradient-to-br from-yellow-600 to-yellow-400 p-4 shadow-lg shadow-yellow-500/20" />
          <div className="flex-1 rounded-2xl bg-zinc-900/50 border border-white/5 p-4 space-y-4">
             <div className="w-full h-12 bg-zinc-800 rounded-lg animate-pulse" />
             <div className="w-full h-12 bg-zinc-800 rounded-lg animate-pulse delay-75" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const BentoFeatures = () => (
  <section id="features" className="py-24 px-6 max-w-7xl mx-auto bg-black border-t border-white/5">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Engineered for the Elite</h2>
      <p className="text-zinc-400 text-lg">Everything you need to traverse the globe without friction.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <SpotlightCard className="md:col-span-2 md:row-span-2 items-start justify-end min-h-[400px]">
        <Globe className="w-12 h-12 text-yellow-500 mb-6" />
        <h3 className="text-3xl font-bold text-white mb-3">True Zero FX</h3>
        <p className="text-zinc-400 text-lg max-w-md">
          Pay exactly the mid-market rate. No hidden markups, no weekend surcharges, whether you are swiping in Tokyo, London, or Lagos.
        </p>
      </SpotlightCard>
      <SpotlightCard className="items-start text-left min-h-[200px]">
        <Plane className="w-8 h-8 text-yellow-500 mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Priority Pass™</h3>
        <p className="text-zinc-400 text-sm">Unlimited access to 1,300+ global airport lounges.</p>
      </SpotlightCard>
      <SpotlightCard className="items-start text-left min-h-[200px]">
        <Shield className="w-8 h-8 text-yellow-500 mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Vault Security</h3>
        <p className="text-zinc-400 text-sm">Military-grade encryption and single-use virtual cards.</p>
      </SpotlightCard>
    </div>
  </section>
);

const Testimonials = () => {
  const reviews = [
    { name: "Tunde A.", role: "Digital Nomad", text: "Vodium saved me ₦150k on FX fees alone during my last trip to the UK. It's unmatched." },
    { name: "Sarah M.", role: "Founder", text: "Finally, a credit card that understands cross-border spending without punishing you for it." },
    { name: "David O.", role: "Tech Exec", text: "The lounge access via the beta app works flawlessly. Vodium Gold is my new default card." },
    { name: "Elena R.", role: "Creative Director", text: "The design of the card and the zero FX markup makes traditional banks look prehistoric." },
  ];

  const scrollingReviews = [...reviews, ...reviews];

  return (
    <section id="testimonials" className="py-24 bg-zinc-950 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center md:text-left flex flex-col md:flex-row justify-between items-end">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Wall of Love</h2>
          <p className="text-zinc-400 text-lg">Do not just take our word for it.</p>
        </div>
        <div className="hidden md:flex items-center gap-2 text-yellow-500">
          {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
        </div>
      </div>
      
      <div className="relative flex overflow-x-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-zinc-950 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-zinc-950 to-transparent z-10" />
        
        <motion.div 
          className="flex gap-6 whitespace-nowrap px-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
        >
          {scrollingReviews.map((review, idx) => (
            <div key={idx} className="w-[350px] flex-shrink-0 bg-black border border-white/10 rounded-2xl p-8 hover:border-yellow-500/30 transition-colors whitespace-normal">
              <Quote className="w-8 h-8 text-zinc-800 mb-4" />
              <p className="text-zinc-300 mb-6 leading-relaxed">&quot;{review.text}&quot;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900" />
                <div>
                  <p className="text-white font-medium text-sm">{review.name}</p>
                  <p className="text-zinc-500 text-xs">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex w-full justify-between items-center py-6 text-left focus:outline-none"
      >
        <span className="text-lg font-medium text-white">{question}</span>
        <ChevronDown className={cn("w-5 h-5 text-zinc-500 transition-transform duration-300", isOpen && "rotate-180 text-yellow-500")} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-zinc-400 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQSection = () => {
  const faqs = [
    { question: "What does 'True Zero FX' mean?", answer: "Unlike traditional banks that charge a 2-3% spread on international transactions, Vodium uses the mid-market rate. If you spend $100, you are charged exactly the market equivalent in your local currency. No weekend surcharges, no hidden fees." },
    { question: "How does the lounge access work?", answer: "Your Vodium card (Plus and Gold tiers) acts as your Priority Pass™. Simply present your physical card or the QR code generated in the Vodium Beta App at over 1,300 supported lounges globally for complimentary access." },
    { question: "When will the iOS App be available?", answer: "Our Android APK is currently in an exclusive public beta. The iOS application has been submitted to the App Store and will be available to waitlisted users in Q3 2026." },
    { question: "Is my money secure?", answer: "Yes. Vodium operates in partnership with tier-1 licensed banking partners globally. Your deposits are insured up to regulatory limits, and the app features military-grade encryption, instant card freezing, and single-use virtual cards for secure online purchases." },
  ];

  return (
    <section id="faq" className="py-32 px-6 max-w-4xl mx-auto bg-black">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h2>
        <p className="text-zinc-400 text-lg">Everything you need to know about Vodium.</p>
      </div>
      <div className="space-y-2">
        {faqs.map((faq, idx) => <FAQItem key={idx} question={faq.question} answer={faq.answer} />)}
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-zinc-950 pt-24 pb-12 px-6 border-t border-white/10">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
        <div className="col-span-2 space-y-6">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-zinc-900 border border-white/10 grayscale hover:grayscale-0 transition-all">
              <img src="/logo.png" alt="Vodium Logo" className="w-full h-full object-cover" 
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<span class="text-yellow-500 font-bold">V</span>';
                }} 
              />
            </div>
            <span className="text-2xl font-bold text-white">Vodium</span>
          </div>
          <p className="text-zinc-400 max-w-sm leading-relaxed">
            The definitive financial instrument for global citizens. Spend, travel, and live without borders.
          </p>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-yellow-500 hover:border-yellow-500/50 transition-colors cursor-pointer">𝕏</div>
            <div className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-yellow-500 hover:border-yellow-500/50 transition-colors cursor-pointer">in</div>
          </div>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-6">Product</h4>
          <ul className="space-y-4 text-zinc-400 text-sm">
            <li><a href="#tiers" className="hover:text-yellow-500 transition-colors">Card Tiers</a></li>
            <li><a href="#" className="hover:text-yellow-500 transition-colors">Lounge Access</a></li>
            <li><a href="#" className="hover:text-yellow-500 transition-colors">FX Rates</a></li>
            <li><a href="#app" className="hover:text-yellow-500 transition-colors flex items-center gap-2">Beta App <span className="px-1.5 py-0.5 rounded text-[10px] bg-yellow-500/20 text-yellow-500">Live</span></a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Company</h4>
          <ul className="space-y-4 text-zinc-400 text-sm">
            <li><a href="#" className="hover:text-yellow-500 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-yellow-500 transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-yellow-500 transition-colors">Press Kit</a></li>
            <li><a href="#" className="hover:text-yellow-500 transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Legal</h4>
          <ul className="space-y-4 text-zinc-400 text-sm">
            <li><a href="#" className="hover:text-yellow-500 transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-yellow-500 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-yellow-500 transition-colors">Cookie Policy</a></li>
            <li><a href="#" className="hover:text-yellow-500 transition-colors">Cardholder Agreement</a></li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/10 text-sm text-zinc-500">
        <p>© 2026 Vodium Financial Technologies. All rights reserved.</p>
        <p className="flex items-center gap-1">
        </p>
      </div>
    </div>
  </footer>
);

export default function VodiumLandingPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="min-h-screen bg-black selection:bg-yellow-500/30 selection:text-yellow-200 font-sans overflow-x-hidden relative">
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-[73px] left-0 right-0 h-[2px] bg-yellow-500 origin-left z-50" 
        style={{ scaleX }} 
      />

      {/* Cinematic Noise Overlay */}
      <div 
        className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      <CookieBanner />
      <Navbar />
      <LiveFXTicker />
      <Hero />
      <BackedBy />
      <MetricsSection /> 
      <TiersSection /> 
      <BetaAppSection />
      <BentoFeatures />
      <Testimonials />
      <FAQSection />
      <Footer />
    </main>
  );
}