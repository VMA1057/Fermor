export type Country = {
  id: string;
  name: string;
  code: string;
  currency: string;
  symbol: string;
  locale: string;
  latitude: number;
  longitude: number;
};

export const countries: Country[] = [
  { id: "in", name: "India", code: "INR", currency: "Indian Rupee", symbol: "₹", locale: "en-IN", latitude: 20.5937, longitude: 78.9629 },
  { id: "us", name: "United States", code: "USD", currency: "US Dollar", symbol: "$", locale: "en-US", latitude: 37.0902, longitude: -95.7129 },
  { id: "uk", name: "United Kingdom", code: "GBP", currency: "British Pound", symbol: "£", locale: "en-GB", latitude: 55.3781, longitude: -3.4360 },
  { id: "jp", name: "Japan", code: "JPY", currency: "Japanese Yen", symbol: "¥", locale: "ja-JP", latitude: 36.2048, longitude: 138.2529 },
  { id: "sg", name: "Singapore", code: "SGD", currency: "Singapore Dollar", symbol: "S$", locale: "en-SG", latitude: 1.3521, longitude: 103.8198 },
  { id: "au", name: "Australia", code: "AUD", currency: "Australian Dollar", symbol: "A$", locale: "en-AU", latitude: -25.2744, longitude: 133.7751 },
  { id: "ca", name: "Canada", code: "CAD", currency: "Canadian Dollar", symbol: "C$", locale: "en-CA", latitude: 56.1304, longitude: -106.3468 },
  { id: "cn", name: "China", code: "CNY", currency: "Chinese Yuan", symbol: "¥", locale: "zh-CN", latitude: 35.8617, longitude: 104.1954 },
  { id: "ae", name: "UAE", code: "AED", currency: "UAE Dirham", symbol: "د.إ", locale: "ar-AE", latitude: 23.4241, longitude: 53.8478 },
  { id: "ch", name: "Switzerland", code: "CHF", currency: "Swiss Franc", symbol: "CHF", locale: "de-CH", latitude: 46.8182, longitude: 8.2275 },
  { id: "br", name: "Brazil", code: "BRL", currency: "Brazilian Real", symbol: "R$", locale: "pt-BR", latitude: -14.2350, longitude: -51.9253 },
  { id: "za", name: "South Africa", code: "ZAR", currency: "South African Rand", symbol: "R", locale: "en-ZA", latitude: -30.5595, longitude: 22.9375 },
  { id: "de", name: "Germany", code: "EUR", currency: "Euro", symbol: "€", locale: "de-DE", latitude: 51.1657, longitude: 10.4515 },
  { id: "fr", name: "France", code: "EUR", currency: "Euro", symbol: "€", locale: "fr-FR", latitude: 46.2276, longitude: 2.2137 }
];
