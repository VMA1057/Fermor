"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Milestone } from "./types";
import { formatIndianCurrency } from "@/data/forecast";

interface WealthMilestoneProps {
  milestone: Milestone;
  isProfit: boolean;
  isDownturn: boolean;
}

export default function WealthMilestone({
  milestone,
  isProfit,
  isDownturn,
}: WealthMilestoneProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isPositive = !isDownturn && isProfit;

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
      style={{
        left: `${milestone.xPercent}%`,
        top: `${milestone.yPercent}%`,
        transform: "translate(-50%, -50%) translateZ(24px)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Visual Marker Dot */}
      <div className="relative flex items-center justify-center">
        {/* Pulse ring on hover */}
        <span
          className={`absolute w-5 h-5 rounded-full opacity-0 group-hover:opacity-40 transition-opacity animate-ping ${
            isPositive ? "bg-emerald-500" : "bg-rose-500"
          }`}
        />
        <div
          className={`w-3.5 h-3.5 rounded-full border-2 bg-white transition-transform duration-200 group-hover:scale-125 shadow-xs ${
            isPositive ? "border-emerald-700" : "border-rose-700"
          }`}
        />
      </div>

      {/* Milestone Year Label */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono text-neutral-500 opacity-70 group-hover:opacity-100 transition-opacity">
        {milestone.calendarYear}
      </div>

      {/* Floating Milestone Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.94 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 w-44 bg-[#141614] text-[#F7F7F2] p-2.5 rounded-xl shadow-xl border border-white/10 pointer-events-none select-none"
          >
            <div className="text-[10px] font-mono uppercase text-emerald-400 font-bold mb-1">
              {milestone.calendarYear} · {milestone.label}
            </div>

            <div className="space-y-1 text-[11px] font-mono">
              <div className="flex justify-between">
                <span className="text-white/60">Portfolio:</span>
                <span className="font-bold text-white">
                  {formatIndianCurrency(milestone.value)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Invested:</span>
                <span className="text-white/90">
                  {formatIndianCurrency(milestone.invested)}
                </span>
              </div>
              <div className="flex justify-between pt-1 border-t border-white/10">
                <span className="text-white/60">Growth:</span>
                <span className={milestone.growth >= 0 ? "text-emerald-400" : "text-rose-400"}>
                  {milestone.growth >= 0 ? "+" : ""}{formatIndianCurrency(milestone.growth)}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
