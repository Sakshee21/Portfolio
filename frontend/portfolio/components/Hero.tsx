'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, LockKeyhole } from 'lucide-react';
import { GossipCanvas } from './GossipCanvas';

export function Hero() {
  const [bootComplete, setBootComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Boot sequence: 2.5 seconds total
    const timer1 = setTimeout(() => setBootComplete(true), 1200);
    const timer2 = setTimeout(() => setShowContent(true), 1500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="hero-surface relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-dark-bg/70 px-6 py-20 text-gray-200 backdrop-blur-sm md:py-28">
      <div className="absolute inset-0 opacity-45">
        <GossipCanvas />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(79,255,176,0.06),transparent_58%)]" />

      {/* Boot sequence */}
      {!bootComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-center z-10"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-sm text-cyan mb-4"
          >
            &gt; Initializing secure distributed node...
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-mono text-sm text-cyan mb-4"
          >
            &gt; Establishing encrypted peer connections...
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="font-mono text-sm text-green-500"
          >
            &gt; Topology synchronized. Ready.
          </motion.p>

          {/* Loading indicator */}
          <motion.div
            className="mt-8 flex justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-cyan"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}

      {/* Main content - fades in after boot */}
      {bootComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="z-10 mx-auto max-w-5xl text-center"
        >
          {/* Main title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="mb-5 inline-flex rounded-full border border-cyan/20 bg-dark-card/50 px-4 py-1 font-mono text-[11px] uppercase tracking-[0.24em] text-cyan/90">
              open for work · hiring for distributed systems and backend roles
            </div>
            <h1 className="text-5xl font-bold leading-none tracking-tight sm:text-6xl md:text-7xl">
              <span className="bg-gradient-to-r from-cyan to-blue-electric bg-clip-text text-transparent">
                Sakshee Ujjwal Kumat
              </span>
            </h1>
          </motion.div>

          {/* Subtitle section */}
          <motion.div
            className="mx-auto mt-6 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-lg text-gray-300 sm:text-xl md:text-2xl">
              Distributed Systems & Backend Engineering
            </p>
            <p className="mt-3 font-mono text-sm text-gray-400 sm:text-base">
              Secure Platforms • Protocol Tooling • System Visibility
            </p>
          </motion.div>

          {/* Skills badges */}
          <motion.div
            className="mt-8 flex flex-wrap justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {['Gossip Protocols', 'WebAuthn', 'ZK Proofs', 'EVM Smart Contracts'].map(
              (skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-dark-border px-3 py-1 text-xs text-gray-300 transition hover:border-cyan/60 hover:text-cyan"
                >
                  {skill}
                </span>
              )
            )}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="mt-12 flex flex-col flex-wrap justify-center gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <button
              className="px-8 py-3 bg-cyan text-dark-bg font-semibold rounded hover:bg-cyan-dark transition shadow-glow-cyan"
              onClick={() => {
                const target = document.getElementById('topology');
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              Inspect Systems →
            </button>
            <button
              className="px-8 py-3 border border-cyan text-cyan font-semibold rounded hover:bg-cyan hover:text-dark-bg transition"
              onClick={() => {
                const target = document.getElementById('projects');
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              explore_projects()
            </button>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded border border-dark-border text-gray-200 font-semibold hover:border-cyan hover:text-cyan transition"
            >
              <FileText size={15} />
              View CV
            </a>
            <button
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded border border-purple text-purple font-semibold hover:bg-purple hover:text-dark-bg transition"
              onClick={() => {
                const target = document.getElementById('contact');
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              <LockKeyhole size={15} />
              Open Secure Channel
            </button>
          </motion.div>

        </motion.div>
      )}

      {/* Floating decorations removed */}
    </div>
  );
}
