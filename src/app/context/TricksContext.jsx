'use client';

import { createContext, useContext, useState } from 'react';

const TricksContext = createContext(null);

export function TricksProvider({ children }) {
  const [gravityOn, setGravityOn] = useState(false);
  const [zeroGOn, setZeroGOn] = useState(false);
  const [mouseTrailOn, setMouseTrailOn] = useState(false);
  const [magnetOn, setMagnetOn] = useState(false);
  const [crtOn, setCrtOn] = useState(false);

  const toggleGravity = () =>
    setGravityOn((v) => {
      if (!v) setZeroGOn(false);
      return !v;
    });
  const toggleZeroG = () =>
    setZeroGOn((v) => {
      if (!v) setGravityOn(false);
      return !v;
    });
  const toggleMouseTrail = () => setMouseTrailOn((v) => !v);
  const toggleMagnet = () => setMagnetOn((v) => !v);
  const toggleCrt = () => setCrtOn((v) => !v);
  const rerollBackground = () =>
    window.dispatchEvent(new Event('reroll-background'));

  return (
    <TricksContext.Provider
      value={{
        gravityOn,
        toggleGravity,
        zeroGOn,
        toggleZeroG,
        mouseTrailOn,
        toggleMouseTrail,
        magnetOn,
        toggleMagnet,
        crtOn,
        toggleCrt,
        rerollBackground,
      }}
    >
      {children}
    </TricksContext.Provider>
  );
}

export function useTricks() {
  const ctx = useContext(TricksContext);
  if (!ctx) throw new Error('useTricks must be used within a TricksProvider');
  return ctx;
}
