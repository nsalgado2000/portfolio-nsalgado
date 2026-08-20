'use client';

import { useLanguage } from '../context/LanguageContext';
import { useTricks } from '../context/TricksContext';

const ICONS = {
  cursor: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 3l7.07 17 2.51-7.39L21 10.07 4 3z" />
    </svg>
  ),
  gravity: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v13m0 0l-4.5-4.5M12 16l4.5-4.5" />
      <path d="M4 21h16" />
    </svg>
  ),
  reroll: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4v5h5" />
      <path d="M20 20v-5h-5" />
      <path d="M4.5 9a8 8 0 0 1 13.9-3.3L20 9" />
      <path d="M19.5 15a8 8 0 0 1-13.9 3.3L4 15" />
    </svg>
  ),
};

function TrickCard({ label, description, active, onClick, onLabel, offLabel, icon, isAction }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex flex-col items-start gap-3 rounded-xl border p-6 text-left transition-all hover:scale-105"
      style={{
        borderColor: active ? '#88C0D0' : '#4C566A',
        backgroundColor: active ? '#353F4C' : '#2E3440',
        zIndex: active ? 50 : 'auto',
      }}
    >
      <div className="flex w-full items-center justify-between">
        <span className="h-6 w-6 text-[#88C0D0]" aria-hidden="true">{ICONS[icon]}</span>
        {!isAction && (
          <span
            className="rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide"
            style={{
              fontFamily: 'var(--font-jetbrains-mono)',
              color: active ? '#2E3440' : '#D8DEE9AA',
              backgroundColor: active ? '#88C0D0' : 'transparent',
              border: active ? 'none' : '1px solid #4C566A',
            }}
          >
            {active ? onLabel : offLabel}
          </span>
        )}
      </div>
      <div>
        <h3 className="font-bold text-[#ECEFF4]">{label}</h3>
        <p className="text-sm text-[#D8DEE9]/60">{description}</p>
      </div>
    </button>
  );
}

export default function LittleTricks() {
  const { t } = useLanguage();
  const { gravityOn, toggleGravity, mouseTrailOn, toggleMouseTrail, rerollBackground } = useTricks();

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-3 text-[#ECEFF4]">
          {t.tricks.heading}
        </h2>
        <p className="text-center text-[#D8DEE9]/60 mb-12 max-w-xl mx-auto">
          {t.tricks.subheading}
        </p>
        <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <TrickCard
            icon="cursor"
            label={t.tricks.mouseTrail.label}
            description={t.tricks.mouseTrail.description}
            active={mouseTrailOn}
            onClick={toggleMouseTrail}
            onLabel={t.tricks.on}
            offLabel={t.tricks.off}
          />
          <TrickCard
            icon="gravity"
            label={t.tricks.gravity.label}
            description={t.tricks.gravity.description}
            active={gravityOn}
            onClick={toggleGravity}
            onLabel={t.tricks.on}
            offLabel={t.tricks.off}
          />
          <TrickCard
            icon="reroll"
            label={t.tricks.reroll.label}
            description={t.tricks.reroll.description}
            onClick={rerollBackground}
            isAction
          />
        </div>
      </div>
    </section>
  );
}
