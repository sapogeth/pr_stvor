import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HomeHero } from "@/components/home/hero";
import { TrustBar } from "@/components/home/trust-bar";
import { Problem } from "@/components/home/problem";
import { WhyNow } from "@/components/home/why-now";
import { ScrollStory } from "@/components/home/scroll-story";
import { UseCases } from "@/components/home/use-cases";
import { Competitive } from "@/components/home/competitive";
import { Ecosystem } from "@/components/home/ecosystem";
import { Vision } from "@/components/home/vision";
import { FinalCTA } from "@/components/home/final-cta";

function Divider() {
  return (
    <div className="container-page">
      <div className="section-divider" />
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HomeHero />
        <TrustBar />
        <Divider />
        <Problem />
        <Divider />
        <WhyNow />
        <ScrollStory />
        <Divider />
        <UseCases />
        <Divider />
        <Competitive />
        <Divider />
        <Ecosystem />
        <Divider />
        <Vision />
        <Divider />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
