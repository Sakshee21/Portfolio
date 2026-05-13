import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Dark backgrounds
        'dark-bg': '#0a0a0a',
        'dark-card': '#0f1419',
        'dark-border': '#1a2332',
        
        // Accent colors
        'cyan': '#00d4ff',
        'cyan-dark': '#00b8d4',
        'blue': '#0066ff',
        'blue-electric': '#00ccff',
        'purple': '#a855f7',
        'purple-soft': '#c77dff',
        
        // Status colors
        'success': '#10b981',
        'warning': '#f59e0b',
        'error': '#ef4444',
      },
      backgroundColor: {
        'primary': '#0a0a0a',
        'secondary': '#0f1419',
        'tertiary': '#1a2332',
      },
      borderColor: {
        'primary': '#1a2332',
        'accent': '#00d4ff',
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 212, 255, 0.3)',
        'glow-blue': '0 0 20px rgba(0, 102, 255, 0.3)',
        'glow-purple': '0 0 20px rgba(168, 85, 247, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-cyber': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
