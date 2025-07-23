import { create } from 'zustand';
import { authService } from '@/lib/api/services/auth';
import type { User, LoginResponse } from '@/types/authentification';

interface AuthState {
    isAuthenticated: boolean | undefined;
    user: User | null;
    error: string | null;
    checkAuth: () => void;
    login: (email: string, password: string) => Promise<LoginResponse>;
    verifyOTP: (email: string, otp: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: undefined,
    user: null,
    error: null,

    checkAuth: () => {
        const isAuthenticated = authService.isAuthenticated();
        set({ isAuthenticated });

        if (isAuthenticated) {
            // Get current user data
            authService
                .getCurrentUser()
                .then((user) => set({ user }))
                .catch(() => {
                    // If getCurrentUser fails, clear auth state
                    set({ isAuthenticated: false, user: null });
                });
        }
    },

    login: async (email: string, password: string) => {
        try {
            set({ error: null });
            const response = await authService.login({ email, password });

            if (!response.requiresOTP) {
                set({
                    isAuthenticated: true,
                    user: response.user || null,
                });
            }

            return response;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to login';
            set({ error: errorMessage });
            throw error;
        }
    },

    verifyOTP: async (email: string, otp: string) => {
        try {
            set({ error: null });
            const response = await authService.verifyOTP({ email, otp });

            set({
                isAuthenticated: true,
                user: response.user || null,
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to verify OTP';
            set({ error: errorMessage });
            throw error;
        }
    },

    logout: async () => {
        try {
            set({ error: null });
            await authService.logout();
            set({ isAuthenticated: false, user: null });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to logout';
            set({ error: errorMessage });
            throw error;
        }
    },
}));
