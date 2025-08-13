export interface User {
  id: string;
  email: string;
  fullName: string;
  cedula: string;
  phone: string;
  role: 'user' | 'admin';
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}

export interface Court {
  id: string;
  name: string;
  type: 'futbol' | 'basquet' | 'tenis' | 'voley' | 'multideporte';
  description: string;
  capacity: number;
  pricePerHour: number;
  amenities: string[];
  status: 'available' | 'maintenance' | 'closed';
  images: string[];
  rules: string[];
  createdAt: Date;
}

export interface Reservation {
  id: string;
  userId: string;
  courtId: string;
  date: Date;
  startTime: string;
  endTime: string;
  duration: number;
  totalPrice: number;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled' | 'completed';
  notes?: string;
  adminNotes?: string;
  createdAt: Date;
  user?: User;
  court?: Court;
}

export interface CourtReport {
  id: string;
  courtId: string;
  userId: string;
  type: 'maintenance' | 'damage' | 'cleanliness' | 'equipment';
  severity: 'low' | 'medium' | 'high' | 'urgent';
  title: string;
  description: string;
  images?: string[];
  status: 'pending' | 'in_progress' | 'resolved' | 'dismissed';
  adminResponse?: string;
  createdAt: Date;
  resolvedAt?: Date;
  court?: Court;
  user?: User;
}

export interface TimeSlot {
  time: string;
  available: boolean;
  reservationId?: string;
}

export interface AvailabilityData {
  date: string;
  courtId: string;
  slots: TimeSlot[];
}