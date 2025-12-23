import Link from 'next/link';
import Image from 'next/image';

const projects = [
  {
    id: 1,
    title: 'Wella Professionals Landing Page',
    description: 'Professional landing page for Wella Professionals educator, featuring service showcases, portfolio gallery, and client testimonials. Built with Next.js and modern web technologies.',
    link: 'https://gisele-landing-page-next.vercel.app/',
    image: '/project-1.png',
  },
  {
    id: 2,
    title: 'Project 2',
    description: 'Brief description of the project and technologies used.',
    link: '#',
  },
  {
    id: 3,
    title: 'Project 3',
    description: 'Brief description of the project and technologies used.',
    link: '#',
  },
];

export default function Projects() {
    return (
        <section id="projects" className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#ECEFF4]">
          Featured Projects
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="bg-[#3B4252] rounded-xl overflow-hidden hover:shadow-xl transition-all hover:scale-105 border border-[#4C566A] hover:border-[#88C0D0]"
            >
              {project.image ? (
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-video bg-[#4C566A]"></div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-[#ECEFF4]">{project.title}</h3>
                <p className="text-[#D8DEE9]/80 mb-4">
                  {project.description}
                </p>
                <Link 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
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