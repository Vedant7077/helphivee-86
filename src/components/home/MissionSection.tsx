
import React, { useRef, useEffect } from 'react';
import { Heart, Globe, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const MissionSection: React.FC = () => {
  const missionRef = useRef<HTMLDivElement>(null);
  
  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
            entry.target.classList.remove('opacity-0');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (missionRef.current) {
      observer.observe(missionRef.current);
    }

    return () => {
      if (missionRef.current) {
        observer.unobserve(missionRef.current);
      }
    };
  }, []);

  return (
    <section className="bg-gray-50 py-20">
      <div 
        ref={missionRef} 
        className="section-container opacity-0 transition-opacity duration-1000"
      >
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block text-charity-coral font-medium rounded-full px-4 py-1 border border-charity-coral text-sm mb-4">
            Our Mission
          </span>
          <h2 className="heading-lg text-gray-900">
            Creating change through collective action
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            We believe that everyone has the power to make a difference. 
            By connecting donors, volunteers, and communities, we create 
            sustainable solutions for a better future.
          </p>
        </div>
        
        {/* Values grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="glass-card p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-charity-blue/10 rounded-full mb-6">
              <Heart size={30} className="text-charity-blue" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Compassion</h3>
            <p className="text-gray-600">
              We approach every initiative with empathy and understanding, 
              focusing on the needs of the communities we serve.
            </p>
          </div>
          
          <div className="glass-card p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-charity-coral/10 rounded-full mb-6">
              <Globe size={30} className="text-charity-coral" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Sustainability</h3>
            <p className="text-gray-600">
              Our projects are designed to create lasting impact, addressing 
              the root causes of problems rather than just the symptoms.
            </p>
          </div>
          
          <div className="glass-card p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-charity-blue/10 rounded-full mb-6">
              <Users size={30} className="text-charity-blue" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Community</h3>
            <p className="text-gray-600">
              We build strong relationships between donors, volunteers, and 
              beneficiaries, creating a global community of change-makers.
            </p>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-charity-blue/5 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
          <div className="md:max-w-2xl mb-8 md:mb-0">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Ready to make a difference?
            </h3>
            <p className="text-gray-600 text-lg">
              Whether you want to donate, volunteer, or start your own fundraising 
              campaign, your contribution matters. Join our community today.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/campaigns" className="btn-primary">
              Donate Now
            </Link>
            <Link to="/volunteer" className="btn-outline">
              Volunteer
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
