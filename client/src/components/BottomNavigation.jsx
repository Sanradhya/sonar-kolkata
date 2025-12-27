import { useState } from 'react';

const BottomNavigation = () => {
  const [activeTab, setActiveTab] = useState('map');

  const handleScan = () => {
    console.log('Scan button clicked');
    // Add scan functionality here
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-cream border-t border-heritage-red z-[1000]">
      <div className="flex items-center justify-around py-2">
        <button
          onClick={() => setActiveTab('map')}
          className={`p-3 rounded-lg transition-colors ${
            activeTab === 'map' 
              ? 'bg-heritage-red text-cream' 
              : 'text-heritage-red hover:bg-heritage-red hover:text-cream'
          }`}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
        </button>

        <button
          onClick={handleScan}
          className="bg-heritage-red text-cream px-8 py-3 rounded-full font-semibold hover:bg-red-800 transition-colors shadow-lg"
        >
          Scan
        </button>

        <button
          onClick={() => setActiveTab('heritage')}
          className={`p-3 rounded-lg transition-colors ${
            activeTab === 'heritage' 
              ? 'bg-heritage-red text-cream' 
              : 'text-heritage-red hover:bg-heritage-red hover:text-cream'
          }`}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BottomNavigation;
