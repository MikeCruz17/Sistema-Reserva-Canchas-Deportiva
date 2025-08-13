import React, { useState } from 'react';
import { Search, Filter, Eye, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { CourtReport } from '../../types';
import { useNotification } from '../../contexts/NotificationContext';

export default function ReportsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'maintenance' | 'damage' | 'cleanliness' | 'equipment'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'in_progress' | 'resolved' | 'dismissed'>('all');

  const { showNotification } = useNotification();

  // Mock data for court reports
  const mockReports: CourtReport[] = [
    {
      id: '1',
      courtId: '1',
      userId: '2',
      type: 'damage',
      severity: 'high',
      title: 'Césped deteriorado en área central',
      description: 'El césped sintético presenta desgaste significativo en el área central de la cancha, con algunas zonas completamente peladas que podrían causar lesiones a los jugadores.',
      status: 'pending',
      createdAt: new Date('2024-12-16'),
      court: {
        id: '1',
        name: 'Cancha de Fútbol Principal',
        type: 'futbol',
        description: '',
        capacity: 22,
        pricePerHour: 25000,
        amenities: [],
        status: 'available',
        images: [],
        rules: [],
        createdAt: new Date()
      },
      user: {
        id: '2',
        fullName: 'Juan Pérez González',
        email: 'juan.perez@email.com',
        cedula: '12345678',
        phone: '+57 300 123 4567',
        role: 'user',
        status: 'approved',
        createdAt: new Date()
      }
    },
    {
      id: '2',
      courtId: '2',
      userId: '3',
      type: 'equipment',
      severity: 'medium',
      title: 'Tablero de básquet con aro suelto',
      description: 'El tablero del lado norte tiene el aro ligeramente suelto, lo que afecta la precisión de los tiros y podría desprenderse completamente.',
      status: 'in_progress',
      adminResponse: 'Hemos contactado al proveedor de mantenimiento. La reparación está programada para esta semana.',
      createdAt: new Date('2024-12-14'),
      court: {
        id: '2',
        name: 'Cancha de Básquet Cubierta',
        type: 'basquet',
        description: '',
        capacity: 10,
        pricePerHour: 20000,
        amenities: [],
        status: 'available',
        images: [],
        rules: [],
        createdAt: new Date()
      },
      user: {
        id: '3',
        fullName: 'María García López',
        email: 'maria.garcia@email.com',
        cedula: '87654321',
        phone: '+57 310 987 6543',
        role: 'user',
        status: 'approved',
        createdAt: new Date()
      }
    },
    {
      id: '3',
      courtId: '4',
      userId: '2',
      type: 'cleanliness',
      severity: 'low',
      title: 'Acumulación de hojas en las esquinas',
      description: 'Se han acumulado hojas secas en las esquinas de la cancha multiusos, especialmente en la zona norte.',
      status: 'resolved',
      adminResponse: 'Limpieza realizada. Se ha programado mantenimiento preventivo semanal.',
      resolvedAt: new Date('2024-12-15'),
      createdAt: new Date('2024-12-13'),
      court: {
        id: '4',
        name: 'Cancha Multiusos',
        type: 'multideporte',
        description: '',
        capacity: 16,
        pricePerHour: 18000,
        amenities: [],
        status: 'maintenance',
        images: [],
        rules: [],
        createdAt: new Date()
      },
      user: {
        id: '2',
        fullName: 'Juan Pérez González',
        email: 'juan.perez@email.com',
        cedula: '12345678',
        phone: '+57 300 123 4567',
        role: 'user',
        status: 'approved',
        createdAt: new Date()
      }
    }
  ];

  const handleUpdateStatus = (reportId: string, newStatus: CourtReport['status']) => {
    showNotification({
      type: 'success',
      title: 'Estado actualizado',
      message: `El reporte ha sido marcado como ${getStatusText(newStatus).toLowerCase()}`
    });
  };

  const getTypeIcon = (type: CourtReport['type']) => {
    switch (type) {
      case 'maintenance': return '🔧';
      case 'damage': return '⚠️';
      case 'cleanliness': return '🧹';
      case 'equipment': return '⚽';
      default: return '📝';
    }
  };

  const getTypeText = (type: CourtReport['type']) => {
    switch (type) {
      case 'maintenance': return 'Mantenimiento';
      case 'damage': return 'Daño';
      case 'cleanliness': return 'Limpieza';
      case 'equipment': return 'Equipo';
      default: return 'Otro';
    }
  };

  const getSeverityColor = (severity: CourtReport['severity']) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'high': return 'bg-red-100 text-red-800';
      case 'urgent': return 'bg-red-200 text-red-900';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityText = (severity: CourtReport['severity']) => {
    switch (severity) {
      case 'low': return 'Baja';
      case 'medium': return 'Media';
      case 'high': return 'Alta';
      case 'urgent': return 'Urgente';
      default: return 'Normal';
    }
  };

  const getStatusColor = (status: CourtReport['status']) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'dismissed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: CourtReport['status']) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'in_progress': return 'En Progreso';
      case 'resolved': return 'Resuelto';
      case 'dismissed': return 'Descartado';
      default: return 'Desconocido';
    }
  };

  const getStatusIcon = (status: CourtReport['status']) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-orange-600" />;
      case 'in_progress': return <AlertTriangle className="w-4 h-4 text-blue-600" />;
      case 'resolved': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'dismissed': return <Filter className="w-4 h-4 text-gray-600" />;
      default: return null;
    }
  };

  const filteredReports = mockReports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.court?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.user?.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || report.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-xl font-semibold text-gray-900">Gestión de Reportes</h2>
        <div className="flex items-center space-x-4 flex-wrap">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar reportes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Todos los tipos</option>
            <option value="maintenance">Mantenimiento</option>
            <option value="damage">Daños</option>
            <option value="cleanliness">Limpieza</option>
            <option value="equipment">Equipo</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Todos los estados</option>
            <option value="pending">Pendientes</option>
            <option value="in_progress">En Progreso</option>
            <option value="resolved">Resueltos</option>
            <option value="dismissed">Descartados</option>
          </select>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="text-2xl">
                  {getTypeIcon(report.type)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{report.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                    <span>📍 {report.court?.name}</span>
                    <span>👤 {report.user?.fullName}</span>
                    <span>📅 {report.createdAt.toLocaleDateString('es-ES')}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(report.severity)}`}>
                  {getSeverityText(report.severity)}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(report.status)}`}>
                  {getStatusText(report.status)}
                </span>
                {getStatusIcon(report.status)}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                {report.description}
              </p>
            </div>

            {report.adminResponse && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900 font-medium mb-1">Respuesta del administrador:</p>
                <p className="text-sm text-blue-800">{report.adminResponse}</p>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="bg-gray-100 px-2 py-1 rounded">{getTypeText(report.type)}</span>
                <span>ID: {report.id}</span>
                {report.resolvedAt && (
                  <span>Resuelto: {report.resolvedAt.toLocaleDateString('es-ES')}</span>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-1 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Eye className="w-4 h-4" />
                  <span>Ver detalles</span>
                </button>
                
                {report.status === 'pending' && (
                  <button
                    onClick={() => handleUpdateStatus(report.id, 'in_progress')}
                    className="px-3 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                  >
                    Tomar acción
                  </button>
                )}
                
                {report.status === 'in_progress' && (
                  <button
                    onClick={() => handleUpdateStatus(report.id, 'resolved')}
                    className="px-3 py-1 text-sm text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                  >
                    Marcar resuelto
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <AlertTriangle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron reportes</h3>
            <p className="text-gray-500">
              {searchTerm ? 'Intenta con diferentes términos de búsqueda' : 'No hay reportes registrados aún'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}