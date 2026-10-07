export type Market = {
  id: string;
  name: string;
  value: string;
  change: string;
  isPositive: boolean;
  region: 'India' | 'US' | 'Europe' | 'Asia';
};

export const markets: Market[] = [
  { id: "nifty", name: "NIFTY 50", value: "25,321.40", change: "+1.24%", isPositive: true, region: "India" },
  { id: "sensex", name: "SENSEX", value: "83,124.70", change: "+0.86%", isPositive: true, region: "India" },
  { id: "sp500", name: "S&P 500", value: "5,123.69", change: "+0.42%", isPositive: true, region: "US" },
  { id: "nasdaq", name: "NASDAQ", value: "16,248.52", change: "+0.61%", isPositive: true, region: "US" },
  { id: "ftse", name: "FTSE 100", value: "7,890.35", change: "-0.18%", isPositive: false, region: "Europe" },
  { id: "nikkei", name: "NIKKEI", value: "39,431.10", change: "+0.73%", isPositive: true, region: "Asia" },
];

export const countryMarkets: Record<string, Market[]> = {
  "India": [
    { id: "nifty", name: "NIFTY 50", value: "25,321.40", change: "+1.24%", isPositive: true, region: "India" },
    { id: "sensex", name: "SENSEX", value: "83,124.70", change: "+0.86%", isPositive: true, region: "India" }
  ],
  "United States": [
    { id: "sp500", name: "S&P 500", value: "5,123.69", change: "+0.42%", isPositive: true, region: "US" },
    { id: "nasdaq", name: "NASDAQ", value: "16,248.52", change: "+0.61%", isPositive: true, region: "US" }
  ],
  "United Kingdom": [
    { id: "ftse", name: "FTSE 100", value: "7,890.35", change: "-0.18%", isPositive: false, region: "Europe" }
  ],
  "Japan": [
    { id: "nikkei", name: "NIKKEI", value: "39,431.10", change: "+0.73%", isPositive: true, region: "Asia" }
  ],
  "Germany": [
    { id: "dax", name: "DAX", value: "18,234.12", change: "+0.32%", isPositive: true, region: "Europe" }
  ]
};
