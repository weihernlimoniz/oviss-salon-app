
import React from 'react';
import { OUTLETS, STYLISTS, SHOP_NAME } from '../constants';

const AboutUsScreen: React.FC = () => {
  return (
    <div className="flex flex-col space-y-8 pb-10">
      <div className="p-6 text-center">
        <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-500/20">
          <span className="text-3xl font-bold text-amber-500">O</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">{SHOP_NAME}</h1>
        <p className="text-zinc-500 text-sm leading-relaxed max-w-xs mx-auto">
          Crafting styles and confidence since 2010. Our passion is your hair.
        </p>
      </div>

      {/* Outlets */}
      <div className="px-4 space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2">
          Our Outlets
          <div className="w-1 h-1 rounded-full bg-amber-500"></div>
        </h2>
        <div className="space-y-6">
          {OUTLETS.map(o => (
            <div key={o.id} className="space-y-3">
              <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-lg border border-zinc-800">
                <img src={o.image} alt={o.name} className="w-full h-full object-cover" />
              </div>
              <div className="px-1">
                <h3 className="font-bold text-zinc-100 text-lg">{o.name}</h3>
                <p className="text-xs text-zinc-400 mt-1.5 flex gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  {o.address}
                </p>
                <p className="text-xs text-zinc-400 mt-1.5 flex gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  {o.contact}
                </p>
                <p className="text-xs text-zinc-400 mt-1.5 flex gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  Daily: 10:00 AM - 09:00 PM
                </p>
                <div className="flex gap-4 mt-4">
                  <div className="text-amber-500 hover:scale-110 transition-transform cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg></div>
                  <div className="text-amber-500 hover:scale-110 transition-transform cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stylists */}
      <div className="px-4 space-y-4 pt-4">
        <h2 className="text-lg font-bold flex items-center gap-2">
          Professional Stylists
          <div className="w-1 h-1 rounded-full bg-amber-500"></div>
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {STYLISTS.map(s => (
            <div key={s.id} className="bg-zinc-900/40 p-5 rounded-3xl border border-zinc-800/50 flex gap-5 items-center">
              <div className="shrink-0">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border border-zinc-700 grayscale hover:grayscale-0 transition-all">
                  <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-zinc-100">{s.name}</h4>
                <p className="text-xs font-medium text-amber-500 mb-2 uppercase tracking-widest">{s.title}</p>
                <p className="text-[10px] text-zinc-500 leading-relaxed italic">"{s.bio}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUsScreen;
