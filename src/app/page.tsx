import { AgentPersonality } from "@/components/sections/AgentPersonality";
import { BookDemo } from "@/components/sections/BookDemo";
import { Enterprise } from "@/components/sections/Enterprise";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Integrations } from "@/components/sections/Integrations";
import { LiveDemo } from "@/components/sections/LiveDemo";
import { Pillars } from "@/components/sections/Pillars";
import { Problem } from "@/components/sections/Problem";

export default function Home() {
  return (
    <main>
      <Hero />
      <Problem />
      <Pillars />
      <HowItWorks />
      <AgentPersonality />
      <LiveDemo />
      <Integrations />
      <Enterprise />

      <section id="investors">
        <BookDemo />
      </section>
    </main>
  );
}
