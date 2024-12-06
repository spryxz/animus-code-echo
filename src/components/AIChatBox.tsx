import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";

const generateGibberish = () => {
  const chars = "🎄🎅🎁💰$€£¥₿0123456789!@#$%^&*";
  const length = Math.floor(Math.random() * 20) + 5;
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
};

const AIChatBox = () => {
  const [messages, setMessages] = useState<Array<{ ai: number; text: string }>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessages(prev => {
        const newMessages = [...prev];
        if (newMessages.length > 8) newMessages.shift();
        return [...newMessages, {
          ai: Math.random() > 0.5 ? 1 : 2,
          text: generateGibberish()
        }];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="glass-card mb-8 border-green-500/20 bg-gradient-to-r from-red-500/10 to-green-500/10">
      <CardContent className="p-4">
        <h3 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-green-400">
          Santa's AI Elves Communication
        </h3>
        <ScrollArea className="h-[200px] w-full rounded-md border border-green-500/20 p-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-2 flex ${msg.ai === 1 ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`px-3 py-2 rounded-lg ${
                  msg.ai === 1 ? 'bg-red-500/20' : 'bg-green-500/20'
                } max-w-[80%] animate-pulse`}
              >
                <span className="text-xs text-gray-400">Elf_{msg.ai}</span>
                <p className="font-mono text-sm">{msg.text}</p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default AIChatBox;