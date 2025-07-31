import React from 'react';
import { LogIn, UserPlus } from 'lucide-react';

interface HeroSectionProps {
  onLoginClick?: () => void;
  onSignupClick?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onLoginClick, onSignupClick }) => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/background.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-0">
        
        {/* Left Side: Text Content */}
        <div className="text-center lg:text-left">
          <div 
            className="animate-fadeInUp" 
            style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-white">
              Never Miss Your
              <span className="block text-green-400">Garbage Collection</span>
              Again.
            </h1>
          </div>
          
          <div 
            className="animate-fadeInUp" 
            style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}
          >
            <p className="text-lg md:text-xl lg:text-2xl mb-10 max-w-xl mx-auto lg:mx-0 text-white/90 leading-relaxed">
              Get real-time GPS tracking of your city's garbage vehicle, right on your phone. Simple, reliable, and always on time.
            </p>
          </div>

          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fadeInUp"
            style={{ animationDelay: '0.6s', animationFillMode: 'backwards' }}
          >
            <button 
              onClick={onSignupClick}
              className="inline-flex items-center justify-center space-x-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <UserPlus size={24} />
              <span>Get Started</span>
            </button>
            
            <button 
              onClick={onLoginClick}
              className="inline-flex items-center justify-center space-x-3 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-2 border-white/30 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              <LogIn size={24} />
              <span>Sign In</span>
            </button>
          </div>
        </div>

        {/* Right Side: Phone Mockup */}
        <div className="flex justify-center lg:justify-end">
          <div className="animate-float">
            {/* Phone Frame */}
            <div className="relative mx-auto border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl">
                <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
                <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
                <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
                <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
                <div className="rounded-[2rem] overflow-hidden w-full h-full bg-black">
                  {/* The actual image/screen */}
                  <img 
                    // Using a more relevant image for the app UI
                    src="/mobile photo.jpg"
                    className="w-full h-full object-cover" 
                    alt="App showing a map with a truck location" 
                  />
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

