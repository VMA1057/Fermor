"use client";

import React from "react";
import { GraphPoint } from "./types";
import { formatIndianCurrency, formatExactIndianCurrency } from "@/data/forecast";

interface WealthTooltipProps {
  point: GraphPoint | null;
  isProfit: boolean;
  isDownturn: boolean;
}

export default function WealthTooltip({
  point,
}: WealthTooltipProps) {
  if (!point) return null;

  return (
    <div
      className="absolute pointer-events-none z-30 transition-all duration-75"
      style={{
        left: `${point.xPercent}%`,
        top: `${point.yPercent}%`,
        transform: "translate(-50%, -100%) translateY(-14px) translateZ(36px)",
      }}
    >
      <div className="w-48 bg-[#141614] text-[#F7F7F2] p-3 rounded-2xl shadow-2xl border border-white/10 select-none">
        <div className="flex items-center justify-between text-[10px] font-mono text-white/50 mb-1">
          <span>YEAR {point.calendarYear}</span>
          <span className="text-white/40">YR {point.year}</span>
        </div>

        <div className="font-serif text-lg text-white mb-1.5 tabular-nums">
          {formatExactIndianCurrency(point.value)}
        </div>

        <div className="space-y-1 text-[11px] font-mono border-t border-white/10 pt-1.5">
          <div className="flex justify-between">
            <span className="text-white/60">Invested:</span>
            <span className="text-white/90">{formatIndianCurrency(point.invested)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/60">
              {point.growth >= 0 ? "Est. Growth:" : "Est. Deficit:"}
            </span>
            <span className={point.growth >= 0 ? "text-emerald-400 font-semibold" : "text-rose-400 font-semibold"}>
              {point.growth >= 0 ? "+" : ""}{formatIndianCurrency(point.growth)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
