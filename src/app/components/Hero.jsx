'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

const FULL_NAME = 'Nicolas Salgado';

export default function Hero() {
  const [displayName, setDisplayName] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [prevName, setPrevName] = useState('');
  const currentNameRef = useRef('');

  useEffect(() => {
    const frames = [
      { text: '', delay: 220, jitter: 40 },
      { text: 'N', delay: 180, jitter: 40 },
      { text: 'Ni', delay: 180, jitter: 40 },
      { text: 'Nic', delay: 180, jitter: 40 },
      { text: 'Nico', delay: 190, jitter: 50 },
      { text: 'Nicol', delay: 190, jitter: 50 },
      { text: 'Nicola', delay: 190, jitter: 50 },
      { text: 'Nicolas', delay: 210, jitter: 50 },
      { text: 'Nicolas ', delay: 240, jitter: 60 },
      { text: 'Nicolas S', delay: 200, jitter: 50 },
      { text: 'Nicolas Sa', delay: 200, jitter: 50 },
      { text: 'Nicolas Sak', delay: 760, jitter: 140 },
      { text: 'Nicolas Sa', delay: 1000, jitter: 100 },
      { text: 'Nicolas Sal', delay: 220, jitter: 60 },
      { text: 'Nicolas Salg', delay: 220, jitter: 60 },
      { text: 'Nicolas Salga', delay: 220, jitter: 60 },
      { text: 'Nicolas Salgad', delay: 220, jitter: 60 },
      { text: 'Nicolas Salgado', delay: 0, jitter: 0 }
    ];

    let timer;
    let idx = 0;
    const run = () => {
      const frame = frames[idx];
      setPrevName(currentNameRef.current);
      setDisplayName(frame.text);
      currentNameRef.current = frame.text;
      if (idx < frames.length - 1) {
        const base = frame.delay || 200;
        const jitter = frame.jitter || 0;
        const variance = Math.round((Math.random() * 2 - 1) * jitter);
        const nextDelay = Math.max(90, base + variance);
        timer = setTimeout(run, nextDelay);
      }
      idx += 1;
    };
    run();

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const blink = setInterval(() => setShowCursor((v) => !v), 620);
    return () => clearInterval(blink);
  }, []);

  const [isVanishingAnimating, setIsVanishingAnimating] = useState(false);

  const ghost = useMemo(() => {
    if (!displayName) return FULL_NAME;
    if (displayName === FULL_NAME) return '';
    return FULL_NAME.startsWith(displayName) ? FULL_NAME.slice(displayName.length) : '';
  }, [displayName]);

  const vanishing = useMemo(() => {
    if (prevName.length > displayName.length && prevName.startsWith(displayName)) {
      return prevName.slice(displayName.length);
    }
    return '';
  }, [displayName, prevName]);

  useEffect(() => {
    if (!vanishing) {
      setIsVanishingAnimating(false);
      return;
    }
    setIsVanishingAnimating(true);
    const t = setTimeout(() => setIsVanishingAnimating(false), 120);
    return () => clearTimeout(t);
  }, [vanishing]);

  const isError = displayName.length > 0 && !FULL_NAME.startsWith(displayName);

  const parts = useMemo(() => {
    const current = displayName || '';
    const previous = prevName || '';
    const minLen = Math.min(current.length, previous.length);
    let diffIndex = 0;
    while (diffIndex < minLen && current[diffIndex] === previous[diffIndex]) {
      diffIndex += 1;
    }

    let activeIdx = diffIndex;
    while (activeIdx < current.length && current[activeIdx] === ' ') {
      activeIdx += 1;
    }

    if (activeIdx >= current.length) {
      return { stable: current, active: '', tail: '' };
    }

    return {
      stable: current.slice(0, activeIdx),
      active: current[activeIdx],
      tail: current.slice(activeIdx + 1)
    };
  }, [displayName, prevName]);

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="container mx-auto px-4 py-12 sm:py-16 md:py-20 flex flex-col items-center justify-center min-h-screen">
      <div className="relative w-full" style={{ containerType: 'inline-size' }}>
        <div className="absolute inset-0 bg-[#2E3440]/40 backdrop-blur-sm rounded-lg -z-10"></div>
        <div className="text-center space-y-4 sm:space-y-6 md:space-y-8 animate-fadeIn p-4 sm:p-6 md:p-8 lg:p-12">
          <div className="relative overflow-visible -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-12">
            <h1
              className="font-poppins font-bold py-2 sm:py-2.5 md:py-3 leading-tight overflow-visible"
              style={{ fontSize: 'clamp(1.5rem, 8cqw, 8rem)' }}
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
                  <span className="inline-block ml-0.5 sm:ml-1 align-middle">|</span>
                </span>
                <span
                  className="bg-gradient-to-r from-[#88C0D0] via-[#81A1C1] to-[#5E81AC] animate-gradient pb-1 sm:pb-1.5 md:pb-2 text-left"
                  style={{
                    gridColumn: 1,
                    gridRow: 1,
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: isError ? '#BF616A' : 'transparent',
                    color: isError ? '#BF616A' : 'transparent',
                    transition: 'color 160ms ease, -webkit-text-fill-color 160ms ease'
                  }}
                >
                  <span
                    className="mr-2 sm:mr-3 md:mr-4"
                    style={{ WebkitTextFillColor: '#88C0D0', color: '#88C0D0' }}
                  >
                    &gt;_
                  </span>
                  <span className="relative inline-block">
                    <span
                      aria-hidden="true"
                      className="absolute -inset-x-4 -inset-y-2 sm:-inset-x-6 sm:-inset-y-3 blur-2xl bg-gradient-to-r from-[#88C0D0]/20 to-[#81A1C1]/20 rounded-full pointer-events-none"
                      style={{
                        zIndex: -1,
                        opacity: isError ? 0 : 1,
                        transition: 'opacity 220ms ease'
                      }}
                    ></span>
                    <span>{parts.stable}</span>
                    {parts.active && (
                      <span
                        key={`${parts.stable}-${parts.active}-${parts.tail}`}
                        className="inline-block"
                        style={{
                          animation: 'nameReveal 280ms cubic-bezier(0.16, 1, 0.3, 1) both',
                          willChange: 'transform, opacity, filter'
                        }}
                      >
                        {parts.active}
                      </span>
                    )}
                    <span>{parts.tail}</span>
                  </span>
                  {vanishing && isVanishingAnimating && (
                    <span
                      key={`vanish-${vanishing}`}
                      aria-hidden="true"
                      className="inline-block"
                      style={{
                        animation: 'nameHide 120ms cubic-bezier(0.55, 0, 0.85, 0.3) both',
                        willChange: 'transform, opacity, filter'
                      }}
                    >
                      {vanishing}
                    </span>
                  )}
                  <span
                    className="inline-block ml-0.5 sm:ml-1 align-middle"
                    aria-hidden="true"
                    style={{ opacity: showCursor ? 1 : 0 }}
                  >
                    |
                  </span>
                  {ghost && !isVanishingAnimating && (
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
          </div>
          <style jsx>{`
            @keyframes nameReveal {
              from {
                transform: translate3d(-0.1em, 0.15em, 0) scale(0.92);
                opacity: 0;
                filter: blur(3px);
              }
              to {
                transform: translate3d(0, 0, 0) scale(1);
                opacity: 1;
                filter: blur(0);
              }
            }
            @keyframes nameHide {
              from {
                transform: translate3d(0, 0, 0) scale(1);
                opacity: 1;
                filter: blur(0);
              }
              to {
                transform: translate3d(0, -0.08em, 0) scale(0.7);
                opacity: 0;
                filter: blur(3px);
              }
            }
          `}</style>
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
