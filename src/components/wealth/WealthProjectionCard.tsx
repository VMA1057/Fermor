"use client";

import React, { useState, useMemo, useRef, useCallback, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useCursor } from "../cursor/CursorContext";
import { calculateSIP, generateChartData, formatExactIndianCurrency } from "@/data/forecast";
import { ArrowRight } from "lucide-react";
import FinancialParticles from "./FinancialParticles";
import WealthGraph from "./WealthGraph";
import WealthValue from "./WealthValue";
import FutureDestination from "./FutureDestination";
import WhatIfMode from "./WhatIfMode";
import SmartInsight from "./SmartInsight";
import ExploreTimelineModal from "./ExploreTimelineModal";
import { GraphPoint, Milestone } from "./types";

export interface WealthProjectionCardProps {
  initialMonthly?: number;
  initialYears?: number;
  initialReturn?: number;
}

export default function WealthProjectionCard({
  initialMonthly = 10000,
  initialYears = 15,
  initialReturn = 12,
}: WealthProjectionCardProps) {
  const { setCursorState } = useCursor();

  // Inputs State
  const [monthlyInvestment, setMonthlyInvestment] = useState(initialMonthly);
  const [years, setYears] = useState(initialYears);
  const [expectedReturn, setExpectedReturn] = useState(initialReturn);
  const [isDownturn, setIsDownturn] = useState(false);
  const [whatIfActive, setWhatIfActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Client mounted state via useSyncExternalStore for clean SSR hydration
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  // Reduced motion and coarse pointer detection via useSyncExternalStore
  const isTouchOrReduced = useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") return () => {};
      const touchMedia = window.matchMedia("(pointer: coarse)");
      const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
      touchMedia.addEventListener("change", callback);
      motionMedia.addEventListener("change", callback);
      return () => {
        touchMedia.removeEventListener("change", callback);
        motionMedia.removeEventListener("change", callback);
      };
    },
    () => window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );

  // 3D Perspective Tilt on Mouse Movement
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 220, damping: 26, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchOrReduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(normX);
    mouseY.set(normY);
  }, [isTouchOrReduced, mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setCursorState("normal");
  }, [mouseX, mouseY, setCursorState]);

  // Effective return rate accounting for Downturn toggle
  const effectiveReturn = isDownturn ? (expectedReturn > 0 ? -expectedReturn * 0.4 : expectedReturn) : expectedReturn;

  // Compounding Calculations
  const currentYear = new Date().getFullYear();
  const totalInvested = monthlyInvestment * years * 12;
  const finalWealth = useMemo(() => {
    return Math.max(0, Math.round(calculateSIP(monthlyInvestment, years, effectiveReturn)));
  }, [monthlyInvestment, years, effectiveReturn]);

  const isProfit = finalWealth >= totalInvested && !isDownturn;
  const growthAmount = finalWealth - totalInvested;
  const profitPercent = totalInvested > 0 ? (growthAmount / totalInvested) * 100 : 0;

  // What-If Boost calculations (+₹5,000/mo)
  const whatIfBoost = 5000;
  const boostedWealth = useMemo(() => {
    return Math.max(0, Math.round(calculateSIP(monthlyInvestment + whatIfBoost, years, effectiveReturn)));
  }, [monthlyInvestment, years, effectiveReturn, whatIfBoost]);

  // Generate Normalized Points for SVG Curve
  const { points, whatIfPoints, milestones } = useMemo(() => {
    const rawData = generateChartData(monthlyInvestment, years, effectiveReturn);
    const maxVal = Math.max(
      finalWealth,
      whatIfActive ? boostedWealth : 0,
      totalInvested,
      100000
    ) * 1.08;

    const computedPoints: GraphPoint[] = rawData.map((d, idx) => {
      const xPercent = (idx / years) * 100;
      // y is inverted in SVG: 0 at top, 100 at bottom
      const yPercent = 100 - Math.min(95, Math.max(5, (d.value / maxVal) * 90 + 5));

      return {
        year: idx,
        calendarYear: d.year,
        value: d.value,
        invested: d.invested,
        growth: d.value - d.invested,
        xPercent,
        yPercent,
      };
    });

    // What-If baseline ghost curve
    let computedWhatIf: GraphPoint[] | null = null;
    if (whatIfActive) {
      const wiData = generateChartData(monthlyInvestment + whatIfBoost, years, effectiveReturn);
      computedWhatIf = wiData.map((d, idx) => {
        const xPercent = (idx / years) * 100;
        const yPercent = 100 - Math.min(95, Math.max(5, (d.value / maxVal) * 90 + 5));
        return {
          year: idx,
          calendarYear: d.year,
          value: d.value,
          invested: d.invested,
          growth: d.value - d.invested,
          xPercent,
          yPercent,
        };
      });
    }

    // Meaningful Milestone Markers (e.g. 25%, 50%, 75%, 100% of the timeline)
    const computedMilestones: Milestone[] = [];
    const milestoneSteps = [
      Math.max(1, Math.round(years * 0.25)),
      Math.max(2, Math.round(years * 0.5)),
      Math.max(3, Math.round(years * 0.75)),
      years,
    ];

    // Remove duplicates
    const uniqueSteps = Array.from(new Set(milestoneSteps));
    uniqueSteps.forEach((yr) => {
      const pt = computedPoints.find((p) => p.year === yr);
      if (pt) {
        let label = `Yr ${yr}`;
        if (yr === years) label = "Target";
        else if (pt.value >= 10000000) label = "₹1 Cr";
        else if (pt.value >= 5000000) label = "₹50L";
        else if (pt.value >= 2500000) label = "₹25L";
        else if (pt.value >= 1000000) label = "₹10L";

        computedMilestones.push({
          year: pt.year,
          calendarYear: pt.calendarYear,
          label,
          value: pt.value,
          invested: pt.invested,
          growth: pt.growth,
          xPercent: pt.xPercent,
          yPercent: pt.yPercent,
        });
      }
    });

    return { points: computedPoints, whatIfPoints: computedWhatIf, milestones: computedMilestones };
  }, [monthlyInvestment, years, effectiveReturn, finalWealth, whatIfActive, boostedWealth, totalInvested, whatIfBoost]);

  if (!mounted) {
    return <div className="h-[520px] bg-white rounded-3xl border border-light-border" />;
  }

  return (
    <div style={{ perspective: "1200px" }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setCursorState("financial")}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: isTouchOrReduced ? 0 : rotateX,
          rotateY: isTouchOrReduced ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative bg-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm border border-light-border overflow-hidden transition-shadow duration-300 hover:shadow-xl will-change-transform select-none"
      >
        {/* Layer 1: Background Financial Particles (Behind UI) */}
        <FinancialParticles
          isProfit={isProfit}
          isDownturn={isDownturn}
          profitPercent={profitPercent}
          reducedMotion={isTouchOrReduced}
        />

        {/* Layer 2: Main Card Interface */}
        <div className="relative z-10" style={{ transform: "translateZ(10px)" }}>
          
          {/* Header Row: Wealth Value & Future Destination Badge */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
            <div className="relative">
              <WealthValue
                value={finalWealth}
                invested={totalInvested}
                growth={growthAmount}
                isProfit={isProfit}
                isDownturn={isDownturn}
              />
            </div>

            {/* Elevated 3D Destination Badge */}
            <div className="flex items-center gap-3">
              <FutureDestination
                finalYear={currentYear + years}
                finalWealth={finalWealth}
                isProfit={isProfit}
                isDownturn={isDownturn}
              />
            </div>
          </div>

          {/* Living Wealth Graph (The Core Journey) */}
          <WealthGraph
            points={points}
            milestones={milestones}
            whatIfPoints={whatIfPoints}
            isProfit={isProfit}
            isDownturn={isDownturn}
            reducedMotion={isTouchOrReduced}
          />

          {/* Scenario Controls & What-If Action */}
          <div className="flex flex-wrap items-center justify-between gap-3 my-4 pt-2 border-t border-light-border/70">
            <WhatIfMode
              active={whatIfActive}
              onToggle={() => setWhatIfActive(!whatIfActive)}
              monthlyBoost={whatIfBoost}
              currentWealth={finalWealth}
              boostedWealth={boostedWealth}
            />

            {/* Growth vs Downturn State Pill */}
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-mono">
              <button
                type="button"
                onClick={() => setIsDownturn(false)}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  !isDownturn
                    ? "bg-deep-green text-white font-semibold shadow-xs"
                    : "text-neutral-600 hover:text-neutral-950"
                }`}
              >
                Growth
              </button>
              <button
                type="button"
                onClick={() => setIsDownturn(true)}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  isDownturn
                    ? "bg-rose-800 text-white font-semibold shadow-xs"
                    : "text-neutral-600 hover:text-neutral-950"
                }`}
              >
                Downturn
              </button>
            </div>
          </div>

          {/* Input Sliders */}
          <div className="space-y-5 my-6">
            {/* Monthly Investment */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-medium text-primary">Monthly Investment</label>
                <span className="text-sm font-semibold tabular-nums text-primary font-mono">
                  {formatExactIndianCurrency(monthlyInvestment)}
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="100000"
                step="1000"
                value={monthlyInvestment}
                onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-deep-green"
              />
            </div>

            {/* Investment Horizon */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-medium text-primary">Investment Period</label>
                <span className="text-sm font-semibold tabular-nums text-primary font-mono">
                  {years} Years ({currentYear + years})
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-deep-green"
              />
            </div>

            {/* Expected CAGR */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-medium text-primary">Expected Return (CAGR)</label>
                <span className={`text-sm font-semibold tabular-nums font-mono ${
                  effectiveReturn >= 0 ? "text-deep-green" : "text-rose-800"
                }`}>
                  {effectiveReturn >= 0 ? `+${effectiveReturn}` : effectiveReturn}%
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                step="0.5"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(Number(e.target.value))}
                className={`w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer ${
                  effectiveReturn >= 0 ? "accent-deep-green" : "accent-rose-800"
                }`}
              />
            </div>
          </div>

          {/* Contextual Smart Micro-Insight */}
          <div className="mb-6">
            <SmartInsight
              monthlyInvestment={monthlyInvestment}
              years={years}
              expectedReturn={effectiveReturn}
              finalWealth={finalWealth}
              isProfit={isProfit}
              isDownturn={isDownturn}
            />
          </div>

          {/* Footer CTA: Explore Your Future Modal Trigger */}
          <div className="pt-4 border-t border-light-border flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs font-mono text-secondary">
              Compounded with monthly rupee-cost averaging
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white hover:bg-deep-green transition-all rounded-full text-xs font-mono font-bold uppercase tracking-wider shadow-sm cursor-pointer active:scale-95"
            >
              <span>Explore Your Future</span>
              <ArrowRight size={13} />
            </button>
          </div>

        </div>
      </motion.div>

      {/* Expanded Full Timeline Inspection Modal */}
      <ExploreTimelineModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        points={points}
        milestones={milestones}
        monthlyInvestment={monthlyInvestment}
        years={years}
        expectedReturn={effectiveReturn}
        finalWealth={finalWealth}
        totalInvested={totalInvested}
        isProfit={isProfit}
        isDownturn={isDownturn}
      />
    </div>
  );
}
