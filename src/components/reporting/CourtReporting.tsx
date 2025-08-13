import React, { useState } from 'react';
import { AlertTriangle, Camera, Send, CheckCircle } from 'lucide-react';
import { useNotification } from '../../contexts/NotificationContext';
import { useAuth } from '../../contexts/AuthContext';

export default function CourtReporting() {
  const [selectedCourt, setSelectedCourt] = useState('');
  const [reportType, setReportType] = useState('');
  const [severity, setSeverity] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const { showNotification } = useNotification();
  const { user } = useAuth();

  const courts = [
    { id: '1', name: 'Cancha de Fútbol Principal' },
    { id: '2', name: 'Cancha de Básquet Cubierta' },
    { id: '3', name: 'Cancha de Tenis #1' },
    { id: '4', name: 'Cancha Multiusos' }
  ];

  const reportTypes = [
    { value: 'maintenance', label: 'Mantenimiento General', icon: '🔧' },
    { value: 'damage', label: 'Daño o Deterioro', icon: '⚠️' },
    { value: 'cleanliness', label: 'Problema de Limpieza', icon: '🧹' },
    { value: 'equipment', label: 'Equipo Defectuoso', icon: '⚽' }
  ];

  const severityLevels = [
    { value: 'low', label: 'Baja - No urgente', color: 'text-green-600 bg-green-100' },
    { value: 'medium', label: 'Media - Atención requerida', color: 'text-orange-600 bg-orange-100' },
    { value: 'high', label: 'Alta - Atención prioritaria', color: 'text-red-600 bg-red-100' },
    { value: 'urgent', label: 'Urgente - Acción inmediata', color: 'text-red-800 bg-red-200' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCourt || !reportType || !severity || !title || !description) {
      showNotification({
        type: 'error',
        title: 'Campos requeridos',
        message: 'Por favor completa todos los campos obligatorios'
      });
      return;
    }

    setLoading(true);

    try {
      // Simular envío del reporte
      await new Promise(resolve => setTimeout(resolve, 2000));

      showNotification({
        type: 'success',
        title: 'Reporte enviado',
        message: 'Tu reporte ha sido enviado exitosamente. El administrador lo revisará pronto.'
      });

      // Limpiar formulario
      setSelectedCourt('');
      setReportType('');
      setSeverity('');
      setTitle('');
      setDescription('');
    } catch (error) {
      showNotification({
        type: 'error',
        title: 'Error',
        message: 'No se pudo enviar el reporte. Inténtalo de nuevo.'
      });
    } finally {
      setLoading(false);
    }
  };

  const getReportTypeIcon = (type: string) => {
    return reportTypes.find(rt => rt.value === type)?.icon || '📝';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-orange-100 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reportar Incidencia</h1>
            <p className="text-gray-600">Informa sobre problemas o necesidades de mantenimiento en las canchas</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Selección de Cancha */}
          <div>
            <label htmlFor="court" className="block text-sm font-medium text-gray-700 mb-2">
              Cancha <span className="text-red-500">*</span>
            </label>
            <select
              id="court"
              value={selectedCourt}
              onChange={(e) => setSelectedCourt(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
              required
            >
              <option value="">Selecciona una cancha</option>
              {courts.map(court => (
                <option key={court.id} value={court.id}>
                  {court.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tipo de Reporte */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Problema <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {reportTypes.map(type => (
                <label
                  key={type.value}
                  className={`flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    reportType === type.value
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="reportType"
                    value={type.value}
                    checked={reportType === type.value}
                    onChange={(e) => setReportType(e.target.value)}
                    className="sr-only"
                  />
                  <span className="text-2xl">{type.icon}</span>
                  <span className="font-medium text-gray-900">{type.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Nivel de Severidad */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nivel de Prioridad <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {severityLevels.map(level => (
                <label
                  key={level.value}
                  className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                    severity === level.value
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="severity"
                    value={level.value}
                    checked={severity === level.value}
                    onChange={(e) => setSeverity(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`w-3 h-3 rounded-full ${severity === level.value ? 'bg-orange-500' : 'bg-gray-300'}`} />
                  <span className={`px-2 py-1 rounded text-sm font-medium ${level.color}`}>
                    {level.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Título del Reporte */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Título del Reporte <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
              placeholder="Ej: Césped deteriorado en área central"
              required
            />
          </div>

          {/* Descripción */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Descripción Detallada <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors resize-none"
              placeholder="Describe detalladamente el problema, incluyendo ubicación específica, condiciones observadas y cualquier información relevante..."
              required
            />
          </div>

          {/* Información sobre Fotos */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start space-x-3">
              <Camera className="w-5 h-5 text-gray-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Agregar Fotos (Opcional)</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Las fotos ayudan a entender mejor el problema. Puedes enviarlas por WhatsApp o email después de enviar este reporte.
                </p>
                <p className="text-sm text-gray-500">
                  WhatsApp: +57 300 123 4567 | Email: mantenimiento@reservadeportiva.com
                </p>
              </div>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              <span className="text-red-500">*</span> Campos obligatorios
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedCourt('');
                  setReportType('');
                  setSeverity('');
                  setTitle('');
                  setDescription('');
                }}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                Limpiar
              </button>
              
              <button
                type="submit"
                disabled={loading}
                className="flex items-center space-x-2 px-6 py-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Enviar Reporte</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Información Adicional */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">¿Qué pasa después de enviar el reporte?</h3>
            <ul className="space-y-1 text-sm text-blue-800">
              <li>• El administrador recibirá una notificación inmediata</li>
              <li>• Se asignará un ID de seguimiento a tu reporte</li>
              <li>• Recibirás actualizaciones sobre el progreso de la solución</li>
              <li>• El equipo de mantenimiento tomará acción según la prioridad</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}