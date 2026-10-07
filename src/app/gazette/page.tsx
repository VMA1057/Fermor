import FinancialNewspaper from "@/components/newspaper/FinancialNewspaper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Financial Chronicle · Fermor Market Intelligence",
  description: "Interactive 3D broadsheet market intelligence desk with real-time equity gainers, losers, sovereign schemes, and financial analysis.",
};

export default function GazettePage() {
  return (
    <main className="min-h-screen bg-[#161412] pt-20">
      <FinancialNewspaper />
    </main>
  );
}
