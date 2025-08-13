import React from 'react';
import { Users, Calendar, TrendingUp, AlertTriangle, DollarSign, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function AdminStats() {
  const stats = [
    {
      title: 'Usuarios Totales',
      value: '247',
      change: '+12%',
      changeType: 'positive' as const,
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Reservas Este Mes',
      value: '89',
      change: '+23%',
      changeType: 'positive' as const,
      icon: Calendar,
      color: 'green'
    },
    {
      title: 'Ingresos Mensuales',
      value: '$2,340,000',
      change: '+8%',
      changeType: 'positive' as const,
      icon: DollarSign,
      color: 'purple'
    },
    {
      title: 'Reportes Pendientes',
      value: '3',
      change: '-2',
      changeType: 'negative' as const,
      icon: AlertTriangle,
      color: 'orange'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'reservation',
      message: 'Nueva reserva de Juan Pérez para Cancha de Fútbol',
      time: 'Hace 5 minutos',
      status: 'pending'
    },
    {
      id: 2,
      type: 'user',
      message: 'Usuario María García registrado exitosamente',
      time: 'Hace 15 minutos',
      status: 'success'
    },
    {
      id: 3,
      type: 'report',
      message: 'Nuevo reporte: Mantenimiento en Cancha de Básquet',
      time: 'Hace 1 hora',
      status: 'warning'
    },
    {
      id: 4,
      type: 'reservation',
      message: 'Reserva completada: Cancha de Tenis #1',
      time: 'Hace 2 horas',
      status: 'success'
    }
  ];

  const getIconColor = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-600';
      case 'green': return 'bg-green-100 text-green-600';
      case 'purple': return 'bg-purple-100 text-purple-600';
      case 'orange': return 'bg-orange-100 text-orange-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getActivityIcon = (type: string, status: string) => {
    if (type === 'reservation') {
      return status === 'success' ? CheckCircle : Calendar;
    }
    if (type === 'user') return Users;
    if (type === 'report') return AlertTriangle;
    return Clock;
  };

  const getActivityColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-orange-600 bg-orange-100';
      case 'pending': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${getIconColor(stat.color)}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.title}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Placeholder */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Reservas por Mes</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Gráfico de tendencias disponible próximamente</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Actividad Reciente</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => {
              const ActivityIcon = getActivityIcon(activity.type, activity.status);
              return (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${getActivityColor(activity.status)}`}>
                    <ActivityIcon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 line-clamp-2">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
            <Users className="w-8 h-8 text-blue-600 mb-2" />
            <h4 className="font-medium text-gray-900">Gestionar Usuarios</h4>
            <p className="text-gray-600 text-sm">Aprobar, rechazar o editar usuarios</p>
          </button>
          
          <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors">
            <Calendar className="w-8 h-8 text-green-600 mb-2" />
            <h4 className="font-medium text-gray-900">Revisar Reservas</h4>
            <p className="text-gray-600 text-sm">Aprobar o rechazar reservas pendientes</p>
          </button>
          
          <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors">
            <AlertTriangle className="w-8 h-8 text-orange-600 mb-2" />
            <h4 className="font-medium text-gray-900">Ver Reportes</h4>
            <p className="text-gray-600 text-sm">Revisar reportes de mantenimiento</p>
          </button>
        </div>
      </div>
    </div>
  );
}