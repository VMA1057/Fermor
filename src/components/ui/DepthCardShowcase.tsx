"use client";

import React from "react";
import {
  ShieldCheck,
  TrendingUp,
  Globe2,
  Lock,
  Sparkles,
  ArrowUpRight,
  Wifi,
  Layers,
} from "lucide-react";
import { DepthCard, DepthLayer, DepthFloating } from "./DepthCard";
import { useCursor } from "../cursor/CursorContext";

export default function DepthCardShowcase() {
  const { setCursorState } = useCursor();

  return (
    <section id="act" className="py-24 bg-[#111512] text-[#F7F7F2] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-[#0F6B4F]/10 rounded-full blur-[140px]" />
        <div className="absolute -bottom-40 right-1/4 w-[600px] h-[600px] bg-[#B8944A]/10 rounded-full blur-[140px]" />
        {/* Subtle grid lines */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(#F7F7F2 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Editorial Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-wider uppercase text-emerald-400 mb-6">
            <Layers size={13} />
            <span>Asset Allocation Insights</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight text-white mb-6">
            Explore your financial future through interactive scenarios.
          </h2>

          <p className="text-lg text-white/60 font-sans leading-relaxed max-w-2xl mx-auto">
            See how small decisions can change your financial trajectory, from sovereign debt yields to physical bullion and global multi-asset portfolios.
          </p>
        </div>

        {/* 3-Card Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 max-w-7xl mx-auto items-stretch">
          
          {/* CARD 1: Obsidian Sovereign Metal Card */}
          <DepthCard
            maxRotation={14}
            perspective={1100}
            depth={36}
            glowColor="rgba(255, 255, 255, 0.16)"
            glowSize={360}
            className="h-full rounded-[28px] border border-white/10 bg-gradient-to-b from-[#1C211D] via-[#131714] to-[#0D100E] p-7 md:p-8 flex flex-col justify-between overflow-hidden shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:border-emerald-500/30 group"
            onMouseEnter={() => setCursorState("financial")}
            onMouseLeave={() => setCursorState("normal")}
          >
            {/* Background Texture Layer (-12px back) */}
            <DepthLayer depth={-12} className="absolute inset-0 pointer-events-none opacity-20">
              <div 
                className="w-full h-full"
                style={{
                  backgroundImage: "radial-gradient(circle at 80% 20%, rgba(15, 107, 79, 0.2), transparent 50%), repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.02) 0px, rgba(255, 255, 255, 0.02) 1px, transparent 1px, transparent 12px)",
                }}
              />
            </DepthLayer>

            {/* Top Bar (Header & Contactless Chip) */}
            <div className="relative">
              <div className="flex items-center justify-between mb-8">
                <DepthLayer depth={24} className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-400 font-semibold">
                    FERMOR SOVEREIGN
                  </span>
                </DepthLayer>

                <DepthFloating depth={48} className="flex items-center gap-1.5 text-white/60">
                  <Wifi size={18} className="rotate-90 text-white/70" />
                </DepthFloating>
              </div>

              {/* Realistic 3D Smart Card Chip */}
              <DepthFloating depth={45} className="mb-8 inline-block">
                <div className="w-13 h-10 rounded-md bg-gradient-to-br from-[#D4AF37] via-[#AA771C] to-[#805A10] p-[1.5px] shadow-lg">
                  <div className="w-full h-full bg-[#1A1813] rounded-[5px] relative overflow-hidden flex items-center justify-center border border-[#FFDF73]/40">
                    {/* Chip Circuit Etching */}
                    <div className="w-7 h-4 border border-[#D4AF37]/60 rounded-sm relative">
                      <div className="absolute inset-x-0 top-1/2 h-px bg-[#D4AF37]/50 -translate-y-1/2" />
                      <div className="absolute inset-y-0 left-1/2 w-px bg-[#D4AF37]/50 -translate-x-1/2" />
                    </div>
                  </div>
                </div>
              </DepthFloating>

              {/* Card Number Masked */}
              <DepthLayer depth={28} className="mb-2">
                <p className="font-mono text-xl tracking-[0.25em] text-white/90 font-light">
                  •••• •••• •••• 8492
                </p>
              </DepthLayer>
            </div>

            {/* Cardholder & Floating Zero-FX Badge */}
            <div className="relative pt-6 border-t border-white/5">
              <div className="flex items-end justify-between">
                <DepthLayer depth={22}>
                  <p className="text-[10px] font-mono tracking-wider text-white/40 uppercase mb-0.5">
                    CARDHOLDER
                  </p>
                  <p className="text-sm font-sans tracking-wide text-white/90 font-medium uppercase">
                    A. M. STERLING
                  </p>
                </DepthLayer>

                <DepthFloating depth={52} className="origin-bottom-right">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-medium shadow-lg backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>0% FX MARKUP</span>
                  </div>
                </DepthFloating>
              </div>
            </div>
          </DepthCard>

          {/* CARD 2: Global Yield & Liquidity Vault */}
          <DepthCard
            maxRotation={14}
            perspective={1100}
            depth={40}
            glowColor="rgba(59, 225, 123, 0.18)"
            glowSize={380}
            className="h-full rounded-[28px] border border-white/10 bg-gradient-to-b from-[#13231A] via-[#0E1B14] to-[#08120C] p-7 md:p-8 flex flex-col justify-between overflow-hidden shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:border-emerald-400/40 group"
            onMouseEnter={() => setCursorState("financial")}
            onMouseLeave={() => setCursorState("normal")}
          >
            {/* Background Meridian Contours (-14px) */}
            <DepthLayer depth={-14} className="absolute inset-0 pointer-events-none opacity-25">
              <div 
                className="w-full h-full"
                style={{
                  backgroundImage: "radial-gradient(circle at 20% 80%, rgba(184, 148, 74, 0.2), transparent 60%)",
                }}
              />
            </DepthLayer>

            {/* Top Vault Metrics */}
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <DepthLayer depth={22} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Globe2 size={16} />
                  </div>
                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                      GLOBAL YIELD VAULT
                    </h3>
                    <p className="text-[11px] text-white/50">Multi-Currency Hedged</p>
                  </div>
                </DepthLayer>

                <DepthFloating depth={50}>
                  <div className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-white/80">
                    AAA RATED
                  </div>
                </DepthFloating>
              </div>

              {/* Central Dynamic APY Indicator */}
              <div className="my-6">
                <DepthLayer depth={20} className="text-xs font-mono text-white/50 uppercase tracking-wider mb-1">
                  CURRENT NET YIELD
                </DepthLayer>
                
                <DepthLayer depth={36} className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl md:text-5xl font-serif text-white tracking-tight tabular-nums">
                    8.42%
                  </span>
                  <span className="text-sm font-mono text-emerald-400 font-medium flex items-center">
                    <TrendingUp size={14} className="mr-0.5 inline" /> APY
                  </span>
                </DepthLayer>

                <DepthLayer depth={26}>
                  <p className="text-xs text-white/60">
                    Calculated daily · Automatic currency rebalancing across INR, USD, EUR, SGD.
                  </p>
                </DepthLayer>
              </div>
            </div>

            {/* Interactive Corridors Breakdown */}
            <div className="relative pt-6 border-t border-white/5">
              <DepthLayer depth={24} className="grid grid-cols-3 gap-3 text-center mb-4">
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="block text-[10px] font-mono text-white/40">US T-BILLS</span>
                  <span className="text-sm font-semibold text-white/90">5.15%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="block text-[10px] font-mono text-white/40">SGD SOV</span>
                  <span className="text-sm font-semibold text-white/90">3.60%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="block text-[10px] font-mono text-white/40">EUR HY</span>
                  <span className="text-sm font-semibold text-white/90">4.20%</span>
                </div>
              </DepthLayer>

              <DepthFloating depth={54} className="flex justify-end">
                <div className="inline-flex items-center gap-1 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors">
                  <span>Explore Allocation</span>
                  <ArrowUpRight size={14} />
                </div>
              </DepthFloating>
            </div>
          </DepthCard>

          {/* CARD 3: Swiss Vault Allocated Bullion Reserve */}
          <DepthCard
            maxRotation={14}
            perspective={1100}
            depth={38}
            glowColor="rgba(184, 148, 74, 0.22)"
            glowSize={360}
            className="h-full rounded-[28px] border border-white/10 bg-gradient-to-b from-[#221F18] via-[#171510] to-[#0E0D0A] p-7 md:p-8 flex flex-col justify-between overflow-hidden shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:border-[#B8944A]/40 group"
            onMouseEnter={() => setCursorState("financial")}
            onMouseLeave={() => setCursorState("normal")}
          >
            {/* Background Texture (-10px) */}
            <DepthLayer depth={-10} className="absolute inset-0 pointer-events-none opacity-20">
              <div 
                className="w-full h-full"
                style={{
                  backgroundImage: "radial-gradient(circle at 75% 75%, rgba(184, 148, 74, 0.3), transparent 60%)",
                }}
              />
            </DepthLayer>

            {/* Header & Depository Location */}
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <DepthLayer depth={22} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#B8944A]/10 border border-[#B8944A]/20 flex items-center justify-center text-[#D4AF37]">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] font-semibold">
                      ALLOCATED BULLION
                    </h3>
                    <p className="text-[11px] text-white/50">Zurich & Singapore FreePort</p>
                  </div>
                </DepthLayer>

                <DepthFloating depth={46}>
                  <div className="p-1.5 rounded-full bg-white/5 border border-white/10 text-white/70">
                    <Lock size={13} />
                  </div>
                </DepthFloating>
              </div>

              {/* Physical Holding Metrics */}
              <div className="my-6">
                <DepthLayer depth={18} className="text-xs font-mono text-white/50 uppercase tracking-wider mb-1">
                  ALLOCATED FINE GOLD
                </DepthLayer>
                
                <DepthLayer depth={34} className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl md:text-5xl font-serif text-white tracking-tight tabular-nums">
                    999.9
                  </span>
                  <span className="text-sm font-mono text-[#D4AF37] font-medium">
                    FINE PURITY
                  </span>
                </DepthLayer>

                <DepthLayer depth={24}>
                  <p className="text-xs text-white/60">
                    Segregated bar serials. 100% physically audited and insured by Lloyd&apos;s of London.
                  </p>
                </DepthLayer>
              </div>
            </div>

            {/* Footer with Floating Security Seal */}
            <div className="relative pt-6 border-t border-white/5">
              <div className="flex items-center justify-between">
                <DepthLayer depth={22}>
                  <p className="text-[10px] font-mono tracking-wider text-white/40 uppercase mb-0.5">
                    CUSTODY AUDIT
                  </p>
                  <p className="text-xs font-mono text-white/80 font-medium">
                    VERIFIED · LBMA GOOD DELIVERY
                  </p>
                </DepthLayer>

                <DepthFloating depth={56}>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B8944A]/15 border border-[#B8944A]/30 text-[#E5C158] text-xs font-mono font-medium shadow-lg backdrop-blur-md">
                    <Sparkles size={12} />
                    <span>INSURED</span>
                  </div>
                </DepthFloating>
              </div>
            </div>
          </DepthCard>

        </div>

        {/* Portfolio Feature Tip */}
        <div className="mt-14 text-center">
          <p className="inline-flex items-center gap-2 text-xs font-mono text-white/40 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-ping" />
            <span>Comprehensive multi-asset coverage · Tailored for long-term compounding</span>
          </p>
        </div>
      </div>
    </section>
  );
}
