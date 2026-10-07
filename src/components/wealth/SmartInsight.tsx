"use client";

import React, { useMemo } from "react";
import { formatIndianCurrency } from "@/data/forecast";
import { Compass } from "lucide-react";

interface SmartInsightProps {
  monthlyInvestment: number;
  years: number;
  expectedReturn: number;
  finalWealth: number;
  isProfit: boolean;
  isDownturn: boolean;
}

export default function SmartInsight({
  monthlyInvestment,
  years,
  expectedReturn,
  finalWealth,
  isProfit,
  isDownturn,
}: SmartInsightProps) {
  const insightText = useMemo(() => {
    if (isDownturn || !isProfit) {
      return `Under a ${expectedReturn}% contraction scenario, prioritising defensive preservation or sovereign gold shields capital until market inflection.`;
    }

    if (finalWealth >= 10000000) {
      return `At ${formatIndianCurrency(monthlyInvestment)}/month, compounding accelerates past ₹1 Crore in Year ${Math.max(3, Math.round(years * 0.85))}.`;
    }

    if (monthlyInvestment >= 25000) {
      return `High savings rate detected: disciplined SIP execution can cross ₹50L milestone ahead of your baseline target.`;
    }

    return `Increasing monthly investment by ₹5,000 could add approximately ${formatIndianCurrency(
      Math.round(finalWealth * 0.35)
    )} to your projected wealth.`;
  }, [monthlyInvestment, years, expectedReturn, finalWealth, isProfit, isDownturn]);

  return (
    <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-neutral-100/70 border border-neutral-200/80 text-xs font-mono text-neutral-700 select-none">
      <Compass size={14} className="text-neutral-500 shrink-0" />
      <span className="line-clamp-1">{insightText}</span>
    </div>
  );
}
