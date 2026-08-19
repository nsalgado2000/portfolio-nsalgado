'use client';

import { createContext, useContext, useState } from 'react';

const TricksContext = createContext(null);

export function TricksProvider({ children }) {
  const [gravityOn, setGravityOn] = useState(false);
  const [mouseTrailOn, setMouseTrailOn] = useState(false);

  const toggleGravity = () => setGravityOn((v) => !v);
  const toggleMouseTrail = () => setMouseTrailOn((v) => !v);
  const rerollBackground = () => window.dispatchEvent(new Event('reroll-background'));

  return (
    <TricksContext.Provider
      value={{ gravityOn, toggleGravity, mouseTrailOn, toggleMouseTrail, rerollBackground }}
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
