"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { formatIndianCurrency, formatExactIndianCurrency } from "@/data/forecast";
import { GraphPoint, Milestone } from "./types";

interface ExploreTimelineModalProps {
  isOpen: boolean;
  onClose: () => void;
  points: GraphPoint[];
  milestones: Milestone[];
  monthlyInvestment: number;
  years: number;
  expectedReturn: number;
  finalWealth: number;
  totalInvested: number;
  isProfit?: boolean;
  isDownturn?: boolean;
}

export default function ExploreTimelineModal({
  isOpen,
  onClose,
  points,
  milestones,
  monthlyInvestment,
  years,
  expectedReturn,
  finalWealth,
  totalInvested,
}: ExploreTimelineModalProps) {
  const [selectedYear, setSelectedYear] = useState<number>(points[points.length - 1]?.year || years);

  if (!isOpen) return null;

  const activePoint = points.find((p) => p.year === selectedYear) || points[points.length - 1];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 select-text">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white border border-light-border shadow-2xl p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl text-primary"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-light-border pb-4 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-deep-green flex items-center justify-center">
                <Sparkles size={18} />
              </div>
              <div>
                <h3 className="font-serif text-2xl text-primary">
                  Interactive Wealth Timeline
                </h3>
                <p className="text-xs font-mono text-secondary">
                  Year-by-Year Compounding Exploration · {years} Years Horizon
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer text-secondary hover:text-primary"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* Key Metrics Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 font-mono text-xs">
            <div className="p-3.5 rounded-2xl bg-gray-50 border border-light-border">
              <span className="text-secondary text-[11px] block">MONTHLY SIP</span>
              <span className="font-bold text-base text-primary">
                {formatExactIndianCurrency(monthlyInvestment)}
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-gray-50 border border-light-border">
              <span className="text-secondary text-[11px] block">EXPECTED CAGR</span>
              <span className="font-bold text-base text-primary">{expectedReturn}%</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-gray-50 border border-light-border">
              <span className="text-secondary text-[11px] block">TOTAL CAPITAL</span>
              <span className="font-bold text-base text-primary">
                {formatIndianCurrency(totalInvested)}
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
              <span className="text-emerald-800 text-[11px] block">FUTURE WEALTH</span>
              <span className="font-bold text-base text-deep-green">
                {formatIndianCurrency(finalWealth)}
              </span>
            </div>
          </div>

          {/* Scrubbable Year-by-Year Selector Ribbon */}
          <div className="mb-6">
            <label className="text-xs font-mono font-semibold text-secondary uppercase tracking-wider block mb-2">
              Select Year on the Journey:
            </label>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
              {points.map((p) => (
                <button
                  key={p.year}
                  type="button"
                  onClick={() => setSelectedYear(p.year)}
                  className={`px-3 py-2 rounded-xl text-xs font-mono shrink-0 transition-all cursor-pointer ${
                    selectedYear === p.year
                      ? "bg-primary text-white font-bold shadow-xs scale-105"
                      : "bg-gray-50 text-secondary hover:bg-gray-100 hover:text-primary border border-light-border"
                  }`}
                >
                  <div>{p.calendarYear}</div>
                  <div className="text-[10px] opacity-80">Yr {p.year}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Year Focus Card */}
          {activePoint && (
            <div className="p-5 rounded-2xl bg-[#F7F7F2] border border-light-border mb-6">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 mb-4">
                <div>
                  <span className="text-xs font-mono uppercase text-secondary">
                    MILESTONE YEAR {activePoint.calendarYear}
                  </span>
                  <h4 className="text-3xl font-serif text-deep-green tabular-nums">
                    {formatExactIndianCurrency(activePoint.value)}
                  </h4>
                </div>

                <div className="flex gap-4 text-xs font-mono text-secondary">
                  <div>
                    Invested: <strong className="text-primary">{formatIndianCurrency(activePoint.invested)}</strong>
                  </div>
                  <div>
                    Growth: <strong className="text-deep-green">+{formatIndianCurrency(activePoint.growth)}</strong>
                  </div>
                </div>
              </div>

              {/* Progress Bar of Compounding */}
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden flex">
                <div
                  className="bg-neutral-600 h-full"
                  style={{
                    width: `${Math.min(100, (activePoint.invested / activePoint.value) * 100)}%`,
                  }}
                  title="Capital Invested"
                />
                <div
                  className="bg-deep-green h-full"
                  style={{
                    width: `${Math.max(0, 100 - (activePoint.invested / activePoint.value) * 100)}%`,
                  }}
                  title="Compounded Growth"
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-secondary mt-1">
                <span>Principal: {formatIndianCurrency(activePoint.invested)}</span>
                <span>Compounding Gain: {formatIndianCurrency(activePoint.growth)}</span>
              </div>
            </div>
          )}

          {/* Strategic Milestones Checklist */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-secondary mb-3">
              Journey Milestones
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {milestones.map((m) => (
                <div
                  key={m.year}
                  className="p-3 rounded-xl bg-white border border-light-border flex items-center justify-between text-xs font-mono"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-deep-green" />
                    <div>
                      <span className="font-bold text-primary block">{m.calendarYear} ({m.label})</span>
                      <span className="text-[10px] text-secondary">Year {m.year}</span>
                    </div>
                  </div>
                  <span className="font-bold text-deep-green">
                    {formatIndianCurrency(m.value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
