
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 py-16 px-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Link to="/" className="text-xl font-medium tracking-tight">
              Minimal
            </Link>
            <p className="mt-4 text-gray-600 max-w-xs">
              A celebration of simplicity in design. Less, but infinitely better.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider text-gray-500 mb-4">Products</h4>
            <ul className="space-y-3">
              {['Featured', 'New Arrivals', 'Bestsellers', 'Collections'].map((item) => (
                <li key={item}>
                  <Link to={`/products/${item.toLowerCase().replace(' ', '-')}`} className="text-gray-600 hover:text-black transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider text-gray-500 mb-4">Company</h4>
            <ul className="space-y-3">
              {['About', 'Design Philosophy', 'Sustainability', 'Careers'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="text-gray-600 hover:text-black transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider text-gray-500 mb-4">Connect</h4>
            <ul className="space-y-3">
              {['Instagram', 'Twitter', 'LinkedIn', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase()}`} className="text-gray-600 hover:text-black transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">&copy; {currentYear} Minimal. All rights reserved.</p>
          
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="/privacy" className="text-gray-500 hover:text-black text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-500 hover:text-black text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/legal" className="text-gray-500 hover:text-black text-sm transition-colors">
              Legal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
