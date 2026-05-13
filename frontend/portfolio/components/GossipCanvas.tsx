'use client';

import { useEffect, useRef } from 'react';

interface Pulse {
  from: number;
  to: number;
  start: number;
  duration: number;
}

const BASE_PACKET_SPEED = 1100;

export function GossipCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const informedRef = useRef<boolean[]>(Array.from({ length: 9 }, () => false));
  const pulsesRef = useRef<Pulse[]>([]);
  const nodesRef = useRef<{ x: number; y: number }[]>([]);
  const animationRef = useRef<number | null>(null);
  const tickRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const { width, height } = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const radius = Math.min(width, height) * 0.24;
      const centerX = width / 2;
      const centerY = height / 2 + 14;

      nodesRef.current = Array.from({ length: 9 }).map((_, idx) => {
        const angle = (idx / 9) * Math.PI * 2 - Math.PI / 2;
        return {
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius,
        };
      });
    };

    const pickTargets = (from: number, count: number) => {
      const candidates = nodesRef.current
        .map((_, idx) => idx)
        .filter((idx) => idx !== from);
      const picks: number[] = [];
      while (picks.length < count && candidates.length) {
        const index = Math.floor(Math.random() * candidates.length);
        picks.push(candidates.splice(index, 1)[0]);
      }
      return picks;
    };

    const tick = () => {
      const informed = informedRef.current;
      const now = performance.now();
      informed.forEach((isOn, idx) => {
        if (!isOn) return;
        pickTargets(idx, 2).forEach((target) => {
          pulsesRef.current.push({
            from: idx,
            to: target,
            start: now,
            duration: BASE_PACKET_SPEED + Math.random() * 280,
          });
          informed[target] = true;
        });
      });
    };

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      informedRef.current[0] = true;

      // Base links
      ctx.strokeStyle = 'rgba(79, 255, 176, 0.06)';
      nodesRef.current.forEach((node, idx) => {
        const next = nodesRef.current[(idx + 1) % nodesRef.current.length];
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(next.x, next.y);
        ctx.stroke();
      });

      // Pulses
      const now = performance.now();
      pulsesRef.current = pulsesRef.current.filter((pulse) => {
        const progress = (now - pulse.start) / pulse.duration;
        if (progress >= 1) return false;
        const fromNode = nodesRef.current[pulse.from];
        const toNode = nodesRef.current[pulse.to];
        const x = fromNode.x + (toNode.x - fromNode.x) * progress;
        const y = fromNode.y + (toNode.y - fromNode.y) * progress;

        ctx.strokeStyle = 'rgba(103, 232, 249, 0.22)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.stroke();

        ctx.fillStyle = 'rgba(103, 232, 249, 0.72)';
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
        return true;
      });

      // Nodes
      const informed = informedRef.current;
      nodesRef.current.forEach((node, idx) => {
        const isOn = informed[idx];
        const glow = isOn ? 0.9 : 0.2;
        ctx.fillStyle = isOn ? 'rgba(79, 255, 176, 0.84)' : 'rgba(120, 120, 120, 0.2)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, isOn ? 6.5 : 5.5, 0, Math.PI * 2);
        ctx.fill();

        if (isOn) {
          ctx.strokeStyle = `rgba(79, 255, 176, ${glow * 0.65})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 12, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);

    tickRef.current = window.setInterval(tick, 800);
    animationRef.current = requestAnimationFrame(draw);

    const handleClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const nodes = nodesRef.current;
      let closest = -1;
      let minDist = Infinity;
      nodes.forEach((node, idx) => {
        const dx = node.x - x;
        const dy = node.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minDist) {
          minDist = dist;
          closest = idx;
        }
      });

      if (closest >= 0 && minDist < 24) {
        informedRef.current[closest] = true;
      }
    };

    canvas.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', resize);
      if (tickRef.current) window.clearInterval(tickRef.current);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      canvas.removeEventListener('click', handleClick);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}
