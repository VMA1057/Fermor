"use client";

import React from "react";
import { worldMarkets, WorldMarket } from "@/data/newspaperData";
import { ArrowUpRight, ArrowDownRight, Globe } from "lucide-react";

interface GlobalMarketsProps {
  onMarketClick?: (market: WorldMarket) => void;
}

export default function GlobalMarkets({ onMarketClick }: GlobalMarketsProps) {
  return (
    <div className="border border-neutral-900 bg-[#FAF7EE] p-3 flex flex-col h-full select-none">
      <div className="border-b-2 border-neutral-900 pb-1.5 mb-2.5 flex items-center justify-between">
        <div>
          <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-600 font-bold block">
            INTERNATIONAL PULSE
          </span>
          <h3 className="font-serif font-black text-sm text-neutral-900 uppercase tracking-tight">
            WORLD MARKETS
          </h3>
        </div>
        <Globe size={14} className="text-neutral-600" />
      </div>

      <div className="divide-y divide-neutral-200 text-xs font-mono flex-1">
        {worldMarkets.map((market) => {
          const isPositive = market.changePercent >= 0;

          return (
            <div
              key={market.name}
              onClick={() => onMarketClick?.(market)}
              className="py-1.5 px-1 hover:bg-white transition-colors cursor-pointer flex items-center justify-between"
            >
              <div>
                <span className="font-bold text-neutral-900 block">{market.name}</span>
                <span className="text-[10px] text-neutral-500">{market.region}</span>
              </div>

              <div className="text-right">
                <span className="font-bold text-neutral-900 block">
                  {market.value.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </span>
                <span
                  className={`text-[11px] font-semibold inline-flex items-center ${
                    isPositive ? "text-emerald-800" : "text-rose-800"
                  }`}
                >
                  {isPositive ? <ArrowUpRight size={10} className="mr-0.5" /> : <ArrowDownRight size={10} className="mr-0.5" />}
                  {isPositive ? "+" : ""}{market.changePercent.toFixed(2)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
