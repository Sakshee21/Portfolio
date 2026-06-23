'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, ExternalLink, Mail, FileText, Layers, User, Home, Cpu, BarChart3 } from 'lucide-react';

type CmdType = 'section' | 'link';
type Command = {
  type: CmdType;
  label: string;
  desc: string;
  id?: string;
  url?: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

const COMMANDS: Command[] = [
  { type: 'section', label: 'Home',       desc: 'Back to top',        id: 'home',       icon: Home },
  { type: 'section', label: 'About',      desc: 'Who I am',           id: 'about',      icon: User },
  { type: 'section', label: 'Experience', desc: 'Work history',       id: 'experience', icon: Cpu },
  { type: 'section', label: 'Projects',   desc: "What I've built",    id: 'projects',   icon: Layers },
  { type: 'section', label: 'Stack',      desc: 'Technologies',       id: 'stack',      icon: BarChart3 },
  { type: 'section', label: 'Contact',    desc: 'Get in touch',       id: 'contact',    icon: Mail },
  { type: 'link',    label: 'Resume',     desc: 'Download CV',        url: '/resume.pdf',                                                        icon: FileText },
  { type: 'link',    label: 'GitHub',     desc: 'Source & projects',  url: 'https://github.com/Sakshee21',                                       icon: ExternalLink },
  { type: 'link',    label: 'LinkedIn',   desc: 'Professional profile', url: 'https://www.linkedin.com/in/sakshee-ujjwal-kumat-18a17a290',      icon: ExternalLink },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = COMMANDS.filter(c =>
    c.label.toLowerCase().includes(query.toLowerCase()) ||
    c.desc.toLowerCase().includes(query.toLowerCase())
  );

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
  }, []);

  const execute = useCallback((cmd: Command) => {
    close();
    setTimeout(() => {
      if (cmd.type === 'section' && cmd.id) {
        document.getElementById(cmd.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (cmd.url) {
        window.open(cmd.url, '_blank');
      }
    }, 120);
  }, [close]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (document.activeElement as HTMLElement)?.tagName;
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(prev => { if (!prev) { setQuery(''); setSelected(0); } return !prev; });
        return;
      }
      if (e.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA') {
        e.preventDefault();
        setOpen(true); setQuery(''); setSelected(0);
        return;
      }
      if (!open) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(p => Math.min(p + 1, filtered.length - 1)); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setSelected(p => Math.max(p - 1, 0)); }
      if (e.key === 'Enter' && filtered[selected]) execute(filtered[selected]);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, filtered, selected, execute, close]);

  // Listen for TopStatusBar button trigger
  useEffect(() => {
    const handler = () => { setOpen(true); setQuery(''); setSelected(0); };
    window.addEventListener('open-command-palette', handler as EventListener);
    return () => window.removeEventListener('open-command-palette', handler as EventListener);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60);
  }, [open]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-start justify-center pt-[18vh] px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.14 }}
          onClick={close}
        >
          <div className="absolute inset-0 bg-dark-bg/80 backdrop-blur-sm" />

          <motion.div
            className="relative z-10 w-full max-w-md"
            initial={{ opacity: 0, y: -18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -18, scale: 0.96 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="overflow-hidden rounded-2xl border border-cyan/20 bg-dark-card/98 shadow-[0_32px_80px_rgba(0,0,0,0.7),0_0_0_1px_rgba(79,255,176,0.06)] backdrop-blur-2xl">

              {/* Search input */}
              <div className="flex items-center gap-3 border-b border-dark-border/70 px-4 py-3.5">
                <Search size={15} className="shrink-0 text-cyan" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search sections, links..."
                  className="flex-1 bg-transparent font-mono text-sm text-gray-100 placeholder-gray-600 outline-none"
                />
                <kbd className="shrink-0 rounded border border-dark-border px-1.5 py-0.5 font-mono text-[10px] text-gray-700">
                  ESC
                </kbd>
              </div>

              {/* Results list */}
              <div className="max-h-72 overflow-y-auto py-1.5">
                {filtered.length === 0 ? (
                  <p className="px-4 py-8 text-center font-mono text-sm text-gray-600">No results.</p>
                ) : (
                  filtered.map((cmd, i) => {
                    const Icon = cmd.icon;
                    const isActive = i === selected;
                    return (
                      <button
                        key={cmd.label}
                        onClick={() => execute(cmd)}
                        onMouseEnter={() => setSelected(i)}
                        className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left transition-colors ${
                          isActive ? 'bg-cyan/10' : 'hover:bg-dark-bg/50'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <Icon
                            size={13}
                            className={`shrink-0 ${isActive ? 'text-cyan' : 'text-gray-600'}`}
                          />
                          <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-300'}`}>
                            {cmd.label}
                          </span>
                          <span className="truncate text-xs text-gray-600">{cmd.desc}</span>
                        </div>
                        {isActive && <ArrowRight size={13} className="shrink-0 text-cyan" />}
                      </button>
                    );
                  })
                )}
              </div>

              {/* Footer hints */}
              <div className="flex items-center gap-4 border-t border-dark-border/70 px-4 py-2 text-[10px] font-mono text-gray-700">
                <span><kbd className="rounded bg-dark-bg px-1">↑↓</kbd> navigate</span>
                <span><kbd className="rounded bg-dark-bg px-1">↵</kbd> select</span>
                <span><kbd className="rounded bg-dark-bg px-1">esc</kbd> close</span>
                <span className="ml-auto opacity-50">⌘K or /</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
