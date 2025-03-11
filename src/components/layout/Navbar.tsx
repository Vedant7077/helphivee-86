
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-charity-blue">Brighter Futures</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link to="/" className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-charity-blue">
                Home
              </Link>
              <Link to="/campaigns" className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-charity-blue">
                Campaigns
              </Link>
              <Link to="/about" className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-charity-blue">
                About Us
              </Link>
              <Link to="/contact" className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-charity-blue">
                Contact
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline" className="border-charity-blue text-charity-blue hover:bg-charity-blue hover:text-white">
                Login
              </Button>
            </Link>
            <Link to="/donate">
              <Button className="bg-charity-coral hover:bg-charity-coral-light text-white">
                Donate Now
              </Button>
            </Link>
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-charity-blue">
              Home
            </Link>
            <Link to="/campaigns" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-charity-blue">
              Campaigns
            </Link>
            <Link to="/about" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-charity-blue">
              About Us
            </Link>
            <Link to="/contact" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-charity-blue">
              Contact
            </Link>
            <div className="mt-4 flex flex-col space-y-2 px-3">
              <Link to="/login">
                <Button variant="outline" className="w-full border-charity-blue text-charity-blue hover:bg-charity-blue hover:text-white">
                  Login
                </Button>
              </Link>
              <Link to="/donate">
                <Button className="w-full bg-charity-coral hover:bg-charity-coral-light text-white">
                  Donate Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
