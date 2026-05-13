'use client';

import { motion } from 'framer-motion';

const ringNodes = Array.from({ length: 10 }).map((_, idx) => {
  const angle = (idx / 10) * Math.PI * 2;
  const x = 50 + Math.cos(angle) * 28;
  const y = 50 + Math.sin(angle) * 28;
  return {
    id: `n${idx}`,
    x: x.toFixed(4),
    y: y.toFixed(4),
  };
});

const links = [
  ['n0', 'n3'],
  ['n1', 'n4'],
  ['n2', 'n6'],
  ['n3', 'n7'],
  ['n4', 'n8'],
  ['n5', 'n9'],
  ['n6', 'n0'],
  ['n7', 'n2'],
];

function getNode(id: string) {
  return ringNodes.find((node) => node.id === id);
}

export function ProtocolRingBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-dark-bg to-black" />

      <svg className="absolute inset-0 w-full h-full">
        {links.map(([from, to]) => {
          const fromNode = getNode(from);
          const toNode = getNode(to);
          if (!fromNode || !toNode) return null;
          return (
            <motion.line
              key={`${from}-${to}`}
              x1={`${fromNode.x}%`}
              y1={`${fromNode.y}%`}
              x2={`${toNode.x}%`}
              y2={`${toNode.y}%`}
              stroke="rgba(0, 212, 255, 0.15)"
              strokeWidth="1"
              initial={{ opacity: 0.2 }}
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
          );
        })}
      </svg>

      {ringNodes.map((node, idx) => (
        <motion.div
          key={node.id}
          className="absolute rounded-full border border-cyan/40 bg-dark-card/70 shadow-glow-cyan"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: '18px',
            height: '18px',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            opacity: [0.4, 0.9, 0.4],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 4 + idx * 0.2, repeat: Infinity }}
        />
      ))}

      {links.map(([from, to], idx) => {
        const fromNode = getNode(from);
        const toNode = getNode(to);
        if (!fromNode || !toNode) return null;
        return (
          <motion.div
            key={`packet-${from}-${to}`}
            className="absolute w-2 h-2 rounded-full bg-blue-electric"
            style={{ left: `${fromNode.x}%`, top: `${fromNode.y}%` }}
            animate={{
              left: [`${fromNode.x}%`, `${toNode.x}%`],
              top: [`${fromNode.y}%`, `${toNode.y}%`],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 3.2 + idx * 0.2, repeat: Infinity, ease: 'linear' }}
          />
        );
      })}
    </div>
  );
}
