'use client';

import { Home, Layers, BarChart3, User, Mail, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export function Navigation() {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const navItems = [
    { icon: Home, label: 'Home', id: 'home' },
    { icon: User, label: 'About', id: 'about' },
    { icon: Layers, label: 'Topology', id: 'topology' },
    { icon: BarChart3, label: 'Projects', id: 'projects' },
    { icon: Cpu, label: 'Stack', id: 'stack' },
    { icon: Mail, label: 'Contact', id: 'contact' },
  ];

  return (
    <motion.nav
      className="fixed bottom-6 right-6 z-[70] flex flex-col items-center gap-2 rounded-2xl border border-cyan/15 bg-dark-card/95 p-2.5 shadow-[0_18px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl md:bottom-8 md:right-8"
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
            className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-transparent text-gray-400 transition group hover:border-cyan/40 hover:text-cyan"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon size={20} />
            
            {/* Tooltip */}
            {hoveredIcon === item.id && (
              <motion.div
                className="absolute right-14 top-1/2 -translate-y-1/2 whitespace-nowrap rounded border border-cyan/20 bg-dark-card/95 px-3 py-1 text-xs text-cyan pointer-events-none shadow-lg"
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
