import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Header from './components/Header';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/admin/AdminPanel';
import CourtBooking from './components/booking/CourtBooking';
import UserReservations from './components/user/UserReservations';
import CourtReporting from './components/reporting/CourtReporting';
import LoadingSpinner from './components/common/LoadingSpinner';

type View = 'dashboard' | 'booking' | 'reservations' | 'reporting' | 'admin';

function AppContent() {
  const { user, loading } = useAuth();
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [showLogin, setShowLogin] = useState(true);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          {showLogin ? (
            <LoginForm onToggleMode={() => setShowLogin(false)} />
          ) : (
            <RegisterForm onToggleMode={() => setShowLogin(true)} />
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentView={currentView}
        onViewChange={setCurrentView}
        isAdmin={user.role === 'admin'}
      />
      <main className="container mx-auto px-4 py-8">
        {currentView === 'dashboard' && <Dashboard />}
        {currentView === 'booking' && <CourtBooking />}
        {currentView === 'reservations' && <UserReservations />}
        {currentView === 'reporting' && <CourtReporting />}
        {currentView === 'admin' && user.role === 'admin' && <AdminPanel />}
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <AppContent />
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;