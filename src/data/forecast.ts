export function calculateSIP(monthlyInvestment: number, years: number, expectedReturn: number): number {
  const n = years * 12;
  const r = expectedReturn / 100 / 12;
  
  if (r === 0) return monthlyInvestment * n;
  
  const futureValue = monthlyInvestment * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  return futureValue;
}

export function generateChartData(monthlyInvestment: number, years: number, expectedReturn: number) {
  const data = [];
  const currentYear = new Date().getFullYear();
  
  const r = expectedReturn / 100 / 12;
  
  for (let i = 0; i <= years; i++) {
    const n = i * 12;
    let futureValue = 0;
    
    if (i === 0) {
      futureValue = 0;
    } else {
      if (r === 0) {
        futureValue = monthlyInvestment * n;
      } else {
        futureValue = monthlyInvestment * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
      }
    }
    
    data.push({
      year: currentYear + i,
      value: Math.round(futureValue),
      invested: monthlyInvestment * n
    });
  }
  
  return data;
}

export function formatIndianCurrency(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  } else if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  } else {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  }
}

export function formatExactIndianCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}
