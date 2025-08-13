import React, { useState } from 'react';
import { Users, Calendar, ClipboardList, AlertTriangle, Settings, BarChart3, Shield } from 'lucide-react';
import UserManagement from './UserManagement';
import ReservationManagement from './ReservationManagement';
import CourtManagement from './CourtManagement';
import ReportsManagement from './ReportsManagement';
import AdminStats from './AdminStats';

type AdminView = 'stats' | 'users' | 'reservations' | 'courts' | 'reports' | 'settings';

export default function AdminPanel() {
  const [currentView, setCurrentView] = useState<AdminView>('stats');

  const adminNavItems = [
    { id: 'stats' as const, label: 'Estadísticas', icon: BarChart3 },
    { id: 'users' as const, label: 'Usuarios', icon: Users },
    { id: 'reservations' as const, label: 'Reservas', icon: Calendar },
    { id: 'courts' as const, label: 'Canchas', icon: ClipboardList },
    { id: 'reports' as const, label: 'Reportes', icon: AlertTriangle },
    { id: 'settings' as const, label: 'Configuración', icon: Settings }
  ];

  const renderContent = () => {
    switch (currentView) {
      case 'stats':
        return <AdminStats />;
      case 'users':
        return <UserManagement />;
      case 'reservations':
        return <ReservationManagement />;
      case 'courts':
        return <CourtManagement />;
      case 'reports':
        return <ReportsManagement />;
      case 'settings':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Configuración del Sistema</h2>
            <p className="text-gray-600">Configuraciones avanzadas del sistema disponibles próximamente.</p>
          </div>
        );
      default:
        return <AdminStats />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Shield className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
            <p className="text-gray-600">Gestiona usuarios, reservas y el sistema completo</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Admin Tabs">
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                    currentView === item.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}