
import React, { useState, useEffect } from 'react';
import CampaignCard from './CampaignCard';
import { Search, Filter, X } from 'lucide-react';

// Define campaign interface
interface Campaign {
  id: string;
  title: string;
  description: string;
  category: string;
  goalAmount: number;
  raisedAmount: number;
  daysLeft: number;
  imageUrl: string;
  organizer: {
    name: string;
    avatar: string;
  };
}

// Extended mock data for campaign list
const mockCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'Clean Water for Rural Communities',
    description: 'Help us provide clean water solutions to villages facing severe water shortages.',
    category: 'Water & Sanitation',
    goalAmount: 50000,
    raisedAmount: 34250,
    daysLeft: 15,
    imageUrl: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    organizer: {
      name: 'Water Aid Foundation',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    },
  },
  {
    id: '2',
    title: 'Education for Underprivileged Children',
    description: 'Support education initiatives for children from low-income families to break the cycle of poverty.',
    category: 'Education',
    goalAmount: 75000,
    raisedAmount: 45000,
    daysLeft: 30,
    imageUrl: 'https://images.unsplash.com/photo-1594608661623-aa0bd3a69799?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1548&q=80',
    organizer: {
      name: 'Education First',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
  },
  {
    id: '3',
    title: 'Wildlife Conservation Efforts',
    description: 'Join our mission to protect endangered species and their habitats from human encroachment.',
    category: 'Environment',
    goalAmount: 100000,
    raisedAmount: 68000,
    daysLeft: 45,
    imageUrl: 'https://images.unsplash.com/photo-1574722772249-e21eeef4f1bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    organizer: {
      name: 'Wildlife Trust',
      avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
    },
  },
  {
    id: '4',
    title: 'Medical Support for Children with Rare Diseases',
    description: 'Provide life-saving treatments for children diagnosed with rare genetic disorders.',
    category: 'Healthcare',
    goalAmount: 120000,
    raisedAmount: 89000,
    daysLeft: 60,
    imageUrl: 'https://images.unsplash.com/photo-1631248055158-edec7a3c072e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80',
    organizer: {
      name: 'MediCare Foundation',
      avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
    },
  },
  {
    id: '5',
    title: 'Food Security Initiative for Low-Income Families',
    description: 'Establish sustainable food banks and community gardens in food deserts across urban areas.',
    category: 'Food Security',
    goalAmount: 40000,
    raisedAmount: 28500,
    daysLeft: 25,
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    organizer: {
      name: 'Community Food Network',
      avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
    },
  },
  {
    id: '6',
    title: 'Emergency Shelter for Domestic Violence Survivors',
    description: 'Help us build a new shelter to provide safe housing and support services for survivors of domestic abuse.',
    category: 'Human Rights',
    goalAmount: 85000,
    raisedAmount: 37000,
    daysLeft: 90,
    imageUrl: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    organizer: {
      name: 'Safe Haven Alliance',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
  }
];

// Available categories for filtering
const categories = [
  'All Categories',
  'Education',
  'Healthcare',
  'Environment',
  'Water & Sanitation',
  'Food Security',
  'Human Rights',
];

const CampaignList: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  // Fetch campaigns
  useEffect(() => {
    const fetchCampaigns = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1200));
      setCampaigns(mockCampaigns);
      setFilteredCampaigns(mockCampaigns);
      setIsLoading(false);
    };

    fetchCampaigns();
  }, []);

  // Handle filtering and searching
  useEffect(() => {
    let result = [...campaigns];
    
    // Filter by category
    if (selectedCategory !== 'All Categories') {
      result = result.filter(campaign => campaign.category === selectedCategory);
    }
    
    // Search by title or description
    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      result = result.filter(
        campaign =>
          campaign.title.toLowerCase().includes(lowerCaseSearch) ||
          campaign.description.toLowerCase().includes(lowerCaseSearch)
      );
    }
    
    setFilteredCampaigns(result);
  }, [campaigns, selectedCategory, searchTerm]);

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All Categories');
  };

  return (
    <div className="section-container animate-fade-in">
      {/* Search and filter section */}
      <div className="mb-10 space-y-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <Search size={20} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-charity-blue focus:border-transparent"
          />
        </div>
        
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                selectedCategory === category
                  ? 'bg-charity-blue text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Active filters */}
        {(selectedCategory !== 'All Categories' || searchTerm) && (
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-3">Active filters:</span>
            {selectedCategory !== 'All Categories' && (
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center mr-2">
                {selectedCategory}
                <button onClick={() => setSelectedCategory('All Categories')} className="ml-2">
                  <X size={14} className="text-gray-500" />
                </button>
              </span>
            )}
            {searchTerm && (
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center mr-2">
                "{searchTerm}"
                <button onClick={() => setSearchTerm('')} className="ml-2">
                  <X size={14} className="text-gray-500" />
                </button>
              </span>
            )}
            <button 
              onClick={resetFilters}
              className="text-sm text-charity-blue hover:underline"
            >
              Reset all
            </button>
          </div>
        )}
      </div>

      {/* Campaign grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-[28rem] rounded-lg bg-gray-100 shimmer"></div>
          ))}
        </div>
      ) : filteredCampaigns.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="mb-4">
            <Filter size={48} className="mx-auto text-gray-300" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No matching campaigns found</h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search or filter criteria.
          </p>
          <button
            onClick={resetFilters}
            className="btn-outline"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default CampaignList;
