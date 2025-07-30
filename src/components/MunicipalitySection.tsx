import React from 'react';
import { Route, Users, CheckCircle, ArrowRight } from 'lucide-react';

const MunicipalitySection: React.FC = () => {
  const benefits = [
    {
      icon: Route,
      title: 'Route Optimization',
      description: 'AI-powered route planning reduces fuel costs and improves efficiency by up to 40%'
    },
    {
      icon: Users,
      title: 'Increased Citizen Satisfaction',
      description: 'Real-time transparency builds trust and reduces complaints by providing clear communication'
    },
    {
      icon: CheckCircle,
      title: 'Swachh Bharat Compliance',
      description: 'Comprehensive reporting and analytics help meet government cleanliness standards'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-green-900 to-green-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-green-500 rounded-full -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-400 rounded-full translate-x-48 translate-y-48"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center animate-fade-in mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Partner with Us to Build a 
            <span className="block text-green-300 mt-2">Smarter, Cleaner City</span>
          </h2>
          <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
            Join forward-thinking municipalities across India who are revolutionizing waste management with technology
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="text-center group animate-fade-in-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-green-700/50 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:bg-green-600/60 transition-all duration-300 transform group-hover:scale-110">
                <benefit.icon size={40} className="text-green-300 fill-current" />
              </div>
              
              <h3 className="text-2xl font-bold mb-4 group-hover:text-green-300 transition-colors duration-300">
                {benefit.title}
              </h3>
              
              <p className="opacity-90 leading-relaxed group-hover:opacity-100 transition-opacity duration-300">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center animate-fade-in">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <button className="group inline-flex items-center space-x-2 bg-white text-green-800 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              <span>Contact Us for a Demo</span>
              <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            
            <div className="text-green-300 text-sm">
              <div>✓ Free consultation</div>
              <div>✓ Custom implementation</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MunicipalitySection;