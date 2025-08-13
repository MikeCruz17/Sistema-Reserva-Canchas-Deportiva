import { User } from '../types';

export class AuthService {
  private mockUsers: User[] = [
    {
      id: '1',
      email: 'admin@reservadeportiva.com',
      fullName: 'Administrador Sistema',
      cedula: '12345678',
      phone: '+1234567890',
      role: 'admin',
      status: 'approved',
      createdAt: new Date('2024-01-01')
    },
    {
      id: '2',
      email: 'usuario@email.com',
      fullName: 'Usuario Demo',
      cedula: '87654321',
      phone: '+0987654321',
      role: 'user',
      status: 'approved',
      createdAt: new Date('2024-01-15')
    }
  ];

  async login(email: string, password: string): Promise<User> {
    // Simulación de autenticación
    await this.delay(1000);
    
    const user = this.mockUsers.find(u => u.email === email);
    if (!user || password !== 'demo123') {
      throw new Error('Credenciales inválidas');
    }

    if (user.status !== 'approved') {
      throw new Error('Tu cuenta está pendiente de aprobación por el administrador');
    }

    return user;
  }

  async register(userData: {
    email: string;
    password: string;
    fullName: string;
    cedula: string;
    phone: string;
  }): Promise<User> {
    await this.delay(1000);

    // Verificar si el email ya existe
    if (this.mockUsers.some(u => u.email === userData.email)) {
      throw new Error('El email ya está registrado');
    }

    // Verificar si la cédula ya existe
    if (this.mockUsers.some(u => u.cedula === userData.cedula)) {
      throw new Error('La cédula ya está registrada');
    }

    const newUser: User = {
      id: (this.mockUsers.length + 1).toString(),
      email: userData.email,
      fullName: userData.fullName,
      cedula: userData.cedula,
      phone: userData.phone,
      role: 'user',
      status: 'pending',
      createdAt: new Date()
    };

    this.mockUsers.push(newUser);
    return newUser;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}