"use client";

import React, { useState, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import GraphParticle from "./GraphParticle";
import WealthMilestone from "./WealthMilestone";
import WealthTooltip from "./WealthTooltip";
import { GraphPoint, Milestone } from "./types";

interface WealthGraphProps {
  points: GraphPoint[];
  milestones: Milestone[];
  whatIfPoints?: GraphPoint[] | null;
  isProfit: boolean;
  isDownturn: boolean;
  reducedMotion?: boolean;
}

export default function WealthGraph({
  points,
  milestones,
  whatIfPoints,
  isProfit,
  isDownturn,
  reducedMotion = false,
}: WealthGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredPoint, setHoveredPoint] = useState<GraphPoint | null>(null);

  // SVG dimensions
  const width = 800;
  const height = 260;
  const paddingX = 40;
  const paddingY = 30;

  // Compute SVG smooth bezier path for the points
  const { pathD, areaD, whatIfPathD } = useMemo(() => {
    if (!points || points.length === 0) return { pathD: "", areaD: "", whatIfPathD: "" };

    const svgCoords = points.map((p) => {
      const x = paddingX + (p.xPercent / 100) * (width - 2 * paddingX);
      const y = paddingY + (p.yPercent / 100) * (height - 2 * paddingY);
      return { x, y };
    });

    // Generate smooth bezier curve through points
    let d = `M ${svgCoords[0].x},${svgCoords[0].y}`;
    for (let i = 0; i < svgCoords.length - 1; i++) {
      const curr = svgCoords[i];
      const next = svgCoords[i + 1];
      const midX = (curr.x + next.x) / 2;
      d += ` C ${midX},${curr.y} ${midX},${next.y} ${next.x},${next.y}`;
    }

    const lastX = svgCoords[svgCoords.length - 1].x;
    const firstX = svgCoords[0].x;
    const area = `${d} L ${lastX},${height} L ${firstX},${height} Z`;

    // What if curve if active
    let wiD = "";
    if (whatIfPoints && whatIfPoints.length > 0) {
      const wiCoords = whatIfPoints.map((p) => {
        const x = paddingX + (p.xPercent / 100) * (width - 2 * paddingX);
        const y = paddingY + (p.yPercent / 100) * (height - 2 * paddingY);
        return { x, y };
      });
      wiD = `M ${wiCoords[0].x},${wiCoords[0].y}`;
      for (let i = 0; i < wiCoords.length - 1; i++) {
        const curr = wiCoords[i];
        const next = wiCoords[i + 1];
        const midX = (curr.x + next.x) / 2;
        wiD += ` C ${midX},${curr.y} ${midX},${next.y} ${next.x},${next.y}`;
      }
    }

    return { pathD: d, areaD: area, whatIfPathD: wiD };
  }, [points, whatIfPoints]);

  const strokeColor = !isDownturn && isProfit ? "#0F6B4F" : "#9F1239";
  const fillColor = !isDownturn && isProfit ? "#0F6B4F" : "#9F1239";

  // Mouse scrubbing handler across the graph
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || points.length === 0) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const normX = Math.max(0, Math.min(1, mouseX / rect.width));

    // Find closest point by xPercent
    let closest = points[0];
    let minDiff = 999;
    points.forEach((p) => {
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
      className="relative w-full h-56 sm:h-64 md:h-72 my-4 select-none cursor-crosshair"
      style={{ transform: "translateZ(18px)" }}
    >
      {/* SVG Canvas for the Living Wealth Journey Curve */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full overflow-visible"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="wealthAreaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={fillColor} stopOpacity={0.16} />
            <stop offset="90%" stopColor={fillColor} stopOpacity={0.0} />
          </linearGradient>

          <filter id="particleGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Subtle Horizontal Reference Grid Lines */}
        <line
          x1={paddingX}
          y1={height * 0.25}
          x2={width - paddingX}
          y2={height * 0.25}
          stroke="#E5E5DF"
          strokeDasharray="4 6"
          strokeWidth="1"
        />
        <line
          x1={paddingX}
          y1={height * 0.65}
          x2={width - paddingX}
          y2={height * 0.65}
          stroke="#E5E5DF"
          strokeDasharray="4 6"
          strokeWidth="1"
        />

        {/* What-If Baseline Ghost Curve if Active */}
        {whatIfPathD && (
          <path
            d={whatIfPathD}
            fill="none"
            stroke="#A3A39A"
            strokeWidth="2"
            strokeDasharray="5 5"
            opacity="0.6"
          />
        )}

        {/* Shaded Area Under Curve */}
        {areaD && (
          <path
            d={areaD}
            fill="url(#wealthAreaGradient)"
            style={{ transition: "all 0.4s ease-out" }}
          />
        )}

        {/* Main Living Curve Line */}
        {pathD && (
          <motion.path
            d={pathD}
            fill="none"
            stroke={strokeColor}
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        )}

        {/* Continuous Traveling Financial Particle along the Curve */}
        <GraphParticle
          pathD={pathD}
          isProfit={isProfit}
          isDownturn={isDownturn}
          reducedMotion={reducedMotion}
        />

        {/* Interactive Scrub Guide Line */}
        {hoveredPoint && (
          <g>
            <line
              x1={paddingX + (hoveredPoint.xPercent / 100) * (width - 2 * paddingX)}
              y1={paddingY}
              x2={paddingX + (hoveredPoint.xPercent / 100) * (width - 2 * paddingX)}
              y2={height - paddingY}
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeDasharray="3 3"
              opacity="0.75"
            />
            <circle
              cx={paddingX + (hoveredPoint.xPercent / 100) * (width - 2 * paddingX)}
              cy={paddingY + (hoveredPoint.yPercent / 100) * (height - 2 * paddingY)}
              r="5.5"
              fill={strokeColor}
              stroke="#FFFFFF"
              strokeWidth="2.5"
            />
          </g>
        )}
      </svg>

      {/* HTML Milestones along the Curve */}
      {milestones.map((milestone) => (
        <WealthMilestone
          key={milestone.year}
          milestone={milestone}
          isProfit={isProfit}
          isDownturn={isDownturn}
        />
      ))}

      {/* Floating Cursor Guide Tooltip */}
      <WealthTooltip
        point={hoveredPoint}
        isProfit={isProfit}
        isDownturn={isDownturn}
      />
    </div>
  );
}
