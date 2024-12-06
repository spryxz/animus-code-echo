import { Twitter, MessageSquare, Video } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChristmasBackground from "@/components/ChristmasBackground";
import AddressCard from "@/components/AddressCard";
import AIChatBox from "@/components/AIChatBox";

const CONTRACT_ADDRESS = "YOUR_SOLANA_CONTRACT_ADDRESS";
const DONATION_ADDRESS = "BkN8dnrZvaCVn49V6MKvNN3rLvM2D7usFZe9i1F3626i";

const Index = () => {
  return (
    <div className="min-h-screen relative bg-[#0a0f1a]">
      <ChristmasBackground />
      
      <div className="fixed inset-0 z-0 bg-[url('/christmas-money.jpg')] opacity-10 bg-cover bg-center" />
      
      {/* Money Bags Animation */}
      <div className="fixed bottom-20 right-20 w-24 h-24 z-10 animate-bounce-slow">
        <img src="/money-bag.png" alt="Money Bag" className="w-full h-full object-contain" />
      </div>
      
      {/* Social Media Links */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <a
          href="https://x.com/JingleBags"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 glass-card hover:bg-white/20 transition-all rounded-full"
          aria-label="Follow us on Twitter"
        >
          <Twitter className="w-6 h-6 text-green-400" />
        </a>
        <a
          href="https://discord.gg/jinglebags"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 glass-card hover:bg-white/20 transition-all rounded-full"
          aria-label="Join our Discord"
        >
          <MessageSquare className="w-6 h-6 text-green-400" />
        </a>
        <a
          href="https://tiktok.com/@jinglebags"
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
          <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500 animate-pulse">
            JINGLE BAGS
          </h1>
          
          <p className="text-xl md:text-2xl text-center max-w-2xl text-blue-300">
            Spreading holiday cheer through digital innovation 🎄
          </p>

          <AddressCard contractAddress={CONTRACT_ADDRESS} donationAddress={DONATION_ADDRESS} />
        </div>

        <section className="max-w-4xl mx-auto">
          <AIChatBox />
          <Card className="glass-card overflow-hidden border-blue-500/20 bg-gradient-to-r from-blue-500/10 to-green-500/10">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500">
                About JINGLE BAGS
              </h2>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-6 text-lg text-blue-200">
                  <p>
                    JINGLE BAGS brings the magic of the holiday season to the digital world, combining festive spirit with innovative technology.
                  </p>
                  <p>
                    Our platform creates a unique experience where holiday cheer meets digital innovation, bringing joy to our community.
                  </p>
                  <p>
                    With JINGLE BAGS, we're building a festive ecosystem that spreads happiness and creates value for all participants.
                  </p>
                  <p>
                    Join our growing community of holiday enthusiasts and be part of the most cheerful digital revolution.
                  </p>
                  <p>
                    Experience the magic of JINGLE BAGS and help us spread joy across the digital landscape.
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