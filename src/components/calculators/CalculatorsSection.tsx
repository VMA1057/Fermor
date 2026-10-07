"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calculator, 
  ChevronDown, 
  TrendingUp, 
  Building, 
  Landmark, 
  Briefcase, 
  FileText, 
  Layers, 
  Grid3X3,
  Sparkles,
  Maximize2
} from "lucide-react";
import { useCursor } from "../cursor/CursorContext";
import InfiniteGallery, { GalleryImage } from "@/components/ui/infinite-gallery";

interface CalcItem {
  id: string;
  name: string;
  shortName: string;
  icon: typeof TrendingUp;
  desc: string;
  defaultVal1: number;
  labelVal1: string;
  prefixVal1: string;
  defaultVal2: number;
  labelVal2: string;
  suffixVal2: string;
  defaultTenure: number;
  imageUrl: string;
  calculate: (v1: number, v2: number, tenure: number) => {
    primaryLabel: string;
    primaryVal: string;
    secondaryLabel: string;
    secondaryVal: string;
    breakdownLabel: string;
    breakdownVal: string;
  };
}

function formatIndianVal(val: number): string {
  if (Math.abs(val) >= 10000000) {
    return `₹${(val / 10000000).toFixed(2)} Cr`;
  }
  if (Math.abs(val) >= 100000) {
    return `₹${(val / 100000).toFixed(2)} Lakh`;
  }
  return `₹${val.toLocaleString("en-IN")}`;
}

const CALCULATORS: CalcItem[] = [
  {
    id: "sip",
    name: "SIP Calculator",
    shortName: "SIP",
    icon: TrendingUp,
    desc: "Calculate returns on your systematic mutual fund investments with compounding.",
    defaultVal1: 15000,
    labelVal1: "Monthly Investment",
    prefixVal1: "₹",
    defaultVal2: 13.5,
    labelVal2: "Expected Return Rate",
    suffixVal2: "% p.a.",
    defaultTenure: 10,
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    calculate: (monthly, rate, years) => {
      const i = rate / 100 / 12;
      const n = years * 12;
      const invested = monthly * n;
      const maturity = Math.round(monthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i));
      const returns = maturity - invested;
      return {
        primaryLabel: "Total Maturity Value",
        primaryVal: formatIndianVal(maturity),
        secondaryLabel: "Total Invested",
        secondaryVal: formatIndianVal(invested),
        breakdownLabel: "Wealth Gained",
        breakdownVal: `+${formatIndianVal(returns)}`,
      };
    },
  },
  {
    id: "emi",
    name: "EMI Calculator",
    shortName: "EMI",
    icon: Building,
    desc: "Calculate your monthly loan repayment installment and total interest payout.",
    defaultVal1: 4500000,
    labelVal1: "Loan Amount",
    prefixVal1: "₹",
    defaultVal2: 8.4,
    labelVal2: "Annual Interest Rate",
    suffixVal2: "% p.a.",
    defaultTenure: 20,
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    calculate: (principal, rate, years) => {
      const r = rate / 12 / 100;
      const n = years * 12;
      const emi = Math.round((principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
      const totalPayable = emi * n;
      const totalInterest = totalPayable - principal;
      return {
        primaryLabel: "Monthly EMI",
        primaryVal: `₹${emi.toLocaleString("en-IN")}`,
        secondaryLabel: "Principal Amount",
        secondaryVal: `₹${(principal / 100000).toFixed(2)} Lakh`,
        breakdownLabel: "Total Interest Payout",
        breakdownVal: `₹${(totalInterest / 100000).toFixed(2)} Lakh`,
      };
    },
  },
  {
    id: "fd",
    name: "FD Calculator",
    shortName: "Fixed Deposit",
    icon: Landmark,
    desc: "Calculate guaranteed returns and interest accumulated on fixed deposits.",
    defaultVal1: 500000,
    labelVal1: "Deposit Principal",
    prefixVal1: "₹",
    defaultVal2: 7.25,
    labelVal2: "Fixed Interest Rate",
    suffixVal2: "% p.a.",
    defaultTenure: 5,
    imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80",
    calculate: (principal, rate, years) => {
      const r = rate / 100;
      const maturity = Math.round(principal * Math.pow(1 + r / 4, 4 * years));
      const interest = maturity - principal;
      return {
        primaryLabel: "Maturity Proceeds",
        primaryVal: formatIndianVal(maturity),
        secondaryLabel: "Invested Principal",
        secondaryVal: formatIndianVal(principal),
        breakdownLabel: "Interest Earned",
        breakdownVal: `+${formatIndianVal(interest)}`,
      };
    },
  },
  {
    id: "ppf",
    name: "PPF Calculator",
    shortName: "PPF",
    icon: Briefcase,
    desc: "Calculate tax-exempt wealth accumulation under Public Provident Fund scheme.",
    defaultVal1: 150000,
    labelVal1: "Annual Contribution",
    prefixVal1: "₹",
    defaultVal2: 7.1,
    labelVal2: "Government PPF Rate",
    suffixVal2: "% p.a.",
    defaultTenure: 15,
    imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80",
    calculate: (annual, rate, years) => {
      const r = rate / 100;
      let maturity = 0;
      for (let y = 0; y < years; y++) {
        maturity = (maturity + annual) * (1 + r);
      }
      maturity = Math.round(maturity);
      const invested = annual * years;
      return {
        primaryLabel: "Tax-Free Maturity",
        primaryVal: formatIndianVal(maturity),
        secondaryLabel: "Total Deposits",
        secondaryVal: formatIndianVal(invested),
        breakdownLabel: "Compounded Interest",
        breakdownVal: `+${formatIndianVal(maturity - invested)}`,
      };
    },
  },
  {
    id: "tax",
    name: "Tax Calculator",
    shortName: "Income Tax",
    icon: FileText,
    desc: "Estimate personal income tax liability under the revised new regime slab structure.",
    defaultVal1: 1800000,
    labelVal1: "Annual Gross Income",
    prefixVal1: "₹",
    defaultVal2: 75000,
    labelVal2: "Standard Deduction",
    suffixVal2: "₹",
    defaultTenure: 1,
    imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80",
    calculate: (gross, deduction) => {
      const taxable = Math.max(0, gross - deduction);
      let tax = 0;
      if (taxable > 1500000) tax += (taxable - 1500000) * 0.3 + 150000;
      else if (taxable > 1200000) tax += (taxable - 1200000) * 0.2 + 90000;
      else if (taxable > 900000) tax += (taxable - 900000) * 0.15 + 45000;
      else if (taxable > 600000) tax += (taxable - 600000) * 0.1 + 15000;
      else if (taxable > 300000) tax += (taxable - 300000) * 0.05;

      const cess = tax * 0.04;
      const totalTax = Math.round(tax + cess);
      const netTakeHome = Math.max(0, gross - totalTax);
      return {
        primaryLabel: "Estimated Tax Payout",
        primaryVal: `₹${totalTax.toLocaleString("en-IN")}`,
        secondaryLabel: "Taxable Net Income",
        secondaryVal: `₹${(taxable / 100000).toFixed(2)} Lakh`,
        breakdownLabel: "Effective Annual Take-Home",
        breakdownVal: `₹${(netTakeHome / 100000).toFixed(2)} Lakh`,
      };
    },
  },
];

const GALLERY_IMAGES: GalleryImage[] = [
  {
    url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    width: 800,
    height: 520,
    title: "SIP Calculator",
    subtitle: "Compounded Wealth",
    tag: "sip",
  },
  {
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    width: 800,
    height: 533,
    title: "EMI Calculator",
    subtitle: "Home & Asset Loan",
    tag: "emi",
  },
  {
    url: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80",
    width: 800,
    height: 533,
    title: "FD Calculator",
    subtitle: "Guaranteed Deposit",
    tag: "fd",
  },
  {
    url: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80",
    width: 800,
    height: 533,
    title: "PPF Calculator",
    subtitle: "Provident Fund Growth",
    tag: "ppf",
  },
  {
    url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80",
    width: 800,
    height: 533,
    title: "Tax Calculator",
    subtitle: "Fiscal Planning",
    tag: "tax",
  },
  {
    url: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&q=80",
    width: 800,
    height: 533,
    title: "Gold & Commodities",
    subtitle: "Bullion & Reserves",
    tag: "sip",
  },
  {
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    width: 800,
    height: 533,
    title: "Investment Insights",
    subtitle: "Capital Compounding",
    tag: "sip",
  },
  {
    url: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80",
    width: 800,
    height: 533,
    title: "Market Intelligence",
    subtitle: "Yields & Market Data",
    tag: "fd",
  },
];

export default function CalculatorsSection() {
  const [activeCalcId, setActiveCalcId] = useState<string>("sip");
  const [viewMode, setViewMode] = useState<"gallery" | "grid">("gallery");
  const { setCursorState } = useCursor();

  // Dynamic values per calculator
  const [val1, setVal1] = useState<number>(15000);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      const frame = requestAnimationFrame(() => {
        setViewMode("grid");
      });
      return () => cancelAnimationFrame(frame);
    }
  }, []);
  const [val2, setVal2] = useState<number>(13.5);
  const [tenure, setTenure] = useState<number>(10);

  const activeCalc = CALCULATORS.find((c) => c.id === activeCalcId) || CALCULATORS[0];

  const handleSelectCalc = (calc: CalcItem) => {
    // Exactly one calculator opens; others close
    setActiveCalcId(calc.id);
    setVal1(calc.defaultVal1);
    setVal2(calc.defaultVal2);
    setTenure(calc.defaultTenure);
  };

  const handleGalleryItemSelect = (image: GalleryImage) => {
    if (image.tag) {
      const match = CALCULATORS.find((c) => c.id === image.tag);
      if (match) {
        handleSelectCalc(match);
      }
    }
  };

  const results = activeCalc.calculate(val1, val2, tenure);

  return (
    <section id="calculators" className="py-24 px-6 md:px-12 bg-background relative overflow-hidden">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-deep-green/10 text-deep-green text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles size={14} />
              <span>Interactive Decision Suite</span>
            </div>
            <motion.h2
              className="text-4xl md:text-5xl font-serif text-primary mb-4 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Smart tools for smart decisions
            </motion.h2>
            <motion.p
              className="text-lg text-secondary"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Take the guesswork out of financial planning with our suite of calculators.
            </motion.p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-3">
            <div className="inline-flex p-1 bg-white border border-light-border rounded-2xl shadow-xs">
              <button
                type="button"
                onClick={() => setViewMode("gallery")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  viewMode === "gallery"
                    ? "bg-deep-green text-white shadow-xs"
                    : "text-secondary hover:text-primary"
                }`}
                onMouseEnter={() => setCursorState("hover")}
                onMouseLeave={() => setCursorState("normal")}
              >
                <Layers size={14} />
                <span>Visual Gallery</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-deep-green text-white shadow-xs"
                    : "text-secondary hover:text-primary"
                }`}
                onMouseEnter={() => setCursorState("hover")}
                onMouseLeave={() => setCursorState("normal")}
              >
                <Grid3X3 size={14} />
                <span>Calculator Suite</span>
              </button>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-12 h-12 rounded-2xl bg-deep-green/10 flex items-center justify-center text-deep-green flex-shrink-0"
            >
              <Calculator size={22} />
            </motion.div>
          </div>
        </div>

        {/* 3D Infinite Gallery View */}
        {viewMode === "gallery" && (
          <div className="space-y-8">
            <div className="relative rounded-3xl border border-light-border overflow-hidden bg-[#F7F7F2] shadow-sm">
              {/* Interaction Hints Overlay */}
              <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 pointer-events-none">
                <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-light-border text-primary text-xs font-medium shadow-xs">
                  ✨ Drag to scroll • Mouse drift parallax
                </span>
                <span className="hidden sm:inline-flex px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-light-border text-secondary text-xs font-medium shadow-xs">
                  Click any image card to focus & calculate
                </span>
              </div>

              <div className="absolute bottom-4 right-4 z-20 pointer-events-none">
                <span className="px-3 py-1 rounded-full bg-primary/80 backdrop-blur-md text-white text-[11px] font-medium tracking-wide">
                  Visual Asset Directory • Interactive
                </span>
              </div>

              {/* The React Bits Pro 3D Infinite Gallery Component */}
              <div className="h-[460px] md:h-[520px] w-full">
                <InfiniteGallery
                  width="100%"
                  height="100%"
                  images={GALLERY_IMAGES}
                  density={4}
                  imageSize={16}
                  cellSize={115}
                  viewRange={2}
                  fogNear={120}
                  fogFar={320}
                  dragSpeed={1.1}
                  driftAmount={8}
                  friction={0.9}
                  autoZoom={false}
                  imageRadius={0.08}
                  allowImageFocusOnClick={true}
                  backgroundColor="#F7F7F2"
                  fogColor="#F7F7F2"
                  onItemSelect={handleGalleryItemSelect}
                />
              </div>
            </div>

            {/* Quick Calculator Switcher Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {CALCULATORS.map((calc) => {
                const IconComponent = calc.icon;
                const isSelected = activeCalcId === calc.id;
                return (
                  <button
                    key={calc.id}
                    type="button"
                    onClick={() => handleSelectCalc(calc)}
                    className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl border text-sm font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-primary text-white border-primary shadow-md scale-[1.02]"
                        : "bg-white text-secondary hover:text-primary border-light-border hover:border-gray-300"
                    }`}
                    onMouseEnter={() => setCursorState("hover")}
                    onMouseLeave={() => setCursorState("normal")}
                  >
                    <IconComponent size={16} className={isSelected ? "text-gold" : "text-secondary"} />
                    <span>{calc.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Focused Calculator Interactive Computation Workbench */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCalc.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="bg-white rounded-3xl border border-light-border p-8 md:p-10 shadow-sm"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left Column: Sliders & Controls */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-deep-green/10 flex items-center justify-center text-deep-green">
                        <activeCalc.icon size={24} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-serif text-primary tracking-tight">
                          {activeCalc.name}
                        </h3>
                        <p className="text-sm text-secondary leading-relaxed">
                          {activeCalc.desc}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-5 pt-2">
                      {/* Input 1 */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-xs font-semibold text-secondary uppercase tracking-wider">
                            {activeCalc.labelVal1}
                          </label>
                          <span className="text-sm font-bold text-primary tabular-nums">
                            {activeCalc.prefixVal1}
                            {val1.toLocaleString("en-IN")}
                          </span>
                        </div>
                        <input
                          type="range"
                          min={activeCalc.id === "tax" ? 300000 : activeCalc.id === "emi" ? 500000 : 1000}
                          max={activeCalc.id === "tax" ? 5000000 : activeCalc.id === "emi" ? 20000000 : 200000}
                          step={activeCalc.id === "tax" ? 50000 : activeCalc.id === "emi" ? 100000 : 1000}
                          value={val1}
                          onChange={(e) => setVal1(Number(e.target.value))}
                          className="w-full accent-deep-green cursor-pointer"
                        />
                      </div>

                      {/* Input 2 */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-xs font-semibold text-secondary uppercase tracking-wider">
                            {activeCalc.labelVal2}
                          </label>
                          <span className="text-sm font-bold text-primary tabular-nums">
                            {val2} {activeCalc.suffixVal2}
                          </span>
                        </div>
                        <input
                          type="range"
                          min={activeCalc.id === "tax" ? 50000 : 4}
                          max={activeCalc.id === "tax" ? 150000 : 25}
                          step={activeCalc.id === "tax" ? 5000 : 0.25}
                          value={val2}
                          onChange={(e) => setVal2(Number(e.target.value))}
                          className="w-full accent-deep-green cursor-pointer"
                        />
                      </div>

                      {/* Tenure */}
                      {activeCalc.id !== "tax" && (
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <label className="text-xs font-semibold text-secondary uppercase tracking-wider">
                              Investment Tenure / Horizon
                            </label>
                            <span className="text-sm font-bold text-primary tabular-nums">
                              {tenure} Years
                            </span>
                          </div>
                          <input
                            type="range"
                            min={1}
                            max={activeCalc.id === "ppf" ? 15 : 30}
                            step={1}
                            value={tenure}
                            onChange={(e) => setTenure(Number(e.target.value))}
                            className="w-full accent-deep-green cursor-pointer"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Live Calculated Summary Card */}
                  <div className="lg:col-span-5 bg-[#FAF9F5] border border-light-border rounded-2xl p-6 md:p-8 space-y-6">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-secondary block mb-1">
                        {results.primaryLabel}
                      </span>
                      <div className="text-3xl md:text-4xl font-serif text-primary tracking-tight text-deep-green tabular-nums">
                        {results.primaryVal}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-light-border">
                      <div>
                        <span className="text-xs text-secondary block mb-1">
                          {results.secondaryLabel}
                        </span>
                        <div className="text-base font-semibold text-primary tabular-nums">
                          {results.secondaryVal}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs text-secondary block mb-1">
                          {results.breakdownLabel}
                        </span>
                        <div className="text-base font-semibold text-deep-green tabular-nums">
                          {results.breakdownVal}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        className="w-full py-3.5 bg-primary text-white rounded-xl font-medium hover:bg-deep-green transition-colors text-sm cursor-pointer shadow-xs active:scale-[0.99] flex items-center justify-center gap-2"
                        onMouseEnter={() => setCursorState("hover")}
                        onMouseLeave={() => setCursorState("normal")}
                      >
                        <span>Start Plan with {activeCalc.shortName}</span>
                        <Maximize2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Classic Grid Suite View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {CALCULATORS.map((calc, index) => {
              const IconComponent = calc.icon;
              const isOpen = activeCalcId === calc.id;
              return (
                <motion.div
                  key={calc.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.08 * index }}
                  className="bg-white rounded-3xl border border-light-border overflow-hidden shadow-xs hover:shadow-md transition-shadow"
                >
                  <button
                    type="button"
                    onClick={() => {
                      // Ensuring only this one opens, others close
                      setActiveCalcId(isOpen ? "" : calc.id);
                    }}
                    className="w-full p-6 text-left flex items-start gap-4 hover:bg-gray-50/80 transition-colors cursor-pointer"
                    onMouseEnter={() => setCursorState("hover")}
                    onMouseLeave={() => setCursorState("normal")}
                  >
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-primary flex-shrink-0">
                      <IconComponent size={22} />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold text-primary mb-1 tracking-tight">
                        {calc.name}
                      </h3>
                      <p className="text-sm text-secondary line-clamp-2 leading-relaxed">
                        {calc.desc}
                      </p>
                    </div>
                    <div
                      className={`transform transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      <ChevronDown className="text-gray-400" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden bg-gray-50 border-t border-light-border"
                      >
                        <div className="p-6">
                          <div className="space-y-4">
                            <div>
                              <label className="text-xs font-medium text-secondary block mb-1.5">
                                {calc.labelVal1}
                              </label>
                              <input
                                type="text"
                                defaultValue={`${calc.prefixVal1}${calc.defaultVal1.toLocaleString("en-IN")}`}
                                className="w-full px-3.5 py-2.5 bg-white border border-light-border rounded-xl text-primary font-medium text-sm focus:outline-none focus:ring-1 focus:ring-deep-green"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-medium text-secondary block mb-1.5">
                                {calc.labelVal2}
                              </label>
                              <input
                                type="text"
                                defaultValue={`${calc.defaultVal2} ${calc.suffixVal2}`}
                                className="w-full px-3.5 py-2.5 bg-white border border-light-border rounded-xl text-primary font-medium text-sm focus:outline-none focus:ring-1 focus:ring-deep-green"
                              />
                            </div>
                            <button
                              type="button"
                              className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:bg-deep-green transition-colors text-sm cursor-pointer shadow-xs active:scale-[0.99]"
                            >
                              Calculate {calc.shortName}
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
