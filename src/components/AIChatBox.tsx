import { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { pipeline } from "@huggingface/transformers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

const AIChatBox = () => {
  const [messages, setMessages] = useState<Array<{ role: "user" | "ai"; text: string }>>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [model, setModel] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initModel = async () => {
      try {
        const pipe = await pipeline(
          "text-generation",
          "TinyLlama/TinyLlama-1.1B-Chat-v1.0",
          { 
            quantized: true,
            device: "cpu"
          }
        );
        setModel(pipe);
      } catch (error) {
        console.error("Error loading model:", error);
      }
    };

    initModel();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !model || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const result = await model(userMessage, {
        max_new_tokens: 100,
        temperature: 0.7,
        repetition_penalty: 1.1,
        do_sample: true,
      });

      const aiResponse = result[0].generated_text.replace(userMessage, "").trim();
      
      setMessages(prev => [...prev, { role: "ai", text: aiResponse }]);
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages(prev => [...prev, { role: "ai", text: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="glass-card mb-8 border-blue-500/20 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
      <CardContent className="p-4">
        <h3 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          AI Assistant
        </h3>
        <ScrollArea 
          className="h-[300px] w-full rounded-md border border-blue-500/20 p-4"
          ref={scrollRef}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-2 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-3 py-2 rounded-lg ${
                  msg.role === "user" ? "bg-blue-500/20" : "bg-purple-500/20"
                } max-w-[80%]`}
              >
                <span className="text-xs text-gray-400">
                  {msg.role === "user" ? "You" : "AI"}
                </span>
                <p className="font-mono text-sm">{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start mb-2">
              <div className="px-3 py-2 rounded-lg bg-purple-500/20">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            </div>
          )}
        </ScrollArea>
        <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
            disabled={isLoading || !model}
          />
          <Button 
            type="submit" 
            disabled={isLoading || !model}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Send
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AIChatBox;