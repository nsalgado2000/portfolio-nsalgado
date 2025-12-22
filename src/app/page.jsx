import Link from 'next/link';
import Hero from './components/Hero';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Contact from './components/Contact';
import MatrixRain from './components/MatrixRain';

export default function Home() {
  return (
    <main className="min-h-screen">
      <MatrixRain />
      <Hero />
      <TechStack />
      <Projects />
      <Contact />
    </main>
  );
}
