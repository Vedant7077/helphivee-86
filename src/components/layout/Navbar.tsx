
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-charity-green-dark">Brighter Futures</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link 
                to="/" 
                className={`inline-flex items-center px-1 pt-1 ${isActive('/') 
                  ? 'text-charity-green-dark border-b-2 border-charity-green' 
                  : 'text-gray-500 hover:text-charity-green'}`}
              >
                Home
              </Link>
              <Link 
                to="/campaigns" 
                className={`inline-flex items-center px-1 pt-1 ${isActive('/campaigns') 
                  ? 'text-charity-green-dark border-b-2 border-charity-green' 
                  : 'text-gray-500 hover:text-charity-green'}`}
              >
                Campaigns
              </Link>
              <Link 
                to="/about" 
                className={`inline-flex items-center px-1 pt-1 ${isActive('/about') 
                  ? 'text-charity-green-dark border-b-2 border-charity-green' 
                  : 'text-gray-500 hover:text-charity-green'}`}
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                className={`inline-flex items-center px-1 pt-1 ${isActive('/contact') 
                  ? 'text-charity-green-dark border-b-2 border-charity-green' 
                  : 'text-gray-500 hover:text-charity-green'}`}
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/create-campaign">
                  <Button variant="outline" className="border-charity-green text-charity-green-dark hover:bg-charity-green hover:text-white">
                    Start a Campaign
                  </Button>
                </Link>
                <Link to="/donate">
                  <Button className="bg-charity-green hover:bg-charity-green-dark text-white">
                    Donate Now
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-10 w-10 rounded-full p-0">
                      <User className="h-5 w-5 text-charity-green-dark" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to="/profile" className="w-full">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/dashboard" className="w-full">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()}>
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/create-campaign">
                  <Button variant="outline" className="border-charity-green text-charity-green-dark hover:bg-charity-green hover:text-white">
                    Start a Campaign
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" className="border-charity-green text-charity-green-dark hover:bg-charity-green hover:text-white">
                    Login
                  </Button>
                </Link>
                <Link to="/donate">
                  <Button className="bg-charity-green hover:bg-charity-green-dark text-white">
                    Donate Now
                  </Button>
                </Link>
              </>
            )}
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
            <Link 
              to="/" 
              className={`block pl-3 pr-4 py-2 text-base font-medium ${isActive('/') 
                ? 'text-charity-green-dark bg-charity-offwhite' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-charity-green'}`}
            >
              Home
            </Link>
            <Link 
              to="/campaigns" 
              className={`block pl-3 pr-4 py-2 text-base font-medium ${isActive('/campaigns') 
                ? 'text-charity-green-dark bg-charity-offwhite' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-charity-green'}`}
            >
              Campaigns
            </Link>
            <Link 
              to="/about" 
              className={`block pl-3 pr-4 py-2 text-base font-medium ${isActive('/about') 
                ? 'text-charity-green-dark bg-charity-offwhite' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-charity-green'}`}
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              className={`block pl-3 pr-4 py-2 text-base font-medium ${isActive('/contact') 
                ? 'text-charity-green-dark bg-charity-offwhite' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-charity-green'}`}
            >
              Contact
            </Link>
            <div className="mt-4 flex flex-col space-y-2 px-3">
              {user ? (
                <>
                  <Link to="/create-campaign">
                    <Button variant="outline" className="w-full border-charity-green text-charity-green-dark hover:bg-charity-green hover:text-white">
                      Start a Campaign
                    </Button>
                  </Link>
                  <Link to="/profile">
                    <Button variant="outline" className="w-full border-charity-green text-charity-green-dark hover:bg-charity-green hover:text-white">
                      My Profile
                    </Button>
                  </Link>
                  <Link to="/donate">
                    <Button className="w-full bg-charity-green hover:bg-charity-green-dark text-white">
                      Donate Now
                    </Button>
                  </Link>
                  <Button variant="ghost" className="w-full" onClick={() => signOut()}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/create-campaign">
                    <Button variant="outline" className="w-full border-charity-green text-charity-green-dark hover:bg-charity-green hover:text-white">
                      Start a Campaign
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline" className="w-full border-charity-green text-charity-green-dark hover:bg-charity-green hover:text-white">
                      Login
                    </Button>
                  </Link>
                  <Link to="/donate">
                    <Button className="w-full bg-charity-green hover:bg-charity-green-dark text-white">
                      Donate Now
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
