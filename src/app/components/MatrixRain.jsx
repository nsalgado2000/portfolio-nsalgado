'use client';

import { useEffect, useRef } from 'react';

const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    ctx.fillStyle = '#2E3440';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    window.addEventListener('resize', resizeCanvas);

    const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
    let particles = [];
    let orbitCenters = [];

    const PALETTES = [
      ['#88C0D0', '#81A1C1'],
      ['#A3BE8C', '#8FBCBB'],
      ['#B48EAD', '#81A1C1'],
      ['#EBCB8B', '#D08770'],
      ['#BF616A', '#B48EAD'],
    ];
    const PATTERNS = ['constellation', 'rain', 'orbits', 'waves'];
    let palette = PALETTES[0];
    let pattern = PATTERNS[0];

    class Particle {
      constructor() {
        this.color = Math.random() > 0.5 ? palette[0] : palette[1];

        if (pattern === 'rain') {
          this.size = Math.random() * 1.0 + 1.0;
          this.opacity = Math.random() * 0.3 + 0.45;
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.speedX = (Math.random() - 0.5) * 0.3;
          this.speedY = Math.random() * 1.8 + 0.6;
        } else if (pattern === 'orbits') {
          this.size = Math.random() * 1.2 + 0.9;
          this.opacity = Math.random() * 0.3 + 0.4;
          const center =
            orbitCenters[Math.floor(Math.random() * orbitCenters.length)];
          this.center = center;
          this.angle = Math.random() * Math.PI * 2;
          this.radius = Math.random() * 180 + 40;
          this.orbitSpeed = ((Math.random() - 0.5) * 0.02 + 0.005) *
            (Math.random() > 0.5 ? 1 : -1);
          this.x = center.x + Math.cos(this.angle) * this.radius;
          this.y = center.y + Math.sin(this.angle) * this.radius;
        } else if (pattern === 'waves') {
          this.size = Math.random() * 1.4 + 1.1;
          this.opacity = Math.random() * 0.3 + 0.45;
          this.x = Math.random() * canvas.width;
          this.baseY = Math.random() * canvas.height;
          this.y = this.baseY;
          this.speedX = 0.5 + Math.random() * 1.2;
          this.amplitude = Math.random() * 24 + 8;
          this.frequency = 0.005 + Math.random() * 0.01;
          this.phase = Math.random() * Math.PI * 2;
        } else {
          this.size = Math.random() * 0.6 + 0.3;
          this.opacity = Math.random() * 0.3 + 0.1;
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.speedX = (Math.random() - 0.5) * 2.5;
          this.speedY = (Math.random() - 0.5) * 2.5;
        }
      }

      update() {
        if (pattern === 'rain') {
          this.x += this.speedX;
          this.y += this.speedY;
          if (this.y > canvas.height + 4) {
            this.y = -4;
            this.x = Math.random() * canvas.width;
          }
          if (this.x < 0) this.x = canvas.width;
          if (this.x > canvas.width) this.x = 0;
        } else if (pattern === 'orbits') {
          this.angle += this.orbitSpeed;
          this.x = this.center.x + Math.cos(this.angle) * this.radius;
          this.y = this.center.y + Math.sin(this.angle) * this.radius;
        } else if (pattern === 'waves') {
          this.x += this.speedX;
          if (this.x > canvas.width + 20) this.x = -20;
          this.y = this.baseY + Math.sin(this.phase + this.x * this.frequency) * this.amplitude;
        } else {
          this.x += this.speedX;
          this.y += this.speedY;
          if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
          if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    function initializeOrbitCenters() {
      orbitCenters = [];
      const count = 2 + Math.floor(Math.random() * 3);
      for (let i = 0; i < count; i++) {
        orbitCenters.push({
          x: canvas.width * (0.2 + Math.random() * 0.6),
          y: canvas.height * (0.2 + Math.random() * 0.6),
        });
      }
    }

    function initializeParticles() {
      if (pattern === 'orbits') initializeOrbitCenters();
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    initializeParticles();

    function draw() {
      ctx.fillStyle = 'rgba(46, 52, 64, 0.02)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      if (pattern === 'constellation') {
        particles.forEach((particle, i) => {
          particles.slice(i + 1).forEach((otherParticle) => {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
              ctx.beginPath();
              ctx.strokeStyle = particle.color;
              ctx.globalAlpha = (1 - distance / 120) * 0.15;
              ctx.lineWidth = 0.5;
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
              ctx.globalAlpha = 1;
            }
          });
        });
      }
    }

    draw();
    const interval = setInterval(draw, 50);
    const resetInterval = setInterval(() => {
      ctx.fillStyle = '#2E3440';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      initializeParticles();
    }, 30000);

    const handleReroll = () => {
      let nextPalette = PALETTES[Math.floor(Math.random() * PALETTES.length)];
      if (nextPalette === palette) {
        nextPalette =
          PALETTES[(PALETTES.indexOf(nextPalette) + 1) % PALETTES.length];
      }
      let nextPattern = PATTERNS[Math.floor(Math.random() * PATTERNS.length)];
      if (nextPattern === pattern) {
        nextPattern =
          PATTERNS[(PATTERNS.indexOf(nextPattern) + 1) % PATTERNS.length];
      }
      palette = nextPalette;
      pattern = nextPattern;
      ctx.fillStyle = '#2E3440';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      initializeParticles();
    };
    window.addEventListener('reroll-background', handleReroll);

    return () => {
      clearInterval(interval);
      clearInterval(resetInterval);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('reroll-background', handleReroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 bg-[#2E3440]"
    />
  );
};

export default MatrixRain;
