import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HomeHero } from "@/components/home/hero";
import { TryNow } from "@/components/home/try-now";
import { AgentEconomy } from "@/components/home/agent-economy";
import { Problem } from "@/components/home/problem";
import { HowItWorks } from "@/components/home/how-it-works";
import { WhoItsFor } from "@/components/home/who-its-for";
import { NeutralPositioning } from "@/components/home/neutral-positioning";
import { Competitive } from "@/components/home/competitive";
import { CurrentStage } from "@/components/home/current-stage";
import { PilotOffer } from "@/components/home/pilot-offer";
import { Roadmap } from "@/components/home/roadmap";

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
        <TryNow />
        <Divider />
        <AgentEconomy />
        <Divider />
        <Problem />
        <Divider />
        <HowItWorks />
        <Divider />
        <WhoItsFor />
        <Divider />
        <NeutralPositioning />
        <Competitive />
        <Divider />
        <CurrentStage />
        <Divider />
        <PilotOffer />
        <Roadmap />
      </main>
      <Footer />
    </>
  );
}
