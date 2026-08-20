'use client';

import { useEffect } from 'react';
import { useTricks } from '../context/TricksContext';

const RADIUS = 240;
const STRENGTH = 0.35;

export default function MagnetEngine() {
  const { magnetOn, gravityOn, zeroGOn } = useTricks();

  useEffect(() => {
    if (!magnetOn || gravityOn || zeroGOn) return;

    const nodes = Array.from(document.querySelectorAll('.js-gravity'));
    if (nodes.length === 0) return;

    const pagePos = (el) => {
      let x = 0;
      let y = 0;
      let node = el;
      while (node) {
        x += node.offsetLeft || 0;
        y += node.offsetTop || 0;
        node = node.offsetParent;
      }
      return { x, y };
    };

    const measure = () =>
      nodes.map((el) => {
        const p = pagePos(el);
        return {
          el,
          layoutX: p.x,
          layoutY: p.y,
          width: el.offsetWidth,
          height: el.offsetHeight,
        };
      });

    let bodies = measure();

    nodes.forEach((el) => {
      el.style.transition = 'transform 220ms cubic-bezier(0.2, 0.9, 0.3, 1)';
      el.style.willChange = 'transform';
    });

    let mouseX = -9999;
    let mouseY = -9999;
    let raf = null;

    const update = () => {
      raf = null;
      bodies.forEach(({ el, layoutX, layoutY, width, height }) => {
        const cx = layoutX - window.scrollX + width / 2;
        const cy = layoutY - window.scrollY + height / 2;
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

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      schedule();
    };

    const onScroll = () => schedule();

    const onResize = () => {
      bodies = measure();
      schedule();
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (raf) cancelAnimationFrame(raf);
      nodes.forEach((el) => {
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
