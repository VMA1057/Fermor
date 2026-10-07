"use client";

import React from "react";

export default function NewspaperHeader() {
  return (
    <header className="border-b-2 border-neutral-900 pb-3 mb-4 select-none">
      {/* Top Folio Bar */}
      <div className="flex items-center justify-between text-[11px] font-serif tracking-wider uppercase border-b border-neutral-400/80 pb-1.5 mb-2.5 text-neutral-700">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-neutral-900">MUMBAI · NEW YORK · LONDON · TOKYO</span>
          <span className="hidden md:inline text-neutral-500">·</span>
          <span className="hidden md:inline">MONETARY INTELLIGENCE & CAPITAL MARKETS</span>
        </div>
        <div className="flex items-center gap-4">
          <span>SENSEX: <strong className="text-emerald-800">81,654.20 (+0.74%)</strong></span>
          <span className="hidden sm:inline text-neutral-500">·</span>
          <span className="hidden sm:inline">10Y GILT: <strong>6.88%</strong></span>
          <span className="hidden sm:inline text-neutral-500">·</span>
          <span>USD/INR: <strong>83.82</strong></span>
        </div>
      </div>

      {/* Main Masthead Title */}
      <div className="text-center py-2 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:flex flex-col text-left text-[10px] font-serif leading-tight text-neutral-600 max-w-[140px]">
          <span className="font-bold tracking-widest text-neutral-800 uppercase">MORNING BRIEF</span>
          <span>Liquidity injection aids broad benchmarks to new highs.</span>
        </div>

        <div className="inline-block">
          <p className="text-[11px] font-serif italic tracking-[0.25em] text-neutral-600 uppercase mb-0.5">
            The Journal of Sovereign Wealth & Markets
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif tracking-tight text-neutral-950 uppercase leading-none scale-y-95">
            THE FINANCIAL CHRONICLE
          </h1>
          <p className="text-[10px] font-mono tracking-[0.3em] text-neutral-500 uppercase mt-1">
            VERITAS · LIQUIDITAS · SAPIENTIA · FERMOR INTELLIGENCE
          </p>
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:flex flex-col text-right text-[10px] font-serif leading-tight text-neutral-600 max-w-[140px]">
          <span className="font-bold tracking-widest text-neutral-800 uppercase">PRICE & ISSUE</span>
          <span>₹15.00 · $3.50 · £2.80</span>
          <span className="font-mono text-[9px] text-neutral-500">ISSN 2419-8921</span>
        </div>
      </div>

      {/* Bottom Issue Bar */}
      <div className="flex items-center justify-between text-[11px] font-serif border-t-2 border-b border-neutral-900 py-1 mt-2 text-neutral-800">
        <div>
          <span className="font-bold">VOL. CCXLIV NO. 48,219</span>
        </div>
        <div className="font-semibold uppercase tracking-widest text-neutral-900">
          TUESDAY, 06 OCTOBER 2026
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline">LATE CITY BROADVIEW EDITION</span>
          <span className="font-bold">PAGES 1–16</span>
        </div>
      </div>
    </header>
  );
}
