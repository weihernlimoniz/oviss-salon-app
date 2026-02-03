
import React, { useState } from 'react';
import { User, Gender } from '../types';

interface CreateAccountScreenProps {
  onSubmit: (data: Partial<User>) => void;
}

const CreateAccountScreen: React.FC<CreateAccountScreenProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: Gender.MALE,
    phone: '',
    email: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.dob) {
      alert('Please fill in all required fields');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="p-6 pt-12 flex flex-col h-full bg-zinc-950">
      <h1 className="text-3xl font-bold mb-2">Welcome!</h1>
      <p className="text-zinc-400 mb-8">Let's set up your profile to get started.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">Full Name *</label>
          <input 
            required
            type="text" 
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
            placeholder="John Doe"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">Birthday *</label>
            <input 
              required
              type="date" 
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              value={formData.dob}
              onChange={(e) => setFormData(prev => ({...prev, dob: e.target.value}))}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">Gender</label>
            <select 
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 appearance-none"
              value={formData.gender}
              onChange={(e) => setFormData(prev => ({...prev, gender: e.target.value as Gender}))}
            >
              <option value={Gender.MALE}>Male</option>
              <option value={Gender.FEMALE}>Female</option>
              <option value={Gender.OTHER}>Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">Phone Number</label>
          <input 
            type="tel" 
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({...prev, phone: e.target.value}))}
            placeholder="012xxxxxxx"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">Email Address</label>
          <input 
            type="email" 
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
            placeholder="name@example.com"
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-amber-500 text-zinc-950 font-bold py-4 rounded-xl shadow-lg shadow-amber-500/10 active:scale-95 transition-all mt-8"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default CreateAccountScreen;
