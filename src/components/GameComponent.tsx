import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";

const GameComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const effectsContainerRef = useRef<HTMLDivElement>(null);
  const [gameStarted, setGameStarted] = useState(false);
  
  const createMuzzleFlash = (x: number, y: number) => {
    if (!effectsContainerRef.current) return;
    
    const flash = document.createElement('div');
    flash.className = 'muzzle-flash';
    flash.style.position = 'absolute';
    flash.style.left = `${x}px`;
    flash.style.top = `${y}px`;
    flash.style.width = '30px';
    flash.style.height = '30px';
    effectsContainerRef.current.appendChild(flash);
    
    setTimeout(() => flash.remove(), 100);
  };

  const createSparks = (x: number, y: number) => {
    if (!effectsContainerRef.current) return;
    
    for (let i = 0; i < 8; i++) {
      const spark = document.createElement('div');
      spark.className = 'spark';
      spark.style.left = `${x}px`;
      spark.style.top = `${y}px`;
      spark.style.setProperty('--spark-travel-x', `${(Math.random() - 0.5) * 100}px`);
      spark.style.setProperty('--spark-travel-y', `${(Math.random() - 0.5) * 100}px`);
      effectsContainerRef.current.appendChild(spark);
      
      setTimeout(() => spark.remove(), 500);
    }
  };

  const createBulletTrail = (startX: number, startY: number, endX: number, endY: number) => {
    if (!effectsContainerRef.current) return;
    
    const trail = document.createElement('div');
    trail.className = 'bullet-trail';
    trail.style.position = 'absolute';
    trail.style.left = `${startX}px`;
    trail.style.top = `${startY}px`;
    
    const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    const angle = Math.atan2(endY - startY, endX - startX);
    
    trail.style.width = `${length}px`;
    trail.style.transform = `rotate(${angle}rad)`;
    
    effectsContainerRef.current.appendChild(trail);
    setTimeout(() => trail.remove(), 100);
  };
  
  const startGame = () => {
    setGameStarted(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Game state
    let playerX = 50;
    let playerY = canvas.height / 2;
    const bullets: { x: number; y: number }[] = [];
    const enemies: { x: number; y: number }[] = [];
    let score = 0;

    // Game loop
    const gameLoop = () => {
      if (!ctx || !canvas) return;

      // Clear canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw player (masked figure)
      ctx.fillStyle = '#000000';
      ctx.fillRect(playerX - 15, playerY - 15, 30, 30);
      
      // Draw bullets
      ctx.fillStyle = '#ff0000';
      bullets.forEach((bullet, index) => {
        bullet.x += 5;
        ctx.fillRect(bullet.x, bullet.y, 5, 2);
        if (bullet.x > canvas.width) bullets.splice(index, 1);
      });

      // Spawn and draw enemies
      if (Math.random() < 0.02) {
        enemies.push({
          x: canvas.width,
          y: Math.random() * canvas.height
        });
      }

      ctx.fillStyle = '#666666';
      enemies.forEach((enemy, index) => {
        enemy.x -= 2;
        ctx.fillRect(enemy.x - 10, enemy.y - 20, 20, 40);
        
        // Check bullet collisions
        bullets.forEach((bullet, bulletIndex) => {
          if (
            bullet.x > enemy.x - 10 &&
            bullet.x < enemy.x + 10 &&
            bullet.y > enemy.y - 20 &&
            bullet.y < enemy.y + 20
          ) {
            enemies.splice(index, 1);
            bullets.splice(bulletIndex, 1);
            score += 100;
            createSparks(enemy.x, enemy.y);
          }
        });

        if (enemy.x < 0) enemies.splice(index, 1);
      });

      // Draw score
      ctx.fillStyle = '#ffffff';
      ctx.font = '20px Arial';
      ctx.fillText(`Score: ${score}`, 10, 30);

      requestAnimationFrame(gameLoop);
    };

    // Event listeners
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      playerY = e.clientY - rect.top;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      
      bullets.push({ x: playerX, y: playerY });
      createMuzzleFlash(playerX + 15, playerY);
      createBulletTrail(playerX + 15, playerY, clickX, clickY);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);
    
    // Start game loop
    gameLoop();

    // Cleanup
    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
    };
  };

  return (
    <Card className="glass-card p-4 border-red-500/20 bg-gradient-to-r from-red-500/10 to-green-500/10">
      {!gameStarted ? (
        <div className="flex flex-col items-center justify-center p-8 space-y-4">
          <h3 className="text-2xl font-bold text-red-400">Luigi's Target Practice</h3>
          <p className="text-center text-green-300">
            Move your mouse to aim, click to shoot. Take down the suited figures!
          </p>
          <button
            onClick={startGame}
            className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors"
          >
            Start Game
          </button>
        </div>
      ) : (
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={800}
            height={400}
            className="w-full rounded-lg cursor-crosshair"
          />
          <div
            ref={effectsContainerRef}
            className="absolute inset-0 pointer-events-none overflow-hidden"
          />
        </div>
      )}
    </Card>
  );
};

export default GameComponent;