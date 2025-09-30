import api from './client';
import { User } from './auth';

// User API calls
export const userAPI = {
  // Get all users (admin only)
  getUsers: async (): Promise<{ success: boolean; count: number; data: User[] }> => {
    const response = await api.get('/users');
    return response.data;
  },

  // Get single user
  getUser: async (id: string): Promise<{ success: boolean; data: User }> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Update user
  updateUser: async (id: string, data: Partial<User>): Promise<{ success: boolean; data: User }> => {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  },

  // Delete user (admin only)
  deleteUser: async (id: string): Promise<{ success: boolean; message: string }> => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  }
};