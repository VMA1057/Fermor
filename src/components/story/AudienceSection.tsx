"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Home, TrendingUp, ArrowRight, CheckCircle2 } from "lucide-react";

interface AudienceCard {
  audience: string;
  tag: string;
  icon: typeof Briefcase;
  accentColor: string;
  badgeBg: string;
  problem: string;
  value: string;
  keyPoints: string[];
}

const AUDIENCE_CARDS: AudienceCard[] = [
  {
    audience: "Young Professionals",
    tag: "EARLY CAREER & BUILDERS",
    icon: Briefcase,
    accentColor: "text-deep-green",
    badgeBg: "bg-emerald-50 text-deep-green border-emerald-200/80",
    problem:
      "Juggling multiple accounts, discretionary spending, and knowing how much to save versus invest each month without getting overwhelmed by jargon.",
    value:
      "Understand monthly cashflow at a glance, automate savings discipline, and build your first compounding investment plan with tangible milestones.",
    keyPoints: [
      "Categorize living expenses and discretionary spending",
      "Automate monthly SIP and emergency savings targets",
      "Model how salary growth accelerates your timeline",
      "Set your first financial goals with realistic deadlines",
    ],
  },
  {
    audience: "Families",
    tag: "HOUSEHOLD & LONG-TERM",
    icon: Home,
    accentColor: "text-gold",
    badgeBg: "bg-amber-50 text-amber-900 border-amber-200/80",
    problem:
      "Balancing day-to-day household costs with major multi-year goals — education funds, home mortgages, health contingencies — without compromising security.",
    value:
      "Model your complete household trajectory over 10 to 30 years, stress-test emergency reserves, and make shared financial decisions with predictable timelines.",
    keyPoints: [
      "Plan long-term funding for children's education and housing",
      "Stress-test household emergency cushions against downturns",
      "Evaluate major loan prepayments versus market investing",
      "Make joint decisions backed by transparent mathematical models",
    ],
  },
  {
    audience: "Curious Investors",
    tag: "MARKET INTELLIGENCE",
    icon: TrendingUp,
    accentColor: "text-primary",
    badgeBg: "bg-neutral-100 text-neutral-800 border-neutral-300",
    problem:
      "Overwhelmed by noisy news headlines and disconnected broker apps that rarely explain how macroeconomic shifts actually affect real portfolios.",
    value:
      "Connect daily financial news and market movements directly to your wealth, testing alternative asset scenarios across equities, gold, and debt.",
    keyPoints: [
      "Understand how policy rates and inflation impact asset classes",
      "Follow broadsheet financial news linked to market movements",
      "Explore what-if scenarios across varied asset allocations",
      "Stress-test portfolio compounding against historical regimes",
    ],
  },
];

export default function AudienceSection() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 md:px-12 bg-[#F7F7F2] border-t border-light-border relative overflow-hidden">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-200/60 border border-neutral-300 text-xs font-mono tracking-wider uppercase text-neutral-700 mb-5">
            Designed for Real Life
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-primary mb-5">
            Who is Fermor for?
          </h2>
          <p className="text-base sm:text-lg text-secondary leading-relaxed font-sans max-w-2xl mx-auto">
            Whether you&apos;re structuring your very first savings routine, managing household commitments, or following market dynamics, Fermor brings clarity to your next decision.
          </p>
        </div>

        {/* 3 Audience Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto items-stretch">
          {AUDIENCE_CARDS.map((card, idx) => (
            <motion.div
              key={card.audience}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 border border-light-border shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Header Badge & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className={`text-[11px] font-mono font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border ${card.badgeBg}`}>
                    {card.tag}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-primary">
                    <card.icon size={20} />
                  </div>
                </div>

                {/* Audience Title */}
                <h3 className="text-2xl font-serif text-primary mb-5">
                  {card.audience}
                </h3>

                {/* Problem Statement */}
                <div className="mb-5 p-4 rounded-2xl bg-neutral-50/80 border border-neutral-200/70">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-secondary block mb-1">
                    THE CHALLENGE
                  </span>
                  <p className="text-xs text-neutral-700 leading-relaxed font-sans">
                    {card.problem}
                  </p>
                </div>

                {/* Value Statement */}
                <div className="mb-6">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-deep-green font-semibold block mb-1.5 flex items-center gap-1">
                    <span>HOW FERMOR HELPS</span>
                    <ArrowRight size={11} />
                  </span>
                  <p className="text-sm text-neutral-800 leading-relaxed font-sans">
                    {card.value}
                  </p>
                </div>

                {/* Specific Capabilities */}
                <div className="pt-4 border-t border-light-border space-y-2.5 mb-6">
                  {card.keyPoints.map((point) => (
                    <div key={point} className="flex items-start gap-2 text-xs text-neutral-600 font-sans">
                      <CheckCircle2 size={14} className="text-deep-green shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Subtle Tag */}
              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-[11px] font-mono text-secondary">
                <span>Tailored Decision Flow</span>
                <span className="text-primary font-medium">Ready in Browser</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
