'use client';

import { useLanguage } from '../context/LanguageContext';

const ICONS = {
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),
  spinner: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
      <path d="M12 3a9 9 0 1 0 9 9" />
    </svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 6-6 6 6 6M15 6l6 6-6 6" />
    </svg>
  ),
  branch: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <path d="M6 8.5v7M8.3 6.9C13 8 15.5 9 15.5 14.5c0 1.4 1 3 2.5 3" />
    </svg>
  ),
};

const STATUS_STYLES = {
  done: { icon: 'check', accent: '#A3BE8C' },
  'in-progress': { icon: 'spinner', accent: '#EBCB8B', spin: true },
};

const AUTHORSHIP_STYLES = {
  solo: { icon: 'code', accent: '#88C0D0' },
  contributor: { icon: 'branch', accent: '#B48EAD' },
};

function Badge({ label, icon, accent, spin }) {
  return (
    <span
      className="group/badge inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold tracking-wide backdrop-blur-md transition-transform hover:scale-105"
      style={{
        fontFamily: 'var(--font-jetbrains-mono)',
        color: accent,
        borderColor: `${accent}55`,
        backgroundColor: `${accent}1A`,
        boxShadow: `0 0 10px 0 ${accent}40`,
      }}
    >
      <span className={`h-2.5 w-2.5 shrink-0 ${spin ? 'animate-spin' : ''}`} aria-hidden="true">
        {ICONS[icon]}
      </span>
      {label}
    </span>
  );
}

export default function ProjectBadges({ status, authorship }) {
  const { t } = useLanguage();
  const statusStyle = STATUS_STYLES[status];
  const authorshipStyle = AUTHORSHIP_STYLES[authorship];

  if (!statusStyle && !authorshipStyle) return null;

  return (
    <div className="absolute top-3 right-3 z-10 flex flex-wrap justify-end gap-2">
      {statusStyle && <Badge {...statusStyle} label={t.projects.status[status]} />}
      {authorshipStyle && <Badge {...authorshipStyle} label={t.projects.authorship[authorship]} />}
    </div>
  );
}
