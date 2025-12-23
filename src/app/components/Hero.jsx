'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

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
      { text: 'Nicolas Sak', delay: 640, jitter: 120 },
      { text: 'Nicolas Sa', delay: 520, jitter: 90 },
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

  const parts = useMemo(() => {
    const current = displayName || '';
    const previous = prevName || '';
    const minLen = Math.min(current.length, previous.length);
    let diffIndex = 0;
    while (diffIndex < minLen && current[diffIndex] === previous[diffIndex]) {
      diffIndex += 1;
    }

    if (diffIndex >= current.length) {
      return { stable: current, active: '', tail: '' };
    }

    return {
      stable: current.slice(0, diffIndex),
      active: current[diffIndex] ?? '',
      tail: current.slice(diffIndex + 1)
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
    <section className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-screen">
      <div className="relative">
        <div className="absolute inset-0 bg-[#2E3440]/40 backdrop-blur-sm rounded-lg -z-10"></div>
        <div className="text-center space-y-8 animate-fadeIn p-12">
          <div className="relative overflow-visible">
            <h1 className="font-poppins text-8xl md:text-9xl font-bold py-3 leading-tight overflow-visible">
              <span 
                className="inline-block bg-gradient-to-r from-[#88C0D0] via-[#81A1C1] to-[#5E81AC] animate-gradient pb-2"
                style={{ 
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent',
                  lineHeight: '1.1'
                }}
              >
                <span className="mr-4 text-[#88C0D0]">&gt;_</span>
                <span>{parts.stable}</span>
                {parts.active && (
                  <span
                    key={`${parts.stable}-${parts.active}-${parts.tail}`}
                    className="inline-block"
                    style={{ animation: 'nameReveal 260ms ease-out' }}
                  >
                    {parts.active}
                  </span>
                )}
                <span>{parts.tail}</span>
                <span
                  className="inline-block w-4 ml-1 align-middle"
                  aria-hidden="true"
                  style={{ opacity: showCursor ? 1 : 0 }}
                >
                  |
                </span>
              </span>
            </h1>
            <div className="absolute -inset-1 blur-2xl bg-gradient-to-r from-[#88C0D0]/20 to-[#81A1C1]/20 -z-10"></div>
          </div>
          <style jsx>{`
            @keyframes nameReveal {
              from {
                transform: translateY(10px);
                opacity: 0;
              }
              to {
                transform: translateY(0);
                opacity: 1;
              }
            }
          `}</style>
          <p className="text-3xl md:text-4xl text-[#ECEFF4]/80 font-light">
            Expert Fullstack Developer
          </p>
          <p className="max-w-2xl mx-auto text-xl text-[#D8DEE9]/60 leading-relaxed">
            Specialized in Java with Spring Boot, React, Next.js, and FastAPI. Building scalable, high-performance applications with clean code and modern architecture.
          </p>
          <div className="flex gap-6 justify-center mt-12">
            <Link 
              href="#projects"
              onClick={(e) => handleSmoothScroll(e, '#projects')}
              className="group px-10 py-5 bg-[#88C0D0] text-[#2E3440] rounded-full hover:bg-[#81A1C1] transition-all hover:scale-105 shadow-lg hover:shadow-[#88C0D0]/25 text-lg font-medium"
            >
              View Projects
              <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link 
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, '#contact')}
              className="group px-10 py-5 border-2 border-[#88C0D0] text-[#88C0D0] rounded-full hover:bg-[#88C0D0] hover:text-[#2E3440] transition-all hover:scale-105 text-lg font-medium"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
