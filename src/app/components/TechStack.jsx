const technologies = {
  'Java': {
    usage: 'Building RESTful APIs, microservices architecture, and enterprise backend systems with Spring Boot.',
    category: 'Backend'
  },
  'Spring Boot': {
    usage: 'Building production-ready backends with security, DI, and database integration.',
    category: 'Backend'
  },
  'React': {
    usage: 'Creating interactive user interfaces, reusable components, state management, and single-page applications.',
    category: 'Frontend'
  },
  'Next.js': {
    usage: 'Building full-stack applications with SSR, API routes, optimized performance, and production-ready React applications.',
    category: 'Frontend'
  },
  'FastAPI': {
    usage: 'Developing high-performance REST APIs, async endpoints, automatic API documentation, and Python backend services.',
    category: 'Backend'
  },
  'Python': {
    usage: 'Backend development, API creation with FastAPI, data processing, automation scripts, and server-side logic.',
    category: 'Backend'
  },
  'JavaScript': {
    usage: 'Frontend interactivity, DOM manipulation, async operations, and building dynamic web applications.',
    category: 'Language'
  },
  'Tailwind CSS': {
    usage: 'Building responsive, consistent UIs quickly with utility-first styling and design systems.',
    category: 'Frontend'
  },
};

export default function TechStack() {
    return (
  <section className="bg-[#3B4252] py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#ECEFF4]">
            Technologies I Work With
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {Object.entries(technologies).map(([tech, info]) => (
              <div 
                key={tech}
                className="group relative"
              >
                <div className="p-5 bg-[#2E3440] rounded-lg shadow-lg transition-all duration-500 ease-out border border-[#4C566A] hover:border-[#88C0D0] cursor-pointer overflow-hidden group-hover:scale-110 group-hover:z-20 group-hover:shadow-2xl min-h-[100px] group-hover:min-h-[280px]">
                  <div className="flex items-center justify-center min-h-[100px] group-hover:absolute group-hover:opacity-0 group-hover:pointer-events-none transition-all duration-300">
                    <h3 className="font-mono text-lg font-bold text-[#ECEFF4]">{tech}</h3>
                  </div>
                  <div className="absolute inset-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none group-hover:pointer-events-auto">
                    <div className="h-full flex flex-col">
                      <div className="mb-3">
                        <h3 className="font-mono text-lg font-bold text-[#ECEFF4] mb-1">{tech}</h3>
                        <span className="text-xs text-[#88C0D0] font-medium">{info.category}</span>
                      </div>
                      <p className="text-sm text-[#D8DEE9]/80 leading-relaxed">
                        {info.usage}
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
