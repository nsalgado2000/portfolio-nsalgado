import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#2E3440]">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#4C566A]/20 to-transparent">
        <div className="text-center space-y-8 animate-fadeIn">
          <div className="relative">
            <h1 className="font-poppins text-7xl md:text-8xl font-bold bg-gradient-to-r from-[#88C0D0] via-[#81A1C1] to-[#5E81AC] text-transparent bg-clip-text animate-gradient">
              NSalgado
            </h1>
            <div className="absolute -inset-1 blur-2xl bg-gradient-to-r from-[#88C0D0]/20 to-[#81A1C1]/20 -z-10"></div>
          </div>
          <p className="text-2xl md:text-3xl text-[#ECEFF4]/80 font-light">
            Frontend Developer
          </p>
          <p className="max-w-2xl mx-auto text-lg text-[#D8DEE9]/60 leading-relaxed">
            Transformando ideias em experiências digitais excepcionais através de código limpo e design intuitivo.
          </p>
          <div className="flex gap-6 justify-center mt-12">
            <Link 
              href="#projetos"
              className="group px-8 py-4 bg-[#88C0D0] text-[#2E3440] rounded-full hover:bg-[#81A1C1] transition-all hover:scale-105 shadow-lg hover:shadow-[#88C0D0]/25"
            >
              Ver Projetos
              <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link 
              href="#contato"
              className="group px-8 py-4 border-2 border-[#88C0D0] text-[#88C0D0] rounded-full hover:bg-[#88C0D0] hover:text-[#2E3440] transition-all hover:scale-105"
            >
              Contato
            </Link>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
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

      {/* Projects Section */}
      <section id="projetos" className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#ECEFF4]">
          Projetos em Destaque
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((project) => (
            <div 
              key={project}
              className="bg-[#3B4252] rounded-xl overflow-hidden hover:shadow-xl transition-all hover:scale-105 border border-[#4C566A] hover:border-[#88C0D0]"
            >
              <div className="aspect-video bg-[#4C566A]"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-[#ECEFF4]">Projeto {project}</h3>
                <p className="text-[#D8DEE9]/80 mb-4">
                  Descrição breve do projeto e tecnologias utilizadas.
                </p>
                <Link 
                  href="#"
                  className="text-[#88C0D0] hover:text-[#81A1C1] font-medium inline-flex items-center"
                >
                  Ver mais <span className="ml-1">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="bg-[#3B4252] py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-[#ECEFF4]">Vamos Conversar?</h2>
          <p className="text-[#D8DEE9]/80 mb-8 max-w-2xl mx-auto">
            Estou sempre interessado em novos projetos e oportunidades de colaboração.
          </p>
          <div className="flex gap-8 justify-center">
            {['GitHub', 'LinkedIn', 'Email'].map((platform) => (
              <a 
                key={platform}
                href="#"
                className="px-6 py-3 rounded-lg bg-[#2E3440] text-[#D8DEE9] hover:text-[#88C0D0] transition-colors border border-[#4C566A] hover:border-[#88C0D0]"
              >
                {platform}
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
