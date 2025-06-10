import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from '@/types';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (name: string, email: string, phone: string, password: string) => Promise<void>;
    signOut: () => void;
    updateProfile: (userData: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,

            signIn: async (email, password) => {
                set({ isLoading: true });

                try {
                    // Simulate API call
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    // Mock user data
                    const user: User = {
                        id: '1',
                        name: 'Anil Sharma',
                        email: email,
                        phone: '9876543210',
                        photoUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
                    };

                    set({ user, isAuthenticated: true, isLoading: false });
                } catch (error) {
                    console.error('Sign in error:', error);
                    set({ isLoading: false });
                    throw error;
                }
            },

            signUp: async (name, email, phone, password) => {
                set({ isLoading: true });

                try {
                    // Simulate API call
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    // Mock user data
                    const user: User = {
                        id: '1',
                        name,
                        email,
                        phone,
                        photoUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
                    };

                    set({ user, isAuthenticated: true, isLoading: false });
                } catch (error) {
                    console.error('Sign up error:', error);
                    set({ isLoading: false });
                    throw error;
                }
            },

            signOut: () => {
                set({ user: null, isAuthenticated: false });
            },

            updateProfile: (userData) => {
                set((state) => ({
                    user: state.user ? { ...state.user, ...userData } : null
                }));
            }
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);