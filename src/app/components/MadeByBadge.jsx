import Link from 'next/link';

export default function MadeByBadge() {
  return (
    <Link
      href="https://github.com/nsalgado2000"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Made by Nicolas Salgado — view GitHub profile"
      className="fixed bottom-4 right-4 z-50 flex items-center gap-1.5 rounded-full border border-[#4C566A] bg-[#2E3440]/80 backdrop-blur-sm px-3 py-1.5 text-xs text-[#D8DEE9]/70 shadow-lg transition-colors hover:border-[#88C0D0] hover:text-[#88C0D0]"
      style={{ paddingBottom: 'calc(0.375rem + env(safe-area-inset-bottom))' }}
    >
      <span aria-hidden="true" className="text-[#88C0D0]">
        &gt;_
      </span>
      made by nsalgado
    </Link>
  );
}
