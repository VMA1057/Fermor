import type { Metadata, Viewport } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/cursor/CustomCursor";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { CursorProvider } from "@/components/cursor/CursorContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0F6B4F",
};

export const metadata: Metadata = {
  title: "Fermor — Understand Your Money. Plan Your Future.",
  description:
    "An interactive personal wealth modeling platform. Understand cashflow, model multi-year scenarios, track milestones, and make confident financial decisions.",
  applicationName: "Fermor",
  keywords: [
    "personal finance",
    "wealth modeling",
    "SIP calculator",
    "financial planning India",
    "compounding simulator",
    "market intelligence",
    "what if financial decisions",
  ],
  authors: [{ name: "Fermor" }],
  creator: "Fermor",
  publisher: "Fermor",
  metadataBase: new URL("https://fermor.app"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/favicon.svg" },
    ],
  },
  openGraph: {
    title: "Fermor — Understand Your Money. Plan Your Future.",
    description:
      "Interactive personal finance and scenario modeling. Understand your spending, plan multi-year targets, and see how everyday choices shape your compounding wealth.",
    url: "https://fermor.app",
    siteName: "Fermor",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fermor — Understand Your Money. Plan Your Future.",
    description:
      "Interactive personal finance and scenario modeling. Understand your money, plan your targets, and act on your wealth.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable}`}>
      <body className="antialiased selection:bg-[#0F6B4F] selection:text-[#F7F7F2] bg-[#F7F7F2] text-[#111111] overflow-x-hidden min-h-screen">
        <CursorProvider>
          <CustomCursor />
          <Navigation />
          <main id="main-content">{children}</main>
          <Footer />
        </CursorProvider>
      </body>
    </html>
  );
}
