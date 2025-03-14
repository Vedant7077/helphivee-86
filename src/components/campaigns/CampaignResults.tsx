
import { Button } from "@/components/ui/button";
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

interface CampaignResultsProps {
  filteredCampaigns: Campaign[];
  isFiltering: boolean;
  resetFilters: () => void;
}

const CampaignResults = ({ filteredCampaigns, isFiltering, resetFilters }: CampaignResultsProps) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {isFiltering ? "Search Results" : "All Campaigns"}
      </h2>
      
      {filteredCampaigns.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredCampaigns.map(campaign => (
            <CampaignCardItem key={campaign.id} campaign={campaign} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-white rounded-lg shadow-sm">
          <p className="text-lg text-gray-600">No campaigns found matching your criteria.</p>
          <Button 
            className="mt-4 bg-charity-blue hover:bg-charity-blue-light"
            onClick={resetFilters}
          >
            View All Campaigns
          </Button>
        </div>
      )}
    </div>
  );
};

export default CampaignResults;
