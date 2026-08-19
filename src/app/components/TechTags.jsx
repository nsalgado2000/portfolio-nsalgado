import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiSpringboot,
  SiFastapi,
  SiPython,
  SiJavascript,
  SiTypescript,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

const TECH_META = {
  'Next.js': { Icon: SiNextdotjs, color: '#ECEFF4' },
  React: { Icon: SiReact, color: '#61DAFB' },
  'Tailwind CSS': { Icon: SiTailwindcss, color: '#38BDF8' },
  Java: { Icon: FaJava, color: '#EBCB8B' },
  'Spring Boot': { Icon: SiSpringboot, color: '#A3BE8C' },
  FastAPI: { Icon: SiFastapi, color: '#A3BE8C' },
  Python: { Icon: SiPython, color: '#EBCB8B' },
  JavaScript: { Icon: SiJavascript, color: '#EBCB8B' },
  TypeScript: { Icon: SiTypescript, color: '#81A1C1' },
};

export default function TechTags({ stack }) {
  if (!stack || stack.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {stack.map((tech) => {
        const meta = TECH_META[tech];
        const Icon = meta?.Icon;
        const color = meta?.color ?? '#D8DEE9';

        return (
          <span
            key={tech}
            className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-semibold transition-colors"
            style={{
              fontFamily: 'var(--font-jetbrains-mono)',
              color,
              borderColor: `${color}40`,
              backgroundColor: `${color}14`,
            }}
          >
            {Icon && <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
            {tech}
          </span>
        );
      })}
    </div>
  );
}
