export interface Milestone {
  year: number;
  calendarYear: number;
  label: string;
  value: number;
  invested: number;
  growth: number;
  xPercent: number; // 0 to 100%
  yPercent: number; // 0 to 100%
}

export interface GraphPoint {
  year: number;
  calendarYear: number;
  value: number;
  invested: number;
  growth: number;
  xPercent: number;
  yPercent: number;
}

export interface WealthScenario {
  monthlyInvestment: number;
  years: number;
  expectedReturn: number;
}
