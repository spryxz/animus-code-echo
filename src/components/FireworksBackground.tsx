import { useEffect } from "react";

const FireworksBackground = () => {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.className = "fixed inset-0 z-0 pointer-events-none";
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fireworks: {
      x: number;
      y: number;
      targetY: number;
      particles: { x: number; y: number; vx: number; vy: number; alpha: number; color: string }[];
      state: 'launching' | 'exploding';
    }[] = [];

    const colors = ['#F97316', '#0EA5E9', '#FFFFFF', '#22C55E', '#D946EF'];

    function createFirework() {
      const x = Math.random() * canvas.width;
      const y = canvas.height;
      const targetY = Math.random() * (canvas.height * 0.5);
      
      fireworks.push({
        x,
        y,
        targetY,
        particles: [],
        state: 'launching'
      });
    }

    function createParticles(x: number, y: number) {
      const particles = [];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      for (let i = 0; i < 50; i++) {
        const angle = (Math.PI * 2 * i) / 50;
        const speed = Math.random() * 5 + 2;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color
        });
      }
      return particles;
    }

    function animate() {
      if (!ctx) return;
      ctx.fillStyle = 'rgba(15, 23, 42, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create new fireworks randomly
      if (Math.random() < 0.05) {
        createFirework();
      }

      // Update and draw fireworks
      for (let i = fireworks.length - 1; i >= 0; i--) {
        const fw = fireworks[i];

        if (fw.state === 'launching') {
          // Draw launching firework
          ctx.beginPath();
          ctx.arc(fw.x, fw.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();

          // Move upward
          fw.y -= 5;

          // Check if reached target
          if (fw.y <= fw.targetY) {
            fw.particles = createParticles(fw.x, fw.y);
            fw.state = 'exploding';
          }
        } else {
          // Update and draw particles
          for (let j = fw.particles.length - 1; j >= 0; j--) {
            const p = fw.particles[j];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1; // gravity
            p.alpha -= 0.02;

            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
            ctx.fill();

            // Remove faded particles
            if (p.alpha <= 0) {
              fw.particles.splice(j, 1);
            }
          }

          // Remove firework if all particles are gone
          if (fw.particles.length === 0) {
            fireworks.splice(i, 1);
          }
        }
      }

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      document.body.removeChild(canvas);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return null;
};

export default FireworksBackground;