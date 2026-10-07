"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FinancialScheme } from "@/data/newspaperData";
import { X, ExternalLink, Shield, CheckCircle2, AlertCircle } from "lucide-react";

interface SchemeDetailModalProps {
  scheme: FinancialScheme | null;
  onClose: () => void;
}

export default function SchemeDetailModal({ scheme, onClose }: SchemeDetailModalProps) {
  if (!scheme) return null;

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
          className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto bg-[#F9F6EE] border-2 border-neutral-900 shadow-2xl text-neutral-900 p-4 sm:p-6 md:p-8 rounded-xs"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-neutral-900 pb-2 mb-4">
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-neutral-600 flex items-center gap-1.5">
              <Shield size={12} className="text-emerald-800" />
              <span>SOVEREIGN INSTRUMENT · {scheme.category}</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 hover:bg-neutral-200 rounded-full transition-colors cursor-pointer text-neutral-800"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* Scheme Title & Yield */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-neutral-950 uppercase">
                {scheme.name}
              </h2>
              <span className="text-xs font-mono text-neutral-600">
                Sovereign Issuer: {scheme.officialSource}
              </span>
            </div>

            <div className="bg-white border border-neutral-300 p-2 sm:text-right shrink-0">
              <div className="text-xs font-mono text-neutral-500">ASSURED YIELD</div>
              <div className="text-2xl font-mono font-bold text-neutral-900">
                {scheme.interestRate}% <span className="text-xs font-normal">p.a.</span>
              </div>
            </div>
          </div>

          {/* 4-Grid Core Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono mb-6">
            <div className="p-2.5 bg-white border border-neutral-200">
              <span className="text-[10px] text-neutral-500 block">TENURE</span>
              <span className="font-bold text-neutral-900">{scheme.tenure}</span>
            </div>
            <div className="p-2.5 bg-white border border-neutral-200">
              <span className="text-[10px] text-neutral-500 block">RISK CLASS</span>
              <span className="font-bold text-emerald-800">{scheme.risk}</span>
            </div>
            <div className="p-2.5 bg-white border border-neutral-200">
              <span className="text-[10px] text-neutral-500 block">MIN DEPOSIT</span>
              <span className="font-bold text-neutral-900">{scheme.minInvestment}</span>
            </div>
            <div className="p-2.5 bg-white border border-neutral-200">
              <span className="text-[10px] text-neutral-500 block">LOCK-IN</span>
              <span className="font-bold text-neutral-900">{scheme.lockInPeriod}</span>
            </div>
          </div>

          {/* Tax Implications Box */}
          <div className="bg-[#EFE9DC] border border-neutral-300 p-3.5 mb-6">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-600 block mb-1 font-bold">
              TAX STATUS & SECTION EXEMPTIONS
            </span>
            <p className="text-xs sm:text-sm font-serif leading-relaxed text-neutral-800">
              {scheme.taxImplications}
            </p>
          </div>

          {/* Eligibility & Limits */}
          <div className="space-y-3 mb-6 text-xs sm:text-sm font-serif border-y border-neutral-300 py-4">
            <div>
              <strong className="font-mono text-xs uppercase text-neutral-500 block mb-0.5">
                INVESTOR ELIGIBILITY:
              </strong>
              <p className="text-neutral-800">{scheme.eligibility}</p>
            </div>
            <div>
              <strong className="font-mono text-xs uppercase text-neutral-500 block mb-0.5">
                INVESTMENT CEILING:
              </strong>
              <p className="text-neutral-800">{scheme.maxInvestment}</p>
            </div>
          </div>

          {/* Benefits & Risks Lists */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-3 border border-neutral-200">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 font-bold flex items-center gap-1 mb-2">
                <CheckCircle2 size={12} />
                <span>KEY ADVANTAGES</span>
              </span>
              <ul className="text-xs font-serif space-y-1.5 text-neutral-700">
                {scheme.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-700">✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-3 border border-neutral-200">
              <span className="text-[10px] font-mono uppercase tracking-wider text-rose-800 font-bold flex items-center gap-1 mb-2">
                <AlertCircle size={12} />
                <span>CONSIDERATIONS</span>
              </span>
              <ul className="text-xs font-serif space-y-1.5 text-neutral-700">
                {scheme.risks.map((risk, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-rose-700">!</span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Official Source Link */}
          <div className="bg-white border border-neutral-300 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block">
                OFFICIAL ISSUING DIRECTORY
              </span>
              <span className="font-serif text-sm text-neutral-900">
                {scheme.officialSource}
              </span>
            </div>

            <a
              href={scheme.officialSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-neutral-950 text-[#F9F6EE] hover:bg-neutral-800 text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
            >
              <span>Official Scheme Portal</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
