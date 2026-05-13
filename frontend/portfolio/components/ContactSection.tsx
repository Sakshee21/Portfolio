'use client';

import { motion } from 'framer-motion';
import { Mail, Link2 } from 'lucide-react';

export function ContactSection() {
  return (
    <section id="contact" className="relative z-10 py-24 px-6">
      <div className="registry-shell registry-shell--mint max-w-6xl mx-auto rounded-[2rem] border border-dark-border bg-dark-card/55 backdrop-blur-md shadow-2xl overflow-hidden">
        <motion.div
          className="px-6 md:px-8 py-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-mono text-xs text-cyan mb-3">SECURE_CHANNEL // CONTACT</p>
              <h2 className="text-4xl md:text-5xl font-bold">Open a Secure Channel</h2>
            </div>
          </div>
          <p className="text-gray-300 text-lg mb-10 max-w-2xl">
            Let’s connect about distributed systems, backend architecture, or security engineering.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href="mailto:sakshee.ujjwal.kumat@gmail.com"
              className="group border border-dark-border rounded-2xl p-6 bg-dark-bg/50 transition hover:border-cyan/60 hover:bg-dark-bg/70"
            >
              <div className="flex items-center gap-3">
                <Mail className="text-cyan" size={20} />
                <span className="text-gray-200 group-hover:text-cyan transition">sakshee.ujjwal.kumat@gmail.com</span>
              </div>
              <p className="text-xs text-gray-400 mt-3 font-mono">ENCRYPTED_EMAIL_LINK</p>
            </a>

            <a
              href="https://github.com/Sakshee21"
              target="_blank"
              rel="noopener noreferrer"
              className="group border border-dark-border rounded-2xl p-6 bg-dark-bg/50 transition hover:border-cyan/60 hover:bg-dark-bg/70"
            >
              <div className="flex items-center gap-3">
                <Link2 className="text-cyan" size={20} />
                <span className="text-gray-200 group-hover:text-cyan transition">github.com/Sakshee21</span>
              </div>
              <p className="text-xs text-gray-400 mt-3 font-mono">PRIMARY_REPO</p>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
