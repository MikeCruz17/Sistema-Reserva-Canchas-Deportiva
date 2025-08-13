import React, { useState, useEffect } from 'react';
import { Calendar, Clock, TrendingUp, Users, MapPin, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { CourtService } from '../services/courtService';
import { Court } from '../types';
import LoadingSpinner from './common/LoadingSpinner';

export default function Dashboard() {
  const { user } = useAuth();
  const [courts, setCourts] = useState<Court[]>([]);
  const [loading, setLoading] = useState(true);
  const courtService = new CourtService();

  useEffect(() => {
    loadCourts();
  }, []);

  const loadCourts = async () => {
    try {
      const courtData = await courtService.getCourts();
      setCourts(courtData);
    } catch (error) {
      console.error('Error loading courts:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCourtIcon = (type: Court['type']) => {
    switch (type) {
      case 'futbol': return '⚽';
      case 'basquet': return '🏀';
      case 'tenis': return '🎾';
      case 'voley': return '🏐';
      default: return '🏟️';
    }
  };

  const getStatusColor = (status: Court['status']) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-orange-100 text-orange-800';
      case 'closed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Court['status']) => {
    switch (status) {
      case 'available': return 'Disponible';
      case 'maintenance': return 'Mantenimiento';
      case 'closed': return 'Cerrada';
      default: return 'Desconocido';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  const availableCourts = courts.filter(court => court.status === 'available');
  const maintenanceCourts = courts.filter(court => court.status === 'maintenance');

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              ¡Hola, {user?.fullName}! 👋
            </h1>
            <p className="text-blue-100 text-lg">
              Bienvenido al sistema de reservas deportivas comunitarias
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
              <Calendar className="w-12 h-12" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <MapPin className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{availableCourts.length}</p>
              <p className="text-gray-600 text-sm">Canchas Disponibles</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{maintenanceCourts.length}</p>
              <p className="text-gray-600 text-sm">En Mantenimiento</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">85%</p>
              <p className="text-gray-600 text-sm">Ocupación Promedio</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">247</p>
              <p className="text-gray-600 text-sm">Usuarios Activos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Courts Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Instalaciones Deportivas</h2>
          <p className="text-gray-600 mt-1">Explora nuestras canchas disponibles</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courts.map(court => (
              <div key={court.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gray-200 relative">
                  <img
                    src={court.images[0]}
                    alt={court.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(court.status)}`}>
                      {getStatusText(court.status)}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 text-2xl">
                    {getCourtIcon(court.type)}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{court.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{court.description}</p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Capacidad: {court.capacity}</span>
                    <span className="font-semibold text-blue-600">
                      ${court.pricePerHour.toLocaleString()}/hora
                    </span>
                  </div>

                  <div className="mt-3 flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">4.8 (32 reseñas)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
            <Calendar className="w-8 h-8 text-blue-600 mb-2" />
            <h3 className="font-medium text-gray-900">Hacer Reserva</h3>
            <p className="text-gray-600 text-sm">Reserva tu cancha favorita</p>
          </button>
          
          <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors">
            <Clock className="w-8 h-8 text-green-600 mb-2" />
            <h3 className="font-medium text-gray-900">Ver Horarios</h3>
            <p className="text-gray-600 text-sm">Consulta disponibilidad</p>
          </button>
          
          <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors">
            <Users className="w-8 h-8 text-orange-600 mb-2" />
            <h3 className="font-medium text-gray-900">Mis Reservas</h3>
            <p className="text-gray-600 text-sm">Gestiona tus reservas</p>
          </button>
        </div>
      </div>
    </div>
  );
}