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
    let playerWhale = {
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
        const dx = playerWhale.x - mine.x;
        const dy = playerWhale.y - mine.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < (playerWhale.size/2 + mine.size/2)) {
          setGameOver(true);
        }
      });

      // Check coin collisions
      for (let i = coins.length - 1; i >= 0; i--) {
        const coin = coins[i];
        const dx = playerWhale.x - coin.x;
        const dy = playerWhale.y - coin.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < (playerWhale.size/2 + coin.size/2)) {
          coins.splice(i, 1);
          setScore(prev => prev + 10);
        }
      }
    };

    // Draw functions
    const drawWhale = (x: number, y: number, size: number) => {
      ctx.save();
      ctx.translate(x, y);
      
      // Draw whale body
      ctx.fillStyle = '#1a1a1a';
      ctx.beginPath();
      ctx.ellipse(0, 0, size, size/2, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw white patch
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(-size/4, 0, size/3, size/6, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw tail
      ctx.fillStyle = '#1a1a1a';
      ctx.beginPath();
      ctx.moveTo(size * -0.8, 0);
      ctx.lineTo(size * -1.2, -size/3);
      ctx.lineTo(size * -1.2, size/3);
      ctx.closePath();
      ctx.fill();
      
      ctx.restore();
    };

    const drawMine = (x: number, y: number, size: number) => {
      ctx.fillStyle = '#ff4444';
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw spikes
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(x + Math.cos(angle) * size, y + Math.sin(angle) * size);
        ctx.lineTo(x + Math.cos(angle) * (size + 10), y + Math.sin(angle) * (size + 10));
        ctx.strokeStyle = '#ff4444';
        ctx.lineWidth = 3;
        ctx.stroke();
      }
    };

    const drawCoin = (x: number, y: number, size: number) => {
      ctx.fillStyle = '#ffd700';
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffa700';
      ctx.lineWidth = 3;
      ctx.stroke();
    };

    // Main game loop
    const animate = () => {
      if (!ctx || !canvas || gameOver) return;
      
      // Clear canvas with water effect
      ctx.fillStyle = 'rgba(10, 21, 32, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Handle player movement with WASD
      if (keys['w'] && playerWhale.y > playerWhale.size/2) {
        playerWhale.y -= playerWhale.speed;
      }
      if (keys['s'] && playerWhale.y < canvas.height - playerWhale.size/2) {
        playerWhale.y += playerWhale.speed;
      }
      
      // Handle speed control with A/D
      if (keys['a'] && playerWhale.speed > playerWhale.minSpeed) {
        playerWhale.speed -= 0.1;
      }
      if (keys['d'] && playerWhale.speed < playerWhale.maxSpeed) {
        playerWhale.speed += 0.1;
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
      
      // Draw player whale
      drawWhale(playerWhale.x, playerWhale.y, playerWhale.size);
      
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
    <Card className="glass-card p-4 border-sky-500/20 bg-gradient-to-r from-sky-500/10 to-blue-500/10">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={800}
          height={400}
          className="w-full rounded-lg"
        />
        <div className="absolute top-4 left-4 text-xl font-bold text-sky-400">
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
                className="mt-4 px-6 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
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