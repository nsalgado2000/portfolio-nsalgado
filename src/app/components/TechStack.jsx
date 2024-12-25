export default function TechStack() {
    return (
  <section className="bg-[#3B4252] py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#ECEFF4]">
            Tecnologias que utilizo
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'JavaScript', 'HTML5', 'CSS3', 'Git'].map((tech) => (
              <div 
                key={tech}
                className="flex items-center justify-center p-4 bg-[#2E3440] rounded-lg shadow-lg hover:scale-105 transition-transform border border-[#4C566A] hover:border-[#88C0D0]"
              >
                <span className="font-mono text-[#D8DEE9]">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
