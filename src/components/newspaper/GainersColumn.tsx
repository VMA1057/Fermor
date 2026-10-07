"use client";

import React from "react";
import { Stock, marketGainers } from "@/data/newspaperData";
import { ArrowUpRight } from "lucide-react";

interface GainersColumnProps {
  onStockClick: (stock: Stock) => void;
  onStockHover?: (stock: Stock | null) => void;
}

export default function GainersColumn({ onStockClick, onStockHover }: GainersColumnProps) {
  return (
    <div className="border border-neutral-900 bg-[#FAF7EE] p-3 flex flex-col h-full select-none">
      <div className="border-b-2 border-neutral-900 pb-1.5 mb-2.5 flex items-center justify-between">
        <div>
          <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-800 font-bold block">
            EQUITY APPRECIATION
          </span>
          <h3 className="font-serif font-black text-base text-neutral-900 uppercase tracking-tight">
            MARKET GAINERS
          </h3>
        </div>
        <span className="text-[10px] font-mono text-neutral-600 border border-neutral-400 px-1.5 py-0.5">
          TOP 5 NSE
        </span>
      </div>

      <div className="divide-y divide-neutral-300 flex-1">
        {marketGainers.map((stock) => {
          return (
            <div
              key={stock.symbol}
              onMouseEnter={() => {
                onStockHover?.(stock);
              }}
              onMouseLeave={() => {
                onStockHover?.(null);
              }}
              onClick={() => onStockClick(stock)}
              className="py-2.5 px-1.5 hover:bg-white transition-all cursor-pointer group relative rounded-sm"
            >
              {/* Top Row: Symbol + Price + Change */}
              <div className="flex items-baseline justify-between mb-0.5">
                <div>
                  <span className="font-serif text-sm text-neutral-950 group-hover:underline">
                    {stock.symbol}
                  </span>
                  <span className="text-[11px] font-sans text-neutral-600 block line-clamp-1">
                    {stock.name}
                  </span>
                </div>

                <div className="text-right">
                  <div className="font-mono text-xs font-bold text-neutral-900 tabular-nums">
                    ₹{stock.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </div>
                  <span className="inline-flex items-center text-[11px] font-mono font-semibold text-emerald-800 tabular-nums">
                    <ArrowUpRight size={11} className="mr-0.5" />
                    +{stock.changePercent.toFixed(2)}% (+₹{stock.change.toFixed(2)})
                  </span>
                </div>
              </div>

              {/* Bottom Row: Financial Stats */}
              <div className="flex items-center justify-between text-[10px] font-mono text-neutral-600 mt-1 pt-1 border-t border-neutral-200/60">
                <span>VOL: {stock.volume}</span>
                <span>MCAP: {stock.marketCap}</span>
                <span className="text-neutral-900 font-medium group-hover:text-emerald-800 flex items-center">
                  VIEW →
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
