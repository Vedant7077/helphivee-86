
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, TrendingUp, Users } from 'lucide-react';

const Hero: React.FC = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  return (
    <section className="relative pt-20 md:pt-28 lg:pt-36 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 z-0"></div>
      
      {/* Circles decoration */}
      <div className="absolute top-32 right-10 w-64 h-64 rounded-full bg-charity-blue/5 -z-10"></div>
      <div className="absolute top-48 left-0 w-80 h-80 rounded-full bg-charity-coral/5 -z-10"></div>
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative">
        <div className="text-center pb-16 md:pb-24 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-8">
            <span className="block">Make a difference with</span>
            <span className="block text-charity-blue">every donation</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-10">
            Join thousands of donors and volunteers to create a brighter future for communities in need around the world.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/campaigns" className="btn-primary">
              Explore Campaigns
            </Link>
            <Link to="/create-campaign" className="btn-outline">
              Start a Campaign
            </Link>
          </div>
        </div>
        
        {/* Scrolling image */}
        <div className="relative h-[30rem] md:h-[35rem] max-w-5xl mx-auto rounded-xl overflow-hidden mb-8 shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1593113598332-cd59a93e6f6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="People helping in community"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent flex items-end">
            <div className="p-8 md:p-12 text-white">
              <div className="inline-block bg-charity-coral px-4 py-1 rounded-full text-sm font-medium mb-4">
                Featured Campaign
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Help Rebuild Schools in Rural Communities
              </h2>
              <p className="text-white/90 max-w-xl mb-4">
                Join our mission to rebuild 50 schools damaged by natural disasters, providing safe learning environments for over 15,000 children.
              </p>
              <Link 
                to="/campaigns/1" 
                className="inline-block bg-white text-charity-blue px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-all"
              >
                Donate Now
              </Link>
            </div>
          </div>
        </div>
        
        {/* Stats */}
        <div 
          ref={statsRef} 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-20 opacity-0 transition-opacity duration-1000"
        >
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center bg-charity-blue/10 rounded-full mb-4">
              <Heart size={30} className="text-charity-blue" />
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-2">$1.2M+</h3>
            <p className="text-gray-600">Donations Raised</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center bg-charity-coral/10 rounded-full mb-4">
              <TrendingUp size={30} className="text-charity-coral" />
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-2">230+</h3>
            <p className="text-gray-600">Successful Campaigns</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center bg-charity-blue/10 rounded-full mb-4">
              <Users size={30} className="text-charity-blue" />
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-2">50K+</h3>
            <p className="text-gray-600">Lives Impacted</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
