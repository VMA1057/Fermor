"use client";

import React from "react";
import { financialSchemes, FinancialScheme } from "@/data/newspaperData";
import { ShieldCheck, ArrowUpRight } from "lucide-react";

interface FinancialSchemesProps {
  onSchemeClick: (scheme: FinancialScheme) => void;
}

export default function FinancialSchemes({ onSchemeClick }: FinancialSchemesProps) {
  return (
    <div className="border border-neutral-900 bg-[#FAF7EE] p-4 mb-4 select-none">
      <div className="border-b-2 border-neutral-900 pb-1.5 mb-3 flex items-center justify-between">
        <div>
          <span className="text-[9px] font-mono uppercase tracking-widest text-amber-800 font-bold block">
            SOVEREIGN & SAVINGS GAZETTE
          </span>
          <h3 className="font-serif font-black text-base text-neutral-900 uppercase tracking-tight">
            FINANCIAL SCHEMES & FIXED INSTRUMENTS
          </h3>
        </div>
        <div className="text-[10px] font-mono text-neutral-600 border border-neutral-400 px-2 py-0.5 flex items-center gap-1">
          <ShieldCheck size={12} className="text-emerald-800" />
          <span>GOVT VERIFIED</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {financialSchemes.map((scheme) => (
          <div
            key={scheme.id}
            onClick={() => onSchemeClick(scheme)}
            className="p-3 border border-neutral-300 hover:border-neutral-900 bg-white hover:bg-[#F5F0E6] transition-all cursor-pointer group flex flex-col justify-between shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-500 font-bold">
                  {scheme.category}
                </span>
                <span className="text-[10px] font-mono text-emerald-800 font-semibold bg-emerald-50 px-1.5 py-0.2 border border-emerald-200">
                  {scheme.risk}
                </span>
              </div>

              <h4 className="font-serif text-xs text-neutral-950 uppercase leading-snug mb-2 group-hover:underline">
                {scheme.name}
              </h4>

              <div className="space-y-1 text-xs font-mono mb-3 bg-[#FAF7EE] p-2 border border-neutral-200">
                <div className="flex items-baseline justify-between">
                  <span className="text-neutral-500 text-[10px]">RATE:</span>
                  <span className="font-bold text-sm text-neutral-900 tabular-nums">
                    {scheme.interestRate}% <span className="text-[10px] font-normal">p.a.</span>
                  </span>
                </div>
                <div className="flex items-baseline justify-between text-[10px]">
                  <span className="text-neutral-500">TENURE:</span>
                  <span className="font-semibold text-neutral-800">{scheme.tenure}</span>
                </div>
              </div>

              <p className="text-[11px] font-serif leading-relaxed text-neutral-700 line-clamp-2 mb-2">
                {scheme.description}
              </p>
            </div>

            <div className="pt-2 border-t border-neutral-200 flex items-center justify-between text-[10px] font-mono">
              <span className="text-neutral-500 truncate max-w-[110px]">
                {scheme.lockInPeriod}
              </span>
              <span className="text-neutral-900 group-hover:text-emerald-900 font-bold inline-flex items-center">
                DETAILS <ArrowUpRight size={10} className="ml-0.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
