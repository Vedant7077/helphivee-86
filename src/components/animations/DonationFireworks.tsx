
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

interface DonationFireworksProps {
  duration?: number;
  onComplete?: () => void;
}

const DonationFireworks = ({ duration = 1500, onComplete }: DonationFireworksProps) => {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    // Create multiple fireworks at random positions
    const createFireworks = () => {
      const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
      
      // Use confetti to create fireworks
      const count = 2; // Reduced count for shorter display
      const interval = setInterval(() => {
        for (let i = 0; i < count; i++) {
          // Random position
          const x = 0.1 + Math.random() * 0.8;
          const y = 0.1 + Math.random() * 0.8;
          
          // Random colors from our set
          const randomColors = [colors[Math.floor(Math.random() * colors.length)]];
          
          setTimeout(() => {
            confetti({
              particleCount: 30, // Reduced particle count
              spread: 40,
              origin: { x, y },
              colors: randomColors,
              disableForReducedMotion: true
            });
          }, i * 80); // Shorter delay between fireworks
        }
      }, 300); // Faster interval
      
      setTimeout(() => {
        clearInterval(interval);
        setIsActive(false);
        if (onComplete) onComplete();
      }, duration);
      
      return () => clearInterval(interval);
    };
    
    createFireworks();
  }, [duration, onComplete]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      <div className="text-4xl text-center font-bold text-white bg-charity-green-dark/20 p-8 rounded-lg backdrop-blur-sm">
        Thank You For Your Donation!
      </div>
    </div>
  );
};

export default DonationFireworks;
