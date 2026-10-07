// Exchange rates relative to INR (1 INR = X Foreign Currency)
// Benchmark reference rates (updated 2026 indicative benchmarks)
export const fallbackExchangeRates: Record<string, number> = {
  INR: 1,
  USD: 0.0115,
  EUR: 0.0106,
  GBP: 0.00885,
  JPY: 1.74,
  SGD: 0.0149,
  AUD: 0.0177,
  CAD: 0.0159,
  CNY: 0.0820,
  AED: 0.0423,
  CHF: 0.00985,
  BRL: 0.067,
  ZAR: 0.21,
};

export const exchangeRates: Record<string, number> = { ...fallbackExchangeRates };

/**
 * Live rates fetching architecture with resilient static fallback.
 * Attempts to retrieve live rates from open exchange API;
 * on any network or parsing error, seamlessly preserves fallback rates.
 */
export async function fetchLiveExchangeRates(): Promise<Record<string, number>> {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/INR", {
      cache: "force-cache",
    });
    if (!res.ok) throw new Error("Exchange rate response was not ok");
    const data = await res.json();
    if (data && data.rates && typeof data.rates === "object") {
      Object.assign(exchangeRates, data.rates);
      return exchangeRates;
    }
  } catch {
    // Graceful fallback: return current reliable benchmarks
  }
  return exchangeRates;
}

export function convertCurrency(
  amount: number,
  fromCode: string,
  toCode: string,
  rates: Record<string, number> = exchangeRates
): number {
  if (fromCode === toCode) return amount;

  const fromRate = rates[fromCode] ?? fallbackExchangeRates[fromCode] ?? 1;
  const toRate = rates[toCode] ?? fallbackExchangeRates[toCode] ?? 1;

  // Convert from source to INR
  const inrAmount = amount / fromRate;

  // Convert from INR to target
  return inrAmount * toRate;
}
