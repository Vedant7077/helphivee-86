
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Featured Campaign component
const FeaturedCampaign = ({ title, description, raised, goal, image }: { 
  title: string; 
  description: string; 
  raised: number; 
  goal: number; 
  image: string;
}) => {
  const progress = Math.min(Math.round((raised / goal) * 100), 100);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="h-48 bg-gray-200 relative">
        <div className="absolute inset-0 bg-gray-300 animate-pulse-subtle"></div>
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }}
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        <div className="mb-2">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-charity-green h-2.5 rounded-full" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <div className="flex justify-between text-sm font-medium">
          <span className="text-charity-green-dark">${raised.toLocaleString()} raised</span>
          <span className="text-gray-500">of ${goal.toLocaleString()}</span>
        </div>
        <Button className="w-full mt-4 bg-charity-green hover:bg-charity-green-dark text-white">
          <Link to="/donate" className="w-full h-full flex items-center justify-center">Donate</Link>
        </Button>
      </div>
    </div>
  );
};

const FeaturedCampaigns = () => {
  const campaigns = [
    {
      id: 1,
      title: "Education for Rural Children",
      description: "Help provide educational resources to underprivileged children in rural communities.",
      raised: 3500,
      goal: 10000,
      image: "https://images.unsplash.com/photo-1522661067900-ab829854a57f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZWR1Y2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 2,
      title: "Clean Water Initiative",
      description: "Support our mission to bring clean drinking water to communities in need.",
      raised: 7500,
      goal: 15000,
      image: "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2xlYW4lMjB3YXRlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 3,
      title: "Medical Aid for Families",
      description: "Provide essential medical supplies and care to families without access to healthcare.",
      raised: 2000,
      goal: 5000,
      image: "https://images.unsplash.com/photo-1624727828489-a1e03b79bba8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1lZGljYWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
    }
  ];

  return (
    <div className="py-16 bg-charity-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Featured Campaigns
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Join these important causes and help make a difference
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {campaigns.map(campaign => (
            <FeaturedCampaign 
              key={campaign.id}
              title={campaign.title}
              description={campaign.description}
              raised={campaign.raised}
              goal={campaign.goal}
              image={campaign.image}
            />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button variant="outline" className="px-6 py-3 text-base font-medium rounded-md text-charity-green-dark border-charity-green hover:bg-charity-green hover:text-white">
            <Link to="/campaigns" className="w-full h-full flex items-center justify-center">View All Campaigns</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCampaigns;
