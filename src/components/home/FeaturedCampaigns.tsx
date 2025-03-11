
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import CampaignCard from '../campaigns/CampaignCard';

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

// Mock data for featured campaigns
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
];

const FeaturedCampaigns: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading campaigns
  useEffect(() => {
    const fetchCampaigns = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCampaigns(mockCampaigns);
      setIsLoading(false);
    };

    fetchCampaigns();
  }, []);

  return (
    <section className="section-container">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="heading-lg text-gray-900 mb-3">Featured Campaigns</h2>
          <p className="text-gray-600 max-w-2xl">
            Discover active campaigns that need your support to make a real difference in the world.
          </p>
        </div>
        <Link 
          to="/campaigns" 
          className="hidden md:flex items-center text-charity-blue hover:text-charity-blue/80 transition-colors"
        >
          <span className="mr-2">View all campaigns</span>
          <ArrowRight size={18} />
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[28rem] rounded-lg bg-gray-100 shimmer"></div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
          
          <div className="mt-10 text-center md:hidden">
            <Link 
              to="/campaigns" 
              className="btn-outline inline-flex items-center"
            >
              <span>View all campaigns</span>
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </>
      )}
    </section>
  );
};

export default FeaturedCampaigns;
