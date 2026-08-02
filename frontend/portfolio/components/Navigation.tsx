'use client';

import { Home, Layers, BarChart3, User, Mail, Cpu, Users, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export function Navigation() {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const navItems = [
    { icon: Home, label: 'Home', id: 'home' },
    { icon: User, label: 'About', id: 'about' },
    { icon: Briefcase, label: 'Experience', id: 'experience' },
    { icon: Users, label: 'Leadership', id: 'leadership' },
    { icon: Layers, label: 'Topology', id: 'topology' },
    { icon: BarChart3, label: 'Projects', id: 'projects' },
    { icon: Cpu, label: 'Stack', id: 'stack' },
    { icon: Mail, label: 'Contact', id: 'contact' },
  ];

  return (
    <motion.nav
      className="fixed bottom-3 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-1 rounded-2xl border border-cyan/15 bg-dark-card/95 p-1.5 shadow-[0_18px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:bottom-6 sm:left-auto sm:right-6 sm:translate-x-0 sm:flex-col sm:gap-2 sm:p-2.5 md:bottom-8 md:right-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5 }}
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <motion.button
            key={item.id}
            onHoverStart={() => setHoveredIcon(item.id)}
            onHoverEnd={() => setHoveredIcon(null)}
            onClick={() => {
              const target = document.getElementById(item.id);
              if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-transparent text-gray-400 transition group hover:border-cyan/40 hover:text-cyan sm:h-11 sm:w-11"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon size={16} className="sm:hidden" />
            <Icon size={20} className="hidden sm:block" />

            {/* Tooltip */}
            {hoveredIcon === item.id && (
              <motion.div
                className="absolute bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded border border-cyan/20 bg-dark-card/95 px-3 py-1 text-xs text-cyan pointer-events-none shadow-lg sm:bottom-auto sm:left-auto sm:right-14 sm:top-1/2 sm:translate-x-0 sm:-translate-y-1/2"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {item.label}
              </motion.div>
            )}

            {/* Glow on hover */}
            {hoveredIcon === item.id && (
              <motion.div
                className="absolute inset-0 rounded-lg bg-cyan opacity-15 blur-xl"
                layoutId="navGlow"
              />
            )}
          </motion.button>
        );
      })}
    </motion.nav>
  );
}
