
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Campaign {
  id: number;
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

  const allCampaigns: Campaign[] = [
    {
      id: 1,
      title: "Education for Rural Children",
      description: "Help provide educational resources to underprivileged children in rural communities.",
      raised: 3500,
      goal: 10000,
      image: "/placeholder.svg",
      category: "Education",
      daysLeft: 30,
      featured: true
    },
    {
      id: 2,
      title: "Clean Water Initiative",
      description: "Support our mission to bring clean drinking water to communities in need.",
      raised: 7500,
      goal: 15000,
      image: "/placeholder.svg",
      category: "Health",
      daysLeft: 45,
      featured: true
    },
    {
      id: 3,
      title: "Medical Aid for Families",
      description: "Provide essential medical supplies and care to families without access to healthcare.",
      raised: 2000,
      goal: 5000,
      image: "/placeholder.svg",
      category: "Health",
      daysLeft: 15
    },
    {
      id: 4,
      title: "School Building Project",
      description: "Help us build a new school in a remote village to serve 500 children without access to education.",
      raised: 12000,
      goal: 50000,
      image: "/placeholder.svg",
      category: "Education",
      daysLeft: 60
    },
    {
      id: 5,
      title: "Emergency Food Relief",
      description: "Provide food assistance to families affected by recent natural disasters in the region.",
      raised: 8500,
      goal: 20000,
      image: "/placeholder.svg",
      category: "Emergency",
      daysLeft: 10
    },
    {
      id: 6,
      title: "Women's Empowerment Program",
      description: "Support training and microfinance programs for women to start their own businesses and support their families.",
      raised: 5500,
      goal: 15000,
      image: "/placeholder.svg",
      category: "Community",
      daysLeft: 25
    },
    {
      id: 7,
      title: "Digital Literacy for Youth",
      description: "Equip young people with the digital skills they need to succeed in today's technology-driven world.",
      raised: 4200,
      goal: 12000,
      image: "/placeholder.svg",
      category: "Education",
      daysLeft: 35
    },
    {
      id: 8,
      title: "Community Garden Project",
      description: "Help establish sustainable community gardens that provide fresh produce and income for local families.",
      raised: 3800,
      goal: 8000,
      image: "/placeholder.svg",
      category: "Community",
      daysLeft: 20
    },
    {
      id: 9,
      title: "Children's Healthcare Program",
      description: "Provide essential healthcare services and disease prevention programs for children in underserved areas.",
      raised: 9500,
      goal: 25000,
      image: "/placeholder.svg",
      category: "Health",
      daysLeft: 40
    }
  ];

  const categories = Array.from(new Set(allCampaigns.map(campaign => campaign.category)));

  // Filter campaigns based on search query and selected category
  const filteredCampaigns = allCampaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          campaign.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? campaign.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Our Campaigns
            </h1>
            <p className="mt-5 max-w-3xl mx-auto text-xl text-gray-500">
              Join our mission to create lasting change through these important initiatives.
            </p>
          </div>

          {/* Search and Filter */}
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

          {/* Featured Campaigns */}
          {(searchQuery === "" && selectedCategory === null) && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Campaigns</h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
                {allCampaigns.filter(campaign => campaign.featured).map(campaign => (
                  <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
              </div>
            </div>
          )}

          {/* All Campaigns */}
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

          {/* Start Your Campaign */}
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
