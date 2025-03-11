
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
              <Link to="/donate">Donate Now</Link>
            </Button>
          </div>
          <div className="mt-3">
            <Button variant="outline" className="w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-charity-blue bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
              <Link to="/campaigns">Start a Campaign</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Hero;
