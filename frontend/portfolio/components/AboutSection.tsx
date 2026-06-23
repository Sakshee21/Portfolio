'use client';

import { motion } from 'framer-motion';

function GitHubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.562 21.8 24 17.302 24 12 24 5.373 18.627 0 12 0z" />
    </svg>
  );
}

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="relative z-10 py-24 px-6">
      <div className="registry-shell registry-shell--mint max-w-6xl mx-auto rounded-[2rem] border border-dark-border bg-dark-card/55 backdrop-blur-md shadow-2xl overflow-hidden">
        <motion.div
          className="px-6 md:px-8 py-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="mb-6">
            <p className="font-mono text-xs text-cyan mb-3">NODE_PROFILE // ABOUT</p>
            <h2 className="text-4xl md:text-5xl font-bold">About the Operator</h2>
          </div>

          <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
            I am a Computer Science student passionate about building scalable software systems,
            intelligent applications, and secure digital solutions. My interests span backend
            engineering, distributed systems, cybersecurity, and artificial intelligence. Through
            academic projects and independent development, I have worked with technologies ranging
            from modern web frameworks to networking protocols, cloud platforms, and large language
            models. I enjoy solving complex problems, exploring emerging technologies, and turning
            ideas into practical, user-focused solutions.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <a
              href="https://github.com/Sakshee21"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 border border-dark-border rounded-xl text-gray-300 bg-dark-bg/50 hover:border-cyan/60 hover:text-cyan transition"
            >
              <GitHubIcon size={18} />
              <span className="font-mono text-sm">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/sakshee-ujjwal-kumat-18a17a290"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 border border-dark-border rounded-xl text-gray-300 bg-dark-bg/50 hover:border-blue/60 hover:text-blue transition"
            >
              <LinkedInIcon size={18} />
              <span className="font-mono text-sm">LinkedIn</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
