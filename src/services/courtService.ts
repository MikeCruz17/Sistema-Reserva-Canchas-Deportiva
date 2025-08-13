import { Court, Reservation, TimeSlot, AvailabilityData } from '../types';

export class CourtService {
  private courts: Court[] = [
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
      id: '3',
      name: 'Cancha de Tenis #1',
      type: 'tenis',
      description: 'Cancha de tenis con superficie de arcilla y red profesional',
      capacity: 4,
      pricePerHour: 15000,
      amenities: ['Superficie de arcilla', 'Red profesional', 'Iluminación', 'Bancos laterales'],
      status: 'available',
      images: ['https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg'],
      rules: [
        'Máximo 4 jugadores (dobles)',
        'Uso de calzado de tenis',
        'Respetar turnos de juego',
        'Cuidar la red y la superficie'
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

  private mockReservations: Reservation[] = [];

  async getCourts(): Promise<Court[]> {
    await this.delay(800);
    return this.courts;
  }

  async getCourtById(id: string): Promise<Court | null> {
    await this.delay(500);
    return this.courts.find(court => court.id === id) || null;
  }

  async getAvailability(courtId: string, date: string): Promise<AvailabilityData> {
    await this.delay(600);
    
    const timeSlots = this.generateTimeSlots();
    const existingReservations = this.mockReservations.filter(
      r => r.courtId === courtId && 
          r.date.toISOString().split('T')[0] === date &&
          r.status === 'approved'
    );

    const slots: TimeSlot[] = timeSlots.map(time => {
      const reservation = existingReservations.find(r => 
        r.startTime <= time && time < r.endTime
      );
      
      return {
        time,
        available: !reservation,
        reservationId: reservation?.id
      };
    });

    return {
      date,
      courtId,
      slots
    };
  }

  async createReservation(reservationData: Omit<Reservation, 'id' | 'createdAt'>): Promise<Reservation> {
    await this.delay(1000);

    const newReservation: Reservation = {
      ...reservationData,
      id: (this.mockReservations.length + 1).toString(),
      createdAt: new Date()
    };

    this.mockReservations.push(newReservation);
    return newReservation;
  }

  private generateTimeSlots(): string[] {
    const slots = [];
    for (let hour = 6; hour <= 22; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
    }
    return slots;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}