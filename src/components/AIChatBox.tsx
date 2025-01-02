import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { pipeline } from "@huggingface/transformers";

const AIChatBox = () => {
  const [messages, setMessages] = useState<Array<{ role: "user" | "ai"; text: string }>>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [model, setModel] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const loadModel = async () => {
      try {
        const pipe = await pipeline(
          "text-generation",
          "onnx-community/tiny-llama",
          { device: "cpu" }
        );
        setModel(pipe);
        console.log("Model loaded successfully");
      } catch (error) {
        console.error("Error loading model:", error);
        toast({
          title: "Model Loading Error",
          description: "Falling back to basic responses. Please try again later.",
          variant: "destructive",
        });
      }
    };

    loadModel();
  }, [toast]);

  const generateResponse = async (userInput: string) => {
    if (model) {
      try {
        const result = await model(userInput, {
          max_length: 100,
          temperature: 0.7,
          top_p: 0.9,
        });
        return result[0].generated_text;
      } catch (error) {
        console.error("Error generating response:", error);
        return fallbackResponse(userInput);
      }
    }
    return fallbackResponse(userInput);
  };

  const fallbackResponse = (input: string) => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes("code") || lowerInput.includes("programming")) {
      return `Here's a code example:
\`\`\`javascript
function example() {
  console.log("Hello, programmer!");
}
\`\`\``;
    }
    
    if (lowerInput.includes("recipe") || lowerInput.includes("cook")) {
      return `Here's a simple recipe:
1. Gather ingredients
2. Follow instructions
3. Enjoy your meal!`;
    }
    
    return "I understand your question. Let me help you with that...";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const aiResponse = await generateResponse(userMessage);
      setMessages(prev => [...prev, { role: "ai", text: aiResponse }]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate response. Please try again.",
        variant: "destructive",
      });
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
          <div className="matrix-bg" />
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-2 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-3 py-2 rounded-lg ${
                  msg.role === "user" ? "bg-blue-500/20" : "bg-purple-500/20"
                } max-w-[80%] whitespace-pre-wrap`}
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
            placeholder="Ask me anything..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            disabled={isLoading}
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