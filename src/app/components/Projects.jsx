import Link from 'next/link';

export default function Projects() {
    return (
        <section id="projects" className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#ECEFF4]">
          Featured Projects
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((project) => (
            <div 
              key={project}
              className="bg-[#3B4252] rounded-xl overflow-hidden hover:shadow-xl transition-all hover:scale-105 border border-[#4C566A] hover:border-[#88C0D0]"
            >
              <div className="aspect-video bg-[#4C566A]"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-[#ECEFF4]">Project {project}</h3>
                <p className="text-[#D8DEE9]/80 mb-4">
                  Brief description of the project and technologies used.
                </p>
                <Link 
                  href="#"
                  className="text-[#88C0D0] hover:text-[#81A1C1] font-medium inline-flex items-center"
                >
                  View more <span className="ml-1">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
}