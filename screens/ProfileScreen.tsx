
import React, { useState } from 'react';
import { User, Gender } from '../types';

interface ProfileScreenProps {
  user: User | null;
  onLogout: () => void;
  onUpdateUser: (user: User) => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, onLogout, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dob: user?.dob || '',
    gender: user?.gender || Gender.OTHER,
    profilePic: user?.profilePic || 'https://picsum.photos/seed/user/400/400'
  });

  if (!user) return null;

  const handleUpdate = () => {
    onUpdateUser({ ...user, ...formData });
    setIsEditing(false);
  };

  const handleTopUp = () => {
    // Logic for top up (mock)
    alert('Redirecting to secure payment gateway for Top Up...');
  };

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-500">
      {/* Header Profile Info */}
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-4">
          <div className="w-28 h-28 rounded-full border-4 border-zinc-900 overflow-hidden shadow-2xl">
            <img src={formData.profilePic} alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center border-2 border-zinc-950 text-zinc-950">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
          </button>
        </div>
        <h2 className="text-2xl font-bold">{user.name}</h2>
      </div>

      {/* Stats/Credit */}
      <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-3xl p-6 flex justify-between items-center shadow-lg border border-zinc-800">
        <div>
          <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold mb-1">Available Credit</p>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-black text-amber-500">RM {user.creditBalance.toFixed(2)}</p>
            <button 
              onClick={handleTopUp}
              className="text-[10px] bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded-full font-bold hover:bg-amber-500 hover:text-zinc-950 transition-colors"
            >
              TOP UP
            </button>
          </div>
        </div>
        <div className="w-12 h-12 bg-zinc-700/50 rounded-2xl flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
        </div>
      </div>

      {/* Settings List */}
      <div className="space-y-3 pb-8">
        {isEditing ? (
          <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800 space-y-4">
            <div>
              <label className="text-xs text-zinc-500 font-bold uppercase mb-1 block">Full Name</label>
              <input 
                className="w-full bg-zinc-800 border-zinc-700 rounded-xl py-3 px-4 text-white focus:ring-1 focus:ring-amber-500 transition-all"
                value={formData.name}
                onChange={e => setFormData(prev => ({...prev, name: e.target.value}))}
              />
            </div>
            <div>
              <label className="text-xs text-zinc-500 font-bold uppercase mb-1 block">Email</label>
              <input 
                className="w-full bg-zinc-800 border-zinc-700 rounded-xl py-3 px-4 text-white focus:ring-1 focus:ring-amber-500 transition-all"
                value={formData.email}
                onChange={e => setFormData(prev => ({...prev, email: e.target.value}))}
              />
            </div>
            <div>
              <label className="text-xs text-zinc-500 font-bold uppercase mb-1 block">Phone Number</label>
              <input 
                className="w-full bg-zinc-800 border-zinc-700 rounded-xl py-3 px-4 text-white focus:ring-1 focus:ring-amber-500 transition-all"
                value={formData.phone}
                onChange={e => setFormData(prev => ({...prev, phone: e.target.value}))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-zinc-500 font-bold uppercase mb-1 block">Birthday</label>
                <input 
                  type="date"
                  className="w-full bg-zinc-800 border-zinc-700 rounded-xl py-3 px-4 text-white focus:ring-1 focus:ring-amber-500 transition-all"
                  value={formData.dob}
                  onChange={e => setFormData(prev => ({...prev, dob: e.target.value}))}
                />
              </div>
              <div>
                <label className="text-xs text-zinc-500 font-bold uppercase mb-1 block">Gender</label>
                <select 
                  className="w-full bg-zinc-800 border-zinc-700 rounded-xl py-3 px-4 text-white focus:ring-1 focus:ring-amber-500 transition-all appearance-none"
                  value={formData.gender}
                  onChange={e => setFormData(prev => ({...prev, gender: e.target.value as Gender}))}
                >
                  <option value={Gender.MALE}>Male</option>
                  <option value={Gender.FEMALE}>Female</option>
                  <option value={Gender.OTHER}>Other</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={handleUpdate} className="flex-1 bg-amber-500 text-zinc-950 font-bold py-3 rounded-xl hover:bg-amber-600 transition-colors">Save Changes</button>
              <button onClick={() => setIsEditing(false)} className="px-6 bg-zinc-800 font-bold py-3 rounded-xl hover:bg-zinc-700 transition-colors">Cancel</button>
            </div>
          </div>
        ) : (
          <>
            <button 
              onClick={() => setIsEditing(true)}
              className="w-full bg-zinc-900/50 p-4 rounded-2xl flex items-center justify-between border border-zinc-800/50 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center group-hover:bg-amber-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <div className="text-left">
                  <span className="font-semibold block text-sm">Edit Profile</span>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-tighter">Name, Phone, Email, More</span>
                </div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-600"><path d="m9 18 6-6-6-6"/></svg>
            </button>

            <button className="w-full bg-zinc-900/50 p-4 rounded-2xl flex items-center justify-between border border-zinc-800/50 group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <span className="font-semibold text-sm">Privacy Policy</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-600"><path d="m9 18 6-6-6-6"/></svg>
            </button>

            <button 
              onClick={onLogout}
              className="w-full bg-red-500/5 p-4 rounded-2xl flex items-center justify-between border border-red-500/10 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                </div>
                <span className="font-semibold text-sm text-red-500">Logout</span>
              </div>
            </button>
          </>
        )}
      </div>

      <div className="text-center pt-4">
        <p className="text-[10px] text-zinc-700 uppercase tracking-widest">Oviss Salon v1.0.0-mvp</p>
      </div>
    </div>
  );
};

export default ProfileScreen;
