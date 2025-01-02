import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const AIChatBox = () => {
  const [messages, setMessages] = useState<Array<{ role: "user" | "ai"; text: string }>>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const generateResponse = async (userInput: string) => {
    const lowerInput = userInput.toLowerCase();
    
    // Code-related response
    if (lowerInput.includes("code") || lowerInput.includes("programming")) {
      return `Here's a simple example based on your query:
\`\`\`javascript
// Basic JavaScript function example
function greet(name) {
  return \`Hello, \${name}! Welcome to programming.\`;
}

// Usage
console.log(greet("Developer"));
\`\`\`

Feel free to ask for more specific programming examples!`;
    }
    
    // Recipe-related response
    if (lowerInput.includes("recipe") || lowerInput.includes("cook")) {
      return `Here's a simple recipe based on your query:

🍳 Quick Pasta Recipe:

Ingredients:
- 200g pasta
- 2 cloves garlic
- 2 tbsp olive oil
- Salt and pepper to taste
- Fresh basil (optional)

Instructions:
1. Boil pasta according to package instructions
2. Sauté minced garlic in olive oil
3. Combine pasta with garlic oil
4. Season and garnish with basil

Enjoy your meal! Let me know if you need more specific recipes.`;
    }
    
    // AI/ML-related response
    if (lowerInput.includes("ai") || lowerInput.includes("machine learning")) {
      return `Here's some information about AI/ML:

🤖 Key AI/ML Concepts:
- Machine Learning is a subset of AI
- Deep Learning is a subset of Machine Learning
- Neural Networks are inspired by human brain structure
- Common applications: image recognition, natural language processing, recommendation systems

Would you like to know more about any specific AI/ML topic?`;
    }
    
    // Default response with helpful suggestions
    return `I can help you with various tasks! Here are some things you can ask about:

1. 💻 Programming and coding examples
2. 🍳 Cooking recipes and instructions
3. 🤖 AI and Machine Learning concepts
4. 📚 General knowledge and explanations

What would you like to know more about?`;
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