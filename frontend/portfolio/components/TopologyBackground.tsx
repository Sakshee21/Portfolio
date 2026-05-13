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

const COLORS = ['#4fffb0', '#67e8f9', '#a78bfa', '#4fffb0'];

export function TopologyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;
    const context = canvasElement.getContext('2d');
    if (!context) return;
    const canvas = canvasElement;
    const ctx = context;

    let W = 0;
    let H = 0;
    let animId: number;
    let nodes: BgNode[] = [];
    let packets: Packet[] = [];
    let frame = 0;

    function resize() {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
      buildNodes();
    }

    function buildNodes() {
      const count = Math.floor((W * H) / 22000);
      nodes = Array.from({ length: Math.min(count, 28) }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 2 + 1.5,
        alpha: Math.random() * 0.4 + 0.2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
    }

    function spawnPacket() {
      if (nodes.length < 2) return;
      const fromIdx = Math.floor(Math.random() * nodes.length);
      let toIdx = Math.floor(Math.random() * nodes.length);
      while (toIdx === fromIdx) toIdx = Math.floor(Math.random() * nodes.length);
      const a = nodes[fromIdx];
      const b = nodes[toIdx];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d > 260) return;
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
      ctx.clearRect(0, 0, W, H);

      ctx.fillStyle = 'rgba(79, 255, 176, 0.05)';
      const gs = 40;
      for (let x = 0; x < W; x += gs) {
        for (let y = 0; y < H; y += gs) {
          ctx.beginPath();
          ctx.arc(x, y, 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 180) {
            const alpha = (1 - d / 180) * 0.18;
            ctx.strokeStyle = `rgba(79, 255, 176, ${alpha})`;
            ctx.lineWidth = 0.5;
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

      packets = packets.filter((p) => p.t <= 1);
      for (const p of packets) {
        const a = nodes[p.fromIdx];
        const b = nodes[p.toIdx];
        if (!a || !b) continue;
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        const edgeAlpha = p.t < 0.08 ? p.t / 0.08 : p.t > 0.92 ? (1 - p.t) / 0.08 : 1;
        const rgb = hexToRgb(p.color);
        ctx.fillStyle = `rgba(${rgb},${edgeAlpha * 0.9})`;
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(${rgb},${edgeAlpha * 0.25})`;
        ctx.beginPath();
        const tx = a.x + (b.x - a.x) * Math.max(0, p.t - 0.06);
        const ty = a.y + (b.y - a.y) * Math.max(0, p.t - 0.06);
        ctx.arc(tx, ty, 1.5, 0, Math.PI * 2);
        ctx.fill();
        p.t += p.speed;
      }

      for (const n of nodes) {
        const rgb = hexToRgb(n.color);
        ctx.fillStyle = `rgba(${rgb},0.06)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(${rgb},${n.alpha})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (frame % 30 === 0) spawnPacket();

      animId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 1 }} />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 32%, rgba(6, 8, 16, 0.96) 100%)',
        }}
      />
    </div>
  );
}
