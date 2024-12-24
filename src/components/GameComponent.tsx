import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";

const GameComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let playerSanta = {
      x: canvas.width / 4,
      y: canvas.height / 2,
      size: 60,
      speed: 5,
      maxSpeed: 8,
      minSpeed: 3
    };

    const mines: Array<{x: number, y: number, size: number}> = [];
    const coins: Array<{x: number, y: number, size: number}> = [];
    
    // Input handling
    const keys: {[key: string]: boolean} = {};
    window.addEventListener('keydown', (e) => keys[e.key.toLowerCase()] = true);
    window.addEventListener('keyup', (e) => keys[e.key.toLowerCase()] = false);

    // Spawn objects
    const spawnMine = () => {
      if (mines.length < 5) {
        mines.push({
          x: canvas.width + 50,
          y: Math.random() * (canvas.height - 40),
          size: 30
        });
      }
    };

    const spawnCoin = () => {
      if (coins.length < 3) {
        coins.push({
          x: canvas.width + 50,
          y: Math.random() * (canvas.height - 20),
          size: 20
        });
      }
    };

    // Check collisions
    const checkCollisions = () => {
      // Check mine collisions
      mines.forEach((mine) => {
        const dx = playerSanta.x - mine.x;
        const dy = playerSanta.y - mine.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < (playerSanta.size/2 + mine.size/2)) {
          setGameOver(true);
        }
      });

      // Check coin collisions
      for (let i = coins.length - 1; i >= 0; i--) {
        const coin = coins[i];
        const dx = playerSanta.x - coin.x;
        const dy = playerSanta.y - coin.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < (playerSanta.size/2 + coin.size/2)) {
          coins.splice(i, 1);
          setScore(prev => prev + 10);
        }
      }
    };

    // Draw functions
    const drawSanta = (x: number, y: number, size: number) => {
      ctx.save();
      ctx.translate(x, y);
      
      // Draw Santa's body (red suit)
      ctx.fillStyle = '#ff0000';
      ctx.beginPath();
      ctx.ellipse(0, 0, size/2, size/3, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw Santa's hat
      ctx.fillStyle = '#ff0000';
      ctx.beginPath();
      ctx.moveTo(-size/3, -size/3);
      ctx.lineTo(0, -size/2);
      ctx.lineTo(size/3, -size/3);
      ctx.closePath();
      ctx.fill();
      
      // Draw hat's white trim and ball
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, -size/2, size/10, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(-size/3, -size/3, size/1.5, size/10);
      
      // Draw Santa's beard
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(size/6, 0, size/3, size/4, 0, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    };

    const drawMine = (x: number, y: number, size: number) => {
      ctx.fillStyle = '#4a5568';
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw spikes (icicles)
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(x + Math.cos(angle) * size, y + Math.sin(angle) * size);
        ctx.lineTo(x + Math.cos(angle) * (size + 10), y + Math.sin(angle) * (size + 10));
        ctx.strokeStyle = '#a0aec0';
        ctx.lineWidth = 3;
        ctx.stroke();
      }
    };

    const drawCoin = (x: number, y: number, size: number) => {
      // Gold coin with sparkle effect
      ctx.fillStyle = '#ffd700';
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffa700';
      ctx.lineWidth = 3;
      ctx.stroke();
      
      // Add sparkle
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(x - size/3, y - size/3, size/6, 0, Math.PI * 2);
      ctx.fill();
    };

    // Main game loop
    const animate = () => {
      if (!ctx || !canvas || gameOver) return;
      
      // Clear canvas with snowy effect
      ctx.fillStyle = 'rgba(16, 23, 42, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Handle player movement with WASD
      if (keys['w'] && playerSanta.y > playerSanta.size/2) {
        playerSanta.y -= playerSanta.speed;
      }
      if (keys['s'] && playerSanta.y < canvas.height - playerSanta.size/2) {
        playerSanta.y += playerSanta.speed;
      }
      
      // Handle speed control with A/D
      if (keys['a'] && playerSanta.speed > playerSanta.minSpeed) {
        playerSanta.speed -= 0.1;
      }
      if (keys['d'] && playerSanta.speed < playerSanta.maxSpeed) {
        playerSanta.speed += 0.1;
      }
      
      // Spawn objects
      if (Math.random() < 0.02) spawnMine();
      if (Math.random() < 0.03) spawnCoin();
      
      // Update and draw mines
      for (let i = mines.length - 1; i >= 0; i--) {
        mines[i].x -= 3;
        drawMine(mines[i].x, mines[i].y, mines[i].size);
        if (mines[i].x < -50) mines.splice(i, 1);
      }
      
      // Update and draw coins
      for (let i = coins.length - 1; i >= 0; i--) {
        coins[i].x -= 2;
        drawCoin(coins[i].x, coins[i].y, coins[i].size);
        if (coins[i].x < -50) coins.splice(i, 1);
      }
      
      // Draw player Santa
      drawSanta(playerSanta.x, playerSanta.y, playerSanta.size);
      
      // Check collisions
      checkCollisions();
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', (e) => keys[e.key] = true);
      window.removeEventListener('keyup', (e) => keys[e.key] = false);
    };
  }, [gameOver]);

  return (
    <Card className="glass-card p-4 border-red-500/20 bg-gradient-to-r from-red-500/10 to-green-500/10">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={800}
          height={400}
          className="w-full rounded-lg"
        />
        <div className="absolute top-4 left-4 text-xl font-bold text-green-400">
          Score: {score}
        </div>
        {gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-red-500 mb-4">Game Over!</h2>
              <p className="text-2xl text-white">Final Score: {score}</p>
              <button
                onClick={() => {
                  setGameOver(false);
                  setScore(0);
                }}
                className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default GameComponent;