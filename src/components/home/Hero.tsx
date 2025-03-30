
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const backgroundImages = [
  "https://images.unsplash.com/photo-1593113630400-ea4288922497?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", // Children smiling
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", // Community help
  "https://images.unsplash.com/photo-1469571486292-b53e58fd5e1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", // Volunteer work
  "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"  // Helping hands
];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % backgroundImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div 
      className="relative py-20 px-4 sm:px-6 lg:px-8 text-white min-h-[500px] transition-all duration-1000 ease-in-out"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImages[currentImageIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="sm:text-center lg:text-left animate-fade-up">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            <span className="block">Make a difference in</span>
            <span className="block text-charity-offwhite">someone's life today</span>
          </h1>
          <p className="mt-3 text-base sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
            Join our mission to create brighter futures for children in need through 
            education, healthcare, and community development.
          </p>
          <div className="mt-8 sm:mt-10 flex flex-wrap gap-4">
            <Link to="/donate" className="w-auto">
              <Button className="px-6 py-2 text-sm font-medium rounded-md text-charity-green-dark bg-charity-offwhite hover:bg-white md:py-2 md:text-base">
                Donate Now
              </Button>
            </Link>
            <Link to="/create-campaign" className="w-auto">
              <Button variant="outline" className="px-6 py-2 text-sm font-medium rounded-md text-charity-offwhite bg-transparent border-charity-offwhite hover:bg-charity-green md:py-2 md:text-base">
                Start a Campaign
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
