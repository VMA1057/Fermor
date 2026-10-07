# Fermor

Live Demo:
[FINAL VERCEL URL]

---

## What is Fermor?

Most personal finance software is either an intimidating spreadsheet dressed up with modern buttons or a predatory funnel trying to sell you high-commission mutual funds and credit cards. When you want to answer a straightforward question—like *"If I cut ₹6,000 from discretionary weekend spending and put it into an index fund for 12 years, what does that actually buy me?"*—you are usually stuck with rigid, static form fields that don't give you any physical intuition for compounding.

Fermor is my attempt to build personal finance software that feels like an exploratory instrument rather than a ledger. It combines client-side compounding simulations with an editorial broadsheet aesthetic inspired by physical financial newspapers. You don't fill out forms; you push and pull levers in real time, see alternative futures fork side by side, and read curated market intelligence that ties macro realities (inflation, repo rates, sectoral shifts) directly to your household balance sheet.

### Who It's Built For
- **Young Professionals:** Figuring out their first significant salary, navigating discretionary lifestyle creep, and looking for a clear reason to start compounding early.
- **Families:** Balancing recurring household costs with major multi-year commitments—children's education, home loan EMIs, and emergency reserves.
- **Curious Investors:** People who want to connect macro headlines (central bank policy, inflation prints, market regimes) with their actual personal portfolio.

---

## Why the Sections Are in This Order

The layout follows a continuous narrative arc from first impression to deep exploration, practical calculation, and ethical transparency:

1. **Hero & Global Currency Dial**
   * *Establishes the Thesis:* Opens with clear value messaging and an interactive currency selector. It immediately signals that purchasing power is relative and personal finance is interconnected with global markets.
2. **Understand Your Money (FermorProduct Mockup Preview)**
   * *Tangible Interface Preview:* Gives the visitor a taste of the tactile design system and realistic interface cards before they begin adjusting variables.
3. **Wealth Simulator & Portfolio Journey**
   * *Grounds the Visitor in Compounding:* The core milestone projection. Users slide contributions, time horizons, and CAGRs to watch their trajectory reach ₹10 Lakhs, ₹50 Lakhs, and ₹1 Crore milestones.
4. **Depth Card Showcase & Decision Suite (Calculators)**
   * *Tactical Execution:* Transitions from high-level projections into precise instruments (SIP, EMI, Lumpsum, SWP, Retirement) so users can stress-test specific life decisions with exact numbers and schedules.
5. **What If (Alternate Futures)**
   * *Decision Trade-Offs:* Compounding isn't linear in real life. This section lets users simulate behavioral forks—such as upgrading a car vs. taking a sabbatical vs. increasing savings by 10%—visualizing the opportunity cost side by side.
6. **The Financial Gazette (Broadsheet)**
   * *Connects Macro to Micro:* Personal wealth doesn't exist in a vacuum. The broadsheet newspaper connects everyday money decisions with policy rates, inflation prints, market indices, and economic policies.
7. **Who It's For (Audience Validation)**
   * *Contextual Resonance:* Breaks down specific use cases for young professionals, families, and curious investors so visitors see their exact life stage reflected.
8. **Data Transparency & Privacy Ethics**
   * *Trust Before Action:* Explains that calculations run 100% client-side in the browser, outlines the regulatory SEBI disclaimer, and clarifies data boundaries before asking for any user interaction.
9. **Common Questions (FAQ Accordion)**
   * *Resolves Friction:* Directly answers how projections are modeled, whether returns are guaranteed, and where market information originates.
10. **Early Access Waitlist (Interactive Demo)**
    * *Honest Next Action:* Closes the page with a clean, low-friction interaction clearly labeled as an interactive prototype demo.

---

## What I Cut and Why

- **Mobile WebGL 3D Globe:**
  * *Reason:* Running a full Three.js WebGL globe on mobile screens (< 768px) degraded frame rates, caused battery drain on mid-range phones, and squished hero copy.
  * *Action:* On mobile viewports, the Three.js canvas is replaced with an elegant CSS/SVG ambient pulse ring that preserves visual richness with 0ms rendering latency and 0 layout shifts.
- **Continuous Mobile Background Particles:**
  * *Reason:* Continuous physics calculation loops on small touchscreens drained battery and interfered with smooth scroll performance.
  * *Action:* Rendered a subtle static radial gradient background on mobile instead of active Framer Motion particle loops.
- **Mouse-Based 3D Tilt on Touchscreens:**
  * *Reason:* Coordinate-based mouse parallax tilt behaves erratically on touchscreens and can hijack vertical touch scrolling.
  * *Action:* Disabled 3D card tilt on touch devices via `@media (pointer: coarse)`, replacing it with snappy tap-scale feedback (`active:scale-[0.98]`).
- **Overused Serif Typography on UI Controls:**
  * *Reason:* Early drafts used DM Serif Display on body text, buttons, and numeric inputs, making numbers hard to read and diminishing visual hierarchy.
  * *Action:* Standardized all metrics, form inputs, buttons, and body descriptions to clean, highly legible Inter, reserving DM Serif Display strictly for primary editorial headlines.
- **Generic Third-Party Marketing Badges:**
  * *Reason:* Extraneous template labels and generic badges detracted from Fermor's focused editorial identity.
  * *Action:* Stripped out placeholder tags in favor of cohesive product terminology.

---

## Interesting Design Decisions

### Currency Globe
A standard dropdown is boring and invisible. Placing a rotating 3D globe in the hero isn't just visual polish—it establishes that purchasing power and currency depreciation are global, relative concepts. When someone switches between INR, USD, and EUR, they immediately see that domestic financial planning lives inside a larger global macroeconomic system.

### The Financial Gazette
I have always loved the tactile weight of physical financial broadsheets like the *Financial Times* or *The Economic Times*. In modern fintech, market news is usually reduced to noisy, clickbait push notifications and panic-inducing ticker tapes. Turning the market news section into a physical newspaper broadsheet forces an editorial, calm perspective on markets: you read deep sectoral context and policy analysis instead of reacting to ephemeral intraday noise.

### Custom Cursor
On desktop pointer devices, the cursor acts like a magnifying loupe and magnetic pointer. When you hover over interactive data points, newspaper headlines, or timeline milestones, the cursor expands with subtle labels. On mobile and touchscreens, I explicitly disabled this to prevent lag and touch conflicts, and it respects `prefers-reduced-motion` settings.

### Interactive Wealth Projection
Traditional charts just plot an isolated line graph with an unhelpful final number. I built this timeline as a milestone journey—pinpointing when you cross your first ₹10 Lakhs, the psychological halfway mark to ₹1 Crore, and eventual financial freedom. Compounding is counter-intuitive; the graph needs to emphasize that the last 5 years will generate more wealth than the first 15.

### Alternate Future / What If
Human brains are terrible at visualizing opportunity cost. Spending an extra ₹15,000 on a car EMI feels harmless in month one. The "What If" split comparison proves visually what that decision costs your 45-year-old self. It turns an abstract trade-off into a stark, visible reality.

---

## Known Limitations

- **Waitlist is an Interactive Demo:** The waitlist on this site is a frontend prototype demonstration. Form submissions are validated and simulated locally; no email addresses, portfolio numbers, or personal inputs are transmitted to or stored on any server database.
- **Exchange Rates:** Live currency synchronization calls public exchange APIs with resilient fallback benchmark rates if network requests are unavailable or rate-limited.
- **Broadsheet Data:** Broadsheet articles, sectoral insights, and market indices are powered by curated snapshot datasets rather than real-time sub-second broker feeds.
- **Educational Simulation:** All wealth projections and compounding calculations are deterministic mathematical models designed for education; they do not account for black swan events or guarantee future returns.
- **Session-Based Storage:** Financial numbers and slider settings reside exclusively in browser memory during an active session; there is currently no persistent database storage or user authentication.

---

## What I'd Do With More Time

1. **Live Market & Brokerage APIs:** Connect to live exchange webhooks (NSE/BSE, Alpha Vantage, Polygon) for real-time streaming tickers.
2. **Multi-Asset Portfolio Modeling:** Allow users to build customized asset allocations combining equities, debt, gold, and real estate with historical rebalancing backtests.
3. **User Accounts & Saved Scenarios:** Implement encrypted authentication allowing users to save, bookmark, and export scenario comparisons across sessions.
4. **Export Engine:** Generate publication-quality PDF executive summaries and CSV cashflow amortization schedules.
5. **Monte Carlo Simulations:** Supplement deterministic compounding curves with probabilistic simulations modeling market volatility distributions.
6. **Accessibility Audits & Localization:** Conduct deep automated screen-reader testing (NVDA/VoiceOver) and translate the broadsheet experience into regional Indian languages.

---

## Tech Stack

- **Framework:** Next.js 16.3.8 (App Router with Turbopack)
- **UI Library:** React 19.2.8
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4
- **Animation & Transitions:** Framer Motion
- **3D Graphics & Canvas:** Three.js & @react-three/fiber (`react-globe.gl`)
- **Data Visualization:** Recharts
- **Icons:** Lucide React
- **Deployment:** Vercel

---

## Running Locally

Clone the repository and install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To run code verification and build for production:

```bash
npm run lint
npm run build
```
