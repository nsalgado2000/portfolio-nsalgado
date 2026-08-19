'use client';

import { useEffect, useRef } from 'react';
import { useTricks } from '../context/TricksContext';

const COLORS = ['#88C0D0', '#81A1C1', '#A3BE8C', '#EBCB8B'];

export default function MouseTrail() {
  const { mouseTrailOn } = useTricks();
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    if (!mouseTrailOn) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMove = (e) => {
      for (let i = 0; i < 2; i++) {
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 3 + 2,
          life: 1,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
        });
      }
    };
    window.addEventListener('mousemove', handleMove);

    let frame;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current = particlesRef.current.filter((p) => p.life > 0.02);
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life *= 0.94;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
      frame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMove);
      particlesRef.current = [];
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [mouseTrailOn]);

  if (!mouseTrailOn) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-40"
      aria-hidden="true"
    />
  );
}
