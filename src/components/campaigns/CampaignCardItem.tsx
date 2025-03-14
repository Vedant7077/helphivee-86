
import { Button } from "@/components/ui/button";

interface Campaign {
  id: number | string;
  title: string;
  description: string;
  raised: number;
  goal: number;
  image: string;
  category: string;
  daysLeft: number;
  featured?: boolean;
}

const CampaignCardItem = ({ campaign }: { campaign: Campaign }) => {
  const progress = Math.min(Math.round((campaign.raised / campaign.goal) * 100), 100);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="h-48 bg-gray-200 relative">
        {campaign.featured && (
          <div className="absolute top-0 right-0 bg-charity-coral text-white px-3 py-1 text-sm font-medium z-10">
            Featured
          </div>
        )}
        <img 
          src={campaign.image} 
          alt={campaign.title} 
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }}
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium px-2 py-1 bg-gray-100 rounded-full text-charity-blue">
            {campaign.category}
          </span>
          <span className="text-sm text-gray-500">{campaign.daysLeft} days left</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{campaign.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{campaign.description}</p>
        <div className="mb-2">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-charity-blue h-2.5 rounded-full" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <div className="flex justify-between text-sm font-medium mb-4">
          <span className="text-charity-blue">${campaign.raised.toLocaleString()} raised</span>
          <span className="text-gray-500">of ${campaign.goal.toLocaleString()}</span>
        </div>
        <Button className="w-full bg-charity-blue hover:bg-charity-blue-light text-white">
          Donate
        </Button>
      </div>
    </div>
  );
};

export default CampaignCardItem;
