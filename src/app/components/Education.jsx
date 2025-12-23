'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function Education() {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#ECEFF4]">
          Education
        </h2>
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#3B4252] rounded-xl p-8 border border-[#4C566A] hover:border-[#88C0D0] transition-all hover:shadow-xl">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-[#2E3440] rounded-md flex items-center justify-center border border-[#4C566A] overflow-hidden relative">
                  {!imageError ? (
                    <Image
                      src="/ufjf-logo.png"
                      alt="UFJF Logo"
                      width={150}
                      height={150}
                      className="object-contain"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full bg-[#2E3440] rounded-lg flex items-center justify-center">
                      <span className="text-xl font-bold text-[#88C0D0]">UFJF</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-[#ECEFF4] mb-2">
                  Bachelor's in Information Systems
                </h3>
                <p className="text-lg text-[#88C0D0] mb-3">
                  Federal University of Juiz de Fora (UFJF)
                </p>
                <p className="text-[#D8DEE9]/80 mb-4">
                  Currently pursuing a Bachelor's degree in Information Systems, focusing on software engineering, database systems, and information technology management.
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <span className="px-3 py-1 bg-[#2E3440] text-[#D8DEE9] text-sm rounded-full border border-[#4C566A]">
                    Software Engineering
                  </span>
                  <span className="px-3 py-1 bg-[#2E3440] text-[#D8DEE9] text-sm rounded-full border border-[#4C566A]">
                    Database Systems
                  </span>
                  <span className="px-3 py-1 bg-[#2E3440] text-[#D8DEE9] text-sm rounded-full border border-[#4C566A]">
                    IT Management
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

