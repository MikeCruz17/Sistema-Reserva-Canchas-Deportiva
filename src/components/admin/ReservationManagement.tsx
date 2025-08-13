import React, { useState } from 'react';
import { Search, Filter, Eye, Check, X, Clock, Calendar, MapPin } from 'lucide-react';
import { Reservation } from '../../types';
import { useNotification } from '../../contexts/NotificationContext';

export default function ReservationManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected' | 'completed'>('all');

  const { showNotification } = useNotification();

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
      status: 'pending',
      notes: 'Partido de fútbol con amigos del colegio',
      createdAt: new Date('2024-12-15'),
      user: {
        id: '2',
        fullName: 'Juan Pérez González',
        email: 'juan.perez@email.com',
        cedula: '12345678',
        phone: '+57 300 123 4567',
        role: 'user',
        status: 'approved',
        createdAt: new Date()
      },
      court: {
        id: '1',
        name: 'Cancha de Fútbol Principal',
        type: 'futbol',
        description: 'Cancha de fútbol de césped sintético',
        capacity: 22,
        pricePerHour: 25000,
        amenities: [],
        status: 'available',
        images: [],
        rules: [],
        createdAt: new Date()
      }
    },
    {
      id: '2',
      userId: '3',
      courtId: '2',
      date: new Date('2024-12-18'),
      startTime: '10:00',
      endTime: '11:00',
      duration: 1,
      totalPrice: 20000,
      status: 'approved',
      notes: 'Entrenamiento de básquet',
      createdAt: new Date('2024-12-16'),
      user: {
        id: '3',
        fullName: 'María García López',
        email: 'maria.garcia@email.com',
        cedula: '87654321',
        phone: '+57 310 987 6543',
        role: 'user',
        status: 'approved',
        createdAt: new Date()
      },
      court: {
        id: '2',
        name: 'Cancha de Básquet Cubierta',
        type: 'basquet',
        description: 'Cancha techada con piso de madera',
        capacity: 10,
        pricePerHour: 20000,
        amenities: [],
        status: 'available',
        images: [],
        rules: [],
        createdAt: new Date()
      }
    }
  ];

  const handleApproveReservation = (reservationId: string) => {
    showNotification({
      type: 'success',
      title: 'Reserva aprobada',
      message: 'La reserva ha sido aprobada exitosamente'
    });
  };

  const handleRejectReservation = (reservationId: string) => {
    showNotification({
      type: 'warning',
      title: 'Reserva rechazada',
      message: 'La reserva ha sido rechazada'
    });
  };

  const getStatusIcon = (status: Reservation['status']) => {
    switch (status) {
      case 'approved':
        return <Check className="w-4 h-4 text-green-600" />;
      case 'rejected':
        return <X className="w-4 h-4 text-red-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-orange-600" />;
      case 'completed':
        return <Check className="w-4 h-4 text-blue-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: Reservation['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Reservation['status']) => {
    switch (status) {
      case 'approved':
        return 'Aprobada';
      case 'rejected':
        return 'Rechazada';
      case 'pending':
        return 'Pendiente';
      case 'completed':
        return 'Completada';
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
    const matchesSearch = reservation.user?.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reservation.court?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reservation.id.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || reservation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: mockReservations.length,
    pending: mockReservations.filter(r => r.status === 'pending').length,
    approved: mockReservations.filter(r => r.status === 'approved').length,
    rejected: mockReservations.filter(r => r.status === 'rejected').length,
    completed: mockReservations.filter(r => r.status === 'completed').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Gestión de Reservas</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar reservas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Todas ({statusCounts.all})</option>
            <option value="pending">Pendientes ({statusCounts.pending})</option>
            <option value="approved">Aprobadas ({statusCounts.approved})</option>
            <option value="completed">Completadas ({statusCounts.completed})</option>
            <option value="rejected">Rechazadas ({statusCounts.rejected})</option>
          </select>
        </div>
      </div>

      {/* Reservations List */}
      <div className="space-y-4">
        {filteredReservations.map((reservation) => (
          <div
            key={reservation.id}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
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
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
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
                  <p className="text-sm text-gray-600">
                    Solicitado por: <span className="font-medium">{reservation.user?.fullName}</span>
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(reservation.status)}`}>
                  {getStatusText(reservation.status)}
                </span>
                {getStatusIcon(reservation.status)}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Duración</p>
                <p className="font-medium">{reservation.duration} hora(s)</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Precio Total</p>
                <p className="font-medium text-blue-600">${reservation.totalPrice.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Fecha de Solicitud</p>
                <p className="font-medium">
                  {reservation.createdAt.toLocaleDateString('es-ES')}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Contacto</p>
                <p className="font-medium">{reservation.user?.phone}</p>
              </div>
            </div>

            {reservation.notes && (
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-1">Notas del usuario</p>
                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{reservation.notes}</p>
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
                
                {reservation.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleApproveReservation(reservation.id)}
                      className="flex items-center space-x-1 px-3 py-1 text-sm text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      <span>Aprobar</span>
                    </button>
                    <button
                      onClick={() => handleRejectReservation(reservation.id)}
                      className="flex items-center space-x-1 px-3 py-1 text-sm text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                      <span>Rechazar</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredReservations.length === 0 && (
          <div className="text-center py-12">
            <Filter className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron reservas</h3>
            <p className="text-gray-500">
              {searchTerm ? 'Intenta con diferentes términos de búsqueda' : 'No hay reservas registradas aún'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}