"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Cpu, Database, Compass, AlertCircle } from "lucide-react";

export default function PrivacySection() {
  const privacyCards = [
    {
      icon: Cpu,
      title: "Where Calculations Run",
      badge: "CLIENT-SIDE",
      description:
        "Every calculation — including compounding formulas, loan interest amortizations, timeline milestones, and What-If scenario projections — executes 100% locally in your browser using JavaScript. Your numbers stay in your device's memory while you use the application.",
    },
    {
      icon: Database,
      title: "What Is (and Isn't) Stored",
      badge: "TRANSPARENT BOUNDARIES",
      description:
        "This prototype operates 100% client-side in your browser. Waitlist interactions on this demo site are simulated locally; no email addresses, income figures, target balances, or scenario configurations are transmitted to or stored on any server. Closing your tab clears all session data.",
    },
    {
      icon: Compass,
      title: "How to Interpret Projections",
      badge: "MATHEMATICAL MODELS",
      description:
        "All projected values shown across Fermor are deterministic mathematical models calculated from user-specified inputs and compounding formulas. They are educational decision-making guides to help you visualize trade-offs over time, not guarantees of actual market returns.",
    },
    {
      icon: AlertCircle,
      title: "Regulatory Notice & SEBI Disclaimer",
      badge: "REGULATORY COMPLIANCE",
      description:
        "Fermor is an educational and analytical financial modeling platform. Fermor is not registered with the Securities and Exchange Board of India (SEBI) as an Investment Adviser (RIA) or Research Analyst (RA). Nothing on this platform should be construed as investment, tax, legal, or financial advice. Always consult a qualified SEBI-registered professional before making investment decisions.",
    },
  ];

  return (
    <section id="disclaimer" className="py-20 sm:py-28 px-4 sm:px-6 md:px-12 bg-white border-t border-light-border relative overflow-hidden">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-deep-green border border-emerald-200/80 text-xs font-mono tracking-wider uppercase mb-5">
            <ShieldCheck size={14} />
            <span>Data Transparency & Ethics</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-primary mb-5">
            Your money. Your privacy.
          </h2>
          <p className="text-lg text-secondary leading-relaxed font-sans max-w-2xl mx-auto">
            We believe financial planning should be honest, mathematically transparent, and private by design. Here is exactly how Fermor handles your information.
          </p>
        </div>

        {/* 4 Clear Privacy & Disclaimer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 max-w-5xl mx-auto mb-12">
          {privacyCards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[#FAF9F5] border border-light-border rounded-2xl p-6 md:p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-light-border flex items-center justify-center text-primary shadow-2xs">
                    <card.icon size={19} className="text-deep-green" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-secondary px-2.5 py-0.5 rounded-md bg-white border border-light-border">
                    {card.badge}
                  </span>
                </div>

                <h3 className="text-xl font-serif text-primary mb-3">
                  {card.title}
                </h3>

                <p className="text-sm text-neutral-700 leading-relaxed font-sans">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Plain-Language Bottom Trust Summary */}
        <div className="max-w-3xl mx-auto p-5 rounded-2xl bg-neutral-50 border border-neutral-200 text-center">
          <p className="text-xs font-mono text-neutral-600 leading-relaxed">
            Summary: Calculations happen on your machine. We don&apos;t store your financial numbers. Projections are mathematical models, not investment advice.
          </p>
        </div>
      </div>
    </section>
  );
}
