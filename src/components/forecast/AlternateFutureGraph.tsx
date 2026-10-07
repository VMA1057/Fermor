"use client";

import React, { useState, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { AlternateScenario } from "./alternateFutureData";
import { formatIndianCurrency } from "@/data/forecast";
import { Clock } from "lucide-react";

interface AlternateFutureGraphProps {
  scenario: AlternateScenario;
  replayKey: number;
}

interface YearPoint {
  yearIndex: number;
  calendarYear: number;
  baseVal: number;
  altVal: number;
  diff: number;
  xPercent: number;
  yBasePercent: number;
  yAltPercent: number;
}

export default function AlternateFutureGraph({
  scenario,
  replayKey,
}: AlternateFutureGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredPoint, setHoveredPoint] = useState<YearPoint | null>(null);

  const startYear = new Date().getFullYear();
  const totalYears = scenario.years;

  // Generate Year-by-Year Points for both paths
  const yearPoints: YearPoint[] = useMemo(() => {
    const points: YearPoint[] = [];
    const maxVal = Math.max(scenario.alternateWealth, scenario.baseWealth) * 1.1;

    for (let i = 0; i <= totalYears; i++) {
      const progress = i / totalYears;
      // Exponential compounding curves
      const baseVal = Math.round(scenario.baseWealth * Math.pow(progress, 2.2));
      const altVal = Math.round(scenario.alternateWealth * Math.pow(progress, 1.85));
      const diff = altVal - baseVal;

      const xPercent = progress * 100;
      // SVG Y-coordinates (0 at top, 100 at bottom)
      const yBasePercent = 100 - Math.min(92, Math.max(8, (baseVal / maxVal) * 85 + 8));
      const yAltPercent = 100 - Math.min(92, Math.max(8, (altVal / maxVal) * 85 + 8));

      points.push({
        yearIndex: i,
        calendarYear: startYear + i,
        baseVal,
        altVal,
        diff,
        xPercent,
        yBasePercent,
        yAltPercent,
      });
    }
    return points;
  }, [scenario, totalYears, startYear]);

  // SVG geometry
  const width = 760;
  const height = 280;
  const padX = 40;
  const padY = 32;

  const { basePathD, altPathD, altAreaD } = useMemo(() => {
    const toCoords = (pts: YearPoint[], isAlt: boolean) =>
      pts.map((p) => ({
        x: padX + (p.xPercent / 100) * (width - 2 * padX),
        y: padY + ((isAlt ? p.yAltPercent : p.yBasePercent) / 100) * (height - 2 * padY),
      }));

    const baseCoords = toCoords(yearPoints, false);
    const altCoords = toCoords(yearPoints, true);

    // Smooth Bezier for Base
    let bD = `M ${baseCoords[0].x},${baseCoords[0].y}`;
    for (let i = 0; i < baseCoords.length - 1; i++) {
      const c = baseCoords[i];
      const n = baseCoords[i + 1];
      const mx = (c.x + n.x) / 2;
      bD += ` C ${mx},${c.y} ${mx},${n.y} ${n.x},${n.y}`;
    }

    // Smooth Bezier for Alternate
    let aD = `M ${altCoords[0].x},${altCoords[0].y}`;
    for (let i = 0; i < altCoords.length - 1; i++) {
      const c = altCoords[i];
      const n = altCoords[i + 1];
      const mx = (c.x + n.x) / 2;
      aD += ` C ${mx},${c.y} ${mx},${n.y} ${n.x},${n.y}`;
    }

    const lastAltX = altCoords[altCoords.length - 1].x;
    const firstAltX = altCoords[0].x;
    const aArea = `${aD} L ${lastAltX},${height} L ${firstAltX},${height} Z`;

    return { basePathD: bD, altPathD: aD, altAreaD: aArea };
  }, [yearPoints]);

  // Mouse scrubbing handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || yearPoints.length === 0) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const normX = Math.max(0, Math.min(1, mouseX / rect.width));

    let closest = yearPoints[0];
    let minDiff = 999;
    yearPoints.forEach((p) => {
      const diff = Math.abs(p.xPercent / 100 - normX);
      if (diff < minDiff) {
        minDiff = diff;
        closest = p;
      }
    });

    setHoveredPoint(closest);
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-64 sm:h-72 md:h-80 select-none cursor-crosshair"
      style={{ transform: "translateZ(18px)" }}
    >
      {/* SVG Trajectory Canvas */}
      <svg
        key={replayKey}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full overflow-visible"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="alternateGlowGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0F6B4F" stopOpacity={0.18} />
            <stop offset="90%" stopColor="#0F6B4F" stopOpacity={0.0} />
          </linearGradient>

          <filter id="altGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Horizontal Guide Grid */}
        <line
          x1={padX}
          y1={height * 0.3}
          x2={width - padX}
          y2={height * 0.3}
          stroke="#E5E5DF"
          strokeDasharray="4 6"
          strokeWidth="1"
        />
        <line
          x1={padX}
          y1={height * 0.7}
          x2={width - padX}
          y2={height * 0.7}
          stroke="#E5E5DF"
          strokeDasharray="4 6"
          strokeWidth="1"
        />

        {/* 1. CURRENT FUTURE TRAJECTORY (Muted Dashed Baseline) */}
        <path
          d={basePathD}
          fill="none"
          stroke="#9CA3AF"
          strokeWidth="2.2"
          strokeDasharray="6 6"
          strokeLinecap="round"
        />

        {/* Baseline Endpoint Marker */}
        <circle
          cx={width - padX}
          cy={padY + (yearPoints[yearPoints.length - 1].yBasePercent / 100) * (height - 2 * padY)}
          r="4.5"
          fill="#9CA3AF"
        />

        {/* 2. ALTERNATE FUTURE TRAJECTORY (Vibrant Compounding Path) */}
        {/* Soft Area fill */}
        <path d={altAreaD} fill="url(#alternateGlowGrad)" />

        {/* Glowing Trajectory Path */}
        <motion.path
          d={altPathD}
          fill="none"
          stroke="#0F6B4F"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#altGlow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Scenario-Specific Traveling Particles */}
        {scenario.id === "sip" && (
          <g>
            <circle r="4" fill="#0F6B4F">
              <animateMotion
                dur="3.2s"
                repeatCount="indefinite"
                path={altPathD}
                calcMode="linear"
              />
            </circle>
            <circle r="2.5" fill="#0F6B4F" opacity="0.75">
              <animateMotion
                dur="3.2s"
                repeatCount="indefinite"
                path={altPathD}
                keyPoints="0;0.9"
                keyTimes="0;1"
                calcMode="linear"
              />
            </circle>
          </g>
        )}

        {scenario.id === "expenses" && (
          <g>
            <circle r="3.5" fill="#B8944A">
              <animateMotion
                dur="3.6s"
                repeatCount="indefinite"
                path={altPathD}
                calcMode="linear"
              />
            </circle>
          </g>
        )}

        {/* Starting Origin: TODAY */}
        <circle
          cx={padX}
          cy={height - padY}
          r="5"
          fill="#111111"
          stroke="#FFFFFF"
          strokeWidth="2"
        />

        {/* Interactive Scrubbing Guideline */}
        {hoveredPoint && (
          <g>
            <line
              x1={padX + (hoveredPoint.xPercent / 100) * (width - 2 * padX)}
              y1={padY}
              x2={padX + (hoveredPoint.xPercent / 100) * (width - 2 * padX)}
              y2={height - padY}
              stroke="#0F6B4F"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              opacity="0.8"
            />
            {/* Dot on Current Path */}
            <circle
              cx={padX + (hoveredPoint.xPercent / 100) * (width - 2 * padX)}
              cy={padY + (hoveredPoint.yBasePercent / 100) * (height - 2 * padY)}
              r="4"
              fill="#9CA3AF"
            />
            {/* Dot on Alternate Path */}
            <circle
              cx={padX + (hoveredPoint.xPercent / 100) * (width - 2 * padX)}
              cy={padY + (hoveredPoint.yAltPercent / 100) * (height - 2 * padY)}
              r="6"
              fill="#0F6B4F"
              stroke="#FFFFFF"
              strokeWidth="2.5"
            />
          </g>
        )}
      </svg>

      {/* Origin Label (Today) */}
      <div className="absolute bottom-2 left-6 text-[10px] font-mono uppercase text-neutral-500 font-bold">
        TODAY ({startYear})
      </div>

      {/* Baseline Current Future Label */}
      <div
        className="absolute right-4 text-right pointer-events-none select-none transition-all"
        style={{
          top: `${yearPoints[yearPoints.length - 1].yBasePercent}%`,
          transform: "translateY(-50%) translateZ(10px)",
        }}
      >
        <span className="text-[10px] font-mono text-neutral-400 block uppercase">
          CURRENT FUTURE
        </span>
        <span className="font-mono text-xs font-semibold text-neutral-500 tabular-nums">
          {formatIndianCurrency(scenario.baseWealth)}
        </span>
      </div>

      {/* Elevated 3D Destination Badge (The Alternate You) */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="absolute right-2 top-2 z-30 select-none"
        style={{ transform: "translateZ(36px)" }}
      >
        <div className="p-3 rounded-2xl bg-white/95 border border-emerald-300/80 shadow-xl shadow-emerald-900/10 backdrop-blur-md">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-emerald-800">
              {startYear + totalYears} · THE ALTERNATE YOU
            </span>
          </div>
          <div className="font-serif text-2xl text-deep-green tabular-nums">
            {formatIndianCurrency(scenario.alternateWealth)}
          </div>
        </div>
      </motion.div>

      {/* Scenario-Specific Visual Overlay: Retire Earlier Compression */}
      {scenario.id === "retire" && scenario.retireYearsEarlier && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="absolute left-1/2 -translate-x-1/2 top-4 z-20 select-none"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 shadow-sm text-amber-950 font-mono text-xs font-semibold">
            <Clock size={13} className="text-amber-800" />
            <span>{scenario.retireYearsEarlier} YEARS EARLIER</span>
            <span className="text-amber-600">·</span>
            <span className="text-amber-800 font-bold">≈ 1,825 EXTRA DAYS OF FREEDOM</span>
          </div>
        </motion.div>
      )}

      {/* Floating Scrubbing Tooltip */}
      {hoveredPoint && (
        <div
          className="absolute pointer-events-none z-40"
          style={{
            left: `${hoveredPoint.xPercent}%`,
            top: `${Math.min(hoveredPoint.yAltPercent, hoveredPoint.yBasePercent)}%`,
            transform: "translate(-50%, -100%) translateY(-16px) translateZ(44px)",
          }}
        >
          <div className="w-52 bg-[#141614] text-[#F7F7F2] p-3 rounded-2xl shadow-2xl border border-white/10 text-xs font-mono select-none">
            <div className="flex items-center justify-between text-[10px] text-white/50 mb-1 border-b border-white/10 pb-1">
              <span>YEAR {hoveredPoint.calendarYear}</span>
              <span>Yr {hoveredPoint.yearIndex}</span>
            </div>

            <div className="space-y-1 mb-1.5">
              <div className="flex justify-between text-white/70">
                <span>Current You:</span>
                <span className="tabular-nums font-semibold text-white">
                  {formatIndianCurrency(hoveredPoint.baseVal)}
                </span>
              </div>
              <div className="flex justify-between text-emerald-300">
                <span>Alternate You:</span>
                <span className="tabular-nums font-bold text-emerald-400">
                  {formatIndianCurrency(hoveredPoint.altVal)}
                </span>
              </div>
            </div>

            <div className="pt-1 border-t border-white/10 flex justify-between font-bold text-emerald-400">
              <span>Potential Gain:</span>
              <span className="tabular-nums">
                +{formatIndianCurrency(hoveredPoint.diff)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
