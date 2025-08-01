import React from 'react';

const InstallPrompt = ({ onInstall, onDismiss }) => {
  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-50">
      <div className="bg-white rounded-lg shadow-xl border border-eco-green-200 p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-eco-green-100 rounded-full flex items-center justify-center">
              <span className="text-xl">📱</span>
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900">
              Install EcoVision
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Add to your home screen for quick access and offline use!
            </p>
            
            <div className="flex space-x-2 mt-3">
              <button
                onClick={onInstall}
                className="flex-1 bg-eco-green-500 hover:bg-eco-green-600 text-white text-sm font-medium py-2 px-3 rounded-md transition-colors duration-200"
              >
                Install
              </button>
              <button
                onClick={onDismiss}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2 px-3 rounded-md transition-colors duration-200"
              >
                Later
              </button>
            </div>
          </div>
          
          <button
            onClick={onDismiss}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstallPrompt; 