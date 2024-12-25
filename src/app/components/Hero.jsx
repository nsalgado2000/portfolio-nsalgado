import Link from 'next/link';

export default function Hero() {
  return (
    <section className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#4C566A]/20 to-transparent">
      <div className="text-center space-y-8 animate-fadeIn">
        <div className="relative">
        <h1 className="font-poppins text-7xl md:text-8xl font-bold bg-gradient-to-r from-[#88C0D0] via-[#81A1C1] to-[#5E81AC] text-transparent bg-clip-text animate-gradient py-3">
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
  );
}
