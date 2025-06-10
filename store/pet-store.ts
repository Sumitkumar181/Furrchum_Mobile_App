import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Pet } from '@/types';

interface PetState {
    pets: Pet[];
    selectedPet: Pet | null;
    isLoading: boolean;
    addPet: (pet: Omit<Pet, 'id'>) => void;
    updatePet: (id: string, petData: Partial<Pet>) => void;
    deletePet: (id: string) => void;
    selectPet: (id: string) => void;
}

export const usePetStore = create<PetState>()(
    persist(
        (set, get) => ({
            pets: [
                {
                    id: '1',
                    name: 'Max',
                    type: 'dog',
                    breed: 'Golden Retriever',
                    age: 3,
                    weight: 22,
                    ownerId: '1',
                    photoUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
                },
                {
                    id: '2',
                    name: 'Luna',
                    type: 'cat',
                    breed: 'Siamese',
                    age: 2,
                    weight: 4,
                    ownerId: '1',
                    photoUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
                }
            ],
            selectedPet: null,
            isLoading: false,

            addPet: (pet) => {
                const newPet = {
                    ...pet,
                    id: Date.now().toString(),
                };

                set((state) => ({
                    pets: [...state.pets, newPet],
                    selectedPet: newPet,
                }));
            },

            updatePet: (id, petData) => {
                set((state) => ({
                    pets: state.pets.map((pet) =>
                        pet.id === id ? { ...pet, ...petData } : pet
                    ),
                    selectedPet: state.selectedPet?.id === id
                        ? { ...state.selectedPet, ...petData }
                        : state.selectedPet,
                }));
            },

            deletePet: (id) => {
                set((state) => ({
                    pets: state.pets.filter((pet) => pet.id !== id),
                    selectedPet: state.selectedPet?.id === id ? null : state.selectedPet,
                }));
            },

            selectPet: (id) => {
                const pet = get().pets.find((p) => p.id === id) || null;
                set({ selectedPet: pet });
            },
        }),
        {
            name: 'pet-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);