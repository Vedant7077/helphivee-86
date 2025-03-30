
import { useEffect, useState } from "react";

interface WebsiteLoaderProps {
  duration?: number;
  onComplete?: () => void;
}

const WebsiteLoader = ({ duration = 1200, onComplete }: WebsiteLoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [charColors, setCharColors] = useState<string[]>([]);

  // Rainbow colors for the text animation
  const rainbowColors = [
    "#ff0000", // red
    "#ff7f00", // orange
    "#ffff00", // yellow
    "#00ff00", // green
    "#0000ff", // blue
    "#4b0082", // indigo
    "#9400d3"  // violet
  ];

  useEffect(() => {
    // Initialize colors for each character in "Prayaas"
    setCharColors(Array(7).fill("#ffffff"));

    // Update the colors of each character in sequence
    let letterIndex = 0;
    const colorInterval = setInterval(() => {
      setCharColors(prev => {
        const newColors = [...prev];
        newColors[letterIndex] = rainbowColors[letterIndex % rainbowColors.length];
        return newColors;
      });
      letterIndex = (letterIndex + 1) % 7;
    }, 120);

    // Progress bar and completion logic
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 4; // Faster progress
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, duration / 25); // Faster updates for smoother animation

    const timeout = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, duration);

    return () => {
      clearInterval(colorInterval);
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [duration, onComplete]);

  if (!isVisible) return null;

  // Characters of "Prayaas"
  const characters = ["P", "r", "a", "y", "a", "a", "s"];

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
      <div className="text-4xl md:text-5xl font-extrabold mb-8 flex">
        {characters.map((char, index) => (
          <span 
            key={index} 
            className="transition-colors duration-300"
            style={{ color: charColors[index] }}
          >
            {char}
          </span>
        ))}
      </div>
      
      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-red-500 via-green-500 to-blue-500 transition-all duration-100 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="mt-4 text-gray-600">Loading amazing experiences...</div>
    </div>
  );
};

export default WebsiteLoader;
