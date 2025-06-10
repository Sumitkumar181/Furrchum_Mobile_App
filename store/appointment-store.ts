import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Appointment } from '@/types';
import { appointments as mockAppointments } from '@/mocks/appointments';

interface AppointmentState {
    appointments: Appointment[];
    isLoading: boolean;
    bookAppointment: (appointment: Omit<Appointment, 'id'>) => void;
    cancelAppointment: (id: string) => void;
    rescheduleAppointment: (id: string, date: string, time: string) => void;
    getAppointmentsByStatus: (status: Appointment['status']) => Appointment[];
}

export const useAppointmentStore = create<AppointmentState>()(
    persist(
        (set, get) => ({
            appointments: mockAppointments,
            isLoading: false,

            bookAppointment: (appointment) => {
                const newAppointment = {
                    ...appointment,
                    id: Date.now().toString(),
                };

                set((state) => ({
                    appointments: [...state.appointments, newAppointment],
                }));
            },

            cancelAppointment: (id) => {
                set((state) => ({
                    appointments: state.appointments.map((appointment) =>
                        appointment.id === id
                            ? { ...appointment, status: 'cancelled' }
                            : appointment
                    ),
                }));
            },

            rescheduleAppointment: (id, date, time) => {
                set((state) => ({
                    appointments: state.appointments.map((appointment) =>
                        appointment.id === id
                            ? { ...appointment, date, time }
                            : appointment
                    ),
                }));
            },

            getAppointmentsByStatus: (status) => {
                return get().appointments.filter(
                    (appointment) => appointment.status === status
                );
            },
        }),
        {
            name: 'appointment-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);