
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Check } from "lucide-react";

interface Campaign {
  id: string;
  title: string;
  description: string;
  goal: number;
  current_amount: number;
  image_url: string;
  category: string;
}

const CompletedCampaignCard = ({ campaign }: { campaign: Campaign }) => {
  // Use local images for better reliability
  const getLocalImage = (index: number) => {
    const localImages = [
      "/placeholder.svg",
      "https://images.unsplash.com/photo-1522661067900-ab829854a57f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1624727828489-a1e03b79bba8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    ];
    return localImages[index % localImages.length];
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="h-48 bg-gray-200 relative">
        <img 
          src={campaign.image_url} 
          alt={campaign.title} 
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = getLocalImage(Math.floor(Math.random() * 4));
          }}
        />
        <div className="absolute top-0 right-0 bg-charity-green text-white px-3 py-1 rounded-bl-lg flex items-center">
          <Check className="w-4 h-4 mr-1" /> 
          <span className="text-sm font-medium">Completed</span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{campaign.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{campaign.description}</p>
        
        <div className="mb-2">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-charity-green h-2.5 rounded-full" 
              style={{ width: '100%' }}
            ></div>
          </div>
        </div>
        
        <div className="flex justify-between text-sm font-medium">
          <span className="text-charity-green-dark">${campaign.current_amount.toLocaleString()} raised</span>
          <span className="text-gray-500">of ${campaign.goal.toLocaleString()}</span>
        </div>
        
        <Button className="w-full mt-4 bg-gray-500 hover:bg-gray-600 text-white">
          <Link to={`/campaign/${campaign.id}`} className="w-full h-full flex items-center justify-center">
            View Results
          </Link>
        </Button>
      </div>
    </div>
  );
};

const CompletedCampaigns = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompletedCampaigns = async () => {
      try {
        const { data, error } = await supabase
          .from('campaigns')
          .select('*')
          .eq('status', 'completed')
          .order('created_at', { ascending: false })
          .limit(3);
        
        if (error) throw error;
        
        setCampaigns(data || []);
      } catch (error) {
        console.error("Error fetching completed campaigns:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCompletedCampaigns();
  }, []);

  if (loading) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Successfully Completed Campaigns
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Loading our success stories...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (campaigns.length === 0) {
    return null;
  }

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Successfully Completed Campaigns
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Celebrating the impact of our completed campaigns
          </p>
        </div>
        
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {campaigns.map(campaign => (
            <CompletedCampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Button variant="outline" className="px-6 py-3 text-base font-medium rounded-md text-charity-green-dark border-charity-green hover:bg-charity-green hover:text-white">
            <Link to="/campaigns?filter=completed" className="w-full h-full flex items-center justify-center">
              View All Completed Campaigns
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompletedCampaigns;
