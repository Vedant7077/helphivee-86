
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

  // Dummy campaigns with relevant images
  const dummyCampaigns: Campaign[] = [
    {
      id: "dummy1",
      title: "Clean Water for Rural Villages",
      description: "Help us provide clean drinking water to remote villages in Africa. Many children have to walk miles each day just to collect water that often isn't safe to drink.",
      raised: 37500,
      goal: 60000,
      image: "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      category: "Water & Sanitation",
      daysLeft: 43,
      featured: true
    },
    {
      id: "dummy2",
      title: "Education for Girls in South Asia",
      description: "Support our initiative to build schools and provide scholarships for girls who are denied education due to cultural barriers and poverty.",
      raised: 28000,
      goal: 50000,
      image: "https://images.unsplash.com/photo-1594608661623-aa0bd3a69799?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1548&q=80",
      category: "Education",
      daysLeft: 67,
      featured: true
    },
    {
      id: "dummy3",
      title: "Emergency Food Relief for Refugees",
      description: "Provide nutritious meals for refugee families who have been displaced by conflict and are living in temporary camps with limited resources.",
      raised: 42000,
      goal: 75000,
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "Food Security",
      daysLeft: 28
    },
    {
      id: "dummy4",
      title: "Rainforest Conservation Project",
      description: "Help us preserve endangered rainforest regions and the indigenous communities who depend on them for their livelihoods and cultural heritage.",
      raised: 58000,
      goal: 100000,
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      category: "Environment",
      daysLeft: 94
    },
    {
      id: "dummy5",
      title: "Mobile Health Clinics for Rural Communities",
      description: "Fund our fleet of mobile clinics that bring essential healthcare services to remote areas where medical facilities are scarce or nonexistent.",
      raised: 62000,
      goal: 85000,
      image: "https://images.unsplash.com/photo-1631248055158-edec7a3c072e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80",
      category: "Healthcare",
      daysLeft: 52
    },
    {
      id: "dummy6",
      title: "Wildlife Protection Initiative",
      description: "Support anti-poaching efforts and habitat preservation for endangered species in national parks and protected areas across Africa.",
      raised: 45000,
      goal: 120000,
      image: "https://images.unsplash.com/photo-1574722772249-e21eeef4f1bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      category: "Wildlife",
      daysLeft: 71
    }
  ];

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
        
        let combinedCampaigns = [...dummyCampaigns];
        
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
          
          // Combine user campaigns with dummy campaigns
          combinedCampaigns = [...combinedCampaigns, ...transformedCampaigns];
        }
        
        setAllCampaigns(combinedCampaigns);
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
