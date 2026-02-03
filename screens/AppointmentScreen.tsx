
import React, { useState, useMemo, useEffect } from 'react';
import { Appointment, AssignmentType, Outlet, Stylist, Service } from '../types';
import { OUTLETS, STYLISTS, SERVICES, TIME_SLOTS } from '../constants';

interface AppointmentScreenProps {
  appointments: Appointment[];
  onAdd: (data: Omit<Appointment, 'id' | 'userId' | 'status' | 'createdAt'>) => void;
  onCancel: (id: string) => void;
  lastOutletId: string;
  setLastOutletId: (id: string) => void;
}

const AppointmentScreen: React.FC<AppointmentScreenProps> = ({ appointments, onAdd, onCancel, lastOutletId, setLastOutletId }) => {
  const [isBooking, setIsBooking] = useState(false);
  const [selectedOutlet, setSelectedOutlet] = useState<Outlet | null>(null);
  const [selectedStylist, setSelectedStylist] = useState<Stylist | 'none' | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const upcomingAppointment = appointments.find(a => new Date(a.date).getTime() >= new Date().setHours(0,0,0,0));

  const resetBooking = () => {
    setIsBooking(false);
    setSelectedOutlet(null);
    setSelectedStylist(null);
    setSelectedTime(null);
    setSelectedServices([]);
  };

  const handleConfirm = () => {
    if (!selectedOutlet || !selectedTime || selectedServices.length === 0 || !selectedStylist) return;
    
    onAdd({
      outletId: selectedOutlet.id,
      date: selectedDate,
      timeSlot: selectedTime,
      stylistId: selectedStylist === 'none' ? null : selectedStylist.id,
      assignmentType: selectedStylist === 'none' ? AssignmentType.SYSTEM_AUTO : AssignmentType.MANUAL,
      serviceNames: selectedServices,
    });
    setLastOutletId(selectedOutlet.id);
    resetBooking();
  };

  const confirmCancel = () => {
    if (cancellingId) {
      onCancel(cancellingId);
      setCancellingId(null);
    }
  };

  // Generate date row (next 14 days)
  const dateOptions = useMemo(() => {
    const dates = [];
    for (let i = 0; i < 14; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push({
        full: d.toISOString().split('T')[0],
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNum: d.getDate(),
        month: d.toLocaleDateString('en-US', { month: 'short' })
      });
    }
    return dates;
  }, []);

  if (isBooking) {
    if (!selectedOutlet) {
      return (
        <div className="flex flex-col h-full bg-zinc-950 animate-in fade-in duration-300">
          <div className="p-4 flex items-center justify-between sticky top-0 bg-zinc-950 z-10 border-b border-zinc-900">
            <button onClick={resetBooking} className="p-2 -ml-2 text-zinc-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <span className="font-bold text-white">Select Outlet</span>
            <div className="w-10"></div>
          </div>
          <div className="p-4 space-y-4">
            <p className="text-zinc-500 text-sm">Please choose your preferred salon branch to continue booking.</p>
            <div className="space-y-4">
              {OUTLETS.map(o => (
                <div 
                  key={o.id}
                  onClick={() => setSelectedOutlet(o)}
                  className="group relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-3xl p-1 active:scale-[0.98] transition-all"
                >
                  <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden mb-1">
                    <img src={o.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  </div>
                  <div className="p-4 pt-2">
                    <h4 className="font-bold text-lg text-white">{o.name}</h4>
                    <p className="text-xs text-zinc-500 mt-1">{o.address}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500 bg-amber-500/10 px-2 py-1 rounded">Open Now</span>
                      <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    const isFormValid = selectedStylist && selectedTime && selectedServices.length > 0;

    return (
      <div className="flex flex-col h-full bg-zinc-950 animate-in slide-in-from-right duration-300">
        <div className="p-4 flex items-center justify-between sticky top-0 bg-zinc-950/90 backdrop-blur-md z-30 border-b border-zinc-900">
          <button onClick={() => setSelectedOutlet(null)} className="p-2 -ml-2 text-zinc-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <div className="text-center">
            <span className="block font-bold text-white text-sm">Booking Details</span>
            <span className="block text-[10px] text-amber-500 font-medium">{selectedOutlet.name}</span>
          </div>
          <button onClick={resetBooking} className="p-2 -mr-2 text-zinc-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
          <section className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">1. Choose Stylist</h3>
            </div>
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
              {STYLISTS.map(s => (
                <div 
                  key={s.id}
                  onClick={() => setSelectedStylist(s)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-2xl border min-w-[100px] transition-all ${selectedStylist !== 'none' && selectedStylist?.id === s.id ? 'bg-amber-500/10 border-amber-500 scale-105' : 'bg-zinc-900 border-zinc-800 opacity-60'}`}
                >
                  <img src={s.image} className="w-14 h-14 rounded-full object-cover grayscale" />
                  <div className="text-center">
                    <h4 className="font-bold text-[11px] truncate">{s.name}</h4>
                    <p className="text-[9px] text-zinc-500 truncate">{s.title}</p>
                  </div>
                </div>
              ))}
              <div 
                onClick={() => setSelectedStylist('none')}
                className={`flex flex-col items-center gap-2 p-3 rounded-2xl border min-w-[100px] transition-all ${selectedStylist === 'none' ? 'bg-amber-500/10 border-amber-500 scale-105' : 'bg-zinc-900 border-zinc-800 opacity-60'}`}
              >
                <div className="w-14 h-14 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6"/><path d="M16 11h6"/></svg>
                </div>
                <div className="text-center">
                  <h4 className="font-bold text-[11px]">Any Stylist</h4>
                  <p className="text-[9px] text-zinc-500">Auto-assign</p>
                </div>
              </div>
            </div>
          </section>

          <section className="p-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">2. Pick Date</h3>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
              {dateOptions.map(date => (
                <button
                  key={date.full}
                  onClick={() => setSelectedDate(date.full)}
                  className={`flex flex-col items-center min-w-[60px] py-3 rounded-2xl border transition-all ${selectedDate === date.full ? 'bg-amber-500 border-amber-500 text-zinc-950 font-bold scale-105' : 'bg-zinc-900 border-zinc-800 text-zinc-400'}`}
                >
                  <span className="text-[10px] uppercase opacity-60 mb-1">{date.dayName}</span>
                  <span className="text-lg">{date.dayNum}</span>
                  <span className="text-[9px] opacity-60">{date.month}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="p-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">3. Select Time</h3>
            <div className="grid grid-cols-3 gap-2">
              {TIME_SLOTS.map(time => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-3 rounded-xl border text-sm transition-all ${selectedTime === time ? 'bg-amber-500 border-amber-500 text-zinc-950 font-bold' : 'bg-zinc-900 border-zinc-800 text-zinc-400'}`}
                >
                  {time}
                </button>
              ))}
            </div>
          </section>

          <section className="p-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">4. Choose Services</h3>
            <div className="grid grid-cols-1 gap-2">
              {SERVICES.map(s => (
                <label key={s.id} className={`flex items-center gap-3 bg-zinc-900 p-4 rounded-2xl border transition-all cursor-pointer ${selectedServices.includes(s.name) ? 'border-amber-500 bg-amber-500/5' : 'border-zinc-800'}`}>
                  <input 
                    type="checkbox"
                    className="w-5 h-5 accent-amber-500 rounded"
                    checked={selectedServices.includes(s.name)}
                    onChange={(e) => {
                      if (e.target.checked) setSelectedServices(prev => [...prev, s.name]);
                      else setSelectedServices(prev => prev.filter(name => name !== s.name));
                    }}
                  />
                  <div className="flex-1">
                    <span className="font-bold text-sm text-zinc-100">{s.name}</span>
                  </div>
                </label>
              ))}
            </div>
          </section>
        </div>

        <div className="p-4 bg-zinc-900/50 backdrop-blur-xl border-t border-zinc-800 fixed bottom-0 w-full max-w-md z-40">
          <button 
            onClick={handleConfirm}
            disabled={!isFormValid}
            className={`w-full py-4 rounded-2xl font-bold transition-all shadow-xl flex items-center justify-center gap-2 ${isFormValid ? 'bg-amber-500 text-zinc-950 shadow-amber-500/10' : 'bg-zinc-800 text-zinc-600 grayscale cursor-not-allowed'}`}
          >
            {isFormValid ? 'Confirm Appointment' : 'Complete All Selections'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* Cancellation Confirmation Modal */}
      {cancellingId && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-6 animate-in fade-in duration-200">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 w-full max-w-xs space-y-6 animate-in zoom-in-95 duration-200">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto text-red-500 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </div>
              <h3 className="text-lg font-bold text-white">Cancel Appointment?</h3>
              <p className="text-zinc-500 text-sm">This action cannot be undone. Are you sure you want to proceed?</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setCancellingId(null)}
                className="py-3 rounded-xl bg-zinc-800 text-white text-sm font-bold"
              >
                Go Back
              </button>
              <button 
                onClick={confirmCancel}
                className="py-3 rounded-xl bg-red-600 text-white text-sm font-bold"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upcoming Section */}
      <div>
        <h2 className="text-lg font-bold mb-4">Upcoming Appointment</h2>
        {upcomingAppointment ? (
          <div className="bg-zinc-900 border border-amber-500/30 rounded-3xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="font-bold text-lg text-white">{OUTLETS.find(o => o.id === upcomingAppointment.outletId)?.name}</h3>
                <div className="flex items-center gap-2 text-amber-500 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                  <span className="text-sm font-bold">{upcomingAppointment.date} at {upcomingAppointment.timeSlot}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden border border-zinc-700">
                  <img 
                    src={STYLISTS.find(s => s.id === upcomingAppointment.stylistId)?.image || 'https://picsum.photos/200'} 
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-tighter">Stylist</p>
                  <p className="text-sm font-medium">{STYLISTS.find(s => s.id === upcomingAppointment.stylistId)?.name || 'Stylist will be assigned'}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {upcomingAppointment.serviceNames.map(name => (
                  <span key={name} className="px-2.5 py-1 bg-zinc-800 text-zinc-400 rounded-lg text-[10px] font-medium">{name}</span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setIsBooking(true)}
                className="py-2.5 rounded-xl bg-zinc-800 text-white text-sm font-bold transition-all"
              >
                Reschedule
              </button>
              <button 
                onClick={() => setCancellingId(upcomingAppointment.id)}
                className="py-2.5 rounded-xl bg-red-500/10 text-red-500 text-sm font-bold border border-red-500/20"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="p-10 border-2 border-dashed border-zinc-800 rounded-3xl text-center space-y-4">
            <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center mx-auto text-zinc-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="m9 16 2 2 4-4"/></svg>
            </div>
            <p className="text-zinc-500 text-sm font-medium">No upcoming appointment</p>
          </div>
        )}
      </div>

      <button 
        onClick={() => setIsBooking(true)}
        className="w-full bg-amber-500 text-zinc-950 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-amber-500/10 active:scale-95 transition-transform"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
        New Appointment
      </button>

      {/* History Section */}
      <div className="pt-4">
        <h2 className="text-lg font-bold mb-4">Past Appointments</h2>
        <div className="space-y-3">
          {appointments.filter(a => new Date(a.date).getTime() < new Date().setHours(0,0,0,0)).length === 0 ? (
            <p className="text-xs text-zinc-600 text-center py-4 italic">Your visit history will appear here.</p>
          ) : (
            appointments.filter(a => new Date(a.date).getTime() < new Date().setHours(0,0,0,0)).map(a => (
              <div key={a.id} className="bg-zinc-900/50 p-4 rounded-2xl flex items-center justify-between border border-zinc-800/50">
                <div>
                  <h4 className="font-bold text-sm">{OUTLETS.find(o => o.id === a.outletId)?.name}</h4>
                  <p className="text-[10px] text-zinc-500">{a.date} • {a.timeSlot}</p>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 px-2 py-1 bg-zinc-800 rounded">{a.status}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentScreen;
