
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle menu close on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center"
          >
            <span className="text-2xl font-bold text-charity-blue">Brighter<span className="text-charity-coral">Futures</span></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-charity-blue ${
                location.pathname === '/' ? 'text-charity-blue' : 'text-gray-700'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/campaigns" 
              className={`text-sm font-medium transition-colors hover:text-charity-blue ${
                location.pathname === '/campaigns' ? 'text-charity-blue' : 'text-gray-700'
              }`}
            >
              Campaigns
            </Link>
            <Link 
              to="/volunteer" 
              className={`text-sm font-medium transition-colors hover:text-charity-blue ${
                location.pathname === '/volunteer' ? 'text-charity-blue' : 'text-gray-700'
              }`}
            >
              Volunteer
            </Link>
            <Link 
              to="/about" 
              className={`text-sm font-medium transition-colors hover:text-charity-blue ${
                location.pathname === '/about' ? 'text-charity-blue' : 'text-gray-700'
              }`}
            >
              About Us
            </Link>

            {/* Authentication */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 hover:bg-charity-blue/10 hover:text-charity-blue">
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-charity-blue flex-shrink-0">
                      <img 
                        src={user?.avatar || 'https://randomuser.me/api/portraits/lego/1.jpg'} 
                        alt={user?.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="font-medium">{user?.name?.split(' ')[0]}</span>
                    <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white/90 backdrop-blur-md border-gray-100">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                      <User size={16} />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  {user?.role === 'organizer' && (
                    <DropdownMenuItem asChild>
                      <Link to="/create-campaign" className="flex items-center gap-2 cursor-pointer">
                        <span>Create Campaign</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {user?.role === 'admin' && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="flex items-center gap-2 cursor-pointer">
                        <span>Admin Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-500 flex items-center gap-2 cursor-pointer">
                    <LogOut size={16} />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button className="btn-primary">
                  Sign In
                </Button>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md pb-6 animate-slide-in-right">
          <div className="px-4 pt-2 pb-4 space-y-4">
            <Link
              to="/"
              className={`block text-base font-medium py-2 ${
                location.pathname === '/' ? 'text-charity-blue' : 'text-gray-700'
              }`}
            >
              Home
            </Link>
            <Link
              to="/campaigns"
              className={`block text-base font-medium py-2 ${
                location.pathname === '/campaigns' ? 'text-charity-blue' : 'text-gray-700'
              }`}
            >
              Campaigns
            </Link>
            <Link
              to="/volunteer"
              className={`block text-base font-medium py-2 ${
                location.pathname === '/volunteer' ? 'text-charity-blue' : 'text-gray-700'
              }`}
            >
              Volunteer
            </Link>
            <Link
              to="/about"
              className={`block text-base font-medium py-2 ${
                location.pathname === '/about' ? 'text-charity-blue' : 'text-gray-700'
              }`}
            >
              About Us
            </Link>
            
            {isAuthenticated ? (
              <>
                <div className="py-2 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-charity-blue flex-shrink-0">
                    <img 
                      src={user?.avatar || 'https://randomuser.me/api/portraits/lego/1.jpg'} 
                      alt={user?.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-medium">{user?.name}</span>
                </div>
                <Link
                  to="/profile"
                  className="block text-base font-medium py-2 text-gray-700"
                >
                  Profile
                </Link>
                {user?.role === 'organizer' && (
                  <Link
                    to="/create-campaign"
                    className="block text-base font-medium py-2 text-gray-700"
                  >
                    Create Campaign
                  </Link>
                )}
                {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="block text-base font-medium py-2 text-gray-700"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="block w-full text-left text-base font-medium py-2 text-red-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="block w-full">
                <Button className="btn-primary w-full">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
