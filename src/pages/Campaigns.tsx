
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import CampaignFilter from "@/components/campaigns/CampaignFilter";
import CampaignResults from "@/components/campaigns/CampaignResults";
import FeaturedCampaignsSection from "@/components/campaigns/FeaturedCampaignsSection";
import StartCampaignCTA from "@/components/campaigns/StartCampaignCTA";
import CampaignLoadingState from "@/components/campaigns/CampaignLoadingState";

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

const Campaigns = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [allCampaigns, setAllCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    async function fetchCampaigns() {
      setIsLoading(true);
      
      try {
        const { data, error } = await supabase
          .from('campaigns')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) {
          console.error('Error fetching campaigns:', error);
          return;
        }
        
        if (data) {
          const transformedCampaigns = data.map(campaign => {
            const deadlineDate = new Date(campaign.deadline);
            const currentDate = new Date();
            const timeDiff = deadlineDate.getTime() - currentDate.getTime();
            const daysLeft = Math.max(0, Math.ceil(timeDiff / (1000 * 3600 * 24)));
            
            return {
              id: campaign.id,
              title: campaign.title,
              description: campaign.description,
              raised: campaign.current_amount,
              goal: campaign.goal,
              image: campaign.image_url || '/placeholder.svg',
              category: campaign.category,
              daysLeft: daysLeft,
              featured: false
            };
          });
          
          if (transformedCampaigns.length > 0) transformedCampaigns[0].featured = true;
          if (transformedCampaigns.length > 1) transformedCampaigns[1].featured = true;
          
          setAllCampaigns(transformedCampaigns);
        }
      } catch (error) {
        console.error('Unexpected error:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchCampaigns();
  }, []);

  const filteredCampaigns = allCampaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          campaign.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? campaign.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(allCampaigns.map(campaign => campaign.category)));
  const featuredCampaigns = allCampaigns.filter(campaign => campaign.featured);
  const isFiltering = searchQuery !== "" || selectedCategory !== null;

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
  };

  return (
    <Layout>
      <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Our Campaigns
            </h1>
            <p className="mt-5 max-w-3xl mx-auto text-xl text-gray-500">
              Join our mission to create lasting change through these important initiatives.
            </p>
          </div>

          <CampaignFilter 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
          />

          {isLoading && <CampaignLoadingState />}

          {!isLoading && !isFiltering && (
            <FeaturedCampaignsSection 
              featuredCampaigns={featuredCampaigns} 
              showFeatured={true}
            />
          )}

          {!isLoading && (
            <CampaignResults 
              filteredCampaigns={filteredCampaigns}
              isFiltering={isFiltering}
              resetFilters={resetFilters}
            />
          )}

          <StartCampaignCTA />
        </div>
      </div>
    </Layout>
  );
};

export default Campaigns;
