const STATUS_STYLES = {
  done: {
    label: 'DONE',
    className: 'text-[#A3BE8C] border-[#A3BE8C]/40 bg-[#A3BE8C]/10',
    dot: 'bg-[#A3BE8C]',
  },
  'in-progress': {
    label: 'IN PROGRESS',
    className: 'text-[#EBCB8B] border-[#EBCB8B]/40 bg-[#EBCB8B]/10',
    dot: 'bg-[#EBCB8B] animate-pulse',
  },
};

const AUTHORSHIP_STYLES = {
  solo: {
    label: '100% MINE',
    className: 'text-[#88C0D0] border-[#88C0D0]/40 bg-[#88C0D0]/10',
    dot: 'bg-[#88C0D0]',
  },
  contributor: {
    label: 'WORKED IN',
    className: 'text-[#B48EAD] border-[#B48EAD]/40 bg-[#B48EAD]/10',
    dot: 'bg-[#B48EAD]',
  },
};

function Badge({ label, className, dot }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold tracking-wide backdrop-blur-sm ${className}`}
      style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} aria-hidden="true" />
      {label}
    </span>
  );
}

export default function ProjectBadges({ status, authorship }) {
  const statusStyle = STATUS_STYLES[status];
  const authorshipStyle = AUTHORSHIP_STYLES[authorship];

  if (!statusStyle && !authorshipStyle) return null;

  return (
    <div className="absolute top-3 right-3 z-10 flex flex-wrap justify-end gap-2">
      {statusStyle && <Badge {...statusStyle} />}
      {authorshipStyle && <Badge {...authorshipStyle} />}
    </div>
  );
}
