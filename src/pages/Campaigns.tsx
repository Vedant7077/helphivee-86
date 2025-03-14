import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

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

const CampaignCard = ({ campaign }: { campaign: Campaign }) => {
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

          <div className="mb-10 bg-white p-6 rounded-lg shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  type="text"
                  placeholder="Search campaigns..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="md:col-span-1">
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={selectedCategory || ""}
                  onChange={(e) => setSelectedCategory(e.target.value || null)}
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-1">
                <Button 
                  className="w-full bg-charity-blue hover:bg-charity-blue-light"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory(null);
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>

          {isLoading && (
            <div className="text-center py-16">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent text-charity-blue align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
              </div>
              <p className="mt-4 text-lg text-gray-600">Loading campaigns...</p>
            </div>
          )}

          {!isLoading && !searchQuery && !selectedCategory && featuredCampaigns.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Campaigns</h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
                {featuredCampaigns.map(campaign => (
                  <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
              </div>
            </div>
          )}

          {!isLoading && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {searchQuery || selectedCategory ? "Search Results" : "All Campaigns"}
              </h2>
              
              {filteredCampaigns.length > 0 ? (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {filteredCampaigns.map(campaign => (
                    <CampaignCard key={campaign.id} campaign={campaign} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-white rounded-lg shadow-sm">
                  <p className="text-lg text-gray-600">No campaigns found matching your criteria.</p>
                  <Button 
                    className="mt-4 bg-charity-blue hover:bg-charity-blue-light"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory(null);
                    }}
                  >
                    View All Campaigns
                  </Button>
                </div>
              )}
            </div>
          )}

          <div className="mt-20 bg-charity-coral-light p-10 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Start Your Own Campaign</h2>
            <p className="text-lg text-gray-800 mb-6 max-w-3xl mx-auto">
              Have a cause you're passionate about? Start your own fundraising campaign and make a difference with us.
            </p>
            <Button className="bg-charity-coral hover:bg-charity-coral-dark text-white px-8 py-3 text-lg">
              Start a Campaign
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Campaigns;
