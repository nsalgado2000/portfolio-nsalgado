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
    const PATTERNS = ['constellation', 'orbits', 'matrix'];
    const MATRIX_FONT_SIZE = 16;
    const MATRIX_CHARS =
      'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF';
    let matrixColumns = [];
    let palette = PALETTES[0];
    let pattern = PATTERNS[0];

    const hexToRgba = (hex, a) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${a})`;
    };

    class Particle {
      constructor() {
        this.color = Math.random() > 0.5 ? palette[0] : palette[1];

        if (pattern === 'orbits') {
          this.size = 0.9 + Math.random() * 1.2;
          this.opacity = 0.5 + Math.random() * 0.25;
          const center =
            orbitCenters[Math.floor(Math.random() * orbitCenters.length)];
          this.center = center;
          this.angle = Math.random() * Math.PI * 2;
          this.radius = 40 + Math.random() * 220;
          const dir = Math.random() > 0.5 ? 1 : -1;
          this.orbitSpeed = (0.003 + Math.random() * 0.009) * dir;
          this.trail = [];
          this.trailMax = 10 + Math.floor(Math.random() * 8);
          this.x = center.x + Math.cos(this.angle) * this.radius;
          this.y = center.y + Math.sin(this.angle) * this.radius;
        } else {
          this.size = 0.3 + Math.random() * 0.6;
          this.opacity = 0.1 + Math.random() * 0.3;
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.speedX = (Math.random() - 0.5) * 2.5;
          this.speedY = (Math.random() - 0.5) * 2.5;
        }
      }

      update() {
        if (pattern === 'orbits') {
          this.trail.push({ x: this.x, y: this.y });
          if (this.trail.length > this.trailMax) this.trail.shift();
          this.angle += this.orbitSpeed;
          this.x = this.center.x + Math.cos(this.angle) * this.radius;
          this.y = this.center.y + Math.sin(this.angle) * this.radius;
        } else {
          this.x += this.speedX;
          this.y += this.speedY;
          if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
          if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
      }

      draw() {
        if (pattern === 'orbits') {
          for (let i = 1; i < this.trail.length; i++) {
            const a = (i / this.trail.length) * this.opacity * 0.55;
            ctx.strokeStyle = hexToRgba(this.color, a);
            ctx.lineWidth = this.size * 0.6;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(this.trail[i - 1].x, this.trail[i - 1].y);
            ctx.lineTo(this.trail[i].x, this.trail[i].y);
            ctx.stroke();
          }
          ctx.fillStyle = hexToRgba(this.color, this.opacity);
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.globalAlpha = this.opacity;
          ctx.fill();
          ctx.globalAlpha = 1;
        }
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

    function initializeMatrixColumns() {
      matrixColumns = [];
      const cols = Math.floor(canvas.width / MATRIX_FONT_SIZE);
      for (let i = 0; i < cols; i++) {
        matrixColumns.push({
          x: i * MATRIX_FONT_SIZE,
          y: (Math.random() - 0.5) * canvas.height * 2,
          speed: 0.6 + Math.random() * 2.5,
          char: MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)],
          changeIn: 3 + Math.floor(Math.random() * 12),
        });
      }
    }

    function initializeParticles() {
      if (pattern === 'orbits') initializeOrbitCenters();
      if (pattern === 'matrix') {
        initializeMatrixColumns();
        particles = [];
        return;
      }
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    initializeParticles();

    function drawOrbitGlows() {
      orbitCenters.forEach((c) => {
        const grad = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, 120);
        grad.addColorStop(0, hexToRgba(palette[0], 0.12));
        grad.addColorStop(0.6, hexToRgba(palette[1], 0.05));
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(c.x, c.y, 120, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function drawMatrix() {
      ctx.font = `bold ${MATRIX_FONT_SIZE}px monospace`;
      ctx.textBaseline = 'top';
      matrixColumns.forEach((col) => {
        const drawY = Math.floor(col.y / MATRIX_FONT_SIZE) * MATRIX_FONT_SIZE;
        ctx.fillStyle = hexToRgba(palette[0], 0.7);
        ctx.fillText(col.char, col.x, drawY - MATRIX_FONT_SIZE);
        ctx.fillStyle = hexToRgba('#ECEFF4', 0.92);
        ctx.fillText(col.char, col.x, drawY);

        col.y += col.speed;
        col.changeIn -= 1;
        if (col.changeIn <= 0) {
          col.char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
          col.changeIn = 3 + Math.floor(Math.random() * 12);
        }
        if (col.y > canvas.height + 20 && Math.random() > 0.975) {
          col.y = -MATRIX_FONT_SIZE * (5 + Math.random() * 40);
          col.speed = 0.6 + Math.random() * 2.5;
        }
      });
    }

    function drawConstellationLines() {
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

    const fadeAlphaByPattern = {
      constellation: 0.02,
      orbits: 0.08,
      matrix: 0.07,
    };

    function draw() {
      const fadeA = fadeAlphaByPattern[pattern] || 0.02;
      ctx.fillStyle = `rgba(46, 52, 64, ${fadeA})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (pattern === 'matrix') {
        drawMatrix();
        return;
      }

      if (pattern === 'orbits') drawOrbitGlows();

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      if (pattern === 'constellation') drawConstellationLines();
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
