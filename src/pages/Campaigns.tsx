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
  status?: string;
}

const Campaigns = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [allCampaigns, setAllCampaigns] = useState<Campaign[]>([]);
  const [completedCampaigns, setCompletedCampaigns] = useState<Campaign[]>([]);
  const [showCompleted, setShowCompleted] = useState(false);

  const fetchCampaigns = async () => {
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
      
      let activeCampaigns: Campaign[] = [];
      let finishedCampaigns: Campaign[] = [];
      
      if (data && data.length > 0) {
        const transformedCampaigns = data.map((campaign, index) => {
          const deadlineDate = new Date(campaign.deadline);
          const currentDate = new Date();
          const timeDiff = deadlineDate.getTime() - currentDate.getTime();
          const daysLeft = Math.max(0, Math.ceil(timeDiff / (1000 * 3600 * 24)));
          
          // Check if campaign is completed (reached goal or past deadline)
          const isCompleted = campaign.status === 'completed' || 
                              campaign.current_amount >= campaign.goal || 
                              daysLeft === 0;
          
          // If completed, update status in database if needed
          if (isCompleted && campaign.status !== 'completed') {
            updateCampaignStatus(campaign.id, 'completed');
          }
          
          // Mark featured campaigns (first 2 active ones)
          const transformedCampaign = {
            id: campaign.id,
            title: campaign.title,
            description: campaign.description,
            raised: campaign.current_amount,
            goal: campaign.goal,
            image: campaign.image_url || '/placeholder.svg',
            category: campaign.category,
            daysLeft: daysLeft,
            status: isCompleted ? 'completed' : 'active',
            featured: false // Will set this later for active campaigns
          };
          
          if (isCompleted) {
            finishedCampaigns.push(transformedCampaign);
          } else {
            activeCampaigns.push(transformedCampaign);
          }
          
          return transformedCampaign;
        });
        
        // Mark first 2 active campaigns as featured
        if (activeCampaigns.length > 0) {
          activeCampaigns[0].featured = true;
          if (activeCampaigns.length > 1) {
            activeCampaigns[1].featured = true;
          }
        }
      }
      
      setAllCampaigns(activeCampaigns);
      setCompletedCampaigns(finishedCampaigns);
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateCampaignStatus = async (campaignId: string | number, status: string) => {
    try {
      const { error } = await supabase
        .from('campaigns')
        .update({ status: status })
        .eq('id', campaignId.toString());
        
      if (error) {
        console.error('Error updating campaign status:', error);
      }
    } catch (error) {
      console.error('Unexpected error updating status:', error);
    }
  };

  useEffect(() => {
    fetchCampaigns();
    
    // Subscribe to campaign updates
    const channel = supabase
      .channel('public:campaigns')
      .on('postgres_changes', 
        { event: 'UPDATE', schema: 'public', table: 'campaigns' }, 
        (payload) => {
          console.log('Campaign updated:', payload);
          fetchCampaigns(); // Refresh the campaigns list
        }
      )
      .subscribe();
      
    // Also subscribe to new donations
    const donationsChannel = supabase
      .channel('public:donations')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'donations' }, 
        (payload) => {
          console.log('New donation:', payload);
          fetchCampaigns(); // Refresh the campaigns list when a new donation is made
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
      supabase.removeChannel(donationsChannel);
    };
  }, []);

  const filteredCampaigns = allCampaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          campaign.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? campaign.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });
  
  const filteredCompletedCampaigns = completedCampaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          campaign.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? campaign.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set([...allCampaigns, ...completedCampaigns].map(campaign => campaign.category)));
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
              showFeatured={featuredCampaigns.length > 0}
            />
          )}

          {!isLoading && (
            <div className="mb-16">
              <CampaignResults 
                filteredCampaigns={filteredCampaigns}
                isFiltering={isFiltering}
                resetFilters={resetFilters}
              />
            </div>
          )}
          
          {!isLoading && completedCampaigns.length > 0 && (
            <div className="mb-16">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Completed Campaigns
                </h2>
                <button 
                  onClick={() => setShowCompleted(!showCompleted)}
                  className="text-charity-blue hover:underline"
                >
                  {showCompleted ? 'Hide' : 'Show'}
                </button>
              </div>
              
              {showCompleted && (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {filteredCompletedCampaigns.map(campaign => (
                    <div key={campaign.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="h-48 bg-gray-200 relative">
                        <img 
                          src={campaign.image} 
                          alt={campaign.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-0 right-0 bg-charity-green text-white px-3 py-1 text-sm font-medium z-10">
                          Completed
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{campaign.title}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{campaign.description}</p>
                        <div className="mb-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-charity-green h-2.5 rounded-full" 
                              style={{ width: `100%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex justify-between text-sm font-medium">
                          <span className="text-charity-green-dark">${campaign.raised.toLocaleString()} raised</span>
                          <span className="text-gray-500">of ${campaign.goal.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <StartCampaignCTA />
        </div>
      </div>
    </Layout>
  );
};

export default Campaigns;
