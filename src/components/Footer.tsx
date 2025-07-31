import React, { useState } from 'react';
import { Globe, Linkedin, Instagram, ChevronDown } from 'lucide-react';

const Footer: React.FC = () => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'mr', name: 'मराठी' },
  ];

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
               <img src="/123.jpg" alt="Swachh Saathi Logo" className="h-10 w-10 rounded-lg object-cover" />
              </div>
             <span className="text-xl font-bold text-gray-100">
  <span className="text-green-600">स्वच्छ</span> Saathi
</span>

            </div>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              Making waste management transparent, efficient, and accessible for everyone. 
              Building cleaner, smarter cities through technology.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-600 transition-colors duration-300"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors duration-300">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors duration-300">Contact</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors duration-300">Support</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors duration-300">Careers</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors duration-300">Terms & Conditions</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors duration-300">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors duration-300">Cookie Policy</a></li>
              <li>
                <div className="relative">
                  <button
                    onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                    className="flex items-center space-x-1 text-gray-300 hover:text-green-400 transition-colors duration-300"
                  >
                    <Globe size={16} />
                    <span>Language</span>
                    <ChevronDown size={14} />
                  </button>
                  
                  {isLanguageOpen && (
                    <div className="absolute bottom-full left-0 mb-2 w-32 bg-gray-800 rounded-lg shadow-lg">
                      <div className="py-2">
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            className="block w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-green-400 hover:bg-gray-700"
                            onClick={() => setIsLanguageOpen(false)}
                          >
                            {lang.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 स्वच्छ Saathi. All rights reserved.
          </div>
          <div className="text-gray-400 text-sm">
            Made with ❤️ for a cleaner India
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;