"use client";

import React from "react";
import NewspaperHeader from "./NewspaperHeader";
import BreakingNews from "./BreakingNews";
import MarketIndices from "./MarketIndices";
import GainersColumn from "./GainersColumn";
import LosersColumn from "./LosersColumn";
import MainNews from "./MainNews";
import BusinessNews from "./BusinessNews";
import FinancialSchemes from "./FinancialSchemes";
import GlobalMarkets from "./GlobalMarkets";
import SectorWatch from "./SectorWatch";
import { Stock, NewsArticle, FinancialScheme, MarketIndex, SectorWatchItem, WorldMarket } from "@/data/newspaperData";

interface NewspaperBroadsheetProps {
  onStockClick: (stock: Stock) => void;
  onStockHover: (stock: Stock | null) => void;
  onArticleClick: (article: NewsArticle) => void;
  onArticleHover: (article: NewsArticle | null) => void;
  onSchemeClick: (scheme: FinancialScheme) => void;
  onSectorClick: (sector: SectorWatchItem) => void;
  onIndexClick: (index: MarketIndex) => void;
  onMarketClick: (market: WorldMarket) => void;
}

export default function NewspaperBroadsheet({
  onStockClick,
  onStockHover,
  onArticleClick,
  onArticleHover,
  onSchemeClick,
  onSectorClick,
  onIndexClick,
  onMarketClick,
}: NewspaperBroadsheetProps) {
  return (
    <div
      className="relative w-full max-w-[1340px] bg-[#FAF7EE] text-neutral-900 p-3.5 sm:p-8 md:p-12 shadow-[0_35px_80px_-20px_rgba(0,0,0,0.7),0_10px_30px_-10px_rgba(0,0,0,0.5),0_0_0_1px_rgba(0,0,0,0.12)] border border-[#E3DAC9] select-none mx-auto rounded-[2px]"
      style={{
        backgroundImage: `
          radial-gradient(#000000 0.5px, transparent 0.5px),
          linear-gradient(to right, rgba(0,0,0,0.02) 1px, transparent 1px)
        `,
        backgroundSize: "24px 24px, 120px 120px",
      }}
    >
      {/* Central Broadsheet Fold Line Simulation */}
      <div className="absolute inset-y-0 left-1/2 w-8 -translate-x-1/2 pointer-events-none bg-gradient-to-r from-transparent via-black/[0.035] to-transparent hidden md:block" />

      {/* Header */}
      <NewspaperHeader />

      {/* Breaking Wire */}
      <BreakingNews
        onArticleClick={() => {
          // Triggers lead story on breaking news click
          import("@/data/newspaperData").then((m) => onArticleClick(m.leadStory));
        }}
      />

      {/* Benchmark Indices Ribbon */}
      <MarketIndices onIndexClick={onIndexClick} />

      {/* Main 3-Column Broadsheet Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5 items-start">
        
        {/* Left Column: Market Today (Gainers & Losers) */}
        <div className="lg:col-span-3 space-y-4">
          <GainersColumn
            onStockClick={onStockClick}
            onStockHover={onStockHover}
          />
          <LosersColumn
            onStockClick={onStockClick}
            onStockHover={onStockHover}
          />
        </div>

        {/* Center Column: Main Dispatch & Corporate News */}
        <div className="lg:col-span-6 space-y-4">
          <MainNews
            onArticleClick={onArticleClick}
            onArticleHover={onArticleHover}
          />
          <BusinessNews
            onArticleClick={onArticleClick}
            onArticleHover={onArticleHover}
          />
        </div>

        {/* Right Column: World Markets & Sector Watch */}
        <div className="lg:col-span-3 space-y-4">
          <GlobalMarkets onMarketClick={onMarketClick} />
          <SectorWatch onSectorClick={onSectorClick} />
        </div>
      </div>

      {/* Full-width Financial Schemes Section */}
      <FinancialSchemes onSchemeClick={onSchemeClick} />

      {/* Bottom Newspaper Colophon / Imprint */}
      <footer className="mt-8 pt-4 border-t-2 border-b border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-neutral-600 gap-3">
        <div className="flex items-center gap-3">
          <span className="font-bold text-neutral-900">FERMOR CHRONICLE INTELLIGENCE</span>
          <span>·</span>
          <span>PRINTED DIGITALLY FOR SOVEREIGN INVESTORS</span>
        </div>
        <div className="flex items-center gap-4">
          <span>DATA SOURCE: NSE/BSE REAL-TIME FEEDS</span>
          <span>·</span>
          <span>ALL RIGHTS RESERVED © 2026</span>
        </div>
      </footer>
    </div>
  );
}
