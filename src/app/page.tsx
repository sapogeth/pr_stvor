import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Partners } from "@/components/sections/partners";
import { Problem } from "@/components/sections/problem";
import { WhyNow } from "@/components/sections/why-now";
import { BeforeAfter } from "@/components/sections/before-after";
import { SequenceFlow } from "@/components/sections/sequence-flow";
import { Architecture } from "@/components/sections/architecture";
import { SolanaRoadmap } from "@/components/sections/solana-roadmap";
import { SocialProof } from "@/components/sections/social-proof";
import { Pricing } from "@/components/sections/pricing";
import { GetStarted } from "@/components/sections/get-started";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Partners />
        <Problem />
        <WhyNow />
        <BeforeAfter />
        <SequenceFlow />
        <Architecture />
        <SolanaRoadmap />
        <SocialProof />
        <Pricing />
        <GetStarted />
      </main>
      <Footer />
    </>
  );
}
