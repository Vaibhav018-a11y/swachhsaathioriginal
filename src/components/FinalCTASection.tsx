import React from 'react';
import { Download, Smartphone } from 'lucide-react';

const FinalCTASection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Ready to Join the 
            <span className="block text-green-500 mt-2">Cleanliness Revolution?</span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Be part of a growing community of environmentally conscious citizens who are making a difference, 
            one pickup at a time. Download Swachh Saathi today and never miss garbage collection again.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <button className="group inline-flex items-center space-x-3 bg-black text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Smartphone size={20} className="text-black" />
              </div>
              <div className="text-left">
                <div className="text-xs opacity-75">Download on the</div>
                <div className="text-lg font-bold">App Store</div>
              </div>
            </button>
            
            <button className="group inline-flex items-center space-x-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              <Download size={24} />
              <div className="text-left">
                <div className="text-xs opacity-90">Get it on</div>
                <div className="text-lg font-bold">Google Play</div>
              </div>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <div className="text-3xl md:text-4xl font-bold text-green-500 mb-2">50K+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <div className="text-3xl md:text-4xl font-bold text-green-500 mb-2">25+</div>
              <div className="text-gray-600">Cities Covered</div>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              <div className="text-3xl md:text-4xl font-bold text-green-500 mb-2">95%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '800ms' }}>
              <div className="text-3xl md:text-4xl font-bold text-green-500 mb-2">1M+</div>
              <div className="text-gray-600">Notifications Sent</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;