
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

interface Campaign {
  id: number | string;
  title: string;
  description: string;
  raised: number;
  goal: number;
  image: string;
  category: string;
  daysLeft: number;
}

interface CampaignCardItemProps {
  campaign: Campaign;
}

const CampaignCardItem = ({ campaign }: CampaignCardItemProps) => {
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    // Calculate the actual progress percentage
    const actualProgress = Math.min(Math.round((campaign.raised / campaign.goal) * 100), 100);
    
    // Start with 0 and animate to the actual progress
    setProgress(0);
    setIsAnimating(true);
    
    // Animate the progress bar
    const timeout = setTimeout(() => {
      setProgress(actualProgress);
      
      // Reset the animation flag after the animation completes
      const animationTimeout = setTimeout(() => {
        setIsAnimating(false);
      }, 600); // Transition duration
      
      return () => clearTimeout(animationTimeout);
    }, 300);
    
    return () => clearTimeout(timeout);
  }, [campaign.raised, campaign.goal]);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <Link to={`/campaign/${campaign.id}`}>
        <div className="h-48 bg-gray-200 relative">
          <img 
            src={campaign.image} 
            alt={campaign.title} 
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder.svg';
            }}
          />
          {campaign.daysLeft === 0 && (
            <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 text-sm font-medium">
              Ended
            </div>
          )}
          {campaign.daysLeft > 0 && campaign.daysLeft <= 3 && (
            <div className="absolute top-0 right-0 bg-yellow-500 text-white px-3 py-1 text-sm font-medium">
              {campaign.daysLeft} day{campaign.daysLeft !== 1 ? 's' : ''} left
            </div>
          )}
        </div>
      </Link>
      <div className="p-6">
        <Link to={`/campaign/${campaign.id}`}>
          <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-charity-blue transition-colors">{campaign.title}</h3>
        </Link>
        <p className="text-gray-600 mb-4 line-clamp-2">{campaign.description}</p>
        <div className="mb-2">
          <Progress 
            value={progress} 
            className={`h-2.5 ${isAnimating ? 'transition-all duration-600 ease-out' : ''}`}
          />
        </div>
        <div className="flex justify-between text-sm font-medium">
          <span className="text-charity-green-dark">${campaign.raised.toLocaleString()} raised</span>
          <span className="text-gray-500">of ${campaign.goal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-600">{campaign.daysLeft} days left</span>
          <Link 
            to={`/donate?campaignId=${campaign.id}`} 
            className="text-sm text-charity-blue font-medium hover:underline"
          >
            Donate Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CampaignCardItem;
