
import React, { useEffect } from 'react';
import { Notification } from '../types';

interface NotificationScreenProps {
  notifications: Notification[];
  onMarkRead: (id: string) => void;
  onBack: () => void;
}

const NotificationScreen: React.FC<NotificationScreenProps> = ({ notifications, onMarkRead, onBack }) => {
  useEffect(() => {
    // Automatically mark all as read when entering the screen (MVP simplification)
    notifications.forEach(n => {
      if (!n.read) onMarkRead(n.id);
    });
  }, [notifications.length]);

  return (
    <div className="flex flex-col h-full bg-zinc-950">
      {/* Top Header with Back Button */}
      <div className="p-4 flex items-center gap-4 sticky top-0 bg-zinc-950/90 backdrop-blur-md z-10 border-b border-zinc-900">
        <button onClick={onBack} className="p-2 -ml-2 text-zinc-400 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <h2 className="text-xl font-bold text-white">Notifications</h2>
      </div>

      <div className="p-4 space-y-4 overflow-y-auto flex-1 no-scrollbar">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-20"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
            <p>Stay tuned for updates!</p>
          </div>
        ) : (
          notifications.map(n => (
            <div key={n.id} className={`p-5 rounded-3xl border transition-all ${n.read ? 'bg-zinc-900/50 border-zinc-800/50' : 'bg-zinc-900 border-amber-500/20 shadow-lg shadow-amber-500/5'}`}>
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                  n.type === 'booked' ? 'bg-green-500/10 text-green-500' :
                  n.type === 'cancelled' ? 'bg-red-500/10 text-red-500' :
                  n.type === 'assigned' ? 'bg-blue-500/10 text-blue-500' :
                  'bg-amber-500/10 text-amber-500'
                }`}>
                  {n.type === 'booked' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>}
                  {n.type === 'cancelled' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 9-6 6"/><path d="m9 9 6 6"/><circle cx="12" cy="12" r="10"/></svg>}
                  {n.type === 'assigned' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
                  {n.type === 'reminder' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
                  {n.type === 'rescheduled' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-1.9"/><path d="M20.9 5a1 1 0 0 0 0-1.4L19.5 2.2a1 1 0 0 0-1.4 0L17 3.3 20.7 7z"/><path d="m3 17.1 12.9-12.9L19.6 7.9 6.7 20.8 2.2 21.8z"/></svg>}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-sm text-zinc-100">{n.title}</h4>
                    <span className="text-[10px] text-zinc-500 shrink-0 ml-2">{new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{n.message}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationScreen;
