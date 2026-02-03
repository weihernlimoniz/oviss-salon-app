
import React from 'react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: any) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: (color: string) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
    { id: 'appointment', label: 'Booking', icon: (color: string) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg> },
    { id: 'about', label: 'Info', icon: (color: string) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg> },
    { id: 'profile', label: 'Profile', icon: (color: string) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
  ];

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 bg-zinc-950/80 backdrop-blur-xl border-t border-zinc-900 flex justify-around items-center px-4 max-w-md mx-auto z-30"
      style={{ 
        paddingBottom: 'env(safe-area-inset-bottom)',
        height: 'calc(5rem + env(safe-area-inset-bottom))'
      }}
    >
      {tabs.map(tab => {
        const isActive = activeTab === tab.id;
        const color = isActive ? '#f59e0b' : '#52525b';
        return (
          <button 
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="flex flex-col items-center gap-1 group relative flex-1"
          >
            {isActive && <div className="absolute -top-6 w-1 h-1 rounded-full bg-amber-500 shadow-[0_0_10px_#f59e0b]"></div>}
            <div className={`transition-all duration-300 ${isActive ? 'scale-110 -translate-y-1' : 'opacity-60 hover:opacity-100'}`}>
              {tab.icon(color)}
            </div>
            <span className={`text-[10px] font-bold tracking-tighter transition-all ${isActive ? 'text-amber-500' : 'text-zinc-600'}`}>
              {tab.label.toUpperCase()}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;
