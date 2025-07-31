import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Globe, Clock, Map, MessageSquare, Share, FileText, Shield, LogOut, Home } from 'lucide-react';

// Props interface for the component
interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isLoggedIn?: boolean;
  onLogin?: () => void;
  onLogout?: () => void;
}

// Main Navigation Component
const Navigation: React.FC<NavigationProps> = ({ activeSection, setActiveSection, isLoggedIn = false, onLogin, onLogout }) => {
  // State for mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // State for language dropdown visibility
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  // --- Language Data and State ---
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'mr', name: 'मराठी' },
  ];
  // State to track the currently selected language
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  // --- Menu Item Definitions ---
  // Main navigation items
  const mainMenuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'timing', label: 'Timing Schedule', icon: Clock },
    { id: 'route', label: 'Route Map', icon: Map },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
  ];
  
  // Secondary/utility navigation items
  const secondaryMenuItems = [
    { id: 'share', label: 'Share App', icon: Share },
    { id: 'terms', label: 'Terms & Conditions', icon: FileText },
    { id: 'privacy', label: 'Privacy Policy', icon: Shield },
  ];

  // Ref for the language dropdown to detect outside clicks
  const languageDropdownRef = useRef<HTMLDivElement>(null);

  // Effect to handle clicks outside the language dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
        setIsLanguageOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Function to handle changing the active section and closing the mobile menu
  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-sm z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo and App Name */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleSectionChange('home')}>
            <img src="/123.jpg" alt="Swachh Saathi Logo" className="h-10 w-10 rounded-lg object-cover" />
          <span className="text-xl font-bold text-gray-800">
  <span className="text-green-600">स्वच्छ</span> Saathi
</span>

          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {mainMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSectionChange(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative ${
                  activeSection === item.id
                    ? 'text-green-600'
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                <item.icon size={16} />
                <span>{item.label}</span>
                {/* Active indicator underline */}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500 rounded-full"></span>
                )}
              </button>
            ))}
            
            {/* Language Dropdown */}
            <div className="relative" ref={languageDropdownRef}>
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
              >
                <Globe size={16} />
                <span>{selectedLanguage.name}</span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${isLanguageOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 origin-top-right animate-fadeInUp" style={{animationDuration: '0.2s'}}>
                  <div className="py-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                        onClick={() => {
                          setSelectedLanguage(lang);
                          setIsLanguageOpen(false);
                        }}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {isLoggedIn ? (
              <button 
                onClick={onLogout}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            ) : (
              <button 
                onClick={onLogin}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-green-600 hover:bg-green-50 transition-colors"
              >
                <span>Login</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-green-50"
            aria-label="Open menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - with smooth transition */}
      <div className={`lg:hidden bg-white border-t border-gray-200 transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {mainMenuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSectionChange(item.id)}
              className={`flex items-center space-x-3 w-full px-3 py-3 rounded-md text-base font-medium transition-colors ${
                activeSection === item.id
                  ? 'text-green-600 bg-green-50'
                  : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
          
          {/* Divider */}
          <div className="border-t border-gray-200 my-2"></div>
          
          {secondaryMenuItems.map((item) => (
             <button
              key={item.id}
              onClick={() => handleSectionChange(item.id)}
              className="flex items-center space-x-3 w-full px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors"
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
          
          {/* Divider */}
          <div className="border-t border-gray-200 my-2"></div>

          {isLoggedIn ? (
            <button 
              onClick={onLogout}
              className="flex items-center space-x-3 w-full px-3 py-3 rounded-md text-base font-medium text-red-500 hover:bg-red-50 transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          ) : (
            <button 
              onClick={onLogin}
              className="flex items-center space-x-3 w-full px-3 py-3 rounded-md text-base font-medium text-green-600 hover:bg-green-50 transition-colors"
            >
              <span>Login</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
