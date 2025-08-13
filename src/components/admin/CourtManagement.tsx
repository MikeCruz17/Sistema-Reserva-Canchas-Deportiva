import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, MapPin, Users, DollarSign } from 'lucide-react';
import { Court } from '../../types';
import { useNotification } from '../../contexts/NotificationContext';

export default function CourtManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'maintenance' | 'closed'>('all');

  const { showNotification } = useNotification();

  // Mock data for courts
  const mockCourts: Court[] = [
    {
      id: '1',
      name: 'Cancha de Fútbol Principal',
      type: 'futbol',
      description: 'Cancha de fútbol de césped sintético con iluminación LED',
      capacity: 22,
      pricePerHour: 25000,
      amenities: ['Césped sintético', 'Iluminación LED', 'Marcador electrónico', 'Vestidores', 'Parqueadero'],
      status: 'available',
      images: ['https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg'],
      rules: [
        'Uso exclusivo de zapatos deportivos',
        'Prohibido el consumo de alcohol',
        'Máximo 22 jugadores por reserva',
        'Respetar horarios de reserva'
      ],
      createdAt: new Date('2024-01-01')
    },
    {
      id: '2',
      name: 'Cancha de Básquet Cubierta',
      type: 'basquet',
      description: 'Cancha techada con piso de madera y tableros profesionales',
      capacity: 10,
      pricePerHour: 20000,
      amenities: ['Piso de madera', 'Techo cubierto', 'Tableros profesionales', 'Gradería', 'Aire acondicionado'],
      status: 'available',
      images: ['https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg'],
      rules: [
        'Uso obligatorio de zapatos deportivos',
        'Prohibido comer dentro de la cancha',
        'Máximo 10 jugadores por reserva',
        'Mantener limpia la instalación'
      ],
      createdAt: new Date('2024-01-01')
    },
    {
      id: '4',
      name: 'Cancha Multiusos',
      type: 'multideporte',
      description: 'Cancha adaptable para volleyball, básquet y fútbol sala',
      capacity: 16,
      pricePerHour: 18000,
      amenities: ['Superficie sintética', 'Porterías móviles', 'Red de volley ajustable', 'Marcador manual'],
      status: 'maintenance',
      images: ['https://images.pexels.com/photos/163452/basketball-court-sport-game-163452.jpeg'],
      rules: [
        'Configurar según deporte a practicar',
        'Reportar cualquier daño',
        'Devolver equipos a su lugar',
        'Máximo 16 jugadores'
      ],
      createdAt: new Date('2024-01-01')
    }
  ];

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
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'maintenance':
        return 'bg-orange-100 text-orange-800';
      case 'closed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
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

  const getCourtTypeText = (type: Court['type']) => {
    switch (type) {
      case 'futbol': return 'Fútbol';
      case 'basquet': return 'Básquet';
      case 'tenis': return 'Tenis';
      case 'voley': return 'Volleyball';
      case 'multideporte': return 'Multiusos';
      default: return 'Otro';
    }
  };

  const handleEditCourt = (courtId: string) => {
    showNotification({
      type: 'info',
      title: 'Función en desarrollo',
      message: 'La edición de canchas estará disponible próximamente'
    });
  };

  const handleDeleteCourt = (courtId: string) => {
    showNotification({
      type: 'warning',
      title: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar esta cancha?'
    });
  };

  const filteredCourts = mockCourts.filter(court => {
    const matchesSearch = court.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         court.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || court.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: mockCourts.length,
    available: mockCourts.filter(c => c.status === 'available').length,
    maintenance: mockCourts.filter(c => c.status === 'maintenance').length,
    closed: mockCourts.filter(c => c.status === 'closed').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Gestión de Canchas</h2>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Buscar canchas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Todas ({statusCounts.all})</option>
            <option value="available">Disponibles ({statusCounts.available})</option>
            <option value="maintenance">Mantenimiento ({statusCounts.maintenance})</option>
            <option value="closed">Cerradas ({statusCounts.closed})</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Nueva Cancha</span>
          </button>
        </div>
      </div>

      {/* Courts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourts.map(court => (
          <div key={court.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
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
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{court.name}</h3>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {getCourtTypeText(court.type)}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{court.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Cap: {court.capacity}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <DollarSign className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold text-blue-600">
                    ${court.pricePerHour.toLocaleString()}/h
                  </span>
                </div>
              </div>

              <div className="mb-4">
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

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <MapPin className="w-4 h-4" />
                  <span>ID: {court.id}</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <button
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    title="Ver detalles"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleEditCourt(court.id)}
                    className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                    title="Editar cancha"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteCourt(court.id)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Eliminar cancha"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCourts.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron canchas</h3>
          <p className="text-gray-500">
            {searchTerm ? 'Intenta con diferentes términos de búsqueda' : 'No hay canchas registradas aún'}
          </p>
        </div>
      )}
    </div>
  );
}