'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function Education() {
  const [imageError, setImageError] = useState(false);
  const [pdfError, setPdfError] = useState(false);
  const canvasRef = useRef(null);
  const [pdfLib, setPdfLib] = useState(null);
  const [certificateData, setCertificateData] = useState(null);
  const [certificateImage, setCertificateImage] = useState(null);
  const efSetCertificateUrl = 'https://cert.efset.org/en/o76J1w';
  const efSetCertificateFile = '/english-certified.pdf';

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const pdfjs = await import('pdfjs-dist/legacy/build/pdf');
        pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
        if (!cancelled) setPdfLib(pdfjs);
      } catch {
        if (!cancelled) setPdfError(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(efSetCertificateFile);
        if (!res.ok) throw new Error('fetch failed');
        const buffer = await res.arrayBuffer();
        if (!cancelled) setCertificateData(buffer);
        if (!cancelled) setCertificateImage('/english-certified-1.png');
      } catch {
        if (!cancelled) setPdfError(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [efSetCertificateFile]);

  useEffect(() => {
    let cancelled = false;
    if (!certificateData || pdfError || !pdfLib) return;

    (async () => {
      try {
        const pdf = await pdfLib.getDocument({ data: certificateData }).promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        const renderContext = { canvasContext: context, viewport };
        await page.render(renderContext).promise;
      } catch (err) {
        if (!cancelled) setPdfError(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [certificateData, pdfError, pdfLib]);

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
                <h3 className="text-2xl font-bold text-[#ECEFF4] mb-1">
                  Bachelor in Information Systems — UFJF
                </h3>
                <p className="text-sm text-[#D8DEE9]/70 mb-3">Juiz de Fora, MG</p>
                <p className="text-[#D8DEE9]/80 mb-4">
                  Currently pursuing a Bachelor in Information Systems with focus on software engineering, databases, and IT management. Teaching assistant in Data Structures and involved in extension projects.
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {[
                    'Linux',
                    'REST APIs',
                    'CRUD and business rules',
                    'Git workflows'
                  ].map((label) => (
                    <span
                      key={label}
                      className="px-3 py-1 bg-[#2E3440] text-[#D8DEE9] text-sm rounded-full border border-[#4C566A]"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#3B4252] rounded-xl border border-[#4C566A] hover:border-[#88C0D0] transition-all hover:shadow-xl mt-6 overflow-hidden">
            <div className="w-full bg-[#2E3440] border-b border-[#4C566A] relative">
              {certificateImage && (
                <div className="w-full max-h-[26rem] overflow-auto flex justify-center p-4">
                  <img
                    src={certificateImage}
                    alt="EF SET Certificate preview"
                    className="h-[26rem] w-auto max-w-none"
                  />
                </div>
              )}
              {!certificateImage && (
                <div className="w-full h-64 flex items-center justify-center text-[#D8DEE9]/60">
                  {pdfError ? 'Could not load certificate' : 'Loading certificate...'}
                </div>
              )}
            </div>
            <div className="p-8 flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-[#ECEFF4] mb-1">English Proficiency</h3>
                <p className="text-sm text-[#D8DEE9]/70 mb-3">EF SET — C1 (Advanced)</p>
                <p className="text-[#D8DEE9]/80 mb-4">
                  Currently certified at C1 level with EF SET. Reading and listening at C2, writing at C1, speaking at B1.
                </p>
                <div className="flex flex-wrap gap-3">
                  {efSetCertificateUrl && (
                    <a
                      href={efSetCertificateUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center px-4 py-2 bg-[#88C0D0] text-[#2E3440] font-semibold rounded-md transition-colors hover:bg-[#81A1C1]"
                    >
                      View online
                    </a>
                  )}
                  {efSetCertificateFile && (
                    <a
                      href={efSetCertificateFile}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center px-4 py-2 border border-[#4C566A] text-[#ECEFF4] font-semibold rounded-md transition-colors hover:border-[#88C0D0]"
                    >
                      Open PDF
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

