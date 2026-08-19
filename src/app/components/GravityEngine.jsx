'use client';

import { useEffect, useRef } from 'react';
import { useTricks } from '../context/TricksContext';

const GRAVITY = 2800; // px/s^2
const RESTITUTION = 0.42;
const SETTLE_VELOCITY = 90;

export default function GravityEngine() {
  const { gravityOn } = useTricks();
  const rafRef = useRef(null);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('.js-gravity'));
    if (elements.length === 0) return;

    if (gravityOn) {
      const bodies = elements.map((el) => {
        const rect = el.getBoundingClientRect();
        el.style.transition = 'none';
        el.style.pointerEvents = 'none';
        el.style.willChange = 'transform';
        return {
          el,
          y: 0,
          v: 0,
          floor: Math.max(window.innerHeight - rect.bottom + rect.height * 0.2, 24),
          rot: (Math.random() - 0.5) * 60,
        };
      });

      let last = performance.now();

      const tick = (now) => {
        const dt = Math.min((now - last) / 1000, 0.032);
        last = now;
        let stillMoving = false;

        bodies.forEach((b) => {
          if (b.settled) return;
          stillMoving = true;
          b.v += GRAVITY * dt;
          b.y += b.v * dt;

          if (b.y >= b.floor) {
            b.y = b.floor;
            b.v = -b.v * RESTITUTION;
            if (Math.abs(b.v) < SETTLE_VELOCITY) {
              b.v = 0;
              b.settled = true;
            }
          }

          const progress = Math.min(b.y / b.floor, 1);
          b.el.style.transform = `translateY(${b.y}px) rotate(${b.rot * progress}deg)`;
        });

        if (stillMoving) {
          rafRef.current = requestAnimationFrame(tick);
        }
      };

      rafRef.current = requestAnimationFrame(tick);
    } else {
      cancelAnimationFrame(rafRef.current);
      elements.forEach((el) => {
        el.style.transition = 'transform 550ms cubic-bezier(0.34, 1.56, 0.64, 1)';
        el.style.transform = 'translateY(0) rotate(0deg)';
        const onDone = () => {
          el.style.transition = '';
          el.style.willChange = '';
          el.style.pointerEvents = '';
          el.removeEventListener('transitionend', onDone);
        };
        el.addEventListener('transitionend', onDone);
      });
    }

    return () => cancelAnimationFrame(rafRef.current);
  }, [gravityOn]);

  return null;
}
