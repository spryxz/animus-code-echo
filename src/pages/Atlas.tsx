import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const Atlas = () => {
  const [particles, setParticles] = useState<Array<{ x: number; y: number; speed: number; size: number }>>([]);

  useEffect(() => {
    // Initialize particles
    const newParticles = Array.from({ length: 50 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      speed: 1 + Math.random() * 3,
      size: 2 + Math.random() * 4,
    }));
    setParticles(newParticles);

    // Animation loop
    const animate = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: particle.y - particle.speed,
        x: particle.x + Math.sin(particle.y * 0.02) * 0.5,
        ...(particle.y < -10 ? {
          y: window.innerHeight + 10,
          x: Math.random() * window.innerWidth
        } : {})
      })));
    };

    const intervalId = setInterval(animate, 50);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a1f] relative overflow-hidden pt-16">
      {/* Particle effects */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle, index) => (
          <div
            key={index}
            className="absolute rounded-full bg-blue-500/30"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Slideshow */}
          <Carousel className="w-full max-w-3xl mx-auto">
            <CarouselContent>
              <CarouselItem>
                <img
                  src="/lovable-uploads/626eb164-b6fb-477b-8e7a-8d49620bd5bb.png"
                  alt="AI Brain"
                  className="w-full h-[400px] object-cover rounded-lg"
                />
              </CarouselItem>
              <CarouselItem>
                <img
                  src="/lovable-uploads/49dd7bcb-1c85-43a8-bbe9-37142ed1556a.png"
                  alt="AI Interaction"
                  className="w-full h-[400px] object-cover rounded-lg"
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>

          {/* Backstory */}
          <Card className="bg-blue-950/50 border-blue-500/20">
            <CardContent className="p-8 space-y-6">
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Atlas: Your Trusted AI Counselor
              </h2>
              <div className="space-y-4 text-blue-100 leading-relaxed">
                <p>
                  Atlas is the world's first AI counseling agent dedicated to empowering individuals with informed financial decisions, especially in the fast-evolving world of cryptocurrency. Designed with cutting-edge technology, Atlas combines expertise in blockchain, markets, and trends with a human-centric approach, ensuring personalized and accessible guidance for everyone.
                </p>
                <p>
                  Beyond crypto, Atlas is a versatile companion, ready to answer a variety of questions and provide solutions tailored to your needs. Whether you're navigating complex investments or just seeking reliable advice, Atlas is here to make your journey smoother, smarter, and stress-free.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Atlas;