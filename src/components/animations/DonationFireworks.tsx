
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Progress } from "@/components/ui/progress";

interface DonationFireworksProps {
  duration?: number;
  onComplete?: () => void;
  campaignTitle?: string;
  oldAmount?: number;
  newAmount?: number;
  goalAmount?: number;
}

const DonationFireworks = ({ 
  duration = 3000, 
  onComplete, 
  campaignTitle,
  oldAmount = 0,
  newAmount = 0,
  goalAmount = 0
}: DonationFireworksProps) => {
  const [isActive, setIsActive] = useState(true);
  const [progress, setProgress] = useState(0);
  const [targetProgress, setTargetProgress] = useState(0);

  useEffect(() => {
    // Calculate progress percentages
    if (goalAmount > 0) {
      const oldPercentage = Math.min(Math.round((oldAmount / goalAmount) * 100), 100);
      const newPercentage = Math.min(Math.round((newAmount / goalAmount) * 100), 100);
      
      setProgress(oldPercentage);
      setTargetProgress(newPercentage);
      
      // Animate progress after a short delay
      setTimeout(() => {
        setProgress(newPercentage);
      }, 1000);
    }
    
    // Create multiple fireworks at random positions
    const createFireworks = () => {
      const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
      
      // Use confetti to create fireworks
      const count = 1; // Reduced count for shorter display
      const interval = setInterval(() => {
        for (let i = 0; i < count; i++) {
          // Random position
          const x = 0.1 + Math.random() * 0.8;
          const y = 0.1 + Math.random() * 0.8;
          
          // Random colors from our set
          const randomColors = [colors[Math.floor(Math.random() * colors.length)]];
          
          setTimeout(() => {
            confetti({
              particleCount: 20, // Reduced particle count
              spread: 30,
              origin: { x, y },
              colors: randomColors,
              disableForReducedMotion: true
            });
          }, i * 50); // Shorter delay between fireworks
        }
      }, 200); // Faster interval
      
      setTimeout(() => {
        clearInterval(interval);
        setIsActive(false);
        if (onComplete) onComplete();
      }, duration);
      
      return () => clearInterval(interval);
    };
    
    createFireworks();
  }, [duration, onComplete, oldAmount, newAmount, goalAmount]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      <div className="text-center font-bold text-white bg-charity-green-dark/80 p-8 rounded-lg backdrop-blur-sm max-w-md w-full">
        <div className="text-4xl mb-6">Thank You For Your Donation!</div>
        
        {campaignTitle && (
          <div className="mb-4 text-xl">
            Your contribution to<br />
            "{campaignTitle}"<br />
            makes a difference!
          </div>
        )}
        
        {goalAmount > 0 && (
          <div className="mt-6">
            <div className="flex justify-between text-sm font-medium mb-2">
              <span>${newAmount.toLocaleString()} raised</span>
              <span>of ${goalAmount.toLocaleString()}</span>
            </div>
            <Progress 
              value={progress} 
              className="h-3 transition-all duration-1000 ease-out"
            />
            <div className="text-sm mt-2">
              +${(newAmount - oldAmount).toLocaleString()} from your donation!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationFireworks;
