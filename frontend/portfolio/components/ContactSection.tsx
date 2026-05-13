'use client';

import { motion } from 'framer-motion';
import { Mail, Link2 } from 'lucide-react';

export function ContactSection() {
  return (
    <section id="contact" className="relative z-10 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-xs text-cyan mb-3">SECURE_CHANNEL // CONTACT</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Open a Secure Channel</h2>
          <p className="text-gray-300 text-lg mb-10">
            Let’s connect about distributed systems, backend architecture, or security engineering.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href="mailto:sakshee.ujjwal.kumat@gmail.com"
              className="group border border-dark-border rounded-lg p-6 bg-dark-card hover:border-cyan transition"
            >
              <div className="flex items-center gap-3">
                <Mail className="text-cyan" size={20} />
                <span className="text-gray-200">sakshee.ujjwal.kumat@gmail.com</span>
              </div>
              <p className="text-xs text-gray-400 mt-3 font-mono">ENCRYPTED_EMAIL_LINK</p>
            </a>

            <a
              href="https://github.com/Sakshee21"
              target="_blank"
              rel="noopener noreferrer"
              className="group border border-dark-border rounded-lg p-6 bg-dark-card hover:border-cyan transition"
            >
              <div className="flex items-center gap-3">
                <Link2 className="text-cyan" size={20} />
                <span className="text-gray-200">github.com/Sakshee21</span>
              </div>
              <p className="text-xs text-gray-400 mt-3 font-mono">PRIMARY_REPO</p>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
