import { Twitter } from "lucide-react";
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
      
      <a
        href="https://x.com/JingleBags"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-4 right-4 z-20 p-2 glass-card hover:bg-white/20 transition-all rounded-full"
        aria-label="Follow us on Twitter"
      >
        <Twitter className="w-6 h-6 text-green-400" />
      </a>
      
      <main className="relative z-10 container mx-auto px-4 py-20 space-y-32">
        <div className="flex flex-col items-center justify-center space-y-12">
          <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-green-500 animate-pulse">
            JINGLE BAGS
          </h1>
          
          <p className="text-xl md:text-2xl text-center max-w-2xl text-green-300">
            The most festive cryptocurrency on Solana 🎄💰
          </p>

          <AddressCard contractAddress={CONTRACT_ADDRESS} donationAddress={DONATION_ADDRESS} />
        </div>

        <section className="max-w-4xl mx-auto">
          <AIChatBox />
          <Card className="glass-card overflow-hidden border-green-500/20 bg-gradient-to-r from-red-500/10 to-green-500/10">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-green-500">
                The Christmas Story
              </h2>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-6 text-lg text-green-200">
                  <p>
                    Deep in the North Pole's blockchain division, Santa's most innovative elves discovered something magical - a way to merge the spirit of giving with the power of cryptocurrency. Thus, JINGLE BAGS was born.
                  </p>
                  <p>
                    Using quantum computing powered by Christmas magic, these tech-savvy elves created a token that would revolutionize how holiday cheer is spread across the Solana blockchain.
                  </p>
                  <p>
                    Each JINGLE BAGS token carries a piece of Christmas spirit, validated by Santa's own proof-of-giving consensus mechanism. The more you share, the more your bags jingle with holiday rewards.
                  </p>
                  <p>
                    But this was more than just another Christmas miracle. JINGLE BAGS became the first cryptocurrency to be officially certified by the North Pole Blockchain Authority, with each transaction spreading joy and prosperity across the network.
                  </p>
                  <p>
                    Now, JINGLE BAGS exists as a bridge between holiday magic and digital finance, where every holder becomes part of Santa's extended family of crypto enthusiasts. It's not just a token - it's a celebration of giving, wrapped in blockchain technology.
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