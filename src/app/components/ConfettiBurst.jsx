'use client';

import { useEffect, useRef } from 'react';

const COLORS = [
  '#88C0D0',
  '#A3BE8C',
  '#EBCB8B',
  '#D08770',
  '#B48EAD',
  '#BF616A',
  '#81A1C1',
  '#8FBCBB',
];

export default function ConfettiBurst() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let particles = [];
    let raf = null;
    const GRAVITY = 0.4;
    const AIR = 0.99;

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vy += GRAVITY;
        p.vx *= AIR;
        p.vy *= AIR;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vrot;
        p.life -= p.decay;
        if (p.life <= 0 || p.y > canvas.height + 60) {
          particles.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.min(1, p.life * 1.8);
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      ctx.globalAlpha = 1;
      if (particles.length > 0) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = null;
      }
    };

    const burst = (x, y) => {
      const count = 140;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 4 + Math.random() * 11;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 5,
          rot: Math.random() * Math.PI * 2,
          vrot: (Math.random() - 0.5) * 0.35,
          w: 6 + Math.random() * 6,
          h: 3 + Math.random() * 5,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          life: 1,
          decay: 0.005 + Math.random() * 0.005,
        });
      }
      if (raf == null) raf = requestAnimationFrame(tick);
    };

    const onBurst = (e) => {
      const x = e.detail?.x ?? window.innerWidth / 2;
      const y = e.detail?.y ?? window.innerHeight / 2;
      burst(x, y);
    };

    window.addEventListener('confetti-burst', onBurst);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('confetti-burst', onBurst);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9990]"
    />
  );
}
