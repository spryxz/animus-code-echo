import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

const LoadingScreen = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          onLoadingComplete();
          return 100;
        }
        return prev + 2; // Increment by 2 to complete in 5 seconds (100 / 2 * 100ms = 5000ms)
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 bg-[#0f172a] flex flex-col items-center justify-center z-50">
      {/* Neural background effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-blue-500/20 rounded-full blur-xl"
            style={{
              width: Math.random() * 100 + 50 + "px",
              height: Math.random() * 100 + 50 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              animation: `float ${Math.random() * 3 + 4}s ease-in-out infinite`,
              animationDelay: `-${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Brain image and loading bar */}
      <div className="relative z-10 flex flex-col items-center space-y-8">
        <img
          src="/lovable-uploads/214c2b01-b814-42fc-bf90-c1501fe2f56a.png"
          alt="Neural Network Brain"
          className="w-64 h-64 animate-pulse"
        />
        <div className="w-64">
          <Progress value={progress} className="h-2" />
        </div>
        <p className="text-blue-400 text-lg font-semibold">
          Loading... {progress}%
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;