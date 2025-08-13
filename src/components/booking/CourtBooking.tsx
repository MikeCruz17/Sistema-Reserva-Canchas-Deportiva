import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, DollarSign, ChevronLeft, ChevronRight } from 'lucide-react';
import { CourtService } from '../../services/courtService';
import { useNotification } from '../../contexts/NotificationContext';
import { useAuth } from '../../contexts/AuthContext';
import { Court, AvailabilityData, TimeSlot } from '../../types';
import LoadingSpinner from '../common/LoadingSpinner';

export default function CourtBooking() {
  const [courts, setCourts] = useState<Court[]>([]);
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [availability, setAvailability] = useState<AvailabilityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [availabilityLoading, setAvailabilityLoading] = useState(false);

  const courtService = new CourtService();
  const { showNotification } = useNotification();
  const { user } = useAuth();

  useEffect(() => {
    loadCourts();
  }, []);

  useEffect(() => {
    if (selectedCourt) {
      loadAvailability();
    }
  }, [selectedCourt, selectedDate]);

  const loadCourts = async () => {
    try {
      const courtData = await courtService.getCourts();
      setCourts(courtData.filter(court => court.status === 'available'));
    } catch (error) {
      showNotification({
        type: 'error',
        title: 'Error',
        message: 'No se pudieron cargar las canchas'
      });
    } finally {
      setLoading(false);
    }
  };

  const loadAvailability = async () => {
    if (!selectedCourt) return;
    
    setAvailabilityLoading(true);
    try {
      const availabilityData = await courtService.getAvailability(selectedCourt.id, selectedDate);
      setAvailability(availabilityData);
      setSelectedSlots([]);
    } catch (error) {
      showNotification({
        type: 'error',
        title: 'Error',
        message: 'No se pudo cargar la disponibilidad'
      });
    } finally {
      setAvailabilityLoading(false);
    }
  };

  const handleSlotToggle = (time: string) => {
    setSelectedSlots(prev => {
      if (prev.includes(time)) {
        return prev.filter(slot => slot !== time);
      } else {
        return [...prev, time].sort();
      }
    });
  };

  const calculateTotalPrice = () => {
    if (!selectedCourt || selectedSlots.length === 0) return 0;
    return selectedSlots.length * selectedCourt.pricePerHour;
  };

  const handleBooking = async () => {
    if (!selectedCourt || !user || selectedSlots.length === 0) return;

    setBookingLoading(true);
    try {
      const startTime = selectedSlots[0];
      const endTime = selectedSlots[selectedSlots.length - 1];
      const endHour = parseInt(endTime.split(':')[0]) + 1;
      const finalEndTime = `${endHour.toString().padStart(2, '0')}:00`;

      await courtService.createReservation({
        userId: user.id,
        courtId: selectedCourt.id,
        date: new Date(selectedDate),
        startTime,
        endTime: finalEndTime,
        duration: selectedSlots.length,
        totalPrice: calculateTotalPrice(),
        status: 'pending',
        notes: `Reserva para ${selectedSlots.length} hora(s)`
      });

      showNotification({
        type: 'success',
        title: 'Reserva creada',
        message: 'Tu reserva ha sido enviada y está pendiente de aprobación'
      });

      setSelectedSlots([]);
      loadAvailability();
    } catch (error) {
      showNotification({
        type: 'error',
        title: 'Error',
        message: 'No se pudo crear la reserva'
      });
    } finally {
      setBookingLoading(false);
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

  const getNextWeekDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    
    return dates;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Reservar Cancha</h1>
        <p className="text-gray-600">Selecciona una cancha, fecha y horarios para tu reserva</p>
      </div>

      {!selectedCourt ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Selecciona una Cancha</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courts.map(court => (
              <div
                key={court.id}
                onClick={() => setSelectedCourt(court)}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md hover:border-blue-300 transition-all cursor-pointer"
              >
                <div className="aspect-video bg-gray-200 relative">
                  <img
                    src={court.images[0]}
                    alt={court.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 text-2xl">
                    {getCourtIcon(court.type)}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{court.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{court.description}</p>
                  
                  <div className="flex items-center justify-between text-sm mb-3">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Capacidad: {court.capacity}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold text-blue-600">
                        ${court.pricePerHour.toLocaleString()}/hora
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {court.amenities.slice(0, 3).map(amenity => (
                      <span
                        key={amenity}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                      >
                        {amenity}
                      </span>
                    ))}
                    {court.amenities.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        +{court.amenities.length - 3} más
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Selected Court Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="text-3xl">{getCourtIcon(selectedCourt.type)}</div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{selectedCourt.name}</h2>
                  <p className="text-gray-600">{selectedCourt.description}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>Capacidad: {selectedCourt.capacity}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>Disponible</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedCourt(null)}
                className="flex items-center space-x-1 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Cambiar cancha</span>
              </button>
            </div>
          </div>

          {/* Date Selection */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Seleccionar Fecha</h3>
            <div className="grid grid-cols-7 gap-2">
              {getNextWeekDates().map(date => {
                const dateStr = date.toISOString().split('T')[0];
                const isSelected = selectedDate === dateStr;
                const isToday = dateStr === new Date().toISOString().split('T')[0];
                
                return (
                  <button
                    key={dateStr}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`p-3 rounded-lg text-center transition-colors ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="text-xs font-medium">
                      {date.toLocaleDateString('es-ES', { weekday: 'short' })}
                    </div>
                    <div className={`text-lg font-bold ${isToday && !isSelected ? 'text-blue-600' : ''}`}>
                      {date.getDate()}
                    </div>
                    <div className="text-xs">
                      {date.toLocaleDateString('es-ES', { month: 'short' })}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Slots */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Seleccionar Horarios</h3>
            
            {availabilityLoading ? (
              <div className="flex items-center justify-center py-8">
                <LoadingSpinner size="large" />
              </div>
            ) : availability ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {availability.slots.map(slot => {
                  const isSelected = selectedSlots.includes(slot.time);
                  const isAvailable = slot.available;
                  
                  return (
                    <button
                      key={slot.time}
                      onClick={() => isAvailable && handleSlotToggle(slot.time)}
                      disabled={!isAvailable}
                      className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                        !isAvailable
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{slot.time}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>

          {/* Booking Summary */}
          {selectedSlots.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen de Reserva</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Cancha:</span>
                  <span className="font-medium">{selectedCourt.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fecha:</span>
                  <span className="font-medium">
                    {new Date(selectedDate).toLocaleDateString('es-ES', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Horarios:</span>
                  <span className="font-medium">
                    {selectedSlots[0]} - {parseInt(selectedSlots[selectedSlots.length - 1].split(':')[0]) + 1}:00
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duración:</span>
                  <span className="font-medium">{selectedSlots.length} hora(s)</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-blue-600">${calculateTotalPrice().toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleBooking}
                disabled={bookingLoading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {bookingLoading ? 'Procesando...' : 'Confirmar Reserva'}
              </button>
              
              <p className="text-sm text-gray-500 text-center mt-3">
                Tu reserva será enviada para aprobación del administrador
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}