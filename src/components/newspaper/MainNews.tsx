"use client";

import React from "react";
import { leadStory, NewsArticle } from "@/data/newspaperData";
import { ExternalLink, TrendingUp, Sparkles } from "lucide-react";

interface MainNewsProps {
  onArticleClick: (article: NewsArticle) => void;
  onArticleHover?: (article: NewsArticle | null) => void;
}

export default function MainNews({ onArticleClick, onArticleHover }: MainNewsProps) {
  return (
    <article
      onClick={() => onArticleClick(leadStory)}
      onMouseEnter={() => onArticleHover?.(leadStory)}
      onMouseLeave={() => onArticleHover?.(null)}
      className="border border-neutral-900 bg-[#FAF7EE] p-5 sm:p-6 mb-4 cursor-pointer group hover:bg-white transition-all shadow-xs relative select-none"
    >
      {/* Category Kicker */}
      <div className="flex items-center justify-between border-b border-neutral-900 pb-1.5 mb-3">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-neutral-800 flex items-center gap-1.5">
          <Sparkles size={11} className="text-amber-800" />
          {leadStory.category}
        </span>
        <span className="text-[10px] font-mono text-neutral-500 uppercase">
          {leadStory.readTime} · {leadStory.edition}
        </span>
      </div>

      {/* Main Headline */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black tracking-tight text-neutral-950 uppercase leading-[1.12] mb-3 group-hover:underline">
        {leadStory.title}
      </h2>

      {/* Byline */}
      <div className="text-[11px] font-serif italic text-neutral-700 mb-4 pb-2 border-b border-neutral-300 flex items-center justify-between">
        <span>By {leadStory.author} in Mumbai</span>
        <span className="font-mono not-italic text-[10px] text-neutral-500">
          WIRE: {leadStory.source}
        </span>
      </div>

      {/* Two Column Layout for the Body */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
        {/* Left Column: Opening text with Drop Cap */}
        <div className="md:col-span-7 text-xs font-serif leading-relaxed text-neutral-800 space-y-2.5">
          <p>
            <span className="float-left text-4xl sm:text-5xl font-serif font-black leading-none pr-2 pt-1 text-neutral-950">
              M
            </span>
            {leadStory.fullContent[0].replace(/^MUMBAI — An /, "UMBAI — An ")}
          </p>
          <p className="line-clamp-3 text-neutral-700">
            {leadStory.fullContent[1]}
          </p>
          <div className="pt-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-neutral-900 group-hover:text-emerald-900">
              READ COMPLETE DISPATCH
              <ExternalLink size={12} />
            </span>
          </div>
        </div>

        {/* Right Column: Pull Quote & Engraved Graphic */}
        <div className="md:col-span-5 bg-[#F2EDE1] p-3.5 border border-neutral-300">
          <div className="text-center pb-2 mb-2 border-b border-neutral-300">
            <span className="text-[9px] font-mono tracking-widest uppercase text-neutral-500 block">
              INSTITUTIONAL QUOTE
            </span>
          </div>
          <blockquote className="font-serif italic text-xs leading-snug text-neutral-900 text-center mb-3">
            {leadStory.pullQuote}
          </blockquote>
          <div className="text-center">
            <div className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-800 bg-emerald-500/10 px-2 py-0.5 border border-emerald-700/20">
              <TrendingUp size={11} />
              <span>RECORD FII CASH INFLOW</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
