import Link from 'next/link';

export default function Hero() {
  return (
    <section className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-screen">
      <div className="relative">
        <div className="absolute inset-0 bg-[#2E3440]/40 backdrop-blur-sm rounded-lg -z-10"></div>
        <div className="text-center space-y-8 animate-fadeIn p-12">
          <div className="relative overflow-visible">
            <h1 className="font-poppins text-8xl md:text-9xl font-bold py-3 leading-tight overflow-visible">
              <span 
                className="inline-block bg-gradient-to-r from-[#88C0D0] via-[#81A1C1] to-[#5E81AC] animate-gradient pb-2"
                style={{ 
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent',
                  lineHeight: '1.1'
                }}
              >
                Nicolas Salgado
              </span>
            </h1>
            <div className="absolute -inset-1 blur-2xl bg-gradient-to-r from-[#88C0D0]/20 to-[#81A1C1]/20 -z-10"></div>
          </div>
          <p className="text-3xl md:text-4xl text-[#ECEFF4]/80 font-light">
            Frontend Developer
          </p>
          <p className="max-w-2xl mx-auto text-xl text-[#D8DEE9]/60 leading-relaxed">
            Transformando ideias em experiências digitais excepcionais através de código limpo e design intuitivo.
          </p>
          <div className="flex gap-6 justify-center mt-12">
            <Link 
              href="#projetos"
              className="group px-10 py-5 bg-[#88C0D0] text-[#2E3440] rounded-full hover:bg-[#81A1C1] transition-all hover:scale-105 shadow-lg hover:shadow-[#88C0D0]/25 text-lg font-medium"
            >
              Ver Projetos
              <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link 
              href="#contato"
              className="group px-10 py-5 border-2 border-[#88C0D0] text-[#88C0D0] rounded-full hover:bg-[#88C0D0] hover:text-[#2E3440] transition-all hover:scale-105 text-lg font-medium"
            >
              Contato
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
