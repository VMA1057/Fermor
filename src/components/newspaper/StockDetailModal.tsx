"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Stock } from "@/data/newspaperData";
import { X, ArrowUpRight, ArrowDownRight, BarChart2 } from "lucide-react";

interface StockDetailModalProps {
  stock: Stock | null;
  onClose: () => void;
}

export default function StockDetailModal({ stock, onClose }: StockDetailModalProps) {
  if (!stock) return null;

  const isPositive = stock.changePercent >= 0;

  // Build SVG path for intraday price chart
  const minVal = Math.min(...stock.historicalPoints);
  const maxVal = Math.max(...stock.historicalPoints);
  const range = maxVal - minVal || 1;
  const chartWidth = 360;
  const chartHeight = 100;

  const points = stock.historicalPoints.map((val, idx) => {
    const x = (idx / (stock.historicalPoints.length - 1)) * chartWidth;
    const y = chartHeight - ((val - minVal) / range) * (chartHeight - 20) - 10;
    return `${x},${y}`;
  });
  const pathData = `M ${points.join(" L ")}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 select-text">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto bg-[#F9F6EE] border-2 border-neutral-900 shadow-2xl text-neutral-900 p-4 sm:p-6 md:p-8 rounded-xs"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-neutral-900 pb-2 mb-4">
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-neutral-600">
              EQUITY DOSSIER · {stock.sector}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 hover:bg-neutral-200 rounded-full transition-colors cursor-pointer text-neutral-800"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* Stock Header */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-6">
            <div>
              <h2 className="text-3xl font-serif font-black tracking-tight text-neutral-950 uppercase">
                {stock.name}
              </h2>
              <span className="text-xs font-mono font-bold text-neutral-600">
                NSE: {stock.symbol} · INE002A01018
              </span>
            </div>

            <div className="text-left sm:text-right">
              <div className="text-2xl sm:text-3xl font-mono font-bold text-neutral-950">
                ₹{stock.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </div>
              <div
                className={`text-xs font-mono font-semibold inline-flex items-center ${
                  isPositive ? "text-emerald-800" : "text-rose-800"
                }`}
              >
                {isPositive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                <span>
                  {isPositive ? "+" : ""}{stock.changePercent.toFixed(2)}% (₹{stock.change.toFixed(2)})
                </span>
              </div>
            </div>
          </div>

          {/* Intraday Chart Card */}
          <div className="bg-white border border-neutral-300 p-4 mb-6">
            <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 mb-2">
              <span className="flex items-center gap-1">
                <BarChart2 size={12} />
                <span>INTRADAY TICK ACCRUAL</span>
              </span>
              <span>HIGH: ₹{stock.dayHigh} · LOW: ₹{stock.dayLow}</span>
            </div>

            <div className="w-full h-28 flex items-center justify-center">
              <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full overflow-visible">
                <path
                  d={pathData}
                  fill="none"
                  stroke={isPositive ? "#065F46" : "#9F1239"}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* 6-Grid Key Financial Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono mb-6">
            <div className="p-2.5 bg-white border border-neutral-200">
              <span className="text-[10px] text-neutral-500 block">MARKET CAP</span>
              <span className="font-bold text-neutral-900 text-sm">{stock.marketCap}</span>
            </div>
            <div className="p-2.5 bg-white border border-neutral-200">
              <span className="text-[10px] text-neutral-500 block">VOLUME</span>
              <span className="font-bold text-neutral-900 text-sm">{stock.volume}</span>
            </div>
            <div className="p-2.5 bg-white border border-neutral-200">
              <span className="text-[10px] text-neutral-500 block">P/E RATIO</span>
              <span className="font-bold text-neutral-900 text-sm">{stock.peRatio}x</span>
            </div>
            <div className="p-2.5 bg-white border border-neutral-200">
              <span className="text-[10px] text-neutral-500 block">DIVIDEND YIELD</span>
              <span className="font-bold text-neutral-900 text-sm">{stock.dividendYield}%</span>
            </div>
            <div className="p-2.5 bg-white border border-neutral-200">
              <span className="text-[10px] text-neutral-500 block">52W HIGH</span>
              <span className="font-bold text-neutral-900 text-sm">₹{stock.high52}</span>
            </div>
            <div className="p-2.5 bg-white border border-neutral-200">
              <span className="text-[10px] text-neutral-500 block">52W LOW</span>
              <span className="font-bold text-neutral-900 text-sm">₹{stock.low52}</span>
            </div>
          </div>

          {/* Fundamental Description */}
          <div className="border-t border-neutral-300 pt-4 mb-6">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block mb-1">
              FINANCIAL DESK ANALYSIS
            </span>
            <p className="text-xs sm:text-sm font-serif leading-relaxed text-neutral-800">
              {stock.description}
            </p>
          </div>

          {/* Related Market Headlines */}
          {stock.relatedNews.length > 0 && (
            <div className="bg-[#EFE9DC] p-3 border border-neutral-300">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-600 block mb-1 font-bold">
                CONNECTED MARKET HEADLINES
              </span>
              <ul className="list-disc list-inside text-xs font-serif text-neutral-800 space-y-1">
                {stock.relatedNews.map((news, idx) => (
                  <li key={idx}>{news}</li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
