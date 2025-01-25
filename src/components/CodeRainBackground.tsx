import React, { useEffect, useRef } from 'react';

const CodeRainBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix code characters
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = new Array(columns).fill(1);

    ctx.font = `${fontSize}px monospace`;

    const draw = () => {
      // Increased opacity to make the fade effect slower
      ctx.fillStyle = 'rgba(15, 23, 42, 0.05)'; // Reduced from 0.1 to 0.05 for slower fade
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0EA5E9'; // Sky blue color for the characters
      
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reduced probability of resetting drops and slowed down the falling speed
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.99) { // Increased from 0.975 to 0.99
          drops[i] = 0;
        }
        // Slow down the falling speed by adding a delay
        if (Math.random() > 0.1) { // Only increment 90% of the time
          drops[i] += 0.5; // Reduced from 1 to 0.5 for slower falling
        }
      }
    };

    const animate = () => {
      draw();
      setTimeout(() => {
        requestAnimationFrame(animate);
      }, 50); // Added a 50ms delay between frames
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};

export default CodeRainBackground;