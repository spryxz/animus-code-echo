import { useEffect } from "react";

const ChristmasBackground = () => {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.className = "fixed inset-0 z-0 pointer-events-none";
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const snowflakes: { x: number; y: number; size: number; speed: number; opacity: number }[] = [];
    
    for (let i = 0; i < 150; i++) {
      snowflakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.5 + 0.3
      });
    }

    function drawSnowflakes() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      snowflakes.forEach(flake => {
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
        ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
        ctx.fill();
        
        flake.y += flake.speed;
        flake.x += Math.sin(flake.y * 0.01) * 0.5;
        
        if (flake.y > canvas.height) {
          flake.y = -10;
          flake.x = Math.random() * canvas.width;
        }
      });
      
      requestAnimationFrame(drawSnowflakes);
    }

    drawSnowflakes();

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

export default ChristmasBackground;