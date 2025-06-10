import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import {
    User,
    Siren,
    Brain,
    Utensils,
    // Tooth,
    Activity,
    Stethoscope,
    Heart
} from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { Specialty } from '@/types';

interface SpecialtyCardProps {
    specialty: Specialty;
}

export default function SpecialtyCard({ specialty }: SpecialtyCardProps) {
    const router = useRouter();

    const getIcon = () => {
        switch (specialty.icon) {
            case 'user':
                return <User size={24} color={Colors.primary} />;
            case 'siren':
                return <Siren size={24} color={Colors.primary} />;
            case 'brain':
                return <Brain size={24} color={Colors.primary} />;
            case 'utensils':
                return <Utensils size={24} color={Colors.primary} />;
            // case 'tooth':
            //     return <Tooth size={24} color={Colors.primary} />;
            case 'activity':
                return <Activity size={24} color={Colors.primary} />;
            case 'stethoscope':
                return <Stethoscope size={24} color={Colors.primary} />;
            case 'heart':
                return <Heart size={24} color={Colors.primary} />;
            default:
                return <User size={24} color={Colors.primary} />;
        }
    };

    const handlePress = () => {
        router.push(`/specialty/${specialty.name.toLowerCase()}`);
    };

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <View style={styles.iconContainer}>
                {getIcon()}
            </View>
            <Text style={styles.name}>{specialty.name}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginHorizontal: 8,
        marginBottom: 16,
        width: 80,
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 12,
        backgroundColor: Colors.lightBlue,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    name: {
        fontSize: 14,
        color: Colors.primary,
        textAlign: 'center',
    },
});