'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

const FULL_NAME = 'Nicolas Salgado';

const FRAMES = [
  { text: '', delay: 320 },
  { text: 'N', delay: 180 },
  { text: 'Ni', delay: 180 },
  { text: 'Nic', delay: 180 },
  { text: 'Nico', delay: 180 },
  { text: 'Nicol', delay: 180 },
  { text: 'Nicola', delay: 200 },
  { text: 'Nicolas', delay: 220 },
  { text: 'Nicolas ', delay: 240 },
  { text: 'Nicolas S', delay: 200 },
  { text: 'Nicolas Sa', delay: 220 },
  { text: 'Nicolas Sak', delay: 780 },
  { text: 'Nicolas Sa', delay: 900 },
  { text: 'Nicolas Sal', delay: 220 },
  { text: 'Nicolas Salg', delay: 220 },
  { text: 'Nicolas Salga', delay: 220 },
  { text: 'Nicolas Salgad', delay: 220 },
  { text: 'Nicolas Salgado', delay: 0 }
];

export default function Hero() {
  const [displayName, setDisplayName] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let timer;
    let idx = 0;
    const tick = () => {
      const frame = FRAMES[idx];
      setDisplayName(frame.text);
      if (idx < FRAMES.length - 1) {
        timer = setTimeout(tick, frame.delay);
      }
      idx += 1;
    };
    tick();
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const blink = setInterval(() => setShowCursor((v) => !v), 620);
    return () => clearInterval(blink);
  }, []);

  const ghost = useMemo(() => {
    if (!displayName) return FULL_NAME;
    if (displayName === FULL_NAME) return '';
    return FULL_NAME.startsWith(displayName)
      ? FULL_NAME.slice(displayName.length)
      : '';
  }, [displayName]);

  const isError = displayName.length > 0 && !FULL_NAME.startsWith(displayName);

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="container mx-auto px-4 py-12 sm:py-16 md:py-20 flex flex-col items-center justify-center min-h-screen">
      <div className="relative w-full">
        <div className="absolute inset-0 bg-[#2E3440]/40 backdrop-blur-sm rounded-lg -z-10"></div>
        <div className="text-center space-y-4 sm:space-y-6 md:space-y-8 animate-fadeIn p-4 sm:p-6 md:p-8 lg:p-12">
          <div className="relative overflow-visible">
            <h1
              className="font-poppins font-bold py-2 sm:py-2.5 md:py-3 leading-tight overflow-visible"
              style={{ fontSize: 'clamp(1.5rem, 8vw, 8rem)' }}
            >
              <span
                className="inline-grid whitespace-nowrap"
                style={{ lineHeight: '1.1' }}
              >
                <span
                  aria-hidden="true"
                  className="pb-1 sm:pb-1.5 md:pb-2"
                  style={{
                    gridColumn: 1,
                    gridRow: 1,
                    visibility: 'hidden'
                  }}
                >
                  <span className="mr-2 sm:mr-3 md:mr-4">&gt;_</span>
                  {FULL_NAME}
                  <span>|</span>
                </span>
                <span
                  className="bg-gradient-to-r from-[#88C0D0] via-[#81A1C1] to-[#5E81AC] animate-gradient pb-1 sm:pb-1.5 md:pb-2"
                  style={{
                    gridColumn: 1,
                    gridRow: 1,
                    textAlign: 'left',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: isError ? '#BF616A' : 'transparent',
                    color: isError ? '#BF616A' : 'transparent',
                    transition:
                      'color 160ms ease, -webkit-text-fill-color 160ms ease'
                  }}
                >
                  <span
                    className="mr-2 sm:mr-3 md:mr-4"
                    style={{ WebkitTextFillColor: '#88C0D0', color: '#88C0D0' }}
                  >
                    &gt;_
                  </span>
                  <span>{displayName}</span>
                  <span
                    aria-hidden="true"
                    style={{ opacity: showCursor ? 1 : 0 }}
                  >
                    |
                  </span>
                  {ghost && !isError && (
                    <span
                      aria-hidden="true"
                      style={{
                        WebkitTextFillColor: '#6B7383',
                        color: '#6B7383'
                      }}
                    >
                      {ghost}
                    </span>
                  )}
                </span>
              </span>
            </h1>
            <div className="absolute -inset-1 blur-2xl bg-gradient-to-r from-[#88C0D0]/20 to-[#81A1C1]/20 -z-10"></div>
          </div>
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#ECEFF4]/80 font-light">
            Experienced Fullstack Developer
          </p>
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl text-[#D8DEE9]/60 leading-relaxed px-2">
            Specialized in Java with Spring Boot, React, Next.js, and FastAPI. Building scalable, high-performance applications with clean code and modern architecture.
          </p>
          <div className="flex gap-3 sm:gap-4 md:gap-6 justify-center mt-6 sm:mt-8 md:mt-12">
            <Link
              href="#projects"
              onClick={(e) => handleSmoothScroll(e, '#projects')}
              className="group px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-[#88C0D0] text-[#2E3440] rounded-full hover:bg-[#81A1C1] transition-all hover:scale-105 shadow-lg hover:shadow-[#88C0D0]/25 text-sm sm:text-base md:text-lg font-medium"
            >
              View Projects
              <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, '#contact')}
              className="group px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 border-2 border-[#88C0D0] text-[#88C0D0] rounded-full hover:bg-[#88C0D0] hover:text-[#2E3440] transition-all hover:scale-105 text-sm sm:text-base md:text-lg font-medium"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
