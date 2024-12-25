'use client';

import { useEffect, useRef } from 'react';

const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas size to window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters
    const chars = '0123456789ABCDEF'.split('');
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    // Array for drops - one per column
    const drops = Array(Math.floor(columns)).fill(1);

    // Drawing the characters
    function draw() {
      // Black BG with opacity for fade effect
      ctx.fillStyle = 'rgba(46, 52, 64, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00FF41'; // Neon matrix green
      ctx.font = `${fontSize}px monospace`;

      // Loop over drops
      drops.forEach((y, i) => {
        // Random character
        const char = chars[Math.floor(Math.random() * chars.length)];
        
        // Draw character
        ctx.fillText(char, i * fontSize, y * fontSize);

        // Reset drop to top with random delay if it's at the bottom
        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        // Move drop
        drops[i]++;
      });
    }

    const interval = setInterval(draw, 33);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
};

export default MatrixRain; 