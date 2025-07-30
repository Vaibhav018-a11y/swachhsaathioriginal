import React from 'react';
import { Brain } from 'lucide-react';

interface FloatingAIButtonProps {
  onClick: () => void;
}

const FloatingAIButton: React.FC<FloatingAIButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 animate-bounce-slow z-40 flex items-center justify-center group"
    >
      <Brain size={24} className="group-hover:scale-110 transition-transform duration-300" />
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        AI Disposal Tips
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
      </div>
    </button>
  );
};

export default FloatingAIButton;