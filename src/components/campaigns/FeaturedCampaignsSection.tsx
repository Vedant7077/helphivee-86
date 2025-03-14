
import CampaignCardItem from "./CampaignCardItem";

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

interface FeaturedCampaignsSectionProps {
  featuredCampaigns: Campaign[];
  showFeatured: boolean;
}

const FeaturedCampaignsSection = ({ featuredCampaigns, showFeatured }: FeaturedCampaignsSectionProps) => {
  if (!showFeatured || featuredCampaigns.length === 0) {
    return null;
  }

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Campaigns</h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        {featuredCampaigns.map(campaign => (
          <CampaignCardItem key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCampaignsSection;
