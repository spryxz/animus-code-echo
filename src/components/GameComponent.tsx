import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";

const GameComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameStarted, setGameStarted] = useState(false);
  
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

      // Spawn and draw enemies (suited figures)
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

    const handleClick = () => {
      bullets.push({ x: playerX, y: playerY });
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
        <canvas
          ref={canvasRef}
          width={800}
          height={400}
          className="w-full rounded-lg cursor-crosshair"
        />
      )}
    </Card>
  );
};

export default GameComponent;