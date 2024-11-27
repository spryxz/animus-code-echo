import { useState, useEffect } from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";

const CONTRACT_ADDRESS = "YOUR_SOLANA_CONTRACT_ADDRESS";

const Index = () => {
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    await navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    toast.success("Contract address copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen relative">
      <MatrixRain />
      <FloatingParticles />
      
      <main className="relative z-10 container mx-auto px-4 py-20">
        <div className="flex flex-col items-center justify-center space-y-12">
          <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent animate-glow">
            ANIMUS AI
          </h1>
          
          <p className="text-xl md:text-2xl text-center max-w-2xl text-gray-300">
            The next generation of AI-powered cryptocurrency on Solana
          </p>

          <div className="glass-card p-6 w-full max-w-xl">
            <p className="text-sm text-gray-400 mb-2">Contract Address</p>
            <div className="flex items-center space-x-4">
              <code className="text-accent flex-1 overflow-x-auto">
                {CONTRACT_ADDRESS}
              </code>
              <button
                onClick={copyAddress}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                title="Copy address"
              >
                <Copy className={copied ? "text-green-400" : "text-white"} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const MatrixRain = () => {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.className = "matrix-bg";
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "ANIMUSAI10".split("");
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    function draw() {
      if (!ctx) return;
      
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0ea5e9";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 33);
    return () => {
      clearInterval(interval);
      document.body.removeChild(canvas);
    };
  }, []);

  return null;
};

const FloatingParticles = () => {
  return (
    <div className="fixed inset-0 z-0">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-primary rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Index;