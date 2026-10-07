"use client";

import React, { useState, useEffect } from "react";
import { useSpring } from "framer-motion";
import { formatIndianCurrency } from "@/data/forecast";

interface WealthValueProps {
  value: number;
  invested: number;
  growth: number;
  isProfit: boolean;
  isDownturn: boolean;
}

export default function WealthValue({
  value,
  invested,
  growth,
  isProfit,
  isDownturn,
}: WealthValueProps) {
  const isPositive = !isDownturn && isProfit;
  const [displayString, setDisplayString] = useState(formatIndianCurrency(value));

  // Animated numerical spring counter
  const springValue = useSpring(value, {
    stiffness: 120,
    damping: 18,
    mass: 0.6,
  });

  useEffect(() => {
    springValue.set(value);
  }, [value, springValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayString(formatIndianCurrency(Math.round(latest)));
    });
  }, [springValue]);

  return (
    <div className="select-none">
      <p className="text-xs sm:text-sm font-medium text-secondary mb-1">
        Projected Wealth
      </p>

      <div className="flex items-baseline gap-3">
        <h3
          className={`text-4xl sm:text-5xl md:text-6xl font-serif font-normal tabular-nums tracking-tight transition-colors duration-400 ${
            isPositive ? "text-deep-green" : "text-rose-800"
          }`}
        >
          {displayString}
        </h3>
      </div>

      {/* Subtitle breakdown */}
      <div className="flex items-center gap-2 text-xs sm:text-sm text-secondary mt-1 font-mono tabular-nums">
        <span>{formatIndianCurrency(invested)} invested</span>
        <span>·</span>
        <span
          className={`font-semibold ${
            isPositive ? "text-deep-green" : "text-rose-800"
          }`}
        >
          {growth >= 0 ? "+" : ""}{formatIndianCurrency(growth)} {isPositive ? "growth" : "deficit"}
        </span>
      </div>
    </div>
  );
}
