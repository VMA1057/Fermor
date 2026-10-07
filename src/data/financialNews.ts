export type NewsItem = {
  id: string;
  title: string;
  source: string;
  time: string;
};

export const countryNews: Record<string, NewsItem[]> = {
  "India": [
    { id: "in-1", title: "Nifty reaches new milestone as IT sector surges", source: "Mint", time: "2 hours ago" },
    { id: "in-2", title: "RBI policy expectations shift amidst inflation data", source: "Economic Times", time: "5 hours ago" },
    { id: "in-3", title: "Indian markets react positively to global cues", source: "Business Standard", time: "1 day ago" }
  ],
  "United States": [
    { id: "us-1", title: "Fed signals potential rate cut by end of year", source: "WSJ", time: "1 hour ago" },
    { id: "us-2", title: "Tech stocks rally on strong earnings reports", source: "Bloomberg", time: "3 hours ago" },
    { id: "us-3", title: "Consumer spending shows unexpected resilience", source: "CNBC", time: "1 day ago" }
  ],
  "United Kingdom": [
    { id: "uk-1", title: "Bank of England maintains interest rates", source: "Financial Times", time: "4 hours ago" },
    { id: "uk-2", title: "UK inflation cools more than expected", source: "Reuters", time: "8 hours ago" }
  ],
  "Japan": [
    { id: "jp-1", title: "Bank of Japan considers shifting monetary policy", source: "Nikkei", time: "3 hours ago" },
    { id: "jp-2", title: "Yen stabilizes against the dollar after intervention hints", source: "Bloomberg", time: "6 hours ago" }
  ]
};

export const globalNews: NewsItem[] = [
  { id: "gl-1", title: "Global markets respond to shifting interest rate expectations", source: "Financial Times", time: "2 hours ago" },
  { id: "gl-2", title: "What changing demographics mean for long-term investors", source: "Bloomberg", time: "5 hours ago" },
  { id: "gl-3", title: "Understanding the next wave of wealth creation in emerging markets", source: "WSJ", time: "1 day ago" }
];
