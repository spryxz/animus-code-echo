import { Twitter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import AddressCard from "@/components/AddressCard";
import GameComponent from "@/components/GameComponent";
import ChristmasBackground from "@/components/ChristmasBackground";

const CONTRACT_ADDRESS = "9g8W6Yu5tC1w9YuZ56jfSPqnYe8fUTveEhTX8NENpump";
const DONATION_ADDRESS = "BiiEGigqQw1jhRcfuiL4c8qhGq3tjBs192tPYg98NnB6";

const Index = () => {
  return (
    <div className="min-h-screen relative bg-gradient-to-b from-[#1a0f2e] to-[#0f172a]">
      <ChristmasBackground />
      
      {/* Realistic Christmas Lights */}
      <div className="absolute top-0 left-0 right-0">
        {/* Cable */}
        <div className="h-1 bg-[#222222] relative">
          {/* Light Bulbs */}
          <div className="flex justify-between px-4 absolute -bottom-3 w-full">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="relative">
                {/* Bulb Socket */}
                <div className="w-2 h-3 bg-[#333333] rounded-t-sm" />
                {/* Light Bulb */}
                <div
                  className={`w-4 h-4 rounded-full animate-glow shadow-lg ${
                    i % 4 === 0 ? 'bg-[#F97316] shadow-[#F97316]/50' :
                    i % 4 === 1 ? 'bg-[#D946EF] shadow-[#D946EF]/50' :
                    i % 4 === 2 ? 'bg-[#8B5CF6] shadow-[#8B5CF6]/50' :
                    'bg-[#22C55E] shadow-[#22C55E]/50'
                  }`}
                  style={{
                    animationDelay: `${i * 0.1}s`
                  }}
                />
                {/* Light Glow Effect */}
                <div
                  className={`absolute -inset-2 rounded-full blur-md opacity-50 ${
                    i % 4 === 0 ? 'bg-[#F97316]' :
                    i % 4 === 1 ? 'bg-[#D946EF]' :
                    i % 4 === 2 ? 'bg-[#8B5CF6]' :
                    'bg-[#22C55E]'
                  }`}
                  style={{
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="absolute top-4 right-4 z-20">
        <a
          href="https://x.com/LuigisDinner"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 glass-card hover:bg-white/20 transition-all rounded-full"
          aria-label="Follow us on Twitter"
        >
          <Twitter className="w-6 h-6 text-sky-400" />
        </a>
      </div>
      
      <main className="relative z-10 container mx-auto px-4 py-20 space-y-32">
        <div className="flex flex-col items-center justify-center space-y-12">
          <div className="relative">
            <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-green-500 animate-pulse">
              The Last Christmas Miracle
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-center max-w-2xl text-green-300">
            Help Santa collect magical coins and spread the Christmas spirit!
          </p>

          {/* Festive Banner */}
          <div className="w-full max-w-4xl p-6 glass-card bg-gradient-to-r from-red-500/10 to-green-500/10 rounded-xl">
            <div className="flex items-center justify-center">
              <p className="text-lg text-white/90">
                Join the magical journey and earn special Christmas rewards!
              </p>
            </div>
          </div>

          <AddressCard contractAddress={CONTRACT_ADDRESS} donationAddress={DONATION_ADDRESS} />
        </div>

        <section className="max-w-4xl mx-auto">
          <GameComponent />
          <Card className="glass-card mt-8 overflow-hidden border-red-500/20 bg-gradient-to-r from-red-500/10 to-green-500/10">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-green-500">
                About The Last Christmas Miracle
              </h2>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-6 text-lg text-green-200">
                  <p>
                    Welcome to the magical world of The Last Christmas Miracle, where Santa needs your help to collect special coins that power his sleigh!
                  </p>
                  <p>
                    Guide Santa through the snowy night sky, avoiding obstacles while gathering magical coins that help spread Christmas cheer.
                  </p>
                  <p>
                    Use WASD controls to navigate Santa: W/S to move up and down, A/D to control speed. Can you help save Christmas?
                  </p>
                  <p>
                    Every coin collected brings us closer to making this Christmas truly miraculous!
                  </p>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Index;