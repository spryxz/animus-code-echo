import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Mic, MicOff } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const AIChatBox = () => {
  const [messages, setMessages] = useState<Array<{ role: "user" | "ai"; text: string }>>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const audioChunks: BlobPart[] = [];
      
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        toast({
          title: "Voice Input",
          description: "Voice input received!",
        });
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not access microphone",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const generateResponse = async (userInput: string) => {
    try {
      const API_KEY = "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";
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            { 
              role: "system", 
              content: "You are a helpful AI assistant focused on providing accurate and informative responses." 
            },
            { 
              role: "user", 
              content: userInput 
            }
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(errorData.error?.message || 'Failed to generate AI response');
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || "I apologize, but I couldn't generate a response.";
    } catch (error) {
      console.error('Error generating response:', error);
      throw error;
    }
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
      console.error('Error in handleSubmit:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="glass-card mb-8 border-blue-500/20 bg-gradient-to-r from-blue-500/10 to-purple-500/10 w-full">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            AI Assistant
          </h3>
        </div>
        <ScrollArea 
          className="h-[150px] w-full rounded-md border border-blue-500/20 p-4"
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
            disabled={isLoading || isRecording}
          />
          <Button 
            type="button"
            onClick={isRecording ? stopRecording : startRecording}
            className={`${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </Button>
          <Button 
            type="submit" 
            disabled={isLoading || isRecording}
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