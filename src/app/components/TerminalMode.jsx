'use client';

import { useEffect } from 'react';
import { useTricks } from '../context/TricksContext';

export default function TerminalMode() {
  const { terminalOn } = useTricks();

  useEffect(() => {
    const cls = 'terminal-mode';
    if (terminalOn) {
      document.documentElement.classList.add(cls);
    } else {
      document.documentElement.classList.remove(cls);
    }
    return () => document.documentElement.classList.remove(cls);
  }, [terminalOn]);

  return null;
}
