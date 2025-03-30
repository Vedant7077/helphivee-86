
import { useEffect, useState } from "react";

interface WebsiteLoaderProps {
  duration?: number;
  onComplete?: () => void;
}

const WebsiteLoader = ({ duration = 500, onComplete }: WebsiteLoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [charColors, setCharColors] = useState<string[]>([]);
  const [charFills, setCharFills] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);

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
    setCharColors(Array(7).fill("#4caf50")); // All characters start with green

    // Update the fill percentage of each character in sequence
    const fillInterval = setInterval(() => {
      setCharFills(prev => {
        const newFills = [...prev];
        for (let i = 0; i < newFills.length; i++) {
          newFills[i] = Math.min(100, newFills[i] + 5);
        }
        return newFills;
      });
      
      setProgress(prev => {
        const newProgress = prev + 5;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, duration / 25);

    const timeout = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, duration);

    return () => {
      clearInterval(fillInterval);
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
            className="relative"
            style={{ 
              color: charFills[index] < 100 ? "#e0e0e0" : charColors[index],
              transition: "color 0.3s ease"
            }}
          >
            <span 
              className="absolute top-0 left-0 overflow-hidden"
              style={{ 
                color: charColors[index],
                clipPath: `inset(0 0 ${100 - charFills[index]}% 0)`,
                transition: "clip-path 0.3s ease"
              }}
            >
              {char}
            </span>
            {char}
          </span>
        ))}
      </div>
      
      <div className="mt-4 text-gray-600">Loading amazing experiences...</div>
    </div>
  );
};

export default WebsiteLoader;
