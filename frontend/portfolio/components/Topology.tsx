'use client';

import { useCallback, useMemo, useState } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { projects, topologyEdges } from '@/data/projects';
import ProjectNode from './ProjectNode';
import { motion } from 'framer-motion';

const nodeTypes = {
  project: ProjectNode,
};

export function Topology() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const nodeSizes: Record<string, number> = {
    'cyclon-gossip': 210,
    'safe-haven': 200,
  };

  const adjacency = useMemo(() => {
    const map = new Map<string, Set<string>>();
    topologyEdges.forEach((edge) => {
      if (!map.has(edge.source)) map.set(edge.source, new Set());
      if (!map.has(edge.target)) map.set(edge.target, new Set());
      map.get(edge.source)?.add(edge.target);
      map.get(edge.target)?.add(edge.source);
    });
    return map;
  }, []);

  // Create nodes from project data
  const initialNodes: Node[] = projects.map((project, idx) => {
    const angle = (idx / projects.length) * Math.PI * 2;
    const radius = 250;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    const size = nodeSizes[project.id] || 170;

    return {
      id: project.id,
      data: { label: project.name, project, size, isActive: false, isNeighbor: false },
      position: { x, y },
      type: 'project',
      style: {
        width: `${size}px`,
        height: `${size}px`,
      },
    };
  });

  // Create edges from topology relationships
  const initialEdges: Edge[] = topologyEdges.map((edge) => ({
    id: `${edge.source}-${edge.target}`,
    source: edge.source,
    target: edge.target,
    label: '',
    animated: false,
    className: 'edge-dash',
    style: {
      stroke: 'rgba(0, 212, 255, 0.18)',
      strokeWidth: 1.5,
    },
    labelStyle: {
      fill: 'rgba(0, 212, 255, 0.95)',
      fontSize: '12px',
      fontWeight: 600,
    },
    labelBgStyle: { fill: 'rgba(8, 12, 18, 0.85)' },
    labelBgPadding: [6, 4],
    labelBgBorderRadius: 6,
  }));

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      setSelectedNode(selectedNode === node.id ? null : node.id);
    },
    [selectedNode]
  );

  const updateHover = useCallback(
    (nodeId: string | null) => {
      setHoveredNode(nodeId);
      const neighbors = nodeId ? adjacency.get(nodeId) || new Set<string>() : new Set<string>();

      setNodes((prev) =>
        prev.map((node) => {
          const isActive = nodeId === node.id;
          const isNeighbor = nodeId ? neighbors.has(node.id) : false;
          return {
            ...node,
            data: {
              ...node.data,
              isActive,
              isNeighbor,
            },
          };
        })
      );

      setEdges((prev) =>
        prev.map((edge) => {
          const isConnected = nodeId && (edge.source === nodeId || edge.target === nodeId);
          return {
            ...edge,
            label: isConnected
              ? topologyEdges.find((e) => e.source === edge.source && e.target === edge.target)?.label || ''
              : '',
            style: {
              ...edge.style,
              stroke: isConnected ? 'rgba(0, 212, 255, 0.6)' : 'rgba(0, 212, 255, 0.12)',
              strokeWidth: isConnected ? 2.2 : 1.2,
            },
            labelStyle: {
              ...edge.labelStyle,
              opacity: isConnected ? 1 : 0,
            },
          };
        })
      );
    },
    [adjacency, setEdges, setNodes]
  );

  return (
    <section className="relative z-10 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-[2rem] border border-dark-border bg-dark-card/55 backdrop-blur-md shadow-2xl overflow-hidden">
          <div className="px-6 md:px-8 pt-6 pb-4 border-b border-dark-border/70 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-xs text-cyan mb-2">TOPOLOGY_REGISTRY // PROJECT_MAP</p>
              <h2 className="text-4xl md:text-5xl font-bold">Project Topology</h2>
              <p className="text-gray-400 mt-3 max-w-2xl">
                Click any node to inspect the project, and hover connections to understand how the systems relate.
              </p>
            </div>
            <div className="rounded-full border border-cyan/30 bg-dark-bg/70 px-4 py-2 text-xs font-mono text-cyan">
              09 NODES • RELATIONSHIPS MAPPED
            </div>
          </div>

          <div className="relative h-[760px]" onWheelCapture={(event) => event.stopPropagation()}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onNodeClick={onNodeClick}
              onNodeMouseEnter={(_, node) => updateHover(node.id)}
              onNodeMouseLeave={() => updateHover(null)}
              nodeTypes={nodeTypes}
              zoomOnScroll={false}
              panOnScroll={false}
              zoomOnDoubleClick={false}
              preventScrolling={false}
              fitView
              fitViewOptions={{ padding: 0.2 }}
            >
              <Background color="rgba(79, 255, 176, 0.05)" gap={24} />
              <Controls
                style={{
                  background: 'rgba(15, 20, 25, 0.8)',
                  border: '1px solid rgba(79, 255, 176, 0.2)',
                  borderRadius: '8px',
                }}
              />
            </ReactFlow>

            {/* Node details panel */}
            {selectedNode && (() => {
              const project = projects.find((p) => p.id === selectedNode);
              if (!project) return null;
              return (
                <motion.div
                  className="absolute top-8 right-8 bg-dark-card/90 border border-dark-border rounded-2xl p-6 max-w-sm shadow-lg backdrop-blur"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <p className="text-xs font-mono text-cyan mb-2">NODE_DETAIL</p>
                  <h3 className="text-lg font-bold text-white mb-2">{project.name}</h3>
                  <p className="text-sm text-gray-400 mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-dark-border rounded text-xs text-cyan">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {project.metrics && (
                    <div className="text-xs text-gray-400 mb-4 space-y-1">
                      {project.metrics.latency && (
                        <p>LATENCY: <span className="text-cyan">{project.metrics.latency}</span></p>
                      )}
                      {project.metrics.uptime && (
                        <p>UPTIME: <span className="text-cyan">{project.metrics.uptime}</span></p>
                      )}
                      {project.metrics.replication && (
                        <p>REPLICATION: <span className="text-cyan">{project.metrics.replication}</span></p>
                      )}
                    </div>
                  )}

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-cyan text-dark-bg rounded text-sm font-semibold hover:bg-cyan-dark transition"
                  >
                    View on GitHub →
                  </a>
                </motion.div>
              );
            })()}
          </div>
        </div>
      </div>
    </section>
  );
}
