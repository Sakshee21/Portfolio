'use client';

import { motion } from 'framer-motion';
import { Briefcase, ExternalLink, FileText } from 'lucide-react';

const experiences = [
  {
    company: 'ColorTokens / PureID',
    role: 'Internship',
    period: 'Internship',
    summary: 'Worked on identity and secure access flows across ColorTokens and its PureID platform, with a focus on product reliability and implementation detail.',
  },
  {
    company: 'Club VITeach',
    role: 'Outreach Lead',
    period: 'Leadership',
    summary: 'Led outreach efforts, coordinated participation, and helped communicate the club’s initiatives across campus.',
  },
  {
    company: "GirlScript Summer of Code'26",
    role: 'User Experience Contributor',
    period: 'Program',
    summary: 'Contributing to open-source product polish and user experience improvements through the GSSoC’26 program.',
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="relative z-10 py-24 px-6">
      <div className="max-w-6xl mx-auto rounded-[2rem] border border-dark-border bg-dark-card/55 backdrop-blur-md shadow-2xl overflow-hidden">
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
            </div>
            <a
              href="/resume.pdf"
              className="inline-flex items-center gap-2 rounded-full border border-cyan/50 bg-dark-card/80 px-4 py-2 text-sm font-medium text-cyan hover:bg-cyan hover:text-dark-bg transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileText size={16} />
              View CV
              <ExternalLink size={14} />
            </a>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {experiences.map((item, index) => (
              <motion.div
                key={item.company}
                className="rounded-2xl border border-dark-border bg-dark-bg/50 backdrop-blur p-5 shadow-lg"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan/10 text-cyan border border-cyan/20">
                      <Briefcase size={18} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{item.company}</h3>
                      <p className="text-sm text-gray-400">{item.role}</p>
                    </div>
                  </div>
                  <span className="rounded-full border border-dark-border px-2.5 py-1 text-[11px] font-mono text-gray-300">
                    {item.period}
                  </span>
                </div>
                <p className="text-sm leading-6 text-gray-400">{item.summary}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
