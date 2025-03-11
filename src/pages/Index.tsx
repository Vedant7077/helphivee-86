
import { Button } from "@/components/ui/button";
import { useState } from "react";

// Note: Eventually these components will be imported when they're created
const Hero = () => (
  <div className="relative bg-gradient-to-b from-charity-blue to-charity-blue-light py-20 px-4 sm:px-6 lg:px-8 text-white">
    <div className="max-w-7xl mx-auto">
      <div className="sm:text-center lg:text-left animate-fade-up">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          <span className="block">Make a difference in</span>
          <span className="block text-charity-coral-light">someone's life today</span>
        </h1>
        <p className="mt-3 text-base sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
          Join our mission to create brighter futures for children in need through 
          education, healthcare, and community development.
        </p>
        <div className="mt-8 sm:mt-10">
          <div className="rounded-md shadow">
            <Button className="w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-white bg-charity-coral hover:bg-charity-coral-light md:py-4 md:text-lg md:px-10">
              Donate Now
            </Button>
          </div>
          <div className="mt-3">
            <Button variant="outline" className="w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-charity-blue bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
              Start a Campaign
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

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
              className="bg-charity-blue h-2.5 rounded-full" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <div className="flex justify-between text-sm font-medium">
          <span className="text-charity-blue">${raised.toLocaleString()} raised</span>
          <span className="text-gray-500">of ${goal.toLocaleString()}</span>
        </div>
        <Button className="w-full mt-4 bg-charity-blue hover:bg-charity-blue-light text-white">
          Donate
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
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Clean Water Initiative",
      description: "Support our mission to bring clean drinking water to communities in need.",
      raised: 7500,
      goal: 15000,
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Medical Aid for Families",
      description: "Provide essential medical supplies and care to families without access to healthcare.",
      raised: 2000,
      goal: 5000,
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
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
          <Button variant="outline" className="px-6 py-3 text-charity-blue border-charity-blue hover:bg-charity-blue hover:text-white">
            View All Campaigns
          </Button>
        </div>
      </div>
    </div>
  );
};

const MissionSection = () => (
  <div className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="lg:text-center">
        <h2 className="text-base text-charity-coral-light font-semibold tracking-wide uppercase">Our Mission</h2>
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Building brighter futures together
        </p>
        <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
          We believe that every child deserves a chance at a bright future, regardless of their circumstances.
        </p>
      </div>

      <div className="mt-10">
        <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
          {[
            {
              title: "Education Support",
              description: "Providing access to quality education and learning resources for underprivileged children.",
              icon: "📚"
            },
            {
              title: "Healthcare Initiatives",
              description: "Ensuring children have access to essential healthcare services and medical treatments.",
              icon: "🏥"
            },
            {
              title: "Community Development",
              description: "Building stronger communities through infrastructure improvements and support programs.",
              icon: "🏘️"
            },
            {
              title: "Emergency Relief",
              description: "Responding quickly to emergencies and natural disasters to protect vulnerable children.",
              icon: "🆘"
            }
          ].map((feature, index) => (
            <div key={index} className="relative">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-charity-blue text-white text-2xl">
                {feature.icon}
              </div>
              <div className="ml-16">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-base text-gray-500">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const CallToAction = () => (
  <div className="bg-charity-coral-light">
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
      <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        <span className="block">Ready to make a difference?</span>
        <span className="block">Start today with us.</span>
      </h2>
      <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
        <div className="inline-flex rounded-md shadow">
          <Button className="px-6 py-3 text-base font-medium rounded-md text-charity-coral bg-white hover:bg-gray-50">
            Start a Campaign
          </Button>
        </div>
        <div className="ml-3 inline-flex rounded-md shadow">
          <Button variant="secondary" className="px-6 py-3 text-base font-medium rounded-md text-white bg-charity-coral border border-white hover:bg-charity-coral-light">
            Volunteer With Us
          </Button>
        </div>
      </div>
    </div>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <FeaturedCampaigns />
      <MissionSection />
      <CallToAction />
    </div>
  );
};

export default Index;
