import api from './client';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  role: 'buyer' | 'seller';
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'buyer' | 'seller' | 'admin';
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

// Authentication API calls
export const authAPI = {
  // Login user
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  // Register user
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  // Get current user
  getMe: async (): Promise<{ success: boolean; user: User }> => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  // Logout (client-side)
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};