"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { formatIndianCurrency } from "@/data/forecast";

interface WhatIfModeProps {
  active: boolean;
  onToggle: () => void;
  monthlyBoost: number;
  currentWealth: number;
  boostedWealth: number;
}

export default function WhatIfMode({
  active,
  onToggle,
  monthlyBoost,
  currentWealth,
  boostedWealth,
}: WhatIfModeProps) {
  const difference = boostedWealth - currentWealth;

  return (
    <div className="select-none">
      <button
        type="button"
        onClick={onToggle}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
          active
            ? "bg-deep-green text-white shadow-xs"
            : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200/80 border border-neutral-200"
        }`}
      >
        <Sparkles size={12} className={active ? "text-emerald-300" : "text-amber-700"} />
        <span className="tabular-nums">WHAT IF? (+₹{monthlyBoost.toLocaleString("en-IN")}/mo)</span>
      </button>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden mt-2"
          >
            <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 text-xs font-mono text-emerald-950 flex flex-wrap items-center justify-between gap-2 tabular-nums">
              <div className="flex items-center gap-1.5">
                <span>Base: <strong>{formatIndianCurrency(currentWealth)}</strong></span>
                <ArrowRight size={12} className="text-emerald-700" />
                <span>Boosted: <strong>{formatIndianCurrency(boostedWealth)}</strong></span>
              </div>
              <div className="font-semibold text-deep-green bg-white/80 px-2.5 py-1 rounded-md border border-emerald-300/40">
                Potential Gain: +{formatIndianCurrency(difference)}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
