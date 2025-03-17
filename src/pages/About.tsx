
import { useEffect, useRef, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";

// CountUp component for animated statistics
const CountUp = ({ end, label }: { end: number; label: string }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const duration = 2000; // 2 seconds
    const increment = end / (duration / 16); // Update roughly every 16ms
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, isVisible]);

  return (
    <div ref={counterRef} className="bg-charity-offwhite p-8 rounded-lg">
      <div className="text-4xl font-bold text-charity-green-dark mb-2">{count.toLocaleString()}+</div>
      <p className="text-lg text-gray-700">{label}</p>
    </div>
  );
};

const About = () => {
  return (
    <Layout>
      <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              About Brighter Futures
            </h1>
            <p className="mt-5 max-w-3xl mx-auto text-xl text-gray-500">
              Making a difference in the lives of children around the world.
            </p>
          </div>

          {/* Our Story */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="bg-charity-offwhite p-8 rounded-lg shadow-sm">
              <p className="text-lg text-gray-700 mb-6">
                Founded in 2010, Brighter Futures Fund began with a simple mission: to provide every child with the opportunity to thrive, regardless of their circumstances. What started as a small community initiative has grown into an international organization that has impacted the lives of over 50,000 children worldwide.
              </p>
              <p className="text-lg text-gray-700">
                Our journey began when our founder, Sarah Johnson, witnessed firsthand the challenges faced by children in underprivileged communities during her volunteer work. Determined to make a difference, she gathered a team of passionate individuals who shared her vision of creating sustainable change through education, healthcare, and community development initiatives.
              </p>
            </div>
          </div>

          {/* Our Mission and Vision */}
          <div className="grid md:grid-cols-2 gap-10 mb-20">
            <div className="bg-charity-green p-8 rounded-lg text-white">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-lg">
                To empower children and communities by providing access to quality education, healthcare, and sustainable development programs that create lasting positive change.
              </p>
            </div>
            <div className="bg-charity-green-light p-8 rounded-lg text-white">
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-lg">
                A world where every child has the opportunity to reach their full potential, free from the constraints of poverty, illness, and limited access to education.
              </p>
            </div>
          </div>

          {/* Our Team */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-10">Our Leadership Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Founder & Executive Director",
                  bio: "With over 15 years of nonprofit experience, Sarah has dedicated her career to improving children's lives globally.",
                  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmVzc2lvbmFsJTIwd29tYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                },
                {
                  name: "David Rodriguez",
                  role: "Director of Programs",
                  bio: "David brings 10 years of international development expertise, overseeing our educational and healthcare initiatives.",
                  image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2Zlc3Npb25hbCUyMG1hbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                },
                {
                  name: "Michelle Lee",
                  role: "Chief Financial Officer",
                  bio: "A finance expert with a passion for nonprofit work, Michelle ensures our resources have maximum impact.",
                  image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHByb2Zlc3Npb25hbCUyMHdvbWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
                },
                {
                  name: "James Wilson",
                  role: "Director of Partnerships",
                  bio: "James builds strategic relationships with corporate partners and foundations to expand our reach.",
                  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHByb2Zlc3Npb25hbCUyMG1hbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                },
                {
                  name: "Priya Patel",
                  role: "Director of Global Operations",
                  bio: "With experience in 20+ countries, Priya coordinates our international programs and field teams.",
                  image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2Zlc3Npb25hbCUyMHdvbWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
                },
                {
                  name: "Daniel Kim",
                  role: "Communications Director",
                  bio: "Daniel leads our storytelling efforts, bringing the impact of our work to supporters worldwide.",
                  image: "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2Zlc3Npb25hbCUyMG1hbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                }
              ].map((member, index) => (
                <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
                  <div className="h-48 bg-gray-200">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-charity-green mb-3">{member.role}</p>
                    <p className="text-gray-600">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Our Impact */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <CountUp end={50000} label="Children supported through our programs" />
              <CountUp end={200} label="Schools built or renovated" />
              <CountUp end={25} label="Countries where we operate" />
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-charity-green-light text-center p-10 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Our Mission</h2>
            <p className="text-lg text-gray-800 mb-6 max-w-3xl mx-auto">
              There are many ways to get involved and support our work. Whether through donations, volunteering, or partnerships, your contribution makes a difference.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/donate" className="bg-charity-green text-white py-3 px-6 rounded-md font-medium hover:bg-charity-green-dark transition-colors">
                Donate Now
              </Link>
              <Link to="/contact" className="bg-white text-charity-green-dark py-3 px-6 rounded-md font-medium hover:bg-gray-100 transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
