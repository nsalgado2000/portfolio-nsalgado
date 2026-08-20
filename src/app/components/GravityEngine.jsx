'use client';

import { useEffect, useRef } from 'react';
import { useTricks } from '../context/TricksContext';

const GRAVITY = 2800; // px/s^2

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
        el.style.willChange = 'transform';
        return {
          el,
          y: 0,
          v: 0,
          origLeft: rect.left,
          origRight: rect.right,
          origTop: rect.top,
          origBottom: rect.bottom,
          baseFloor: Math.max(window.innerHeight - rect.bottom + rect.height * 0.2, 24),
          rot: (Math.random() - 0.5) * 60,
        };
      });

      const overlapsX = (a, b) =>
        a.origRight > b.origLeft + 2 && a.origLeft + 2 < b.origRight;

      const effectiveFloor = (body, prevY) => {
        let floor = body.baseFloor;
        for (const other of bodies) {
          if (other === body) continue;
          if (!other.settled) continue;
          if (!overlapsX(body, other)) continue;
          const contact = other.origTop + other.y - body.origBottom;
          if (contact >= 0 && prevY <= contact && contact < floor) {
            floor = contact;
          }
        }
        return floor;
      };

      let last = performance.now();

      const tick = (now) => {
        const dt = Math.min((now - last) / 1000, 0.032);
        last = now;
        let stillMoving = false;

        bodies.forEach((b) => {
          if (b.settled) return;
          stillMoving = true;
          const prevY = b.y;
          b.v += GRAVITY * dt;
          b.y += b.v * dt;

          const floor = effectiveFloor(b, prevY);

          if (b.y >= floor) {
            b.y = floor;
            b.v = 0;
            b.settled = true;
          }

          const progress = b.baseFloor > 0 ? Math.min(b.y / b.baseFloor, 1) : 1;
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
          el.removeEventListener('transitionend', onDone);
        };
        el.addEventListener('transitionend', onDone);
      });
    }

    return () => cancelAnimationFrame(rafRef.current);
  }, [gravityOn]);

  return null;
}
