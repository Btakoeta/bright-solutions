import { create } from 'zustand';
import api from '../services/api';
export const useAuthStore = create((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    initAuth: () => {
        const token = localStorage.getItem('token');
        if (token) {
            set({ token, isAuthenticated: true });
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    },
    login: async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        set({ token, user, isAuthenticated: true });
    },
    register: async (data) => {
        const response = await api.post('/auth/register', data);
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        set({ token, user, isAuthenticated: true });
    },
    logout: () => {
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
        set({ user: null, token: null, isAuthenticated: false });
    },
}));
