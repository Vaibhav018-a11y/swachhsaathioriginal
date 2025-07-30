import React from 'react';
import { Clock, Home, Trash } from 'lucide-react';

const ProblemSection: React.FC = () => {
  const problems = [
    {
      icon: Clock,
      title: 'Waiting Too Long',
      description: 'Uncertain pickup times lead to endless waiting'
    },
    {
      icon: Home,
      title: 'Smelly Garbage at Home',
      description: 'Accumulated waste creates unhygienic conditions'
    },
    {
      icon: Trash,
      title: 'Trash in Streets & Drains',
      description: 'Overflowing bins pollute our neighborhoods'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-16">
            Tired of the Daily 
            <span className="text-red-500"> Garbage Gamble?</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {problems.map((problem, index) => (
              <div 
                key={index}
                className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-500 transition-colors duration-300">
                  <problem.icon 
                    size={32} 
                    className="text-red-500 group-hover:text-white transition-colors duration-300 fill-current" 
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{problem.title}</h3>
                <p className="text-gray-600 leading-relaxed">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;