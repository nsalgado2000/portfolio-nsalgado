'use client';

import Link from 'next/link';
import Image from 'next/image';
import ProjectBadges from './ProjectBadges';
import TechTags from './TechTags';
import { useLanguage } from '../context/LanguageContext';

const projects = [
  {
    id: 1,
    title: 'Wella Professionals Landing Page',
    link: 'https://gisele-landing-page-next.vercel.app/',
    image: '/project-1.png',
    status: 'done',
    authorship: 'solo',
    stack: ['Next.js', 'React', 'Tailwind CSS'],
  },
  {
    id: 2,
    title: 'Condway/Autosíndico',
    link: 'https://www.condway.io',
    image: '/project-2.png',
    status: 'in-progress',
    authorship: 'contributor',
    stack: ['Next.js', 'React', 'Tailwind CSS', 'Spring Boot', 'PostgreSQL', 'AWS', 'Docker'],
  },
  // {
  //   id: 3,
  //   title: 'Project 3',
  //   link: '#',
  // },
];

export default function Projects() {
    const { t } = useLanguage();
    return (
        <section id="projects" className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#ECEFF4]">
          {t.projects.heading}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="js-gravity group bg-[#3B4252] rounded-xl overflow-hidden hover:shadow-xl transition-all hover:scale-105 border border-[#4C566A] hover:border-[#88C0D0] block cursor-pointer"
            >
              {project.image ? (
                <div className="aspect-video relative overflow-hidden">
                  <ProjectBadges status={project.status} authorship={project.authorship} />
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-video relative bg-[#4C566A]">
                  <ProjectBadges status={project.status} authorship={project.authorship} />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-[#ECEFF4]">{project.title}</h3>
                <p className="text-[#D8DEE9]/80 mb-4">
                  {t.projects.items[project.id].description}
                </p>
                <TechTags stack={project.stack} />
                <span className="text-[#88C0D0] group-hover:text-[#81A1C1] font-medium inline-flex items-center">
                  {t.projects.viewMore}
                  <svg
                    className="h-4 w-4 ml-1.5 transition-transform group-hover:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M4 12h16M14 6l6 6-6 6" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    );
}