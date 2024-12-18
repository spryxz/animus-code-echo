import { Twitter, MessageSquare, Video } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import AddressCard from "@/components/AddressCard";
import GameComponent from "@/components/GameComponent";
import WaterBackground from "@/components/WaterBackground";

const CONTRACT_ADDRESS = "9g8W6Yu5tC1w9YuZ56jfSPqnYe8fUTveEhTX8NENpump";
const DONATION_ADDRESS = "BiiEGigqQw1jhRcfuiL4c8qhGq3tjBs192tPYg98NnB6";

const Index = () => {
  return (
    <div className="min-h-screen relative bg-[#0a1520]">
      <WaterBackground />
      
      {/* Social Media Links */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <a
          href="https://x.com/LuigisDinner"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 glass-card hover:bg-white/20 transition-all rounded-full"
          aria-label="Follow us on Twitter"
        >
          <Twitter className="w-6 h-6 text-sky-400" />
        </a>
        <a
          href="https://discord.gg/luigisdinner"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 glass-card hover:bg-white/20 transition-all rounded-full"
          aria-label="Join our Discord"
        >
          <MessageSquare className="w-6 h-6 text-sky-400" />
        </a>
        <a
          href="https://tiktok.com/@luigisdinner"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 glass-card hover:bg-white/20 transition-all rounded-full"
          aria-label="Follow us on TikTok"
        >
          <Video className="w-6 h-6 text-sky-400" />
        </a>
      </div>
      
      <main className="relative z-10 container mx-auto px-4 py-20 space-y-32">
        <div className="flex flex-col items-center justify-center space-y-12">
          <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-500 animate-pulse">
            ORCA TRENCHES
          </h1>
          
          <p className="text-xl md:text-2xl text-center max-w-2xl text-sky-300">
            Dive deep into the abyss with the apex predators 🌊
          </p>

          <AddressCard contractAddress={CONTRACT_ADDRESS} donationAddress={DONATION_ADDRESS} />
        </div>

        <section className="max-w-4xl mx-auto">
          <GameComponent />
          <Card className="glass-card mt-8 overflow-hidden border-sky-500/20 bg-gradient-to-r from-sky-500/10 to-blue-500/10">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-500">
                About Orca Trenches
              </h2>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-6 text-lg text-sky-200">
                  <p>
                    Welcome to the depths of Orca Trenches, where the ocean's most formidable hunters rule the abyss.
                  </p>
                  <p>
                    Take control of our mysterious orca as it patrols the dark waters, protecting its territory from intruders.
                  </p>
                  <p>
                    Navigate through the deep blue, where every shadow could hide a potential threat or prey.
                  </p>
                  <p>
                    Will you maintain dominance in these treacherous waters? The hunt begins...
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