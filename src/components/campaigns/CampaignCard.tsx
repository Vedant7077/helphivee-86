
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Award } from 'lucide-react';

// Campaign interface
interface Campaign {
  id: string;
  title: string;
  description: string;
  category: string;
  goalAmount: number;
  raisedAmount: number;
  daysLeft: number;
  imageUrl: string;
  organizer: {
    name: string;
    avatar: string;
  };
}

interface CampaignCardProps {
  campaign: Campaign;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign }) => {
  const progressPercentage = (campaign.raisedAmount / campaign.goalAmount) * 100;
  
  return (
    <Link 
      to={`/campaigns/${campaign.id}`} 
      className="group"
    >
      <div className="glass-card overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]">
        {/* Category chip */}
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-white/80 backdrop-blur-sm text-charity-blue text-xs font-medium px-3 py-1 rounded-full">
            {campaign.category}
          </span>
        </div>
        
        {/* Image container */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={campaign.imageUrl} 
            alt={campaign.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="flex items-center mb-4">
            <img 
              src={campaign.organizer.avatar} 
              alt={campaign.organizer.name}
              className="w-8 h-8 rounded-full object-cover border-2 border-white"
            />
            <span className="ml-2 text-sm text-gray-600">
              {campaign.organizer.name}
            </span>
          </div>
          
          <h3 className="text-xl font-semibold mb-2 line-clamp-1 group-hover:text-charity-blue transition-colors">
            {campaign.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {campaign.description}
          </p>
          
          {/* Progress bar */}
          <div className="mt-4 mb-2">
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-charity-blue rounded-full"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              ></div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="flex justify-between text-sm mt-4">
            <div>
              <p className="font-medium">${campaign.raisedAmount.toLocaleString()}</p>
              <p className="text-gray-500">raised of ${campaign.goalAmount.toLocaleString()}</p>
            </div>
            <div className="flex items-center">
              <Calendar size={14} className="text-gray-500 mr-1" />
              <span className="text-gray-500">{campaign.daysLeft} days left</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CampaignCard;
