import { FC } from 'react';
import { SvgProps } from 'react-native-svg';

export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    address?: string;
    photoUrl?: string;
}

export interface Pet {
    id: string;
    name: string;
    type: 'dog' | 'cat' | 'other';
    breed?: string;
    age?: number;
    weight?: number;
    ownerId: string;
    photoUrl?: string;
}

export interface Veterinarian {
    id: string;
    name: string;
    specialty: string;
    hospital: string;
    rating: number;
    reviewCount: number;
    experience: number;
    patientCount: number;
    availability: string;
    photoUrl: string;
    about: string;
}

export interface Review {
    id: string;
    userId: string;
    userName: string;
    userPhotoUrl?: string;
    rating: number;
    comment: string;
    date: string;
}

export interface Appointment {
    id: string;
    userId: string;
    vetId: string;
    petId: string;
    date: string;
    time: string;
    type: 'video' | 'chat' | 'clinic';
    status: 'scheduled' | 'cancelled' | 'completed';
    notes?: string;
    price: number;
}

export interface Article {
    id: string;
    title: string;
    content: string;
    author: string;
    date: string;
    imageUrl: string;
    tags: string[];
}

export interface Specialty {
    id: string;
    name: string;
    icon: string;
}
  
export interface Doctor{
    id: string;
    name: string;
    specialty: string;
    hospital: string;
    rating: string;
    image: string;
}

import { ImageSourcePropType } from 'react-native';

export interface Specialist {
    id: string;
    name: string;
    icon: FC<SvgProps>;
}
  