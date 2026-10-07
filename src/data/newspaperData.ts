export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  marketCap: string;
  dayHigh: number;
  dayLow: number;
  high52: number;
  low52: number;
  peRatio: number;
  dividendYield: number;
  sector: string;
  description: string;
  historicalPoints: number[];
  relatedNews: string[];
}

export interface NewsArticle {
  id: string;
  title: string;
  category: string;
  summary: string;
  fullContent: string[];
  source: string;
  sourceUrl: string;
  publishedAt: string;
  author: string;
  edition: string;
  readTime: string;
  image?: string;
  caption?: string;
  pullQuote?: string;
  tags: string[];
}

export interface FinancialScheme {
  id: string;
  name: string;
  category: "Government" | "Savings" | "Tax-Saving" | "Pension" | "Bonds";
  interestRate: number;
  tenure: string;
  risk: "Low" | "Moderate" | "Capital Guaranteed";
  eligibility: string;
  minInvestment: string;
  maxInvestment: string;
  lockInPeriod: string;
  taxImplications: string;
  benefits: string[];
  risks: string[];
  description: string;
  officialSource: string;
  officialSourceUrl: string;
}

export interface MarketIndex {
  symbol: string;
  name: string;
  value: number;
  change: number;
  changePercent: number;
  weekChangePercent: number;
  monthChangePercent: number;
  high: number;
  low: number;
}

export interface SectorWatchItem {
  id: string;
  name: string;
  changePercent: number;
  leaders: string[];
  laggards: string[];
  analysis: string;
}

export interface WorldMarket {
  name: string;
  region: string;
  value: number;
  changePercent: number;
  currency: string;
}

export const breakingNewsTicker = [
  "RBI ANNOUNCES LIQUIDITY INJECTION FRAMEWORK FOR SYSTEMIC CREDIT EXPANSION",
  "NIFTY BREACHES ALL-TIME MILESTONE AMID RECORD FII INFLOWS OF ₹4,820 CR",
  "CENTRAL BANK HOLDS REPO RATE AT 6.50% WITH NEUTRAL STANCE MAINTAINED",
  "INDIA MANUFACTURING PMI SURGES TO 58.4 IN SEPTEMBER AS EXPORTS REBOUND",
  "SOVEREIGN GREEN BONDS TENDER OVERSUBSCRIBED 3.4X BY PENSION HOUSES",
];

export const marketGainers: Stock[] = [
  {
    symbol: "RELIANCE",
    name: "Reliance Industries Ltd",
    price: 3042.80,
    change: 84.10,
    changePercent: 2.84,
    volume: "5.82M",
    marketCap: "₹20.58T",
    dayHigh: 3058.00,
    dayLow: 2962.50,
    high52: 3217.90,
    low52: 2220.30,
    peRatio: 28.4,
    dividendYield: 0.35,
    sector: "Energy & Conglomerate",
    description: "Market rally propelled by petrochemical margins expansion and Jio tariff hike realization heading into Q3 earnings.",
    historicalPoints: [2960, 2980, 2975, 3010, 3025, 3042.8],
    relatedNews: ["Jio Platforms signals upcoming IPO timeline", "Green hydrogen giga-complex enters phase 2"],
  },
  {
    symbol: "TCS",
    name: "Tata Consultancy Services",
    price: 4328.50,
    change: 81.60,
    changePercent: 1.92,
    volume: "2.14M",
    marketCap: "₹15.65T",
    dayHigh: 4345.00,
    dayLow: 4250.00,
    high52: 4592.25,
    low52: 3313.00,
    peRatio: 31.8,
    dividendYield: 1.48,
    sector: "Information Technology",
    description: "Solid mid-quarter momentum bolstered by large UK & Nordic financial transformation deals totaling $1.2B.",
    historicalPoints: [4248, 4260, 4290, 4310, 4305, 4328.5],
    relatedNews: ["TCS secures multi-year digital transformation with European bank"],
  },
  {
    symbol: "INFY",
    name: "Infosys Limited",
    price: 1944.30,
    change: 28.40,
    changePercent: 1.48,
    volume: "4.35M",
    marketCap: "₹8.07T",
    dayHigh: 1955.00,
    dayLow: 1918.00,
    high52: 1991.45,
    low52: 1358.35,
    peRatio: 30.2,
    dividendYield: 1.82,
    sector: "Information Technology",
    description: "Generative AI Topaz platform client wins drive upgrade in full-year dollar revenue guidance floor.",
    historicalPoints: [1915, 1922, 1930, 1928, 1940, 1944.3],
    relatedNews: ["Enterprise AI bookings climb 40% quarter-on-quarter"],
  },
  {
    symbol: "HDFCBANK",
    name: "HDFC Bank Limited",
    price: 1682.20,
    change: 20.15,
    changePercent: 1.21,
    volume: "12.8M",
    marketCap: "₹12.78T",
    dayHigh: 1690.00,
    dayLow: 1665.00,
    high52: 1794.00,
    low52: 1363.55,
    peRatio: 19.4,
    dividendYield: 1.15,
    sector: "Banking & Financials",
    description: "Credit-deposit ratio normalization trends ahead of internal expectations with gross NPAs declining to 1.22%.",
    historicalPoints: [1662, 1668, 1672, 1675, 1680, 1682.2],
    relatedNews: ["Retail lending expands 14% year-on-year"],
  },
  {
    symbol: "ICICIBANK",
    name: "ICICI Bank Limited",
    price: 1264.90,
    change: 11.80,
    changePercent: 0.94,
    volume: "8.40M",
    marketCap: "₹8.89T",
    dayHigh: 1272.00,
    dayLow: 1251.00,
    high52: 1332.95,
    low52: 914.00,
    peRatio: 18.2,
    dividendYield: 0.85,
    sector: "Banking & Financials",
    description: "Domestic net interest margins remain resilient at 4.36% amid prudent corporate underwriting.",
    historicalPoints: [1252, 1255, 1260, 1258, 1263, 1264.9],
    relatedNews: ["Core operating profit up 15.2% on digital traction"],
  },
];

export const marketLosers: Stock[] = [
  {
    symbol: "ADANIENT",
    name: "Adani Enterprises Ltd",
    price: 3014.20,
    change: -100.00,
    changePercent: -3.21,
    volume: "2.40M",
    marketCap: "₹3.43T",
    dayHigh: 3120.00,
    dayLow: 2990.00,
    high52: 3450.00,
    low52: 2142.30,
    peRatio: 98.6,
    dividendYield: 0.04,
    sector: "Conglomerate & Infrastructure",
    description: "Profit booking following sharp 12-session run-up amid global commodities price cooling.",
    historicalPoints: [3115, 3090, 3060, 3030, 3005, 3014.2],
    relatedNews: ["Navi Mumbai airport terminal civil works reach 90%"],
  },
  {
    symbol: "WIPRO",
    name: "Wipro Limited",
    price: 524.80,
    change: -11.70,
    changePercent: -2.18,
    volume: "5.10M",
    marketCap: "₹2.74T",
    dayHigh: 538.00,
    dayLow: 521.00,
    high52: 588.90,
    low52: 375.00,
    peRatio: 24.1,
    dividendYield: 0.20,
    sector: "Information Technology",
    description: "Consulting vertical softness in North America weighs on sequential discretionary margin targets.",
    historicalPoints: [536, 532, 528, 525, 522, 524.8],
    relatedNews: ["Wipro reorganizes healthcare strategic business unit"],
  },
  {
    symbol: "ITC",
    name: "ITC Limited",
    price: 486.20,
    change: -8.60,
    changePercent: -1.74,
    volume: "9.20M",
    marketCap: "₹6.08T",
    dayHigh: 495.50,
    dayLow: 484.00,
    high52: 528.50,
    low52: 399.30,
    peRatio: 29.5,
    dividendYield: 2.85,
    sector: "FMCG & Agri",
    description: "Agri-commodity raw input inflation pressures FMCG gross margins slightly ahead of festive demand.",
    historicalPoints: [495, 492, 490, 488, 485, 486.2],
    relatedNews: ["Hotels business demerger enters final statutory clearances"],
  },
  {
    symbol: "SBIN",
    name: "State Bank of India",
    price: 818.50,
    change: -10.95,
    changePercent: -1.32,
    volume: "11.5M",
    marketCap: "₹7.30T",
    dayHigh: 832.00,
    dayLow: 815.00,
    high52: 912.10,
    low52: 555.25,
    peRatio: 11.2,
    dividendYield: 1.68,
    sector: "Public Sector Banking",
    description: "Slight uptick in deposit acquisition cost observed across tier-2 branches as savings yields adjust.",
    historicalPoints: [829, 826, 822, 820, 816, 818.5],
    relatedNews: ["SBI raises ₹10,000 Cr via Tier-2 infrastructure bonds at 7.36%"],
  },
  {
    symbol: "MARUTI",
    name: "Maruti Suzuki India",
    price: 12410.00,
    change: -108.00,
    changePercent: -0.86,
    volume: "0.38M",
    marketCap: "₹3.90T",
    dayHigh: 12560.00,
    dayLow: 12380.00,
    high52: 13680.00,
    low52: 9737.50,
    peRatio: 28.9,
    dividendYield: 1.01,
    sector: "Automotive",
    description: "Dealer channel inventories stabilize post-quarterly dispatch disclosures; hybrid models retain strong booking queue.",
    historicalPoints: [12520, 12480, 12440, 12400, 12390, 12410],
    relatedNews: ["Exports to European and Latin markets up 8% in H1"],
  },
];

export const marketIndices: MarketIndex[] = [
  {
    symbol: "NIFTY 50",
    name: "National Stock Exchange Benchmark",
    value: 24832.10,
    change: 202.45,
    changePercent: 0.82,
    weekChangePercent: 1.45,
    monthChangePercent: 3.12,
    high: 24890.30,
    low: 24650.15,
  },
  {
    symbol: "SENSEX",
    name: "BSE 30 Sovereign Index",
    value: 81654.20,
    change: 601.20,
    changePercent: 0.74,
    weekChangePercent: 1.28,
    monthChangePercent: 2.94,
    high: 81790.00,
    low: 81100.50,
  },
  {
    symbol: "BANK NIFTY",
    name: "Indian Banking Sector Index",
    value: 52120.40,
    change: -110.15,
    changePercent: -0.21,
    weekChangePercent: 0.65,
    monthChangePercent: 1.84,
    high: 52350.00,
    low: 51980.20,
  },
  {
    symbol: "NIFTY IT",
    name: "Information Technology Leaders",
    value: 41890.60,
    change: 540.30,
    changePercent: 1.31,
    weekChangePercent: 2.10,
    monthChangePercent: 4.80,
    high: 41980.00,
    low: 41410.00,
  },
];

export const leadStory: NewsArticle = {
  id: "lead-rally-liquidity",
  title: "CAPITAL SURGE: NIFTY SCALES 24,800 AS INSTITUTIONAL INFLOWS ACCELERATE",
  category: "FRONT PAGE · MARKET INTELLIGENCE",
  summary: "Indian equities logged broad-based appreciation as foreign and domestic institutions deployed record liquidity, buoyed by benign core inflation and resilient corporate balance sheets.",
  fullContent: [
    "MUMBAI — An unprecedented wave of institutional capital propelled the benchmark Nifty 50 toward fresh records on Tuesday, led by heavyweights Reliance Industries, Tata Consultancy Services, and private banking majors.",
    "Data compiled from trading exchanges showed Foreign Institutional Investors (FIIs) injected net purchases of ₹4,820 crore in the cash segment, while domestic mutual funds absorbed another ₹3,140 crore. The synchronized demand reflects growing confidence in India's macroeconomic insulation against volatile western interest rate trajectories.",
    "Treasury yields softened across sovereign curves, with the benchmark 10-year gilt yielding 6.88%, signaling that market participants anticipate a structurally benign inflation trajectory over the coming quarters.",
    "\"What we are witnessing is not speculative froth, but systematic long-term allocation from sovereign wealth funds rebalancing out of emerging Asian peers into Indian infrastructure and technology leaders,\" remarked Devendra Mehta, Chief Investment Strategist at Sovereign Alpha.",
    "Despite external currency headwinds elsewhere in the region, the Indian Rupee held firm at 83.82 against the US Dollar, supported by proactive central bank open-market reserve interventions."
  ],
  source: "Reuters Financial Desk",
  sourceUrl: "https://www.reuters.com/markets",
  publishedAt: "Tuesday, 06 October 2026",
  author: "Aravind Raghavan & Elena Vasquez",
  edition: "Late City Edition",
  readTime: "4 min read",
  pullQuote: "\"The Indian corporate balance sheet is at its least leveraged state in over two decades, providing authentic buffer to systemic earnings.\"",
  tags: ["Equities", "Macroeconomics", "FII Inflows", "Monetary Policy"],
};

export const businessArticles: NewsArticle[] = [
  {
    id: "art-rbi-liquidity",
    title: "CENTRAL BANK REFINES LIQUIDITY WINDOW TO AID TRANSMISSION",
    category: "MONETARY POLICY",
    summary: "The Reserve Bank of India introduced calibrated overnight standing deposit operations to ensure frictionless liquidity distribution across regional and scheduled commercial lenders.",
    fullContent: [
      "The monetary authority has outlined a structured framework to prevent frictional liquidity deficits from tightening short-term interbank money markets.",
      "Under the revised guidance, primary dealers will gain symmetrical access to collateralized credit lines during high advance-tax settlement fortnights.",
      "The move ensures credit supply to MSMEs and infrastructure borrowers remains unhindered through seasonal liquidity drain periods."
    ],
    source: "The Financial Express",
    sourceUrl: "https://www.financialexpress.com/economy",
    publishedAt: "06 Oct 2026",
    author: "Nalini Swaminathan",
    edition: "Banking & Finance",
    readTime: "3 min read",
    tags: ["Banking", "RBI", "Liquidity"],
  },
  {
    id: "art-sovereign-green-bonds",
    title: "SOVEREIGN GREEN BONDS DRAW TRIPLE SUBSCRIPTION FROM GLOBAL FUNDS",
    category: "DEBT CAPITAL MARKETS",
    summary: "India's latest tranche of 15-year Sovereign Green Bonds met with overwhelming appetite, pricing inside the sovereign curve with a greenium of 3 basis points.",
    fullContent: [
      "Pension houses in London, Tokyo, and Singapore bid aggressively for the ₹12,000 crore offering dedicated to renewable energy grid modernization and solar freight corridors.",
      "The tight spread demonstrates the credibility of the sovereign green finance taxonomy established by the Ministry of Finance.",
      "Proceeds will be directly audited by the Comptroller and Auditor General to guarantee end-use fidelity."
    ],
    source: "Bloomberg Terminal",
    sourceUrl: "https://www.bloomberg.com/markets",
    publishedAt: "06 Oct 2026",
    author: "Marcus Thorne",
    edition: "Sovereign Debt",
    readTime: "3 min read",
    tags: ["Green Bonds", "ESG", "Sovereign Debt"],
  },
  {
    id: "art-semiconductor-expansion",
    title: "DOMESTIC CHIP FABRICATION ECOSYSTEM SECURES SECOND ROUND CAPITAL",
    category: "TECHNOLOGY & INDUSTRY",
    summary: "Joint consortium in Gujarat breaks ground on 28nm legacy automotive node with guaranteed off-take pacts from top domestic automakers.",
    fullContent: [
      "The $4.5B facility has completed cleanroom structural validation ahead of schedule, with initial test wafers scheduled for Q2 2027.",
      "Automakers such as Tata Motors and Mahindra & Mahindra have committed to sourcing powertrain controller silicon locally, insulating domestic supply chains against overseas container embargoes."
    ],
    source: "Mint / Financial Intelligence",
    sourceUrl: "https://www.livemint.com/technology",
    publishedAt: "06 Oct 2026",
    author: "K. R. Venkatraman",
    edition: "Technology Desk",
    readTime: "4 min read",
    tags: ["Semiconductors", "Automotive", "Manufacturing"],
  },
];

export const financialSchemes: FinancialScheme[] = [
  {
    id: "scheme-nsc",
    name: "National Savings Certificate (NSC VIII)",
    category: "Savings",
    interestRate: 7.7,
    tenure: "5 Years",
    risk: "Capital Guaranteed",
    eligibility: "Any Resident Indian Individual or Guardian on behalf of Minor",
    minInvestment: "₹1,000 (No upper ceiling)",
    maxInvestment: "No Limit",
    lockInPeriod: "5 Years",
    taxImplications: "Eligible for Section 80C deduction up to ₹1.5 Lakh. Interest deemed reinvested annually qualifies for 80C deduction except in maturity year.",
    benefits: [
      "100% sovereign backing by the Government of India",
      "Compounded annually and paid upon maturity",
      "Accepted as collateral security for commercial bank credit lines",
      "No TDS deduction at source on interest accrual"
    ],
    risks: [
      "Premature withdrawal strictly restricted to exceptional circumstances (court decree/death)",
      "Returns fixed for tenure, no inflation indexation adjustment"
    ],
    description: "A premier low-risk fixed-income savings instrument backed by the Central Government, providing guaranteed capital preservation and tax benefits.",
    officialSource: "India Post & National Savings Institute",
    officialSourceUrl: "https://www.indiapost.gov.in/Financial/Pages/Content/National-Savings-Certificates.aspx",
  },
  {
    id: "scheme-sgb",
    name: "Sovereign Gold Bond Scheme (SGB Series)",
    category: "Government",
    interestRate: 2.5,
    tenure: "8 Years",
    risk: "Low",
    eligibility: "Resident Individuals, HUFs, Trusts, Universities, Charitable Institutions",
    minInvestment: "1 Gram of Gold (₹7,200 approx)",
    maxInvestment: "4 KG per individual/HUF per fiscal year",
    lockInPeriod: "5 Years (Exit window available on interest payment dates)",
    taxImplications: "Capital gains tax fully EXEMPT if held till 8-year maturity. Semi-annual interest of 2.50% p.a. taxed as per income slab.",
    benefits: [
      "Eliminates physical storage, locker costs, and making charges",
      "2.50% annual coupon paid semi-annually on nominal issue value",
      "Complete capital gains exemption on sovereign redemption",
      "Tradable on National Stock Exchange and BSE cash segments"
    ],
    risks: [
      "Maturity value tied to global market price of 999 purity gold at redemption",
      "Secondary market liquidity discounts can occur prior to 5-year RBI window"
    ],
    description: "Government securities denominated in grams of gold issued by the Reserve Bank of India, offering steady coupons plus full participation in gold appreciation.",
    officialSource: "Reserve Bank of India (RBI)",
    officialSourceUrl: "https://www.rbi.org.in/Scripts/FAQView.aspx?Id=109",
  },
  {
    id: "scheme-ppf",
    name: "Public Provident Fund (PPF)",
    category: "Tax-Saving",
    interestRate: 7.1,
    tenure: "15 Years (Extendable in 5-yr blocks)",
    risk: "Capital Guaranteed",
    eligibility: "Resident Indian Citizens (One account per citizen)",
    minInvestment: "₹500 / financial year",
    maxInvestment: "₹1,50,000 / financial year",
    lockInPeriod: "15 Years (Partial withdrawals allowed from 7th year)",
    taxImplications: "Exempt-Exempt-Exempt (EEE) status: Contribution deductible under 80C, interest earned completely tax-free, maturity corpus completely tax-free.",
    benefits: [
      "Gold standard triple-exempt (EEE) tax shelter",
      "Immune from attachment by court decree or creditor claims under Public Provident Fund Act",
      "Loan facility available from 3rd to 6th financial year",
      "Can be maintained indefinitely in 5-year blocks with or without contributions"
    ],
    risks: [
      "Strict ₹1.5L annual deposit cap",
      "Interest rate reviewed quarterly by Ministry of Finance"
    ],
    description: "The crown jewel of Indian long-term wealth compounding, combining complete sovereign security with tax-free accumulation.",
    officialSource: "Ministry of Finance, Government of India",
    officialSourceUrl: "https://www.nsiindia.gov.in",
  },
  {
    id: "scheme-scss",
    name: "Senior Citizens Savings Scheme (SCSS)",
    category: "Pension",
    interestRate: 8.2,
    tenure: "5 Years",
    risk: "Capital Guaranteed",
    eligibility: "Individuals aged 60+ years (55+ for defense retirees / VRS)",
    minInvestment: "₹1,000",
    maxInvestment: "₹30,00,000",
    lockInPeriod: "5 Years (Premature closure penalty 1% to 1.5%)",
    taxImplications: "Investment eligible under 80C. Quarterly interest taxable as per recipient's slab, with TDS applicable if interest exceeds ₹50,000/yr.",
    benefits: [
      "Industry-leading 8.2% guaranteed quarterly sovereign payout",
      "Enhanced deposit limit of up to ₹30 Lakhs per eligible senior",
      "Immediate quarterly income credit into registered savings bank account"
    ],
    risks: [
      "Interest payouts taxable",
      "Penalties apply if funds withdrawn prior to 1 year of tenure"
    ],
    description: "High-yield sovereign income solution tailored specifically for retirement security, providing predictable cash flow.",
    officialSource: "Department of Economic Affairs",
    officialSourceUrl: "https://dea.gov.in",
  },
];

export const sectorWatch: SectorWatchItem[] = [
  {
    id: "sec-banking",
    name: "BANKING & FINANCE",
    changePercent: 1.84,
    leaders: ["HDFC Bank (+1.21%)", "ICICI Bank (+0.94%)", "Kotak Bank (+1.35%)"],
    laggards: ["State Bank of India (-1.32%)", "Bandhan Bank (-0.80%)"],
    analysis: "Strong festive retail credit appetite offset margin compression concerns among state lenders.",
  },
  {
    id: "sec-it",
    name: "INFORMATION TECHNOLOGY",
    changePercent: 1.12,
    leaders: ["TCS (+1.92%)", "Infosys (+1.48%)", "LTIMindtree (+2.10%)"],
    laggards: ["Wipro (-2.18%)", "Tech Mahindra (-0.45%)"],
    analysis: "Continental Europe cloud and generative AI renewals drive upward multiple revisions.",
  },
  {
    id: "sec-pharma",
    name: "PHARMACEUTICALS & HEALTHCARE",
    changePercent: 0.62,
    leaders: ["Sun Pharma (+1.45%)", "Cipla (+0.80%)"],
    laggards: ["Dr Reddy's (-0.35%)"],
    analysis: "US FDA establishment inspection clearance at Halol facility brings regulatory reprieve.",
  },
  {
    id: "sec-energy",
    name: "OIL, GAS & RENEWABLES",
    changePercent: 0.92,
    leaders: ["Reliance (+2.84%)", "NTPC (+1.10%)"],
    laggards: ["ONGC (-0.50%)"],
    analysis: "Refining cracks expand amid low inventory replenishment across Mediterranean hubs.",
  },
  {
    id: "sec-auto",
    name: "AUTOMOTIVE & MOBILITY",
    changePercent: -0.41,
    leaders: ["Tata Motors (+0.60%)", "Bajaj Auto (+1.15%)"],
    laggards: ["Maruti Suzuki (-0.86%)", "Eicher Motors (-1.20%)"],
    analysis: "Dealer channel discounting ahead of Navratri inventory absorption weighs slightly on OEM realized ASPs.",
  },
  {
    id: "sec-realty",
    name: "REAL ESTATE & INFRA",
    changePercent: -0.76,
    leaders: ["DLF (+0.40%)"],
    laggards: ["Godrej Properties (-1.85%)", "Macrotech Developers (-1.10%)"],
    analysis: "High base effect in luxury residential sales bookings prompts short-term consolidation.",
  },
];

export const worldMarkets: WorldMarket[] = [
  { name: "S&P 500", region: "New York", value: 5751.20, changePercent: 0.42, currency: "USD" },
  { name: "NASDAQ", region: "New York", value: 18192.40, changePercent: 0.71, currency: "USD" },
  { name: "DOW JONES", region: "New York", value: 42150.80, changePercent: -0.13, currency: "USD" },
  { name: "NIKKEI 225", region: "Tokyo", value: 39340.50, changePercent: 0.88, currency: "JPY" },
  { name: "HANG SENG", region: "Hong Kong", value: 22736.90, changePercent: -0.32, currency: "HKD" },
  { name: "FTSE 100", region: "London", value: 8303.60, changePercent: 0.21, currency: "GBP" },
  { name: "DAX 40", region: "Frankfurt", value: 19180.30, changePercent: 0.35, currency: "EUR" },
  { name: "GIFT NIFTY", region: "Gandhinagar", value: 24920.00, changePercent: 0.94, currency: "INR" },
];
