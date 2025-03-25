
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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

  // Fallback local images for better reliability
  const getLocalImage = (index: number) => {
    const localImages = [
      "/placeholder.svg",
      "https://images.unsplash.com/photo-1522661067900-ab829854a57f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1624727828489-a1e03b79bba8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1574722772249-e21eeef4f1bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    ];
    return localImages[index % localImages.length];
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <Link to={`/campaign/${campaign.id}`}>
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
              const target = e.target as HTMLImageElement;
              // Generate a consistent ID for the campaign
              const campaignId = typeof campaign.id === 'string' 
                ? campaign.id.charCodeAt(0) % 6 
                : campaign.id % 6;
              target.src = getLocalImage(campaignId);
            }}
            data-id={campaign.id}
          />
        </div>
      </Link>
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium px-2 py-1 bg-gray-100 rounded-full text-charity-blue">
            {campaign.category}
          </span>
          <span className="text-sm text-gray-500">{campaign.daysLeft} days left</span>
        </div>
        <Link to={`/campaign/${campaign.id}`}>
          <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-charity-blue transition-colors">{campaign.title}</h3>
        </Link>
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
        <div className="flex space-x-2">
          <Button className="flex-1 bg-charity-blue hover:bg-charity-blue-light text-white">
            <Link to="/donate" className="w-full h-full flex items-center justify-center">Donate</Link>
          </Button>
          <Button variant="outline" className="flex-1">
            <Link to={`/campaign/${campaign.id}`} className="w-full h-full flex items-center justify-center">View Details</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CampaignCardItem;
