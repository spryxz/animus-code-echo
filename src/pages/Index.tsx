import { Twitter, MessageSquare, Video } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import AddressCard from "@/components/AddressCard";
import GameComponent from "@/components/GameComponent";

const CONTRACT_ADDRESS = "9g8W6Yu5tC1w9YuZ56jfSPqnYe8fUTveEhTX8NENpump";
const DONATION_ADDRESS = "BiiEGigqQw1jhRcfuiL4c8qhGq3tjBs192tPYg98NnB6";

const Index = () => {
  return (
    <div className="min-h-screen relative bg-[#0a0f1a]">
      <div className="fixed inset-0 z-0 bg-[url('/christmas-money.jpg')] opacity-10 bg-cover bg-center" />
      
      {/* Money Bags Animation */}
      <div className="fixed bottom-20 right-20 w-24 h-24 z-10 animate-bounce-slow">
        <img src="/money-bag.png" alt="Money Bag" className="w-full h-full object-contain" />
      </div>
      
      {/* Social Media Links */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <a
          href="https://x.com/LuigisDinner"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 glass-card hover:bg-white/20 transition-all rounded-full"
          aria-label="Follow us on Twitter"
        >
          <Twitter className="w-6 h-6 text-green-400" />
        </a>
        <a
          href="https://discord.gg/luigisdinner"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 glass-card hover:bg-white/20 transition-all rounded-full"
          aria-label="Join our Discord"
        >
          <MessageSquare className="w-6 h-6 text-green-400" />
        </a>
        <a
          href="https://tiktok.com/@luigisdinner"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 glass-card hover:bg-white/20 transition-all rounded-full"
          aria-label="Follow us on TikTok"
        >
          <Video className="w-6 h-6 text-green-400" />
        </a>
      </div>
      
      <main className="relative z-10 container mx-auto px-4 py-20 space-y-32">
        <div className="flex flex-col items-center justify-center space-y-12">
          <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-green-500 animate-pulse">
            LUIGI'S CHRISTMAS DINNER
          </h1>
          
          <p className="text-xl md:text-2xl text-center max-w-2xl text-red-300">
            Join Luigi for a deadly Christmas feast 🎄
          </p>

          <AddressCard contractAddress={CONTRACT_ADDRESS} donationAddress={DONATION_ADDRESS} />
        </div>

        <section className="max-w-4xl mx-auto">
          <GameComponent />
          <Card className="glass-card mt-8 overflow-hidden border-red-500/20 bg-gradient-to-r from-red-500/10 to-green-500/10">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-green-500">
                About Luigi's Christmas Dinner
              </h2>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-6 text-lg text-red-200">
                  <p>
                    Welcome to Luigi's Christmas Dinner, where holiday festivities meet deadly encounters.
                  </p>
                  <p>
                    Take control of our mysterious masked protagonist as he crashes the most dangerous Christmas party of the year.
                  </p>
                  <p>
                    Navigate through a world of suited adversaries, each guarding their own piece of the holiday puzzle.
                  </p>
                  <p>
                    Will you survive Luigi's special Christmas menu? The feast is about to begin...
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