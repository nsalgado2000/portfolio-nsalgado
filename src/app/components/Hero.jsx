'use client';

import Link from 'next/link';
import { TypeAnimation } from 'react-type-animation';

const SEQUENCE = [
  500,
  'Nicolas Sa',
  300,
  'Nicolas Sak',
  760,
  'Nicolas Sa',
  1000,
  'Nicolas Salgado',
  100000
];

export default function Hero() {
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
                className="inline-block bg-gradient-to-r from-[#88C0D0] via-[#81A1C1] to-[#5E81AC] animate-gradient pb-1 sm:pb-1.5 md:pb-2 whitespace-nowrap"
                style={{
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent',
                  lineHeight: '1.1'
                }}
              >
                <span
                  className="mr-2 sm:mr-3 md:mr-4"
                  style={{ WebkitTextFillColor: '#88C0D0', color: '#88C0D0' }}
                >
                  &gt;_
                </span>
                <TypeAnimation
                  sequence={SEQUENCE}
                  speed={70}
                  deletionSpeed={80}
                  cursor
                  wrapper="span"
                  repeat={0}
                />
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
