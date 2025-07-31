import React from 'react';

const Loader = ({ size = 'md', type = 'spinner', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const renderSpinner = () => (
    <div className={`spinner ${sizeClasses[size] || sizeClasses.md}`}></div>
  );

  const renderDots = () => (
    <div className="flex space-x-1">
      <div className={`${sizeClasses[size] || sizeClasses.md} bg-green-500 rounded-full animate-bounce`} style={{ animationDelay: '0ms' }}></div>
      <div className={`${sizeClasses[size] || sizeClasses.md} bg-green-500 rounded-full animate-bounce`} style={{ animationDelay: '150ms' }}></div>
      <div className={`${sizeClasses[size] || sizeClasses.md} bg-green-500 rounded-full animate-bounce`} style={{ animationDelay: '300ms' }}></div>
    </div>
  );

  const renderPulse = () => (
    <div className={`${sizeClasses[size] || sizeClasses.md} bg-green-500 rounded-full animate-pulse`}></div>
  );

  const renderRing = () => (
    <div className={`${sizeClasses[size] || sizeClasses.md} border-4 border-green-200 border-t-green-500 rounded-full animate-spin`}></div>
  );

  const renderLoader = () => {
    switch (type) {
      case 'dots':
        return renderDots();
      case 'pulse':
        return renderPulse();
      case 'ring':
        return renderRing();
      case 'spinner':
      default:
        return renderSpinner();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {renderLoader()}
      {text && (
        <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm font-medium">
          {text}
        </p>
      )}
    </div>
  );
};

export default Loader;
