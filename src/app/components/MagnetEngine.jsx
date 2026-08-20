'use client';

import { useEffect } from 'react';
import { useTricks } from '../context/TricksContext';

const RADIUS = 240;
const STRENGTH = 0.35;

export default function MagnetEngine() {
  const { magnetOn, gravityOn, zeroGOn } = useTricks();

  useEffect(() => {
    if (!magnetOn || gravityOn || zeroGOn) return;

    const elements = Array.from(document.querySelectorAll('.js-gravity'));
    if (elements.length === 0) return;

    elements.forEach((el) => {
      el.style.transition = 'transform 220ms cubic-bezier(0.2, 0.9, 0.3, 1)';
      el.style.willChange = 'transform';
    });

    let mouseX = -9999;
    let mouseY = -9999;
    let raf = null;

    const update = () => {
      raf = null;
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = mouseX - cx;
        const dy = mouseY - cy;
        const dist = Math.hypot(dx, dy);
        if (dist < RADIUS) {
          const factor = (1 - dist / RADIUS) * STRENGTH;
          el.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
        } else {
          el.style.transform = 'translate(0, 0)';
        }
      });
    };

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!raf) raf = requestAnimationFrame(update);
    };

    window.addEventListener('mousemove', onMove);

    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf) cancelAnimationFrame(raf);
      elements.forEach((el) => {
        el.style.transition = 'transform 350ms cubic-bezier(0.2, 0.9, 0.3, 1)';
        el.style.transform = 'translate(0, 0)';
        const onDone = () => {
          el.style.transition = '';
          el.style.willChange = '';
          el.removeEventListener('transitionend', onDone);
        };
        el.addEventListener('transitionend', onDone);
      });
    };
  }, [magnetOn, gravityOn, zeroGOn]);

  return null;
}
