'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Link2, Send, CheckCircle, AlertCircle } from 'lucide-react';

type FormState = { name: string; email: string; message: string };
type Status = 'idle' | 'loading' | 'success' | 'error';

// Sign up at formspree.io → create a form → paste your form ID below
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

export function ContactSection() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

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
            Let's connect about distributed systems, backend architecture, or security engineering.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <a
              href="mailto:sakshee.kumat@gmail.com"
              className="group border border-dark-border rounded-2xl p-6 bg-dark-bg/50 transition hover:border-cyan/60 hover:bg-dark-bg/70"
            >
              <div className="flex items-center gap-3">
                <Mail className="text-cyan" size={20} />
                <span className="text-gray-200 group-hover:text-cyan transition">sakshee.kumat@gmail.com</span>
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

          <div className="border-t border-dark-border mb-10" />

          {/* Drop a message form */}
          <div>
            <p className="font-mono text-xs text-cyan mb-3">TRANSMIT // MESSAGE</p>
            <h3 className="text-2xl font-bold mb-6">Drop a Message</h3>

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 rounded-2xl border border-cyan/40 bg-cyan/5 p-6 text-cyan"
              >
                <CheckCircle size={22} />
                <div>
                  <p className="font-semibold">Message transmitted successfully.</p>
                  <p className="text-sm text-gray-400 mt-1">I'll get back to you soon.</p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-mono text-xs text-gray-400 mb-2">NODE_ID // NAME</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full rounded-xl border border-dark-border bg-dark-bg/60 px-4 py-3 text-gray-200 placeholder-gray-600 outline-none transition focus:border-cyan/60 focus:ring-1 focus:ring-cyan/20"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-gray-400 mb-2">RETURN_ADDR // EMAIL</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="w-full rounded-xl border border-dark-border bg-dark-bg/60 px-4 py-3 text-gray-200 placeholder-gray-600 outline-none transition focus:border-cyan/60 focus:ring-1 focus:ring-cyan/20"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-mono text-xs text-gray-400 mb-2">PAYLOAD // MESSAGE</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="What would you like to discuss?"
                    className="w-full rounded-xl border border-dark-border bg-dark-bg/60 px-4 py-3 text-gray-200 placeholder-gray-600 outline-none transition focus:border-cyan/60 focus:ring-1 focus:ring-cyan/20 resize-none"
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-sm text-red-400">
                    <AlertCircle size={16} />
                    <span>Transmission failed. Please try again or email directly.</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-cyan text-dark-bg font-semibold rounded hover:bg-cyan-dark transition shadow-glow-cyan disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                  {status === 'loading' ? 'Transmitting...' : 'Transmit Message'}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
