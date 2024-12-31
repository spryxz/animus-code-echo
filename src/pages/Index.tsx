import { Twitter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import AddressCard from "@/components/AddressCard";
import GameComponent from "@/components/GameComponent";
import FireworksBackground from "@/components/FireworksBackground";

const CONTRACT_ADDRESS = "9g8W6Yu5tC1w9YuZ56jfSPqnYe8fUTveEhTX8NENpump";
const DONATION_ADDRESS = "BiiEGigqQw1jhRcfuiL4c8qhGq3tjBs192tPYg98NnB6";

const Index = () => {
  return (
    <div className="min-h-screen relative bg-gradient-to-b from-[#1a0f2e] to-[#0f172a]">
      <FireworksBackground />

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
            <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse">
              NEW YEAR SIGMA
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-center max-w-2xl text-blue-300">
            Collect magical tokens and embrace the power of SIGMA!
          </p>

          {/* New Year Banner */}
          <div className="w-full max-w-4xl p-6 glass-card bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl">
            <div className="flex items-center justify-center">
              <p className="text-lg text-white/90">
                Join the revolution and earn special New Year rewards!
              </p>
            </div>
          </div>

          <AddressCard contractAddress={CONTRACT_ADDRESS} donationAddress={DONATION_ADDRESS} />
        </div>

        <section className="max-w-4xl mx-auto">
          <GameComponent />
          <Card className="glass-card mt-8 overflow-hidden border-blue-500/20 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                About NEW YEAR SIGMA
              </h2>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-6 text-lg text-blue-200">
                  <p>
                    Welcome to the world of NEW YEAR SIGMA, where your journey to becoming a true sigma begins!
                  </p>
                  <p>
                    Navigate through the challenges, collect powerful tokens, and prove your worth in this epic adventure.
                  </p>
                  <p>
                    Use WASD controls to move: W/S to move up and down, A/D to control speed. Show them what a real sigma can do!
                  </p>
                  <p>
                    Every token collected brings you closer to achieving sigma status!
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