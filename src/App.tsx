import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Loader } from "lucide-react";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2; // Increment by 2 to complete in roughly 5 seconds (100/2 * 100ms = 5000ms)
      });
    }, 100);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#1A1F2C] to-[#0f172a] space-y-8">
        <div className="relative">
          <Loader className="w-16 h-16 text-blue-500 animate-spin" />
          <div className="absolute inset-0 blur-lg bg-blue-500/30 animate-pulse" />
        </div>
        <div className="w-64">
          <Progress value={progress} className="h-2" />
        </div>
        <p className="text-blue-400 animate-pulse">Loading Counselor AI...</p>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;