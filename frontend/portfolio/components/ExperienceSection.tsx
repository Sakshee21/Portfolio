'use client';

import { motion } from 'framer-motion';
import { Briefcase, ExternalLink, FileText } from 'lucide-react';

const experiences = [
  {
    title: 'PureID',
    subtitle: 'R&D Intern',
    tag: 'Internship',
    description:
      'Working on passwordless authentication and identity systems at PureID — WebAuthn/FIDO2 protocols, IAM, and real-world protocol security, from network traffic analysis to vulnerability reconnaissance.',
  },
  {
    title: 'Cyber Defenders Program',
    subtitle: 'Research Intern',
    tag: 'Internship',
    description:
      'Designing and deploying multi-region LLM-powered SSH honeypots on AWS, comparing static vs. AI-assisted deception across live environments and analyzing real attacker telemetry.',
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="relative z-10 py-24 px-6">
      <div className="registry-shell registry-shell--blue max-w-6xl mx-auto rounded-[2rem] border border-dark-border bg-dark-card/55 backdrop-blur-md shadow-2xl overflow-hidden">
        <motion.div
          className="px-6 md:px-8 py-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
            <div>
              <p className="font-mono text-xs text-cyan mb-3">NODE_HISTORY // EXPERIENCE_LOG</p>
              <h2 className="text-4xl md:text-5xl font-bold">Experience</h2>
              <p className="mt-3 max-w-2xl text-gray-400">
                Roles and programs that shaped how I think about reliability, communication, and product polish.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/resume.pdf"
                className="inline-flex items-center gap-2 rounded-full border border-cyan/40 bg-dark-card/80 px-4 py-2 text-sm font-medium text-cyan transition hover:bg-cyan hover:text-dark-bg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileText size={16} />
                View CV
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          <div className="mt-2">
            {experiences.map((item, index) => (
              <motion.div
                key={item.title}
                className="relative flex gap-5"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan/10 text-cyan border border-cyan/20 z-10">
                    <Briefcase size={18} />
                  </div>
                  {index < experiences.length - 1 && (
                    <div className="mt-2 w-px flex-1 bg-gradient-to-b from-cyan/30 to-dark-border" />
                  )}
                </div>

                <div className="flex-1 pb-8 last:pb-0">
                  <div className="rounded-2xl border border-dark-border bg-dark-bg/50 p-5 shadow-lg transition hover:border-cyan/30 hover:bg-dark-bg/70">
                    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2 mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                        <p className="text-sm text-gray-400">{item.subtitle}</p>
                      </div>
                      <span className="shrink-0 rounded-full border border-dark-border px-2.5 py-1 text-[11px] font-mono text-gray-300">
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-sm leading-6 text-gray-400">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
