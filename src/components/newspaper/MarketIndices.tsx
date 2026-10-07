"use client";

import React from "react";
import { marketIndices, MarketIndex } from "@/data/newspaperData";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface MarketIndicesProps {
  onIndexClick: (index: MarketIndex) => void;
}

export default function MarketIndices({ onIndexClick }: MarketIndicesProps) {
  return (
    <div className="border border-neutral-900 bg-[#FAF7EE] p-3 mb-4 select-none">
      <div className="flex items-center justify-between border-b border-neutral-900 pb-1 mb-2">
        <h3 className="font-serif font-black text-sm tracking-wider uppercase text-neutral-900">
          BENCHMARK INDICES
        </h3>
        <span className="text-[10px] font-mono text-neutral-500 uppercase">
          LIVE EQUITIES · NSE / BSE
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        {marketIndices.map((idx) => {
          const isPositive = idx.changePercent >= 0;

          return (
            <button
              key={idx.symbol}
              type="button"
              onClick={() => onIndexClick(idx)}
              className="text-left p-2 border border-neutral-300 hover:border-neutral-900 bg-white hover:bg-[#F4EFE6] transition-all cursor-pointer group relative shadow-xs"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-serif text-xs text-neutral-900 tracking-tight">
                  {idx.symbol}
                </span>
                <span
                  className={`text-[11px] font-mono font-semibold flex items-center tabular-nums ${
                    isPositive ? "text-emerald-800" : "text-rose-800"
                  }`}
                >
                  {isPositive ? (
                    <ArrowUpRight size={12} className="mr-0.5 inline" />
                  ) : (
                    <ArrowDownRight size={12} className="mr-0.5 inline" />
                  )}
                  {isPositive ? "+" : ""}
                  {idx.changePercent.toFixed(2)}%
                </span>
              </div>

              <div className="text-sm font-mono font-bold text-neutral-950 tracking-tight tabular-nums">
                {idx.value.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-neutral-600 mt-1.5 pt-1 border-t border-neutral-200">
                <span>
                  1W: <strong className={idx.weekChangePercent >= 0 ? "text-emerald-800" : "text-rose-800"}>
                    {idx.weekChangePercent >= 0 ? "+" : ""}{idx.weekChangePercent}%
                  </strong>
                </span>
                <span>
                  1M: <strong className={idx.monthChangePercent >= 0 ? "text-emerald-800" : "text-rose-800"}>
                    {idx.monthChangePercent >= 0 ? "+" : ""}{idx.monthChangePercent}%
                  </strong>
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
