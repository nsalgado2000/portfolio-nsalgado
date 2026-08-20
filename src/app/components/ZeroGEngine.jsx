'use client';

import { useEffect, useRef } from 'react';
import { useTricks } from '../context/TricksContext';

const GRAVITY = 2400;

export default function ZeroGEngine() {
  const { zeroGOn } = useTricks();
  const rafRef = useRef(null);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('.js-gravity'));
    if (elements.length === 0) return;

    if (zeroGOn) {
      const pageTop = (el) => {
        let top = 0;
        let node = el;
        while (node) {
          top += node.offsetTop || 0;
          node = node.offsetParent;
        }
        return top;
      };

      const ceilingRef = document.querySelector('#projects');
      const ceilingY = ceilingRef ? pageTop(ceilingRef) : 0;

      const bodies = elements.map((el) => {
        el.style.transition = 'none';
        el.style.willChange = 'transform';
        const top = pageTop(el);
        const bottom = top + el.offsetHeight;
        const rect = el.getBoundingClientRect();
        return {
          el,
          y: 0,
          v: 0,
          origLeft: rect.left,
          origRight: rect.right,
          origTop: top,
          origBottom: bottom,
          baseCeiling: Math.max(top - ceilingY, 0),
        };
      });

      const placeOrder = [...bodies].sort(
        (a, b) => a.baseCeiling - b.baseCeiling
      );

      for (const body of placeOrder) {
        let target = body.baseCeiling;
        for (const other of placeOrder) {
          if (other === body) break;
          const sideBySide =
            other.origBottom > body.origTop && other.origTop < body.origBottom;
          if (sideBySide) continue;
          const contact = body.origTop - other.origBottom + other.targetY;
          if (contact > 0 && contact < target) {
            target = contact;
          }
        }
        body.targetY = target;
      }

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

          if (b.y >= b.targetY) {
            b.y = b.targetY;
            b.v = 0;
            b.settled = true;
          }

          b.el.style.transform = `translateY(${-b.y}px)`;
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
        el.style.transform = 'translateY(0)';
        const onDone = () => {
          el.style.transition = '';
          el.style.willChange = '';
          el.removeEventListener('transitionend', onDone);
        };
        el.addEventListener('transitionend', onDone);
      });
    }

    return () => cancelAnimationFrame(rafRef.current);
  }, [zeroGOn]);

  return null;
}
