// Tipos básicos que se usan en toda la aplicación
export interface User {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  lastName2?: string;
  role: 'coach' | 'swimmer';
  profileImage?: string;
  createdAt: string;
}

export interface Swimmer extends User {
  age?: number;
  category?: string;
  level?: string;
  specialties?: string[];
}

export interface Coach extends User {
  teams?: string[];
}

// Tipos para respuestas de API
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// Tipos para manejo de errores
export interface AppError {
  code: string;
  message: string;
  details?: unknown;
}
