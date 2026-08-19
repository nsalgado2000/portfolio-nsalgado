'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function MadeByBadge() {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const target = document.querySelector('#contact');
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setExpanded(entry.isIntersecting),
      { rootMargin: '0px 0px -20% 0px' }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <Link
      href="https://github.com/nsalgado2000"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Made by Nicolas Salgado — view GitHub profile"
      className="fixed bottom-4 right-4 z-50 flex items-center rounded-full border border-[#4C566A] bg-[#2E3440]/80 backdrop-blur-sm px-3 py-1.5 text-xs text-[#D8DEE9]/70 shadow-lg transition-colors hover:border-[#88C0D0] hover:text-[#88C0D0]"
      style={{
        fontFamily: 'var(--font-jetbrains-mono)',
        paddingBottom: 'calc(0.375rem + env(safe-area-inset-bottom))'
      }}
    >
      <span aria-hidden="true" className="text-[#88C0D0]">
        &gt;_
      </span>
      <span
        className={`overflow-hidden whitespace-nowrap transition-all duration-300 sm:max-w-[9rem] sm:ml-1.5 sm:opacity-100 ${
          expanded ? 'max-w-[9rem] ml-1.5 opacity-100' : 'max-w-0 ml-0 opacity-0'
        }`}
      >
        made by nsalgado
      </span>
    </Link>
  );
}
