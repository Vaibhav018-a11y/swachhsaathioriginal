interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'white' | 'green' | 'gray';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  color = 'white' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const colorClasses = {
    white: 'border-white border-t-transparent',
    green: 'border-green-500 border-t-transparent',
    gray: 'border-gray-500 border-t-transparent'
  };

  return (
    <div 
      className={`${sizeClasses[size]} border-2 ${colorClasses[color]} rounded-full animate-spin`}
    />
  );
};

export default LoadingSpinner; 