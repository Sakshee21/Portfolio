'use client';

import { useEffect, useRef } from 'react';

interface BgNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  color: string;
}

interface Packet {
  fromIdx: number;
  toIdx: number;
  t: number;
  speed: number;
  color: string;
}

const COLORS = ['#4fffb0', '#67e8f9', '#4fffb0', '#8bf5c7'];

export function InfrastructureTopologyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    const context = canvasElement.getContext('2d');
    if (!context) return;

    const canvas = canvasElement;
    const ctx = context;

    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let frame = 0;
    let nodes: BgNode[] = [];
    let packets: Packet[] = [];

    function buildNodes() {
      const count = Math.floor((width * height) / 22000);
      nodes = Array.from({ length: Math.min(count, 28) }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: Math.random() * 2 + 1.35,
        alpha: Math.random() * 0.26 + 0.16,
        color: COLORS[index % COLORS.length],
      }));
    }

    function resize() {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
      buildNodes();
    }

    function spawnPacket() {
      if (nodes.length < 2) return;

      const fromIdx = Math.floor(Math.random() * nodes.length);
      let toIdx = Math.floor(Math.random() * nodes.length);
      while (toIdx === fromIdx) toIdx = Math.floor(Math.random() * nodes.length);

      const a = nodes[fromIdx];
      const b = nodes[toIdx];
      const distance = Math.hypot(a.x - b.x, a.y - b.y);
      if (distance > 260) return;

      packets.push({
        fromIdx,
        toIdx,
        t: 0,
        speed: 0.008 + Math.random() * 0.008,
        color: nodes[fromIdx].color,
      });
    }

    function hexToRgb(hex: string) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `${r},${g},${b}`;
    }

    function draw() {
      frame++;
      ctx.clearRect(0, 0, width, height);

      const background = ctx.createRadialGradient(width * 0.5, height * 0.45, 0, width * 0.5, height * 0.45, Math.max(width, height) * 0.75);
      background.addColorStop(0, 'rgba(79, 255, 176, 0.03)');
      background.addColorStop(0.55, 'rgba(8, 12, 18, 0.14)');
      background.addColorStop(1, 'rgba(6, 8, 16, 0.98)');
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = 'rgba(79, 255, 176, 0.05)';
      const gridSize = 42;
      for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
          ctx.beginPath();
          ctx.arc(x, y, 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 180) {
            const alpha = (1 - distance / 180) * 0.16;
            ctx.strokeStyle = `rgba(79, 255, 176, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.setLineDash([3, 6]);
            ctx.lineDashOffset = -(frame * 0.45) % 18;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        }
      }

      packets = packets.filter((packet) => packet.t <= 1);
      for (const packet of packets) {
        const a = nodes[packet.fromIdx];
        const b = nodes[packet.toIdx];
        if (!a || !b) continue;

        const x = a.x + (b.x - a.x) * packet.t;
        const y = a.y + (b.y - a.y) * packet.t;
        const edgeAlpha = packet.t < 0.08 ? packet.t / 0.08 : packet.t > 0.92 ? (1 - packet.t) / 0.08 : 1;
        const rgb = hexToRgb(packet.color);

        ctx.fillStyle = `rgba(${rgb},${edgeAlpha * 0.85})`;
        ctx.beginPath();
        ctx.arc(x, y, 2.4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${rgb},${edgeAlpha * 0.22})`;
        ctx.beginPath();
        const trailX = a.x + (b.x - a.x) * Math.max(0, packet.t - 0.06);
        const trailY = a.y + (b.y - a.y) * Math.max(0, packet.t - 0.06);
        ctx.arc(trailX, trailY, 1.4, 0, Math.PI * 2);
        ctx.fill();

        packet.t += packet.speed;
      }

      for (const node of nodes) {
        const rgb = hexToRgb(node.color);
        ctx.fillStyle = `rgba(${rgb},0.06)`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${rgb},${node.alpha})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (frame % 30 === 0) spawnPacket();

      animationFrame = window.requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    draw();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" style={{ opacity: 1 }} />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(6, 8, 16, 0.95) 100%)',
        }}
      />
    </div>
  );
}
