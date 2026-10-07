import Hero from "@/components/hero/Hero";
import FermorProduct from "@/components/finance/FermorProduct";
import WealthSimulator from "@/components/hero/WealthSimulator";
import DepthCardShowcase from "@/components/ui/DepthCardShowcase";
import CalculatorsSection from "@/components/calculators/CalculatorsSection";
import WhatIf from "@/components/forecast/WhatIf";
import FinancialNewspaper from "@/components/newspaper/FinancialNewspaper";
import AudienceSection from "@/components/story/AudienceSection";
import PrivacySection from "@/components/story/PrivacySection";
import FaqSection from "@/components/story/FaqSection";
import WaitlistSection from "@/components/ui/WaitlistSection";

export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Understand your money (Miniature realistic UI mockups) */}
      <FermorProduct />

      {/* 3. Explore financial decisions */}
      <div id="portfolio" className="bg-[#F7F7F2] py-20 px-6 md:px-12 relative z-10 border-t border-light-border">
        <div className="container mx-auto max-w-4xl">
          <WealthSimulator />
        </div>
      </div>
      <DepthCardShowcase />
      <CalculatorsSection />

      {/* 4. What If / Alternate Future */}
      <WhatIf />

      {/* 5. Gazette / Financial News ("Understand the news that moves your money") */}
      <FinancialNewspaper />

      {/* 6. Who Fermor is for (Young Professionals, Families, Curious Investors) */}
      <AudienceSection />

      {/* 7. Privacy ("Your money. Your privacy." + SEBI disclaimer) */}
      <PrivacySection />

      {/* 8. Frequently Asked Questions (Accordion) */}
      <FaqSection />

      {/* 9. Waitlist */}
      <WaitlistSection />
    </>
  );
}
