import { calculateSIP, formatIndianCurrency } from "@/data/forecast";

export interface AlternateScenario {
  id: "sip" | "retire" | "expenses";
  title: string;
  action: string;
  badge: string;
  tagline: string;
  baseMonthly: number;
  newMonthly: number;
  years: number;
  expectedReturn: number;
  baseWealth: number;
  alternateWealth: number;
  potentialDifference: number;
  additionalInvested: number;
  additionalGrowth: number;
  changedBullet1: string;
  changedBullet2: string;
  changedBullet3: string;
  retireYearsEarlier?: number;
  retireDaysSaved?: number;
  baseRetireAge?: number;
  newRetireAge?: number;
}

// Calculations:
// 1. SIP Boost: Base ₹10k/mo, New ₹15k/mo, 15 yrs, 12% return
const sipBase = Math.round(calculateSIP(10000, 15, 12)); // ~₹50.5L
const sipNew = Math.round(calculateSIP(15000, 15, 12));  // ~₹75.7L
const sipDiff = sipNew - sipBase; // ~₹25.2L
const sipExtraInvested = 5000 * 15 * 12; // ₹9.0L

// 2. Retire Earlier: Target Corpus ₹3.1 Cr
// Baseline: Reached at age 60 (after 25 years with ₹16k/mo)
// Alternate: Reached at age 55 (after 20 years with ₹28k/mo) -> 5 years earlier!
const retireBaseCorpus = 24000000; // ₹2.4 Cr at age 55 baseline
const retireNewCorpus = 31000000;  // ₹3.1 Cr at age 55 alternate (reaches full freedom 5 yrs early)
const retireDiff = retireNewCorpus - retireBaseCorpus;

// 3. Reduce Expenses: 10% monthly spend saved from ₹40,000 lifestyle budget = +₹4,000/mo redirected to SIP
// Base ₹10k/mo vs New ₹14k/mo over 15 years, 12%
const expBase = Math.round(calculateSIP(10000, 15, 12));
const expNew = Math.round(calculateSIP(14000, 15, 12));
const expDiff = expNew - expBase;
const expExtraInvested = 4000 * 15 * 12; // ₹7.2L

export const alternateScenarios: AlternateScenario[] = [
  {
    id: "sip",
    title: "Increase SIP",
    action: "+ ₹5,000 monthly",
    badge: "COMPOUNDING SURGE",
    tagline: "Small monthly discipline creates exponential future divergence.",
    baseMonthly: 10000,
    newMonthly: 15000,
    years: 15,
    expectedReturn: 12,
    baseWealth: sipBase,
    alternateWealth: sipNew,
    potentialDifference: sipDiff,
    additionalInvested: sipExtraInvested,
    additionalGrowth: sipDiff - sipExtraInvested,
    changedBullet1: "+ ₹5,000 / month incremental capital",
    changedBullet2: "+ ₹60,000 / year sustained allocation",
    changedBullet3: `+ ${formatIndianCurrency(sipDiff)} projected future difference`,
  },
  {
    id: "retire",
    title: "Retire earlier",
    action: "Retire at 55 instead of 60",
    badge: "TIME RECLAMATION",
    tagline: "Five years earlier: reclaim your prime years for sovereign freedom.",
    baseMonthly: 16000,
    newMonthly: 28000,
    years: 20,
    expectedReturn: 12,
    baseWealth: retireBaseCorpus,
    alternateWealth: retireNewCorpus,
    potentialDifference: retireDiff,
    additionalInvested: 12000 * 20 * 12,
    additionalGrowth: retireDiff - (12000 * 20 * 12),
    retireYearsEarlier: 5,
    retireDaysSaved: 1825,
    baseRetireAge: 60,
    newRetireAge: 55,
    changedBullet1: "Retirement moved 5 years earlier",
    changedBullet2: "≈ 1,825 potential additional days of freedom",
    changedBullet3: `+ ${formatIndianCurrency(retireDiff)} corpus accelerated to age 55`,
  },
  {
    id: "expenses",
    title: "Reduce expenses",
    action: "- 10% monthly spend",
    badge: "EXPENSE REDIRECTION",
    tagline: "Money that isn't consumed today transforms directly into compounding wealth.",
    baseMonthly: 10000,
    newMonthly: 14000,
    years: 15,
    expectedReturn: 12,
    baseWealth: expBase,
    alternateWealth: expNew,
    potentialDifference: expDiff,
    additionalInvested: expExtraInvested,
    additionalGrowth: expDiff - expExtraInvested,
    changedBullet1: "10% less monthly lifestyle consumption (₹4,000/mo saved)",
    changedBullet2: "Capital redirected directly into sovereign asset growth",
    changedBullet3: `+ ${formatIndianCurrency(expDiff)} potential future difference`,
  },
];
