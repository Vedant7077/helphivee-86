
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 pt-16 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Organization Info */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-bold text-charity-blue">Brighter<span className="text-charity-coral">Futures</span></span>
            </Link>
            <p className="text-gray-600 mt-2">
              Empowering communities through charitable giving and volunteer support.
            </p>
            <div className="flex items-center space-x-4 mt-4">
              <a href="#" className="text-gray-500 hover:text-charity-blue transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-charity-blue transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-charity-blue transition-colors">
                <Instagram size={20} />
              </a>
              <a href="mailto:info@brighterfutures.org" className="text-gray-500 hover:text-charity-blue transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/campaigns" className="text-gray-600 hover:text-charity-blue transition-colors">
                  Browse Campaigns
                </Link>
              </li>
              <li>
                <Link to="/volunteer" className="text-gray-600 hover:text-charity-blue transition-colors">
                  Volunteer Opportunities
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-charity-blue transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/create-campaign" className="text-gray-600 hover:text-charity-blue transition-colors">
                  Start a Campaign
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-charity-blue transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-charity-blue transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/success-stories" className="text-gray-600 hover:text-charity-blue transition-colors">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-gray-600 hover:text-charity-blue transition-colors">
                  Our Partners
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Stay Updated</h3>
            <p className="text-gray-600 mb-4">
              Subscribe to our newsletter for the latest campaigns and opportunities.
            </p>
            <form className="space-y-2">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-grow px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-charity-blue focus:border-transparent"
                />
                <button
                  type="submit"
                  className="bg-charity-blue text-white px-4 py-2 rounded-r-lg hover:bg-charity-blue/90 transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Brighter Futures Fund. All rights reserved.
            </p>
            <div className="flex items-center mt-4 md:mt-0">
              <span className="text-gray-500 text-sm mr-4">Made with</span>
              <Heart size={16} className="text-charity-coral mr-1" />
              <span className="text-gray-500 text-sm">for a better world</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
