import React, { useState } from 'react';
import { Calendar, Clock, MapPin, CheckCircle, AlertCircle, XCircle, Eye } from 'lucide-react';
import { Reservation } from '../../types';

export default function UserReservations() {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'approved' | 'completed'>('all');
  
  // Mock data for reservations
  const mockReservations: Reservation[] = [
    {
      id: '1',
      userId: '2',
      courtId: '1',
      date: new Date('2024-12-20'),
      startTime: '14:00',
      endTime: '16:00',
      duration: 2,
      totalPrice: 50000,
      status: 'approved',
      notes: 'Partido de fútbol con amigos',
      createdAt: new Date('2024-12-15'),
      court: {
        id: '1',
        name: 'Cancha de Fútbol Principal',
        type: 'futbol',
        description: 'Cancha de fútbol de césped sintético',
        capacity: 22,
        pricePerHour: 25000,
        amenities: ['Césped sintético', 'Iluminación LED'],
        status: 'available',
        images: ['https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg'],
        rules: [],
        createdAt: new Date()
      }
    },
    {
      id: '2',
      userId: '2',
      courtId: '2',
      date: new Date('2024-12-18'),
      startTime: '10:00',
      endTime: '11:00',
      duration: 1,
      totalPrice: 20000,
      status: 'pending',
      notes: 'Entrenamiento de básquet',
      createdAt: new Date('2024-12-16'),
      court: {
        id: '2',
        name: 'Cancha de Básquet Cubierta',
        type: 'basquet',
        description: 'Cancha techada con piso de madera',
        capacity: 10,
        pricePerHour: 20000,
        amenities: ['Piso de madera', 'Techo cubierto'],
        status: 'available',
        images: ['https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg'],
        rules: [],
        createdAt: new Date()
      }
    },
    {
      id: '3',
      userId: '2',
      courtId: '3',
      date: new Date('2024-12-10'),
      startTime: '16:00',
      endTime: '17:00',
      duration: 1,
      totalPrice: 15000,
      status: 'completed',
      notes: 'Clase de tenis',
      createdAt: new Date('2024-12-08'),
      court: {
        id: '3',
        name: 'Cancha de Tenis #1',
        type: 'tenis',
        description: 'Cancha de tenis con superficie de arcilla',
        capacity: 4,
        pricePerHour: 15000,
        amenities: ['Superficie de arcilla', 'Red profesional'],
        status: 'available',
        images: ['https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg'],
        rules: [],
        createdAt: new Date()
      }
    }
  ];

  const getStatusIcon = (status: Reservation['status']) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-orange-600" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-blue-600" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'cancelled':
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: Reservation['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusText = (status: Reservation['status']) => {
    switch (status) {
      case 'approved':
        return 'Aprobada';
      case 'pending':
        return 'Pendiente';
      case 'completed':
        return 'Completada';
      case 'rejected':
        return 'Rechazada';
      case 'cancelled':
        return 'Cancelada';
      default:
        return 'Desconocido';
    }
  };

  const getCourtIcon = (type: string) => {
    switch (type) {
      case 'futbol': return '⚽';
      case 'basquet': return '🏀';
      case 'tenis': return '🎾';
      case 'voley': return '🏐';
      default: return '🏟️';
    }
  };

  const filteredReservations = mockReservations.filter(reservation => {
    if (activeTab === 'all') return true;
    return reservation.status === activeTab;
  });

  const tabs = [
    { id: 'all' as const, label: 'Todas', count: mockReservations.length },
    { id: 'pending' as const, label: 'Pendientes', count: mockReservations.filter(r => r.status === 'pending').length },
    { id: 'approved' as const, label: 'Aprobadas', count: mockReservations.filter(r => r.status === 'approved').length },
    { id: 'completed' as const, label: 'Completadas', count: mockReservations.filter(r => r.status === 'completed').length }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Mis Reservas</h1>
        <p className="text-gray-600">Gestiona y revisa todas tus reservas de canchas deportivas</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                    activeTab === tab.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-900'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {filteredReservations.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay reservas</h3>
              <p className="text-gray-500">
                {activeTab === 'all' 
                  ? 'No has realizado ninguna reserva aún'
                  : `No tienes reservas ${getStatusText(activeTab).toLowerCase()}`
                }
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredReservations.map((reservation) => (
                <div
                  key={reservation.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="text-2xl">
                        {getCourtIcon(reservation.court?.type || '')}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {reservation.court?.name}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {reservation.date.toLocaleDateString('es-ES', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{reservation.startTime} - {reservation.endTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(reservation.status)}`}>
                        {getStatusText(reservation.status)}
                      </span>
                      {getStatusIcon(reservation.status)}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Duración</p>
                      <p className="font-medium">{reservation.duration} hora(s)</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Precio Total</p>
                      <p className="font-medium text-blue-600">${reservation.totalPrice.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Fecha de Reserva</p>
                      <p className="font-medium">
                        {reservation.createdAt.toLocaleDateString('es-ES')}
                      </p>
                    </div>
                  </div>

                  {reservation.notes && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-1">Notas</p>
                      <p className="text-sm text-gray-700">{reservation.notes}</p>
                    </div>
                  )}

                  {reservation.adminNotes && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Comentario del administrador</p>
                      <p className="text-sm text-gray-700">{reservation.adminNotes}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <MapPin className="w-4 h-4" />
                      <span>ID: {reservation.id}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center space-x-1 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                        <span>Ver detalles</span>
                      </button>
                      
                      {reservation.status === 'approved' && (
                        <button className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          Cancelar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}