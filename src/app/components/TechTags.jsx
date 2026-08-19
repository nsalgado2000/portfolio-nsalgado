import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiSpringboot,
  SiFastapi,
  SiPython,
  SiJavascript,
  SiTypescript,
  SiPostgresql,
  SiDocker,
} from 'react-icons/si';
import { FaJava, FaAws } from 'react-icons/fa';

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
  PostgreSQL: { Icon: SiPostgresql, color: '#88C0D0' },
  AWS: { Icon: FaAws, color: '#EBCB8B' },
  Docker: { Icon: SiDocker, color: '#81A1C1' },
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
            className="inline-flex items-center gap-2 rounded-md border py-1 pl-1 pr-3 text-xs font-bold transition-transform hover:scale-105"
            style={{
              fontFamily: 'var(--font-jetbrains-mono)',
              borderColor: `${color}50`,
              backgroundColor: '#2E3440',
            }}
          >
            {Icon && (
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded"
                style={{ backgroundColor: color }}
              >
                <Icon className="h-3.5 w-3.5" style={{ color: '#2E3440' }} aria-hidden="true" />
              </span>
            )}
            <span style={{ color: '#ECEFF4' }}>{tech}</span>
          </span>
        );
      })}
    </div>
  );
}
