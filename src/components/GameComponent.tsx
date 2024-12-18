import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";

const GameComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Whale class
    class Whale {
      x: number;
      y: number;
      size: number;
      speed: number;
      direction: number;
      
      constructor() {
        this.size = Math.random() * 40 + 60; // Random size between 60-100
        this.y = Math.random() * (canvas.height - this.size);
        this.direction = Math.random() < 0.5 ? -1 : 1; // Random direction
        this.x = this.direction === 1 ? -this.size : canvas.width + this.size;
        this.speed = (Math.random() * 1 + 0.5) * this.direction; // Random speed
      }
      
      draw() {
        if (!ctx) return;
        
        ctx.save();
        ctx.translate(this.x, this.y);
        if (this.direction < 0) {
          ctx.scale(-1, 1);
        }
        
        // Draw whale body
        ctx.fillStyle = '#1a1a1a';
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size, this.size/2, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw white patch
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.ellipse(-this.size/4, 0, this.size/3, this.size/6, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw tail
        ctx.fillStyle = '#1a1a1a';
        ctx.beginPath();
        ctx.moveTo(this.size * -0.8, 0);
        ctx.lineTo(this.size * -1.2, -this.size/3);
        ctx.lineTo(this.size * -1.2, this.size/3);
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
      }
      
      update() {
        this.x += this.speed;
        return this.x < -this.size * 2 || this.x > canvas.width + this.size * 2;
      }
    }

    const whales: Whale[] = [];
    
    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      
      // Clear canvas with slight fade effect
      ctx.fillStyle = 'rgba(10, 21, 32, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add new whales randomly
      if (Math.random() < 0.02 && whales.length < 5) {
        whales.push(new Whale());
      }
      
      // Update and draw whales
      for (let i = whales.length - 1; i >= 0; i--) {
        const whale = whales[i];
        if (whale.update()) {
          whales.splice(i, 1);
        } else {
          whale.draw();
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      // Animation will stop when component unmounts
    };
  }, []);

  return (
    <Card className="glass-card p-4 border-sky-500/20 bg-gradient-to-r from-sky-500/10 to-blue-500/10">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={800}
          height={400}
          className="w-full rounded-lg"
        />
      </div>
    </Card>
  );
};

export default GameComponent;