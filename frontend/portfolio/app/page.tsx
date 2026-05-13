'use client';

import { Hero } from '@/components/Hero';
import { Topology } from '@/components/Topology';
import { ProjectCards } from '@/components/ProjectCards';
import { Navigation } from '@/components/Navigation';
import { TopStatusBar } from '@/components/TopStatusBar';
import { AboutSection } from '@/components/AboutSection';
import { InfrastructureTopologyBackground } from '@/components/InfrastructureTopologyBackground';
import { ContactSection } from '@/components/ContactSection';
import { TechnologyRegistry } from '@/components/TechnologyRegistry';
import { DomainRegistry } from '@/components/DomainRegistry';
import { ExperienceSection } from '@/components/ExperienceSection';

export default function Home() {
  return (
    <main className="bg-dark-bg text-gray-200 relative">
      <TopStatusBar />

      <InfrastructureTopologyBackground />
      <section id="home" className="portfolio-section">
        <Hero />
      </section>

      <section id="about" className="portfolio-section">
        <AboutSection />
      </section>

      <section id="experience" className="portfolio-section px-6">
        <ExperienceSection />
      </section>

      <section id="domains" className="portfolio-section px-6">
        <DomainRegistry />
      </section>

      <section id="topology" className="portfolio-section px-6">
        <Topology />
      </section>

      <section id="projects" className="portfolio-section px-6">
        <ProjectCards />
      </section>

      <section id="stack" className="portfolio-section px-6">
        <TechnologyRegistry />
      </section>

      <section id="contact" className="portfolio-section px-6">
        <ContactSection />
      </section>

      <Navigation />
    </main>
  );
}
