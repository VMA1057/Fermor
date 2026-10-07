"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectorWatchItem } from "@/data/newspaperData";
import { X, ArrowUpRight, ArrowDownRight, Layers } from "lucide-react";

interface SectorDetailModalProps {
  sector: SectorWatchItem | null;
  onClose: () => void;
}

export default function SectorDetailModal({ sector, onClose }: SectorDetailModalProps) {
  if (!sector) return null;

  const isPositive = sector.changePercent >= 0;

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
          className="relative w-full max-w-lg max-h-[88vh] overflow-y-auto bg-[#F9F6EE] border-2 border-neutral-900 shadow-2xl text-neutral-900 p-4 sm:p-6 md:p-7 rounded-xs"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-neutral-900 pb-2 mb-4">
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-neutral-600 flex items-center gap-1.5">
              <Layers size={12} />
              <span>SECTORIAL BREAKDOWN</span>
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

          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-2xl font-serif font-black tracking-tight text-neutral-950 uppercase">
              {sector.name}
            </h2>
            <div
              className={`text-lg font-mono font-bold inline-flex items-center ${
                isPositive ? "text-emerald-800" : "text-rose-800"
              }`}
            >
              {isPositive ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
              <span>
                {isPositive ? "+" : ""}{sector.changePercent.toFixed(2)}%
              </span>
            </div>
          </div>

          <div className="bg-white border border-neutral-300 p-3.5 mb-4">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block mb-1">
              MACRO DRIVERS & CATALYSTS
            </span>
            <p className="text-xs sm:text-sm font-serif leading-relaxed text-neutral-800">
              {sector.analysis}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
            <div className="p-3 bg-white border border-neutral-200">
              <span className="text-[10px] font-mono uppercase text-emerald-800 font-bold block mb-1.5">
                UPSIDE CATALYSTS
              </span>
              <ul className="text-xs font-mono text-neutral-800 space-y-1">
                {sector.leaders.map((lead, i) => (
                  <li key={i} className="truncate">▲ {lead}</li>
                ))}
              </ul>
            </div>

            <div className="p-3 bg-white border border-neutral-200">
              <span className="text-[10px] font-mono uppercase text-rose-800 font-bold block mb-1.5">
                LAGGING DRAGGERS
              </span>
              <ul className="text-xs font-mono text-neutral-800 space-y-1">
                {sector.laggards.map((lag, i) => (
                  <li key={i} className="truncate">▼ {lag}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
