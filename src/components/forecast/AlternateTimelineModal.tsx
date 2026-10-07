"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { AlternateScenario } from "./alternateFutureData";
import { formatIndianCurrency, formatExactIndianCurrency } from "@/data/forecast";

interface AlternateTimelineModalProps {
  isOpen: boolean;
  onClose: () => void;
  scenario: AlternateScenario;
}

export default function AlternateTimelineModal({
  isOpen,
  onClose,
  scenario,
}: AlternateTimelineModalProps) {
  const [selectedYearIndex, setSelectedYearIndex] = useState<number>(scenario.years);

  if (!isOpen) return null;

  const startYear = new Date().getFullYear();
  const yearsList = Array.from({ length: scenario.years + 1 }).map((_, idx) => {
    const progress = idx / scenario.years;
    const baseVal = Math.round(scenario.baseWealth * Math.pow(progress, 2.2));
    const altVal = Math.round(scenario.alternateWealth * Math.pow(progress, 1.85));
    const baseInvested = scenario.baseMonthly * idx * 12;
    const altInvested = scenario.newMonthly * idx * 12;

    return {
      index: idx,
      calendarYear: startYear + idx,
      baseVal,
      altVal,
      diff: altVal - baseVal,
      baseInvested,
      altInvested,
      extraGrowth: (altVal - baseVal) - (altInvested - baseInvested),
    };
  });

  const activeYear = yearsList.find((y) => y.index === selectedYearIndex) || yearsList[yearsList.length - 1];

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
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white border border-light-border shadow-2xl p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl text-primary"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-light-border pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-deep-green flex items-center justify-center">
                <Sparkles size={20} />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 font-bold block">
                  THE ALTERNATE YOU · TIMELINE EXPLORATION
                </span>
                <h3 className="font-serif text-2xl text-primary">
                  {scenario.title} ({scenario.action})
                </h3>
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

          {/* Dual Future Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-6 text-xs font-mono">
            <div className="p-4 rounded-2xl bg-gray-50 border border-light-border">
              <span className="text-secondary text-[11px] block uppercase mb-1">
                CURRENT FUTURE
              </span>
              <span className="font-serif text-2xl text-neutral-600 block mb-1 tabular-nums">
                {formatIndianCurrency(scenario.baseWealth)}
              </span>
              <span className="text-neutral-500 text-[11px] tabular-nums">
                {formatIndianCurrency(scenario.baseMonthly)}/mo baseline allocation
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/90 shadow-sm">
              <span className="text-emerald-800 text-[11px] font-bold block uppercase mb-1 flex items-center gap-1">
                <Sparkles size={11} />
                <span>ALTERNATE FUTURE</span>
              </span>
              <span className="font-serif text-2xl text-deep-green block mb-1 tabular-nums">
                {formatIndianCurrency(scenario.alternateWealth)}
              </span>
              <span className="text-emerald-900 text-[11px] tabular-nums">
                {formatIndianCurrency(scenario.newMonthly)}/mo adjusted allocation
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#141614] text-[#F7F7F2] border border-white/10 shadow-sm">
              <span className="text-white/60 text-[11px] block uppercase mb-1">
                PROJECTED DIFFERENCE
              </span>
              <span className="font-serif text-2xl text-emerald-400 block mb-1 tabular-nums">
                +{formatIndianCurrency(scenario.potentialDifference)}
              </span>
              <span className="text-white/70 text-[11px]">
                Compounded over {scenario.years} years
              </span>
            </div>
          </div>

          {/* Year-by-Year Scrubber */}
          <div className="mb-6">
            <label className="text-xs font-mono font-semibold text-secondary uppercase tracking-wider block mb-2">
              Select Year Along Compounding Horizon:
            </label>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
              {yearsList.map((y) => (
                <button
                  key={y.index}
                  type="button"
                  onClick={() => setSelectedYearIndex(y.index)}
                  className={`px-3 py-2 rounded-xl text-xs font-mono shrink-0 transition-all cursor-pointer ${
                    selectedYearIndex === y.index
                      ? "bg-primary text-white font-bold shadow-xs scale-105"
                      : "bg-gray-50 text-secondary hover:bg-gray-100 hover:text-primary border border-light-border"
                  }`}
                >
                  <div>{y.calendarYear}</div>
                  <div className="text-[10px] opacity-75">Yr {y.index}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Active Year Comparison Breakdown */}
          {activeYear && (
            <div className="p-5 rounded-2xl bg-[#F7F7F2] border border-light-border mb-6">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 mb-4">
                <div>
                  <span className="text-xs font-mono uppercase text-secondary">
                    MILESTONE YEAR {activeYear.calendarYear} (YEAR {activeYear.index})
                  </span>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className="font-serif text-3xl text-deep-green tabular-nums">
                      {formatExactIndianCurrency(activeYear.altVal)}
                    </span>
                    <span className="font-mono text-sm text-emerald-700 font-semibold">
                      (+{formatIndianCurrency(activeYear.diff)} vs baseline)
                    </span>
                  </div>
                </div>

                <div className="text-xs font-mono text-secondary sm:text-right">
                  <div>Baseline at this point: <strong>{formatIndianCurrency(activeYear.baseVal)}</strong></div>
                  <div>Additional invested: <strong>{formatIndianCurrency(activeYear.altInvested - activeYear.baseInvested)}</strong></div>
                </div>
              </div>

              {/* Compounding bar */}
              <div className="h-2.5 w-full bg-gray-200 rounded-full overflow-hidden flex">
                <div
                  className="bg-neutral-600 h-full"
                  style={{
                    width: `${Math.min(100, (activeYear.altInvested / activeYear.altVal) * 100)}%`,
                  }}
                  title="Capital Invested"
                />
                <div
                  className="bg-deep-green h-full"
                  style={{
                    width: `${Math.max(0, 100 - (activeYear.altInvested / activeYear.altVal) * 100)}%`,
                  }}
                  title="Compounded Returns"
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-secondary mt-1.5">
                <span>Total Principal: {formatIndianCurrency(activeYear.altInvested)}</span>
                <span>Compounded Surge: {formatIndianCurrency(activeYear.altVal - activeYear.altInvested)}</span>
              </div>
            </div>
          )}

          {/* Decision Rationale */}
          <div className="bg-white p-4 rounded-2xl border border-light-border">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-secondary mb-2">
              Decision Drivers & Realities
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono text-neutral-700">
              <div className="p-2.5 bg-gray-50 rounded-xl">✓ {scenario.changedBullet1}</div>
              <div className="p-2.5 bg-gray-50 rounded-xl">✓ {scenario.changedBullet2}</div>
              <div className="p-2.5 bg-gray-50 rounded-xl">✓ {scenario.changedBullet3}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
