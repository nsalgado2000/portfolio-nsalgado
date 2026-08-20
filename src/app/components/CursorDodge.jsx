'use client';

import { useEffect, useRef, useState } from 'react';
import { useTricks } from '../context/TricksContext';

const ARENA = 500;
const PLAYER_R = 8;
const ENEMY_COLORS = ['#BF616A', '#D08770', '#EBCB8B', '#B48EAD'];

export default function CursorDodge() {
  const { gameOn, toggleGame } = useTricks();
  const canvasRef = useRef(null);
  const toggleRef = useRef(toggleGame);
  toggleRef.current = toggleGame;

  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (!gameOn) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = ARENA;
    canvas.height = ARENA;

    let enemies = [];
    let mouseX = ARENA / 2;
    let mouseY = ARENA - 60;
    let over = false;
    let startTime = performance.now();
    let lastSpawn = startTime;
    let lastScore = startTime;
    let lastFrame = startTime;
    let raf = null;

    const spawnEnemy = () => {
      const elapsed = (performance.now() - startTime) / 1000;
      const size = 14 + Math.random() * 22;
      const speed = 100 + Math.random() * 120 + elapsed * 12;
      enemies.push({
        x: Math.random() * (ARENA - size),
        y: -size,
        w: size,
        h: size,
        vy: speed,
        color: ENEMY_COLORS[Math.floor(Math.random() * ENEMY_COLORS.length)],
        rot: Math.random() * Math.PI,
        vrot: (Math.random() - 0.5) * 0.06,
      });
    };

    const reset = () => {
      enemies = [];
      startTime = performance.now();
      lastSpawn = startTime;
      lastScore = startTime;
      lastFrame = startTime;
      over = false;
      setScore(0);
      setGameOver(false);
    };

    const tick = (now) => {
      const dt = Math.min((now - lastFrame) / 1000, 0.05);
      lastFrame = now;

      if (!over) {
        const elapsed = (now - startTime) / 1000;
        const spawnInterval = Math.max(180, 560 - elapsed * 18);
        if (now - lastSpawn > spawnInterval) {
          spawnEnemy();
          lastSpawn = now;
        }

        for (let i = enemies.length - 1; i >= 0; i--) {
          const e = enemies[i];
          e.y += e.vy * dt;
          e.rot += e.vrot;
          if (e.y > ARENA) {
            enemies.splice(i, 1);
            continue;
          }
          const closestX = Math.max(e.x, Math.min(mouseX, e.x + e.w));
          const closestY = Math.max(e.y, Math.min(mouseY, e.y + e.h));
          const dx = mouseX - closestX;
          const dy = mouseY - closestY;
          if (dx * dx + dy * dy < PLAYER_R * PLAYER_R) {
            over = true;
            setGameOver(true);
            setScore(Math.floor((now - startTime) / 100));
            break;
          }
        }

        if (!over && now - lastScore > 200) {
          setScore(Math.floor((now - startTime) / 100));
          lastScore = now;
        }
      }

      ctx.fillStyle = '#2E3440';
      ctx.fillRect(0, 0, ARENA, ARENA);
      ctx.strokeStyle = '#3B4252';
      ctx.lineWidth = 1;
      for (let i = 25; i < ARENA; i += 25) {
        ctx.beginPath();
        ctx.moveTo(i + 0.5, 0);
        ctx.lineTo(i + 0.5, ARENA);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i + 0.5);
        ctx.lineTo(ARENA, i + 0.5);
        ctx.stroke();
      }

      enemies.forEach((e) => {
        ctx.save();
        ctx.translate(e.x + e.w / 2, e.y + e.h / 2);
        ctx.rotate(e.rot);
        ctx.fillStyle = e.color;
        ctx.fillRect(-e.w / 2, -e.h / 2, e.w, e.h);
        ctx.restore();
      });

      if (!over) {
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, PLAYER_R * 2.2, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(136, 192, 208, 0.35)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(mouseX, mouseY, PLAYER_R, 0, Math.PI * 2);
      ctx.fillStyle = over ? '#BF616A' : '#88C0D0';
      ctx.fill();
      ctx.strokeStyle = '#ECEFF4';
      ctx.lineWidth = 2;
      ctx.stroke();

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const scale = ARENA / rect.width;
      mouseX = Math.max(0, Math.min(ARENA, (e.clientX - rect.left) * scale));
      mouseY = Math.max(0, Math.min(ARENA, (e.clientY - rect.top) * scale));
    };
    const onTouchMove = (e) => {
      if (e.touches.length === 0) return;
      const t = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const scale = ARENA / rect.width;
      mouseX = Math.max(0, Math.min(ARENA, (t.clientX - rect.left) * scale));
      mouseY = Math.max(0, Math.min(ARENA, (t.clientY - rect.top) * scale));
      e.preventDefault();
    };
    const onCanvasClick = () => {
      if (over) reset();
    };
    const onKey = (e) => {
      if (e.key === 'Escape') {
        toggleRef.current();
        return;
      }
      if (over && (e.key === 'Enter' || e.key === ' ')) {
        reset();
        e.preventDefault();
      }
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('click', onCanvasClick);
    window.addEventListener('keydown', onKey);

    return () => {
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('click', onCanvasClick);
      window.removeEventListener('keydown', onKey);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [gameOn]);

  if (!gameOn) return null;

  return (
    <div className="fixed inset-0 z-[9995] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="rounded-xl border border-[#4C566A] bg-[#2E3440] p-4 sm:p-6 shadow-2xl">
        <div className="mb-3 flex items-center justify-between gap-4">
          <h3 className="font-mono text-lg font-bold text-[#88C0D0]">
            CURSOR DODGE
          </h3>
          <div className="font-mono text-sm text-[#D8DEE9]">
            Score: <span className="text-[#A3BE8C]">{score}</span>
          </div>
          <button
            type="button"
            onClick={() => toggleRef.current()}
            className="rounded px-2 py-1 text-sm text-[#D8DEE9] hover:bg-[#3B4252]"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <canvas
          ref={canvasRef}
          className="block rounded border border-[#4C566A] touch-none cursor-none"
          style={{
            width: '500px',
            aspectRatio: '1 / 1',
            maxWidth: 'min(80vw, 80vh)',
          }}
        />
        <p className="mt-3 text-center font-mono text-xs text-[#D8DEE9]/60">
          {gameOver
            ? `Fim de jogo — score ${score} — clique pra recomeçar`
            : 'Mova pra desviar — Esc pra sair'}
        </p>
      </div>
    </div>
  );
}
