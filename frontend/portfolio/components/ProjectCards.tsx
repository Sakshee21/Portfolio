'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { projects, categories } from '@/data/projects';
import { ExternalLink, GitBranch } from 'lucide-react';

export function ProjectCards() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filtered = selectedCategory
    ? projects.filter((p) => p.category === selectedCategory)
    : projects;

  return (
    <section className="relative z-10 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="registry-shell registry-shell--mint rounded-[2rem] border border-dark-border bg-dark-card/55 backdrop-blur-md shadow-2xl overflow-hidden">
          <motion.div
            className="px-6 md:px-8 pt-6 pb-5 border-b border-dark-border/70 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <p className="mb-2 font-mono text-xs text-cyan">INFRASTRUCTURE_REGISTRY // SERVICES</p>
              <h2 className="text-4xl font-bold md:text-5xl">Project Registry</h2>
              <p className="mt-3 max-w-2xl text-gray-400">
                Deployed systems, experiments, and supporting tools presented as a quieter service map.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`rounded-full px-4 py-2 text-sm font-mono transition ${
                  selectedCategory === null
                    ? 'bg-cyan text-dark-bg'
                    : 'border border-dark-border text-gray-300 hover:border-cyan/60 hover:text-cyan'
                }`}
              >
                ALL_LAYERS
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-4 py-2 text-sm font-mono transition ${
                    selectedCategory === cat
                      ? 'bg-cyan text-dark-bg'
                      : 'border border-dark-border text-gray-300 hover:border-cyan/60 hover:text-cyan'
                  }`}
                >
                  {cat.toUpperCase().replace(/ /g, '_')}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Project grid */}
          <div className="grid grid-cols-1 gap-px bg-dark-border/70 md:grid-cols-2">
          {filtered.map((project, idx) => {
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group min-h-full border border-dark-border/70 bg-dark-card/18 p-6 transition duration-300 hover:bg-dark-card/28 hover:border-cyan/25"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{project.name}</h3>
                    <p className="text-sm text-gray-400">{project.title}</p>
                  </div>
                  <div
                    className={`w-3 h-3 rounded-full flex-shrink-0 ${
                      project.status === 'ACTIVE'
                        ? 'bg-cyan shadow-[0_0_12px_rgba(79,255,176,0.45)]'
                        : 'bg-gray-500'
                    }`}
                  />
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4">{project.description}</p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-dark-border bg-dark-border/60 px-2 py-1 text-xs text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Metrics (if available) */}
                {project.metrics && (
                  <div className="text-xs text-gray-400 mb-4 space-y-1">
                    {project.metrics.latency && (
                      <p>LATENCY: <span className="text-cyan">{project.metrics.latency}</span></p>
                    )}
                    {project.metrics.uptime && (
                      <p>UPTIME: <span className="text-cyan">{project.metrics.uptime}</span></p>
                    )}
                    {project.metrics.replication && (
                      <p>REPLICATION: <span className="text-cyan">{project.metrics.replication}</span></p>
                    )}
                  </div>
                )}

                {/* Links */}
                <div className="flex gap-3 pt-4 border-t border-dark-border/60">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded px-3 py-2 text-sm font-mono text-cyan transition hover:bg-dark-border"
                  >
                    <GitBranch size={16} />
                    REPO
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded px-3 py-2 text-sm font-mono text-cyan transition hover:bg-dark-border"
                    >
                      <ExternalLink size={16} />
                      DEMO
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
}
