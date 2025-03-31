
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
                  name: "Emma Thompson",
                  role: "Founder & Executive Director",
                  bio: "With 20+ years of experience in international development, Emma has built Brighter Futures from the ground up with a focus on sustainable community impact.",
                  image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                },
                {
                  name: "Michael Chen",
                  role: "Chief Operations Officer",
                  bio: "Michael oversees our global operations in 25 countries, bringing efficiency and innovation to our programs with his background in tech and humanitarian work.",
                  image: "https://images.unsplash.com/photo-1600878459108-617a253537e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                },
                {
                  name: "Sophia Garcia",
                  role: "Director of Education Programs",
                  bio: "A former educator with 15 years in curriculum development, Sophia has designed our education initiatives that have reached over 30,000 children worldwide.",
                  image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                },
                {
                  name: "Daniel Okafor",
                  role: "Chief Financial Officer",
                  bio: "Daniel ensures our resources have maximum impact through strategic financial planning and transparent reporting, with expertise from both corporate and nonprofit sectors.",
                  image: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                },
                {
                  name: "Aisha Patel",
                  role: "Director of Healthcare Initiatives",
                  bio: "With a background in public health and medicine, Aisha leads our healthcare programs that have established 50+ clinics in underserved communities.",
                  image: "https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                },
                {
                  name: "Carlos Martinez",
                  role: "Director of Partnerships",
                  bio: "Carlos has cultivated relationships with over 100 corporate and NGO partners, expanding our reach and impact through strategic collaborations and funding.",
                  image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
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
