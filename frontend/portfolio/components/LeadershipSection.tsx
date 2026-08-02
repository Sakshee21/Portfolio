'use client';

import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

const leadership = [
  {
    title: 'Club VITeach',
    subtitle: 'Chairperson',
    tag: 'Leadership',
    description:
      'Leading education outreach initiatives across government schools in partnership with NGOs, coordinating volunteers and program delivery for underprivileged student communities.',
  },
];

export function LeadershipSection() {
  return (
    <section id="leadership" className="relative z-10 py-24 px-6">
      <div className="registry-shell registry-shell--violet max-w-6xl mx-auto rounded-[2rem] border border-dark-border bg-dark-card/55 backdrop-blur-md shadow-2xl overflow-hidden">
        <motion.div
          className="px-6 md:px-8 py-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="mb-6">
            <p className="font-mono text-xs text-cyan mb-3">TEAM_REGISTRY // LEADERSHIP_LOG</p>
            <h2 className="text-4xl md:text-5xl font-bold">Leadership</h2>
            <p className="mt-3 max-w-2xl text-gray-400">
              Community and outreach roles beyond the codebase.
            </p>
          </div>

          <div className="mt-2">
            {leadership.map((item, index) => (
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
                    <Users size={18} />
                  </div>
                  {index < leadership.length - 1 && (
                    <div className="mt-2 w-px flex-1 bg-gradient-to-b from-cyan/30 to-dark-border" />
                  )}
                </div>

                <div className="flex-1 pb-8 last:pb-0">
                  <div className="rounded-2xl border border-dark-border bg-dark-bg/50 p-5 shadow-lg transition hover:border-cyan/30 hover:bg-dark-bg/70">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                        <p className="text-sm text-gray-400">{item.subtitle}</p>
                      </div>
                      <span className="rounded-full border border-dark-border px-2.5 py-1 text-[11px] font-mono text-gray-300">
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
