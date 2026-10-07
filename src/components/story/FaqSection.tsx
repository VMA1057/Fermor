"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "What is Fermor?",
    answer:
      "Fermor is an interactive financial modeling and decision platform. It combines cashflow breakdowns, milestone planning, and what-if compounding simulations to help you understand how daily choices alter your future financial trajectory.",
  },
  {
    question: "How are projections calculated?",
    answer:
      "All projections use deterministic time-value-of-money and compounding interest formulas computed directly in your browser. You supply the monthly investment, time horizon, and return rate (CAGR), and Fermor models the month-by-month capital accumulation.",
  },
  {
    question: "Are projected returns guaranteed?",
    answer:
      "No. Market returns are never guaranteed and fluctuate with macroeconomic cycles. Fermor's projections are educational simulation tools to help you compare scenarios and understand compounding, not guarantees of actual future performance.",
  },
  {
    question: "Is my financial information stored?",
    answer:
      "No financial values are stored on any server. The numbers you enter into sliders, spending categories, or scenario calculators remain exclusively in your device's browser memory during your active session. Only your email is stored if you voluntarily join the waitlist.",
  },
  {
    question: "Where does market information come from?",
    answer:
      "Market indices, commodity benchmarks, and currency rates in our broadsheet and global panels reference publicly available market indices and financial feeds. Currency rates feature live API synchronization with resilient benchmark fallbacks.",
  },
  {
    question: "Can I use Fermor without investing?",
    answer:
      "Yes. Fermor is built for anyone wanting financial clarity. You can use it solely to understand monthly expenses, plan an emergency fund, calculate home loan EMIs, or follow financial news without committing any money to investments.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="ask" className="py-20 sm:py-28 px-4 sm:px-6 md:px-12 bg-[#F7F7F2] border-t border-light-border relative overflow-hidden">
      <div className="container mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-200/60 border border-neutral-300 text-xs font-mono tracking-wider uppercase text-neutral-700 mb-5">
            <HelpCircle size={14} />
            <span>Common Questions</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-primary mb-5">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-secondary leading-relaxed font-sans max-w-xl mx-auto">
            Everything you need to know about how Fermor works, how projections are calculated, and how your data is handled.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            const buttonId = `faq-question-${index}`;
            const panelId = `faq-answer-${index}`;

            return (
              <div
                key={faq.question}
                className="bg-white rounded-2xl border border-light-border overflow-hidden transition-colors shadow-2xs"
              >
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-4.5 sm:p-6 md:p-7 flex items-center justify-between gap-4 cursor-pointer hover:bg-neutral-50/70 transition-colors focus-visible:outline-2 focus-visible:outline-deep-green"
                  >
                    <span className="font-serif text-lg md:text-xl text-primary font-normal">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 text-secondary"
                    >
                      <ChevronDown size={17} />
                    </motion.div>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-4.5 sm:px-6 md:px-7 pb-5 sm:pb-6 pt-1 text-neutral-700 text-sm md:text-base leading-relaxed border-t border-neutral-100 font-sans">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
