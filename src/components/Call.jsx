import React from 'react';
import { FiPhone } from 'react-icons/fi'; // Feather phone icon

const CallIcon = () => {
  const handleCallClick = () => {
    const phoneNumber = '919958138641';
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <div className="relative group">
        <button
          onClick={handleCallClick}
          className="w-14 h-14 bg-red-900  rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 ease-in-out active:scale-95 relative z-10 cursor-pointer"
          aria-label="Call us"
        >
          {/* React Icon */}
          <FiPhone className="w-8 h-8 text-white" />
        </button>

        {/* Subtle pulse animation */}
        <div className="absolute inset-0 w-14 h-14 bg-red-400 rounded-full animate-ping opacity-20 pointer-events-none"></div>

        {/* Tooltip - appears on hover */}
        <div className="absolute bottom-16 left-0 bg-red-900  text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          Call us
          <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-700"></div>
        </div>
      </div>
    </div>
  );
};

export default CallIcon;
