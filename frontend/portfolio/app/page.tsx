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
import { NodeSection } from '@/components/NodeSection';
import { ScrollOrb } from '@/components/ScrollOrb';
import { OrbProvider } from '@/context/OrbContext';

export default function Home() {
  return (
    <OrbProvider>
      <main className="bg-dark-bg text-gray-200 relative">
        <TopStatusBar />

        <InfrastructureTopologyBackground />
        <section id="home" className="portfolio-section">
          <Hero />
        </section>

        <NodeSection id="about">
          <AboutSection />
        </NodeSection>

        <NodeSection id="experience" className="px-6">
          <ExperienceSection />
        </NodeSection>

        <NodeSection id="domains" className="px-6">
          <DomainRegistry />
        </NodeSection>

        <NodeSection id="topology" className="px-6">
          <Topology />
        </NodeSection>

        <NodeSection id="projects" className="px-6">
          <ProjectCards />
        </NodeSection>

        <NodeSection id="stack" className="px-6">
          <TechnologyRegistry />
        </NodeSection>

        <NodeSection id="contact" className="px-6">
          <ContactSection />
        </NodeSection>

        <ScrollOrb />
        <Navigation />
      </main>
    </OrbProvider>
  );
}
