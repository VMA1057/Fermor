"use client";

import React, { useState, useRef, useCallback, useEffect, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useCursor } from "../cursor/CursorContext";
import { alternateScenarios } from "./alternateFutureData";
import AlternateFutureGraph from "./AlternateFutureGraph";
import AlternateTimelineModal from "./AlternateTimelineModal";
import { formatIndianCurrency } from "@/data/forecast";
import {
  TrendingUp,
  ArrowUpRight,
  RotateCcw,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function WhatIf() {
  const { setCursorState } = useCursor();
  const [activeId, setActiveId] = useState<"sip" | "retire" | "expenses">("sip");
  const [replayKey, setReplayKey] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scenario = alternateScenarios.find((s) => s.id === activeId) || alternateScenarios[0];

  const [displayDiff, setDisplayDiff] = useState(formatIndianCurrency(scenario.potentialDifference));
  const [displayAltWealth, setDisplayAltWealth] = useState(formatIndianCurrency(scenario.alternateWealth));

  const springDiff = useSpring(scenario.potentialDifference, {
    stiffness: 110,
    damping: 18,
    mass: 0.6,
  });

  const springAltWealth = useSpring(scenario.alternateWealth, {
    stiffness: 110,
    damping: 18,
    mass: 0.6,
  });

  useEffect(() => {
    springDiff.set(scenario.potentialDifference);
    springAltWealth.set(scenario.alternateWealth);
  }, [scenario, springDiff, springAltWealth]);

  useEffect(() => {
    const unsubDiff = springDiff.on("change", (latest) => {
      setDisplayDiff(formatIndianCurrency(Math.round(latest)));
    });
    const unsubAlt = springAltWealth.on("change", (latest) => {
      setDisplayAltWealth(formatIndianCurrency(Math.round(latest)));
    });
    return () => {
      unsubDiff();
      unsubAlt();
    };
  }, [springDiff, springAltWealth]);

  // 3D Perspective Tilt for the Right-Side Card
  const cardRef = useRef<HTMLDivElement>(null);
  const isTouchOrReduced = useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") return () => {};
      const touch = window.matchMedia("(pointer: coarse)");
      const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
      touch.addEventListener("change", callback);
      motion.addEventListener("change", callback);
      return () => {
        touch.removeEventListener("change", callback);
        motion.removeEventListener("change", callback);
      };
    },
    () => window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 220, damping: 26, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);

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

  const handleSelectScenario = (id: "sip" | "retire" | "expenses") => {
    setActiveId(id);
    setReplayKey((k) => k + 1);
  };

  const handleReplay = () => {
    setReplayKey((k) => k + 1);
  };

  return (
    <section id="what-if" className="py-20 sm:py-24 px-4 sm:px-6 md:px-12 bg-white relative overflow-hidden select-none">
      <div className="container mx-auto">
        {/* Editorial Section Headline */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-primary mb-4 sm:mb-6 text-balance"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            What if one decision changed your future?
          </motion.h2>
          <motion.p 
            className="text-base sm:text-lg text-secondary leading-relaxed font-sans"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Small adjustments today can compound into massive differences tomorrow. See how changing your variables creates an alternate version of your financial life.
          </motion.p>
        </div>

        {/* 2-Column Alternate-Future Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ========================================================= */}
          {/* LEFT COLUMN: DECISION SELECTOR CARDS                       */}
          {/* ========================================================= */}
          <div className="lg:col-span-4 flex flex-col gap-3.5 sm:gap-4">
            <div className="text-[11px] font-mono uppercase tracking-widest text-secondary font-bold px-1 mb-1">
              SELECT A DECISION POINT:
            </div>

            {alternateScenarios.map((item) => {
              const isSelected = activeId === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectScenario(item.id)}
                  onMouseEnter={() => setCursorState("hover")}
                  onMouseLeave={() => setCursorState("normal")}
                  className={`p-4 sm:p-6 text-left rounded-2xl sm:rounded-3xl transition-all duration-300 border relative group cursor-pointer ${
                    isSelected
                      ? "bg-[#111111] text-white border-[#111111] shadow-2xl scale-[1.01] sm:scale-[1.02] z-10"
                      : "bg-[#F7F7F2] text-primary border-light-border hover:border-neutral-300 hover:bg-neutral-100/80 shadow-xs"
                  }`}
                >
                  <div className="flex items-start justify-between mb-1.5">
                    <span className={`text-[10px] font-mono uppercase tracking-wider font-bold ${
                      isSelected ? "text-emerald-400" : "text-neutral-500"
                    }`}>
                      {item.badge}
                    </span>

                    <span className={`transition-transform duration-300 ${
                      isSelected ? "text-emerald-400 translate-x-0.5 -translate-y-0.5" : "text-neutral-400 group-hover:text-primary"
                    }`}>
                      <ArrowUpRight size={18} />
                    </span>
                  </div>

                  <h3 className={`text-xl font-serif mb-1 tracking-tight ${
                    isSelected ? "text-white" : "text-primary"
                  }`}>
                    {item.title}
                  </h3>

                  <p className={`text-sm font-mono ${
                    isSelected ? "text-neutral-300 font-semibold" : "text-secondary"
                  }`}>
                    {item.action}
                  </p>

                  {/* Micro indicator line when active */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeDecisionPill"
                      className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-10 rounded-r-full bg-emerald-500"
                    />
                  )}
                </button>
              );
            })}

            {/* Decision Replay Helper */}
            <div className="pt-2 px-1 flex items-center justify-between text-xs font-mono text-secondary">
              <span className="italic">One decision → Two possible futures</span>
              <button
                type="button"
                onClick={handleReplay}
                className="inline-flex items-center gap-1 hover:text-primary transition-colors cursor-pointer"
                title="Replay decision transformation"
              >
                <RotateCcw size={12} />
                <span>Replay</span>
              </button>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: THE ALTERNATE YOU (3D VISUALIZATION)        */}
          {/* ========================================================= */}
          <div className="lg:col-span-8" style={{ perspective: "1300px" }}>
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
              className="relative bg-[#FAF7EE] rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 border border-[#E3DAC9] shadow-xl overflow-hidden transition-shadow duration-300 will-change-transform"
            >
              {/* Subtle Ambient Radial Highlight */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-24 -mt-24" />

              {/* 1. Header: "THE ALTERNATE YOU" */}
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 border-b border-neutral-300/80 pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-300 text-deep-green text-xs font-mono font-bold uppercase tracking-wider mb-1.5">
                    <TrendingUp size={13} />
                    <span>THE ALTERNATE YOU</span>
                  </div>
                  <p className="text-xs sm:text-sm font-sans text-secondary">
                    See how one decision today could change your financial future.
                  </p>
                </div>

                <div className="text-[11px] font-mono text-neutral-500 hidden sm:block">
                  Simulated Compounding Horizon: {scenario.years} Yrs
                </div>
              </div>

              {/* 2. Side-by-Side Dual Future Metrics */}
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {/* Current Future */}
                <div className="p-3.5 rounded-2xl bg-white/70 border border-neutral-200">
                  <span className="text-[10px] font-mono uppercase text-neutral-400 font-semibold block mb-0.5">
                    CURRENT FUTURE
                  </span>
                  <div className="font-serif text-2xl text-neutral-600 tabular-nums">
                    {formatIndianCurrency(scenario.baseWealth)}
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400">Baseline path</span>
                </div>

                {/* Alternate Future */}
                <div className="p-3.5 rounded-2xl bg-emerald-50/90 border border-emerald-300/80 shadow-xs">
                  <span className="text-[10px] font-mono uppercase text-emerald-800 font-bold block mb-0.5 flex items-center gap-1">
                    <Sparkles size={11} />
                    <span>ALTERNATE FUTURE</span>
                  </span>
                  <motion.div className="font-serif text-2xl text-deep-green tabular-nums">
                    {displayAltWealth}
                  </motion.div>
                  <span className="text-[11px] font-mono text-emerald-900 font-semibold">New compounding curve</span>
                </div>

                {/* Big Result: Potential Difference */}
                <div className="p-3.5 rounded-2xl bg-[#111111] text-white border border-neutral-800 shadow-md">
                  <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block mb-0.5">
                    POTENTIAL FUTURE DIFFERENCE
                  </span>
                  <motion.div className="font-serif text-2xl text-white tabular-nums">
                    +{displayDiff}
                  </motion.div>
                  <span className="text-[11px] font-mono text-white/60">Estimated projection</span>
                </div>
              </div>

              {/* 3. Hero Visual: Dual Trajectory Living Graph */}
              <div className="relative z-10 my-2">
                <AlternateFutureGraph
                  scenario={scenario}
                  replayKey={replayKey}
                />
              </div>

              {/* 4. "WHAT ACTUALLY CHANGED?" Micro-Explanation */}
              <div className="relative z-10 mt-6 pt-5 border-t border-neutral-300/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-neutral-800">
                    WHAT ACTUALLY CHANGED?
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500 italic">
                    Compounding mechanics
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-mono text-neutral-800">
                  <div className="p-2.5 rounded-xl bg-white/80 border border-neutral-200">
                    ✓ {scenario.changedBullet1}
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/80 border border-neutral-200">
                    ✓ {scenario.changedBullet2}
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/80 border border-neutral-200">
                    ✓ {scenario.changedBullet3}
                  </div>
                </div>
              </div>

              {/* 5. "FUTURE SNAPSHOT" & CTA Row */}
              <div className="relative z-10 mt-6 pt-4 border-t border-neutral-300/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-xs font-mono text-neutral-600">
                  <div>
                    Extra Capital: <strong>{formatIndianCurrency(scenario.additionalInvested)}</strong>
                  </div>
                  <span>·</span>
                  <div>
                    Extra Compounding: <strong className="text-deep-green">+{formatIndianCurrency(scenario.additionalGrowth)}</strong>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white hover:bg-deep-green transition-all rounded-full text-xs font-mono font-bold uppercase tracking-wider shadow-sm cursor-pointer active:scale-95"
                >
                  <span>Explore This Future</span>
                  <ArrowRight size={13} />
                </button>
              </div>

            </motion.div>
          </div>

        </div>
      </div>

      {/* Expanded Timeline Inspection Modal */}
      <AlternateTimelineModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        scenario={scenario}
      />
    </section>
  );
}
