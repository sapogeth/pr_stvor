import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { Solution } from "@/components/sections/solution";
import { UseCases } from "@/components/sections/use-cases";
import { Comparison } from "@/components/sections/comparison";
import { Pricing } from "@/components/sections/pricing";
import { TrustSignals } from "@/components/sections/trust-signals";
import { GetStarted } from "@/components/sections/get-started";
import { Partners } from "@/components/sections/partners";
import { SolanaRoadmap } from "@/components/sections/solana-roadmap";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Partners />
        <Problem />
        <Solution />
        <UseCases />
        <SolanaRoadmap />
        <Comparison />
        <Pricing />
        <TrustSignals />
        <GetStarted />
      </main>
      <Footer />
    </>
  );
}
