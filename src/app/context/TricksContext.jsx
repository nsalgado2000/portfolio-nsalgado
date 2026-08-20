'use client';

import { createContext, useContext, useState } from 'react';

const TricksContext = createContext(null);

export function TricksProvider({ children }) {
  const [gravityOn, setGravityOn] = useState(false);
  const [zeroGOn, setZeroGOn] = useState(false);
  const [mouseTrailOn, setMouseTrailOn] = useState(false);
  const [magnetOn, setMagnetOn] = useState(false);
  const [crtOn, setCrtOn] = useState(false);
  const [terminalOn, setTerminalOn] = useState(false);
  const [gameOn, setGameOn] = useState(false);

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
  const toggleTerminal = () => setTerminalOn((v) => !v);
  const toggleGame = () => setGameOn((v) => !v);

  const rerollBackground = () =>
    window.dispatchEvent(new Event('reroll-background'));

  const fireConfetti = (x, y) =>
    window.dispatchEvent(
      new CustomEvent('confetti-burst', {
        detail: {
          x: typeof x === 'number' ? x : window.innerWidth / 2,
          y: typeof y === 'number' ? y : window.innerHeight / 2,
        },
      })
    );

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
        terminalOn,
        toggleTerminal,
        gameOn,
        toggleGame,
        rerollBackground,
        fireConfetti,
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
