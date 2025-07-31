import React from 'react';

const SolutionSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
              Introducing <span className="text-green-500">स्वच्छ Saathi:</span>
              <span className="block mt-2">Your Cleanliness Companion</span>
            </h2>
            
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
              स्वच्छ Saathi is a free, reliable tool designed for citizens who want to stay informed 
              about garbage collection in their area. Track waste management vehicles in real-time, 
              receive smart notifications, and contribute to a cleaner, smarter city.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="font-medium">100% Free</span>
              </div>
              <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="font-medium">Real-time Tracking</span>
              </div>
              <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="font-medium">Smart Notifications</span>
              </div>
            </div>
          </div>

          <div className="animate-fade-in-right">
            <div className="relative">
              <img 
                src="/after&before.jpg" 
                alt="Swachh Saathi App Interface Mockup"
                className="w-full h-auto rounded-3xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-500/10 to-transparent rounded-3xl"></div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-green-300 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;