'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [displayName, setDisplayName] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const frames = [
      { text: '', delay: 260 },
      { text: 'N', delay: 200 },
      { text: 'Ni', delay: 200 },
      { text: 'Nic', delay: 200 },
      { text: 'Nico', delay: 200 },
      { text: 'Nicol', delay: 200 },
      { text: 'Nicola', delay: 200 },
      { text: 'Nicolas', delay: 240 },
      { text: 'Nicolas ', delay: 260 },
      { text: 'Nicolas S', delay: 220 },
      { text: 'Nicolas Sa', delay: 220 },
      { text: 'Nicolas Sak', delay: 520 },
      { text: 'Nicolas Sa', delay: 420 },
      { text: 'Nicolas Sal', delay: 240 },
      { text: 'Nicolas Salg', delay: 240 },
      { text: 'Nicolas Salga', delay: 240 },
      { text: 'Nicolas Salgad', delay: 240 },
      { text: 'Nicolas Salgado', delay: 0 }
    ];

    let timer;
    let idx = 0;
    const run = () => {
      setDisplayName(frames[idx].text);
      if (idx < frames.length - 1) {
        timer = setTimeout(run, frames[idx].delay || 240);
      }
      idx += 1;
    };
    timer = setTimeout(run, frames[0].delay || 240);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const blink = setInterval(() => setShowCursor((v) => !v), 620);
    return () => clearInterval(blink);
  }, []);

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
                {displayName || 'Nicolas Salgado'}
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
