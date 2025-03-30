
import { useEffect, useState } from "react";

interface WebsiteLoaderProps {
  duration?: number;
  onComplete?: () => void;
}

const WebsiteLoader = ({ duration = 3000, onComplete }: WebsiteLoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 2;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, duration / 50);

    const timeout = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [duration, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
      <div className="text-4xl md:text-5xl font-extrabold text-charity-green-dark mb-8 animate-pulse">
        Soulful Giving
      </div>
      
      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-charity-green transition-all duration-300 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="mt-4 text-gray-600">Loading amazing experiences...</div>
    </div>
  );
};

export default WebsiteLoader;
