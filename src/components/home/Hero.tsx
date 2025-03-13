
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => (
  <div className="relative bg-gradient-to-b from-charity-green-dark to-charity-green-light py-20 px-4 sm:px-6 lg:px-8 text-white">
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

export default Hero;
