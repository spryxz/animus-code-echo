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

  const generateAdvancedResponse = (userInput: string) => {
    const lowerInput = userInput.toLowerCase();
    
    // Coding related response
    if (lowerInput.includes("code") || lowerInput.includes("programming") || lowerInput.includes("javascript") || lowerInput.includes("react")) {
      return `Here's how I can help with your coding request:

\`\`\`javascript
// Example code based on your query
${generateCodeExample(lowerInput)}
\`\`\`

Let me know if you need any clarification or have questions about the code!`;
    }
    
    // Recipe related response
    if (lowerInput.includes("recipe") || lowerInput.includes("cook") || lowerInput.includes("food")) {
      return generateRecipe(lowerInput);
    }
    
    // General assistance
    return generateGeneralResponse(lowerInput);
  };

  const generateCodeExample = (input: string) => {
    if (input.includes("react")) {
      return `const MyComponent = () => {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
};`;
    }
    
    return `function greet(name) {
  return \`Hello, \${name}! How can I help you today?\`;
}`;
  };

  const generateRecipe = (input: string) => {
    return `Here's a simple recipe for you:

🍳 Quick and Easy Pasta
Ingredients:
- 8 oz pasta
- 2 cloves garlic
- 2 tbsp olive oil
- Salt and pepper to taste
- Fresh basil

Instructions:
1. Boil pasta according to package instructions
2. Sauté minced garlic in olive oil
3. Combine pasta with garlic oil
4. Season and garnish with fresh basil

Enjoy your meal! Let me know if you need more specific recipes.`;
  };

  const generateGeneralResponse = (input: string) => {
    const responses = [
      "I understand your question about " + input + ". Let me help you break this down...",
      "That's an interesting topic! Here's what I know about " + input + "...",
      "I'd be happy to help you with " + input + ". Here are some key points to consider...",
      "Based on your question about " + input + ", here's what I suggest...",
      "Let me provide some insights about " + input + " that might be helpful...",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      // Simulate AI processing with a small delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      const aiResponse = generateAdvancedResponse(userMessage);
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
            placeholder="Ask me anything about coding, recipes, or general help..."
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