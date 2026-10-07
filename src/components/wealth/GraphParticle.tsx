"use client";

import React from "react";

interface GraphParticleProps {
  pathD: string;
  isProfit: boolean;
  isDownturn: boolean;
  reducedMotion?: boolean;
}

export default function GraphParticle({
  pathD,
  isProfit,
  isDownturn,
  reducedMotion = false,
}: GraphParticleProps) {
  if (reducedMotion || !pathD) return null;

  const color = !isDownturn && isProfit ? "#0F6B4F" : "#9F1239";

  return (
    <g className="pointer-events-none select-none">
      {/* Primary Traveler with SVG animateMotion */}
      <circle r="4.5" fill={color} filter="url(#particleGlow)">
        <animateMotion
          dur={isDownturn ? "5.5s" : "4.0s"}
          repeatCount="indefinite"
          path={pathD}
          keyPoints={isDownturn ? "1;0" : "0;1"}
          keyTimes="0;1"
          calcMode="linear"
        />
      </circle>

      {/* Trailing Secondary Spark */}
      <circle r="2.5" fill={color} opacity="0.6">
        <animateMotion
          dur={isDownturn ? "5.5s" : "4.0s"}
          repeatCount="indefinite"
          path={pathD}
          keyPoints={isDownturn ? "0.95;0" : "0;0.95"}
          keyTimes="0;1"
          calcMode="linear"
        />
      </circle>
    </g>
  );
}
