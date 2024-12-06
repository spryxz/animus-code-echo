import { useEffect } from "react";

const ChristmasBackground = () => {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.className = "fixed inset-0 z-0 pointer-events-none";
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const snowflakes: { x: number; y: number; size: number; speed: number }[] = [];
    
    for (let i = 0; i < 100; i++) {
      snowflakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 4 + 2,
        speed: Math.random() * 2 + 1
      });
    }

    function drawSnowflakes() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#fff";
      
      snowflakes.forEach(flake => {
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
        ctx.fill();
        
        flake.y += flake.speed;
        if (flake.y > canvas.height) {
          flake.y = -10;
          flake.x = Math.random() * canvas.width;
        }
      });
      
      requestAnimationFrame(drawSnowflakes);
    }

    drawSnowflakes();

    return () => {
      document.body.removeChild(canvas);
    };
  }, []);

  return null;
};

export default ChristmasBackground;