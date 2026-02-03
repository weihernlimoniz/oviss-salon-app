
import React from 'react';
import { SERVICES, PROMO_BANNER, SHOP_NAME } from '../constants';

interface HomeScreenProps {
  onNavigate: (screen: 'appointment') => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col space-y-6 pb-24 relative min-h-full">
      {/* Promo Banner */}
      <div className="px-4 mt-4">
        <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden shadow-2xl">
          <img src={PROMO_BANNER} alt="Promotion" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-5">
            <span className="bg-amber-500 text-zinc-950 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded w-fit mb-2">Limited Time</span>
            <h3 className="text-xl font-bold text-white">Hair Color Transformation</h3>
            <p className="text-zinc-300 text-xs">Book now for 20% off all styling services</p>
          </div>
        </div>
      </div>

      {/* Booking CTA Section */}
      <div className="px-4">
        <button 
          onClick={() => onNavigate('appointment')}
          className="w-full bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold py-4 rounded-2xl shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M12 14v4"/><path d="M10 16h4"/></svg>
          Book Your Appointment
        </button>
      </div>

      {/* Services Section */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            Our Services
            <div className="w-1 h-1 rounded-full bg-amber-500"></div>
          </h2>
          <span className="text-xs text-zinc-500">Informational only</span>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {SERVICES.map(service => (
            <div 
              key={service.id} 
              className="bg-zinc-900/50 border border-zinc-800/50 p-4 rounded-2xl flex items-center justify-between group hover:border-amber-500/20 transition-all"
            >
              <div>
                <h4 className="font-semibold text-zinc-100 mb-0.5">{service.name}</h4>
                <p className="text-xs text-zinc-500">Professional care for your hair</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-amber-500">{service.priceInfo}</span>
                <p className="text-[10px] text-zinc-600 mt-0.5">Start from</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
