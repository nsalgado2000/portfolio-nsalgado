'use client';

import { useLanguage } from '../context/LanguageContext';

export default function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={lang === 'en' ? 'Switch to Portuguese' : 'Mudar para inglês'}
      className="fixed top-4 right-4 z-50 flex items-center gap-1 rounded-md border border-[#4C566A] bg-[#2E3440]/80 backdrop-blur-md px-1 py-1 text-xs font-bold shadow-lg"
      style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
    >
      <span
        className="rounded px-2 py-1 transition-colors"
        style={{
          backgroundColor: lang === 'en' ? '#88C0D0' : 'transparent',
          color: lang === 'en' ? '#2E3440' : '#D8DEE9AA',
        }}
      >
        EN
      </span>
      <span
        className="rounded px-2 py-1 transition-colors"
        style={{
          backgroundColor: lang === 'pt' ? '#88C0D0' : 'transparent',
          color: lang === 'pt' ? '#2E3440' : '#D8DEE9AA',
        }}
      >
        PT
      </span>
    </button>
  );
}
