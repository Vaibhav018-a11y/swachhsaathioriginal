import React from 'react';
import { Navigation, Zap, Brain } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Navigation,
      title: 'GPS Accuracy',
      description: 'Precise real-time tracking with advanced GPS technology for accurate location updates',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: Zap,
      title: 'Smart Notifications',
      description: 'Intelligent alerts based on your preferences and the truck\'s proximity to your location',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Brain,
      title: 'AI Disposal Tips',
      description: 'Gemini API-powered recommendations for proper waste segregation and eco-friendly disposal',
      gradient: 'from-green-500 to-green-600'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center animate-fade-in mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Features for a <span className="text-green-500">Better Tomorrow</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced technology meets environmental consciousness to create the perfect waste management companion
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              <div className="relative p-8">
                <div className={`w-16 h-16 mb-6 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                  <feature.icon size={32} className="text-white fill-current" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {feature.description}
                </p>

                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-1 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;