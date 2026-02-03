
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  User, 
  Appointment, 
  Notification, 
  AppointmentStatus, 
  AssignmentType,
  Gender
} from './types';
import { STYLISTS, OUTLETS } from './constants';

// Screens
import LoginScreen from './screens/LoginScreen';
import CreateAccountScreen from './screens/CreateAccountScreen';
import HomeScreen from './screens/HomeScreen';
import AppointmentScreen from './screens/AppointmentScreen';
import AboutUsScreen from './screens/AboutUsScreen';
import ProfileScreen from './screens/ProfileScreen';
import NotificationScreen from './screens/NotificationScreen';

// Components
import BottomNav from './components/BottomNav';
import TopBar from './components/TopBar';

type CurrentScreen = 'home' | 'appointment' | 'about' | 'profile' | 'notifications' | 'create-account' | 'login';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [screen, setScreen] = useState<CurrentScreen>('login');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [lastSelectedOutletId, setLastSelectedOutletId] = useState<string>(OUTLETS[0].id);

  // Load state from local storage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('oviss_user');
    const storedAppointments = localStorage.getItem('oviss_appointments');
    const storedNotifications = localStorage.getItem('oviss_notifications');
    
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setScreen('home');
    }
    if (storedAppointments) setAppointments(JSON.parse(storedAppointments));
    if (storedNotifications) setNotifications(JSON.parse(storedNotifications));
  }, []);

  // Save state to local storage when it changes
  useEffect(() => {
    if (currentUser) localStorage.setItem('oviss_user', JSON.stringify(currentUser));
    else localStorage.removeItem('oviss_user');
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('oviss_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('oviss_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Handle Login
  const handleLoginSuccess = (identifier: string, mode: 'phone' | 'email') => {
    const storedUser = localStorage.getItem('oviss_user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if ((mode === 'phone' && user.phone === identifier) || (mode === 'email' && user.email === identifier)) {
        setCurrentUser(user);
        setScreen('home');
        return;
      }
    }
    setScreen('create-account');
  };

  const handleCreateAccount = (userData: Partial<User>) => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: userData.name || '',
      dob: userData.dob || '',
      gender: userData.gender || Gender.OTHER,
      phone: userData.phone || '',
      email: userData.email || '',
      creditBalance: 100,
      ...userData
    };
    setCurrentUser(newUser);
    setScreen('home');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setScreen('login');
  };

  const addNotification = useCallback((type: Notification['type'], title: string, message: string) => {
    if (!currentUser) return;
    const newNotif: Notification = {
      id: Math.random().toString(36).substr(2, 9),
      userId: currentUser.id,
      type,
      title,
      message,
      timestamp: Date.now(),
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  }, [currentUser]);

  const handleAddAppointment = (data: Omit<Appointment, 'id' | 'userId' | 'status' | 'createdAt'>) => {
    if (!currentUser) return;
    let assignedStylistId = data.stylistId;
    let assignmentType = data.assignmentType;
    if (assignmentType === AssignmentType.SYSTEM_AUTO) {
      const dateKey = data.date;
      const slotKey = data.timeSlot;
      const availableStylists = STYLISTS.filter(s => {
        return !appointments.some(a => 
          a.date === dateKey && 
          a.timeSlot === slotKey && 
          a.stylistId === s.id && 
          a.status === AppointmentStatus.CONFIRMED
        );
      });
      const pool = availableStylists.length > 0 ? availableStylists : STYLISTS;
      const sortedPool = [...pool].sort((a, b) => {
        const countA = appointments.filter(ap => ap.date === dateKey && ap.stylistId === a.id).length;
        const countB = appointments.filter(ap => ap.date === dateKey && ap.stylistId === b.id).length;
        if (countA !== countB) return countA - countB;
        return a.rank - b.rank;
      });
      assignedStylistId = sortedPool[0].id;
    }
    const newAppointment: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      userId: currentUser.id,
      status: AppointmentStatus.CONFIRMED,
      createdAt: Date.now(),
      ...data,
      stylistId: assignedStylistId
    };
    setAppointments(prev => [newAppointment, ...prev]);
    addNotification('booked', 'Appointment booked successfully', `Your appointment at ${OUTLETS.find(o => o.id === data.outletId)?.name} is confirmed.`);
    if (assignmentType === AssignmentType.SYSTEM_AUTO) {
      const stylist = STYLISTS.find(s => s.id === assignedStylistId);
      addNotification('assigned', 'Stylist assigned for your appointment', `${stylist?.name} will be serving you for your session.`);
    }
    setScreen('appointment');
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: AppointmentStatus.CANCELLED } : a));
    addNotification('cancelled', 'Appointment cancelled', 'Your appointment has been successfully cancelled.');
  };

  const unreadNotifCount = notifications.filter(n => !n.read).length;

  const renderScreen = () => {
    switch (screen) {
      case 'login': return <LoginScreen onLogin={handleLoginSuccess} />;
      case 'create-account': return <CreateAccountScreen onSubmit={handleCreateAccount} />;
      case 'home': return <HomeScreen onNavigate={setScreen} />;
      case 'appointment': return (
        <AppointmentScreen 
          appointments={appointments.filter(a => a.status === AppointmentStatus.CONFIRMED)}
          onAdd={handleAddAppointment}
          onCancel={handleCancelAppointment}
          lastOutletId={lastSelectedOutletId}
          setLastOutletId={setLastSelectedOutletId}
        />
      );
      case 'about': return <AboutUsScreen />;
      case 'profile': return <ProfileScreen user={currentUser} onLogout={handleLogout} onUpdateUser={setCurrentUser} />;
      case 'notifications': return (
        <NotificationScreen 
          notifications={notifications} 
          onMarkRead={(id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))}
          onBack={() => setScreen('home')}
        />
      );
      default: return <HomeScreen onNavigate={setScreen} />;
    }
  };

  const showNav = currentUser && screen !== 'login' && screen !== 'create-account' && screen !== 'notifications';

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100 max-w-md mx-auto relative overflow-hidden">
      {showNav && (
        <TopBar 
          onNotificationClick={() => setScreen('notifications')} 
          unreadCount={unreadNotifCount} 
        />
      )}
      
      <main 
        className={`flex-1 overflow-y-auto no-scrollbar`}
        style={{
          paddingTop: showNav ? 'calc(4rem + env(safe-area-inset-top))' : 'env(safe-area-inset-top)',
          paddingBottom: showNav ? 'calc(5rem + env(safe-area-inset-bottom))' : 'env(safe-area-inset-bottom)'
        }}
      >
        {renderScreen()}
      </main>

      {showNav && <BottomNav activeTab={screen} onTabChange={setScreen} />}
    </div>
  );
};

export default App;
