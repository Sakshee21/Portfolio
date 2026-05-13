'use client';

import { motion } from 'framer-motion';
import { Handle, Position } from 'reactflow';
import { Project } from '@/data/projects';

interface ProjectNodeProps {
  data: {
    label: string;
    project: Project;
    size: number;
    isActive: boolean;
    isNeighbor: boolean;
  };
  isConnecting?: boolean;
  selected?: boolean;
}

const colorMap = {
  cyan: 'border-cyan shadow-glow-cyan',
  blue: 'border-blue shadow-glow-blue',
  purple: 'border-purple shadow-glow-purple',
  green: 'border-green-500',
  orange: 'border-orange-500',
};

export default function ProjectNode({ data, selected }: ProjectNodeProps) {
  const { project, isActive, isNeighbor } = data;
  const borderClass = colorMap[project.color] || colorMap.cyan;
  const stateClass = isActive ? 'opacity-100' : isNeighbor ? 'opacity-90' : 'opacity-60';

  return (
    <motion.div
      initial={false}
      animate={{ scale: isActive ? 1.05 : isNeighbor ? 0.99 : 0.94, y: isActive ? -2 : 0 }}
      whileHover={{ scale: isActive ? 1.07 : 0.98, y: -3 }}
      transition={{ type: 'spring', stiffness: 180, damping: 18, mass: 0.7 }}
      className={`flex flex-col items-center justify-center rounded-lg border-2 bg-dark-card backdrop-blur-sm cursor-pointer transition-colors duration-300 ${
        borderClass
      } ${selected ? 'ring-2 ring-offset-2 ring-offset-dark-bg' : ''} ${stateClass}`}
    >
      <Handle type="target" position={Position.Top} />

      {isActive && <div className="orbit-ring" />}

      {/* Status indicator */}
      <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${
        project.status === 'ACTIVE' ? 'bg-green-500' : 'bg-gray-500'
      }`} />

      {/* Node label */}
      <div className="text-center px-2">
        <p className="text-sm font-bold text-white truncate">{project.name}</p>
        <p className="text-xs text-gray-400 mt-1">{project.category}</p>
      </div>

      {/* Latency badge on hover */}
      {isActive && project.metrics?.latency && (
        <div className="absolute -bottom-3 px-2 py-1 bg-dark-card border border-cyan rounded text-xs text-cyan">
          {project.metrics.latency}
        </div>
      )}

      <Handle type="source" position={Position.Bottom} />
    </motion.div>
  );
}
