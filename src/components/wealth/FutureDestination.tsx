"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, TrendingDown } from "lucide-react";
import { formatIndianCurrency } from "@/data/forecast";

interface FutureDestinationProps {
  finalYear: number;
  finalWealth: number;
  isProfit: boolean;
  isDownturn: boolean;
}

export default function FutureDestination({
  finalYear,
  finalWealth,
  isProfit,
  isDownturn,
}: FutureDestinationProps) {
  const isPositive = !isDownturn && isProfit;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`inline-flex items-center gap-2.5 px-3 py-1.5 rounded-2xl border shadow-sm backdrop-blur-md transition-all duration-300 select-none ${
        isPositive
          ? "bg-emerald-50/90 border-emerald-200/90 text-emerald-950 shadow-emerald-900/5"
          : "bg-rose-50/90 border-rose-200/90 text-rose-950 shadow-rose-900/5"
      }`}
      style={{
        transform: "translateZ(30px)",
      }}
    >
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
          isPositive ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"
        }`}
      >
        {isPositive ? <Sparkles size={13} /> : <TrendingDown size={13} />}
      </div>

      <div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-neutral-500">
            {finalYear}
          </span>
          <span className="text-[9px] font-mono tracking-widest uppercase text-neutral-400">
            · {isPositive ? "FUTURE WEALTH" : "PRESERVED CAPITAL"}
          </span>
        </div>
        <div
          className={`font-serif text-sm sm:text-base tabular-nums tracking-tight ${
            isPositive ? "text-deep-green" : "text-rose-900"
          }`}
        >
          {formatIndianCurrency(finalWealth)}
        </div>
      </div>
    </motion.div>
  );
}
