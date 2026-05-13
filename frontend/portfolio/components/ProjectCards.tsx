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

  const colorMap = {
    cyan: 'border-cyan text-cyan hover:shadow-glow-cyan',
    blue: 'border-blue text-blue hover:shadow-glow-blue',
    purple: 'border-purple text-purple hover:shadow-glow-purple',
    green: 'border-green-500 text-green-500',
    orange: 'border-orange-500 text-orange-500',
  };

  return (
    <section className="min-h-screen bg-dark-bg/70 backdrop-blur-sm py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold mb-4">
            <span className="text-gray-200">Infrastructure Registry</span>
          </h2>
          <p className="text-gray-400">
            Deployed services and engineering projects — each monitored, versioned, and production-ready.
          </p>

          {/* Category filters */}
          <div className="flex flex-wrap gap-3 mt-8">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg text-sm font-mono transition ${
                selectedCategory === null
                  ? 'bg-cyan text-dark-bg'
                  : 'border border-dark-border text-gray-300 hover:border-cyan'
              }`}
            >
              ALL_LAYERS
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-mono transition ${
                  selectedCategory === cat
                    ? 'bg-cyan text-dark-bg'
                    : 'border border-dark-border text-gray-300 hover:border-cyan'
                }`}
              >
                {cat.toUpperCase().replace(/ /g, '_')}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((project, idx) => {
            const borderClass = colorMap[project.color] || colorMap.cyan;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`group p-6 rounded-lg border-2 bg-dark-card backdrop-blur-sm transition ${borderClass}`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{project.name}</h3>
                    <p className="text-sm text-gray-400">{project.title}</p>
                  </div>
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                    project.status === 'ACTIVE' ? 'bg-green-500' : 'bg-gray-500'
                  }`} />
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4">{project.description}</p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className={`px-2 py-1 rounded text-xs bg-dark-border text-gray-300`}
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
                <div className="flex gap-3 pt-4 border-t border-dark-border">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded text-sm font-mono hover:bg-dark-border transition"
                  >
                    <GitBranch size={16} />
                    REPO
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 rounded text-sm font-mono hover:bg-dark-border transition"
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
    </section>
  );
}
