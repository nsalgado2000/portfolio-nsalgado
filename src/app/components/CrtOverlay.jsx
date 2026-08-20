'use client';

import { useTricks } from '../context/TricksContext';

export default function CrtOverlay() {
  const { crtOn } = useTricks();
  if (!crtOn) return null;

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[9998]"
        style={{
          background:
            'repeating-linear-gradient(to bottom, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0) 2px, rgba(0, 0, 0, 0.18) 2px, rgba(0, 0, 0, 0.18) 3px)',
          mixBlendMode: 'multiply',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[9999]"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 45%, rgba(0, 0, 0, 0.55) 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[9997]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(136, 192, 208, 0.04) 1px, transparent 1px)',
          backgroundSize: '3px 3px',
          mixBlendMode: 'screen',
        }}
      />
    </>
  );
}
