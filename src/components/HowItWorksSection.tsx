import React from 'react';
import { MapPin, Bell, Recycle } from 'lucide-react';

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      icon: MapPin,
      title: 'Track Live',
      description: 'See your garbage truck\'s real-time location on an interactive map',
      color: 'bg-blue-500'
    },
    {
      icon: Bell,
      title: 'Get Notified',
      description: 'Receive smart alerts when the truck is approaching your area',
      color: 'bg-yellow-500'
    },
    {
      icon: Recycle,
      title: 'Dispose Responsibly',
      description: 'Get AI-powered tips for proper waste segregation and disposal',
      color: 'bg-green-500'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Get Started in <span className="text-green-500">3 Simple Steps</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of citizens who are already making their neighborhoods cleaner and smarter
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative group animate-fade-in-up"
              style={{ animationDelay: `${index * 300}ms` }}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-green-300 to-green-200 z-0 transform translate-x-6"></div>
              )}
              
              <div className="relative z-10 p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 group-hover:scale-105">
                <div className="relative mb-8">
                  <div className={`w-20 h-20 mx-auto ${step.color} rounded-full flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300`}>
                    <step.icon size={40} className="text-white fill-current" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;