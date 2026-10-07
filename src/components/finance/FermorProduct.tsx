"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Search, Map, MessageSquare } from "lucide-react";

// ==========================================
// MOCKUP A: SPENDING BREAKDOWN
// ==========================================
function SpendingMockup() {
  const categories = [
    { name: "Food & Dining", percent: 38, amount: 24500, width: "38%", color: "bg-deep-green" },
    { name: "Bills & Utilities", percent: 28, amount: 18000, width: "28%", color: "bg-neutral-800" },
    { name: "Transport & Fuel", percent: 20, amount: 13000, width: "20%", color: "bg-gold" },
    { name: "Shopping & Leisure", percent: 14, amount: 9000, width: "14%", color: "bg-neutral-400" },
  ];

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-sm border border-light-border text-primary select-none">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-light-border">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-secondary block">
            MONTHLY SPENDING
          </span>
          <div className="text-2xl font-serif text-primary tabular-nums">
            ₹64,500
          </div>
        </div>
        <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-50 text-deep-green border border-emerald-200">
          Under Budget
        </span>
      </div>

      <div className="space-y-3.5">
        {categories.map((c) => (
          <div key={c.name} className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-neutral-800">{c.name}</span>
              <div className="flex items-center gap-2 font-mono text-secondary tabular-nums">
                <span>{c.percent}%</span>
                <span className="text-primary font-semibold">₹{c.amount.toLocaleString("en-IN")}</span>
              </div>
            </div>
            <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: c.width }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`h-full ${c.color} rounded-full`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 pt-3.5 border-t border-light-border flex items-center justify-between text-[11px] font-mono text-secondary">
        <span>MONTHLY SURPLUS: <strong>₹35,500</strong></span>
        <span className="text-deep-green font-semibold">35% SAVED</span>
      </div>
    </div>
  );
}

// ==========================================
// MOCKUP B: GOAL PROGRESS RING
// ==========================================
function GoalMockup() {
  const percentage = 72;
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-sm border border-light-border text-primary select-none">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-light-border">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-secondary block">
            GOAL TRACKER
          </span>
          <h4 className="font-serif text-lg text-primary">Emergency Fund</h4>
        </div>
        <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-50 text-deep-green border border-emerald-200">
          72% Funded
        </span>
      </div>

      <div className="flex items-center gap-5 my-2">
        {/* Compact Circular Progress Ring */}
        <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-neutral-100"
            />
            <motion.circle
              cx="60"
              cy="60"
              r={radius}
              stroke="#0F6B4F"
              strokeWidth="8"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              whileInView={{ strokeDashoffset }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="font-serif text-2xl text-primary tabular-nums">72%</span>
            <span className="text-[8px] font-mono uppercase tracking-wider text-secondary">SAVED</span>
          </div>
        </div>

        {/* Milestone metrics */}
        <div className="space-y-2 flex-1 text-xs">
          <div>
            <span className="text-secondary text-[10px] font-mono uppercase block">ACCUMULATED</span>
            <span className="font-semibold text-deep-green text-base font-mono tabular-nums">₹72,000</span>
          </div>
          <div>
            <span className="text-secondary text-[10px] font-mono uppercase block">TARGET CAPITAL</span>
            <span className="font-medium text-neutral-800 text-sm font-mono tabular-nums">₹1,00,000</span>
          </div>
          <div className="text-[11px] font-mono text-secondary pt-0.5">
            <span>Remaining: <strong className="text-primary tabular-nums">₹28,000</strong></span>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-3.5 border-t border-light-border flex items-center justify-between text-[11px] font-mono text-secondary">
        <span>MONTHLY SIP: <strong>₹10,000</strong></span>
        <span className="text-deep-green font-medium">ON TRACK (~3 MOS)</span>
      </div>
    </div>
  );
}

// ==========================================
// MOCKUP C: ASK FINANCIAL CHAT INTERFACE
// ==========================================
function AskMockup() {
  const fullText = "At your current monthly investment of ₹16,500 at 12% CAGR, you're projected to reach approximately ₹10,24,000 in 4 years — on track to reach your goal 2 months ahead of target.";
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 18);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-sm border border-light-border text-primary select-none">
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-light-border">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-deep-green animate-pulse" />
          <span className="text-xs font-mono font-medium text-primary uppercase tracking-wider">
            Fermor Intelligence
          </span>
        </div>
        <span className="text-[10px] font-mono text-secondary">Interactive Scenario</span>
      </div>

      <div className="space-y-3 min-h-[160px] text-xs">
        {/* User Query */}
        <div className="flex justify-end">
          <div className="bg-neutral-900 text-white px-3.5 py-2.5 rounded-2xl rounded-tr-xs max-w-[85%] font-medium">
            Can I reach ₹10L in 4 years?
          </div>
        </div>

        {/* Assistant Response */}
        <div className="flex justify-start items-start gap-2 pt-1">
          <div className="w-6 h-6 rounded-full bg-deep-green/10 text-deep-green flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-serif font-medium">
            F
          </div>
          <div className="bg-neutral-50 border border-light-border text-neutral-800 p-3.5 rounded-2xl rounded-tl-xs max-w-[90%] leading-relaxed font-sans">
            <span>{displayedText}</span>
            {isTyping && (
              <span className="inline-block w-1.5 h-3.5 bg-deep-green ml-1 animate-pulse align-middle" />
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-light-border flex items-center gap-2 overflow-x-auto no-scrollbar text-[10px] font-mono">
        <span className="text-secondary shrink-0">Try:</span>
        <span className="px-2 py-0.5 bg-neutral-100 rounded text-neutral-700 shrink-0">
          &quot;Increase SIP by ₹2,000&quot;
        </span>
        <span className="px-2 py-0.5 bg-neutral-100 rounded text-neutral-700 shrink-0">
          &quot;Model 9% return&quot;
        </span>
      </div>
    </div>
  );
}

// ==========================================
// FEATURES LIST WITH 3 MINIATURE MOCKUPS
// ==========================================
interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  imageClass: string;
  mockup: React.ReactNode;
}

const features: FeatureItem[] = [
  {
    id: "understand",
    title: "Understand your cashflow",
    description: "See where your money actually goes each month. Categorize spending across essentials and discretionary purchases to uncover surplus capital you can put to work.",
    icon: <Search size={28} />,
    color: "bg-[#0F6B4F]",
    imageClass: "bg-gradient-to-br from-green-50/60 to-emerald-100/40 border-emerald-200/80",
    mockup: <SpendingMockup />
  },
  {
    id: "plan",
    title: "Plan milestones with certainty",
    description: "Turn broad goals into structured timelines. Whether building an emergency buffer or funding a long-term milestone, track progress with inflation-adjusted targets.",
    icon: <Map size={28} />,
    color: "bg-[#B8944A]",
    imageClass: "bg-gradient-to-br from-amber-50/60 to-yellow-100/40 border-amber-200/80",
    mockup: <GoalMockup />
  },
  {
    id: "ask",
    title: "Ask scenarios, get clear answers",
    description: "Explore financial trade-offs in plain language. Test how adjusting your monthly investment, delaying a major purchase, or altering returns affects your time to financial independence.",
    icon: <MessageSquare size={28} />,
    color: "bg-[#111111]",
    imageClass: "bg-gradient-to-br from-neutral-50 to-slate-100/70 border-neutral-200/90",
    mockup: <AskMockup />
  }
];

function ProductFeatureRow({
  feature,
  index,
  yOffset,
}: {
  feature: FeatureItem;
  index: number;
  yOffset: MotionValue<number>;
}) {
  const isEven = index % 2 === 0;

  return (
    <div
      id={feature.id}
      className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-10 lg:gap-20 items-center`}
    >
      <div className="flex-1 w-full max-w-xl">
        <motion.div
          initial={{ opacity: 0, x: isEven ? -25 : 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className={`w-14 h-14 rounded-2xl ${feature.color} text-white flex items-center justify-center mb-6 shadow-md`}>
            {feature.icon}
          </div>
          <h3 className="text-3xl md:text-4xl font-serif mb-4 text-primary">
            {feature.title}
          </h3>
          <p className="text-lg text-secondary leading-relaxed font-sans">
            {feature.description}
          </p>
        </motion.div>
      </div>

      <div className="flex-1 w-full">
        <motion.div
          className={`aspect-auto md:aspect-[4/3] rounded-[32px] border ${feature.imageClass} p-6 sm:p-8 flex items-center justify-center relative overflow-hidden shadow-xs`}
          style={{ y: index === 0 ? 0 : yOffset }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          {feature.mockup}
        </motion.div>
      </div>
    </div>
  );
}

export default function FermorProduct() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yOffset = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={containerRef} className="py-28 px-6 md:px-12 bg-white overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-28">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-deep-green border border-emerald-200/80 text-xs font-mono tracking-wider uppercase mb-5">
            How Fermor Works
          </div>
          <motion.h2 
            className="text-4xl md:text-5xl font-serif text-primary mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            Clarity for every financial decision.
          </motion.h2>
          <motion.p 
            className="text-lg text-secondary leading-relaxed max-w-2xl mx-auto font-sans"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Connect day-to-day spending to long-term goals and test what-if questions before making financial commitments.
          </motion.p>
        </div>

        <div className="space-y-24 md:space-y-32">
          {features.map((feature, index) => (
            <ProductFeatureRow
              key={feature.id}
              feature={feature}
              index={index}
              yOffset={yOffset}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
