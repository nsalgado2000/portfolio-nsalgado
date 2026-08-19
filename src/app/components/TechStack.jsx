'use client';

import { useLanguage } from '../context/LanguageContext';

const technologies = {
  Java: { category: 'Backend' },
  'Spring Boot': { category: 'Backend' },
  React: { category: 'Frontend' },
  'Next.js': { category: 'Frontend' },
  FastAPI: { category: 'Backend' },
  Python: { category: 'Backend' },
  JavaScript: { category: 'Language' },
  'Tailwind CSS': { category: 'Frontend' },
};

export default function TechStack() {
  const { t } = useLanguage();

  return (
    <section className="bg-[#3B4252] py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#ECEFF4]">
          {t.techStack.heading}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {Object.entries(technologies).map(([tech, info]) => (
            <div
              key={tech}
              className="js-gravity group relative"
            >
              <div className="p-5 bg-[#2E3440] rounded-lg shadow-lg transition-all duration-500 ease-out border border-[#4C566A] hover:border-[#88C0D0] cursor-pointer overflow-hidden group-hover:scale-110 group-hover:z-20 group-hover:shadow-2xl min-h-[100px] group-hover:min-h-[280px]">
                <div className="flex items-center justify-center min-h-[100px] group-hover:absolute group-hover:opacity-0 group-hover:pointer-events-none transition-all duration-300">
                  <h3 className="font-mono text-lg font-bold text-[#ECEFF4]">{tech}</h3>
                </div>
                <div className="absolute inset-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none group-hover:pointer-events-auto">
                  <div className="h-full flex flex-col">
                    <div className="mb-3">
                      <h3 className="font-mono text-lg font-bold text-[#ECEFF4] mb-1">{tech}</h3>
                      <span className="text-xs text-[#88C0D0] font-medium">
                        {t.techStack.categories[info.category]}
                      </span>
                    </div>
                    <p className="text-sm text-[#D8DEE9]/80 leading-relaxed">
                      {t.techStack.usage[tech]}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
