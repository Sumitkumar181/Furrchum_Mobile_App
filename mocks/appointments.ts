import { Appointment } from '@/types';

export const appointments: Appointment[] = [
    {
        id: '1',
        userId: '1',
        vetId: '6',
        petId: '1',
        date: '2025-05-28',
        time: '11:30 PM - 12:00 PM',
        type: 'video',
        status: 'cancelled',
        notes: 'My dog Max has been limping on his front right leg for the past three days. I think it happened during our hike last weekend.',
        price: 400
    },
    {
        id: '2',
        userId: '1',
        vetId: '7',
        petId: '2',
        date: '2025-05-28',
        time: '02:00 PM - 02:30 PM',
        type: 'clinic',
        status: 'scheduled',
        notes: 'Regular checkup for my cat Luna.',
        price: 550
    },
    {
        id: '3',
        userId: '1',
        vetId: '1',
        petId: '1',
        date: '2025-06-05',
        time: '10:00 AM - 10:30 AM',
        type: 'chat',
        status: 'scheduled',
        notes: 'Follow-up on Max\'s medication.',
        price: 250
    }
];