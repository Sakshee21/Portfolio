'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, LockKeyhole, SquareTerminal } from 'lucide-react';
import { GossipCanvas } from './GossipCanvas';

function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.562 21.8 24 17.302 24 12 24 5.373 18.627 0 12 0z" />
    </svg>
  );
}

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const ROLES = [
  'Cybersecurity Enthusiast',
  'Network Security Researcher',
  'Distributed Systems Engineer',
  'AI / ML Practitioner',
  'Active Researcher',
];

export function Hero() {
  const [bootComplete, setBootComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timer1 = setTimeout(() => setBootComplete(true), 1200);
    const timer2 = setTimeout(() => setShowContent(true), 1500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Role cycling — every 2800ms gives enough time to type + pause
  useEffect(() => {
    if (!showContent) return;
    const interval = setInterval(() => {
      setRoleIndex(prev => (prev + 1) % ROLES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [showContent]);

  // Typewriter effect for current role
  useEffect(() => {
    if (!showContent) return;
    const currentRole = ROLES[roleIndex];
    setDisplayText('');
    let i = 0;
    const typingInterval = setInterval(() => {
      i++;
      setDisplayText(currentRole.slice(0, i));
      if (i >= currentRole.length) clearInterval(typingInterval);
    }, 52);
    return () => clearInterval(typingInterval);
  }, [roleIndex, showContent]);

  // Blinking cursor
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
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

      {/* Main content */}
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
              open to work · seeking SDE, Security &amp; Backend roles
            </div>
            <h1 className="text-5xl font-bold leading-none sm:text-6xl md:text-7xl">
              <span className="font-orbitron bg-gradient-to-r from-cyan to-blue-electric bg-clip-text text-transparent tracking-wide">
                Sakshee Ujjwal Kumat
              </span>
            </h1>

            {/* Typewriter role tagline */}
            <div className="mt-5 h-10 flex items-center justify-center">
              <p className="font-orbitron text-xl sm:text-2xl md:text-3xl font-bold text-purple drop-shadow-[0_0_14px_rgba(167,139,250,0.5)]">
                {displayText}
                <span
                  className="ml-0.5 font-light"
                  style={{ opacity: showCursor ? 1 : 0, transition: 'opacity 0.1s' }}
                >
                  |
                </span>
              </p>
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            className="mx-auto mt-6 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-lg text-gray-100 sm:text-xl md:text-2xl font-medium">
              Distributed Systems &amp; Backend Engineering
            </p>
          </motion.div>

          {/* Skills badges */}
          <motion.div
            className="mt-8 flex flex-wrap justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {['Honeypots', 'Smart Contracts', 'WebAuthn', 'Gossip Protocols'].map(
              (skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-dark-border px-3 py-1 text-xs text-gray-200 transition hover:border-cyan/60 hover:text-cyan"
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

          {/* Social links + command palette */}
          <motion.div
            className="mt-6 flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
          >
            <a
              href="https://github.com/Sakshee21"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-dark-border text-gray-400 text-sm font-mono hover:border-cyan/50 hover:text-cyan transition bg-dark-card/40"
            >
              <GitHubIcon size={15} />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/sakshee-ujjwal-kumat-18a17a290"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-dark-border text-gray-400 text-sm font-mono hover:border-blue/50 hover:text-blue transition bg-dark-card/40"
            >
              <LinkedInIcon size={15} />
              LinkedIn
            </a>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-dark-border text-gray-500 text-sm font-mono hover:border-purple/50 hover:text-purple transition bg-dark-card/40"
            >
              <SquareTerminal size={15} />
              Quick Nav
              <kbd className="ml-1 rounded bg-dark-bg/80 px-1.5 py-0.5 text-[10px] text-gray-600 border border-dark-border">
                ⌘K
              </kbd>
            </button>
          </motion.div>

        </motion.div>
      )}
    </div>
  );
}
