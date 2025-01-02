import { Twitter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import AddressCard from "@/components/AddressCard";
import MatrixBackground from "@/components/MatrixBackground";
import AIChatBox from "@/components/AIChatBox";

const CONTRACT_ADDRESS = "9g8W6Yu5tC1w9YuZ56jfSPqnYe8fUTveEhTX8NENpump";
const DONATION_ADDRESS = "BiiEGigqQw1jhRcfuiL4c8qhGq3tjBs192tPYg98NnB6";

const Index = () => {
  return (
    <div className="min-h-screen relative bg-gradient-to-b from-[#1a0f2e] to-[#0f172a]">
      <MatrixBackground />

      {/* Social Media Links */}
      <div className="absolute top-4 right-4 z-20">
        <a
          href="https://x.com/WojakNewYear"
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
              ANIMUS AI
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-center max-w-2xl text-blue-300">
            Experience the power of AI with Animus
          </p>

          <AIChatBox />

          <AddressCard contractAddress={CONTRACT_ADDRESS} donationAddress={DONATION_ADDRESS} />
        </div>

        <section className="max-w-4xl mx-auto">
          <Card className="glass-card mt-8 overflow-hidden border-blue-500/20 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                About ANIMUS AI
              </h2>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-6 text-lg text-blue-200">
                  <p>
                    Welcome to ANIMUS AI, where artificial intelligence meets human creativity.
                  </p>
                  <p>
                    Our advanced AI assistant is powered by state-of-the-art language models,
                    ready to help you with any questions or tasks you might have.
                  </p>
                  <p>
                    Experience the future of AI interaction with our intuitive chat interface
                    and discover new possibilities in human-AI collaboration.
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