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
          <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500 animate-pulse">
            Digital Assets
          </h1>
          
          <p className="text-xl md:text-2xl text-center max-w-2xl text-blue-300">
            Secure blockchain technology for the future of finance 💰
          </p>

          <AddressCard contractAddress={CONTRACT_ADDRESS} donationAddress={DONATION_ADDRESS} />
        </div>

        <section className="max-w-4xl mx-auto">
          <AIChatBox />
          <Card className="glass-card overflow-hidden border-blue-500/20 bg-gradient-to-r from-blue-500/10 to-green-500/10">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500">
                About Our Platform
              </h2>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-6 text-lg text-blue-200">
                  <p>
                    Built on cutting-edge blockchain technology, our platform represents the future of digital asset management and secure transactions.
                  </p>
                  <p>
                    Using advanced cryptographic algorithms and distributed ledger technology, we've created a robust system that ensures transparency and security for all users.
                  </p>
                  <p>
                    Our smart contract infrastructure is designed to handle high-volume transactions while maintaining the highest standards of security and efficiency.
                  </p>
                  <p>
                    With a focus on sustainability and scalability, we're building more than just a platform - we're creating the foundation for the future of digital finance.
                  </p>
                  <p>
                    Join us in shaping the future of digital assets and experience the power of blockchain technology firsthand.
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