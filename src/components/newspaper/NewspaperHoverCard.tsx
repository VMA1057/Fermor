"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Stock, NewsArticle } from "@/data/newspaperData";
import { ArrowUpRight, ArrowDownRight, Newspaper } from "lucide-react";

interface NewspaperHoverCardProps {
  hoveredStock: Stock | null;
  hoveredArticle: NewsArticle | null;
  position: { x: number; y: number } | null;
}

export default function NewspaperHoverCard({
  hoveredStock,
  hoveredArticle,
  position,
}: NewspaperHoverCardProps) {
  if ((!hoveredStock && !hoveredArticle) || !position) return null;

  return (
    <div
      className="fixed pointer-events-none z-[80] transition-transform duration-75 ease-out"
      style={{
        left: `${position.x + 20}px`,
        top: `${position.y - 40}px`,
      }}
    >
      <AnimatePresence mode="wait">
        {hoveredStock && (
          <motion.div
            key={hoveredStock.symbol}
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 8 }}
            transition={{ duration: 0.15 }}
            className="w-64 bg-[#FAF7EE] border-2 border-neutral-900 shadow-2xl p-3 text-neutral-900 select-none rounded-xs"
          >
            <div className="flex items-center justify-between border-b border-neutral-300 pb-1 mb-1.5">
              <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-500 font-bold">
                EQUITY FLASH CARD
              </span>
              <span className="font-mono text-[9px] text-neutral-500">{hoveredStock.symbol}</span>
            </div>

            <h4 className="font-serif text-sm text-neutral-950 uppercase leading-snug mb-1">
              {hoveredStock.name}
            </h4>

            <div className="flex items-baseline justify-between mb-2">
              <span className="font-mono font-bold text-base text-neutral-900">
                ₹{hoveredStock.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </span>
              <span
                className={`font-mono text-xs font-semibold inline-flex items-center ${
                  hoveredStock.changePercent >= 0 ? "text-emerald-800" : "text-rose-800"
                }`}
              >
                {hoveredStock.changePercent >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {hoveredStock.changePercent >= 0 ? "+" : ""}{hoveredStock.changePercent.toFixed(2)}%
              </span>
            </div>

            <div className="grid grid-cols-2 gap-1 text-[10px] font-mono text-neutral-700 bg-white p-2 border border-neutral-200 mb-2">
              <div>HIGH: ₹{hoveredStock.dayHigh}</div>
              <div>LOW: ₹{hoveredStock.dayLow}</div>
              <div>VOL: {hoveredStock.volume}</div>
              <div>MCAP: {hoveredStock.marketCap}</div>
            </div>

            <div className="text-[10px] font-mono text-center text-neutral-600 bg-[#EFE9DC] py-0.5">
              CLICK TO INSPECT FULL DOSSIER →
            </div>
          </motion.div>
        )}

        {hoveredArticle && !hoveredStock && (
          <motion.div
            key={hoveredArticle.id}
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 8 }}
            transition={{ duration: 0.15 }}
            className="w-72 bg-[#FAF7EE] border-2 border-neutral-900 shadow-2xl p-3 text-neutral-900 select-none rounded-xs"
          >
            <div className="flex items-center justify-between border-b border-neutral-300 pb-1 mb-1.5">
              <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-600 font-bold flex items-center gap-1">
                <Newspaper size={11} />
                <span>EDITORIAL PREVIEW</span>
              </span>
              <span className="font-mono text-[9px] text-neutral-500">{hoveredArticle.readTime}</span>
            </div>

            <h4 className="font-serif text-xs text-neutral-950 uppercase leading-snug mb-1.5 line-clamp-2">
              {hoveredArticle.title}
            </h4>

            <p className="font-serif text-[11px] leading-relaxed text-neutral-700 line-clamp-2 mb-2">
              {hoveredArticle.summary}
            </p>

            <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 pt-1 border-t border-neutral-200">
              <span>Source: {hoveredArticle.source}</span>
              <span className="font-bold text-neutral-900">Click to read →</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
