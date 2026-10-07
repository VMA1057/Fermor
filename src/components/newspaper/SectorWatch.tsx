"use client";

import React from "react";
import { sectorWatch, SectorWatchItem } from "@/data/newspaperData";
import { ArrowUpRight, ArrowDownRight, Layers } from "lucide-react";

interface SectorWatchProps {
  onSectorClick: (sector: SectorWatchItem) => void;
}

export default function SectorWatch({ onSectorClick }: SectorWatchProps) {
  return (
    <div className="border border-neutral-900 bg-[#FAF7EE] p-3 flex flex-col h-full select-none">
      <div className="border-b-2 border-neutral-900 pb-1.5 mb-2.5 flex items-center justify-between">
        <div>
          <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-600 font-bold block">
            MACRO ALLOCATION
          </span>
          <h3 className="font-serif font-black text-sm text-neutral-900 uppercase tracking-tight">
            SECTOR WATCH
          </h3>
        </div>
        <Layers size={14} className="text-neutral-600" />
      </div>

      <div className="divide-y divide-neutral-200 text-xs font-mono flex-1">
        {sectorWatch.map((sec) => {
          const isPositive = sec.changePercent >= 0;

          return (
            <div
              key={sec.id}
              onClick={() => onSectorClick(sec)}
              className="py-1.5 px-1 hover:bg-white transition-colors cursor-pointer group flex items-center justify-between"
            >
              <div>
                <span className="font-bold text-neutral-900 block group-hover:underline">
                  {sec.name}
                </span>
                <span className="text-[10px] text-neutral-500 line-clamp-1">
                  Leaders: {sec.leaders[0]}
                </span>
              </div>

              <div className="text-right">
                <span
                  className={`text-xs font-bold inline-flex items-center ${
                    isPositive ? "text-emerald-800" : "text-rose-800"
                  }`}
                >
                  {isPositive ? <ArrowUpRight size={11} className="mr-0.5" /> : <ArrowDownRight size={11} className="mr-0.5" />}
                  {isPositive ? "+" : ""}{sec.changePercent.toFixed(2)}%
                </span>
                <span className="block text-[9px] text-neutral-400 group-hover:text-neutral-700">
                  DETAILS →
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
