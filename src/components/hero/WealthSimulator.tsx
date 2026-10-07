"use client";

import WealthProjectionCard, { WealthProjectionCardProps } from "@/components/wealth/WealthProjectionCard";

export type { WealthProjectionCardProps };

export default function WealthSimulator(props: WealthProjectionCardProps) {
  return <WealthProjectionCard {...props} />;
}
