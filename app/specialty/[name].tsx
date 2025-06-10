import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Colors from '@/constants/Colors';
import { Veterinarian } from '@/types';
import { veterinarians } from '@/mocks/veterinarians';
import VetCard from '@/components/VetCard';

export default function SpecialtyScreen() {
    const { name } = useLocalSearchParams();

    // Filter vets by specialty (case insensitive)
    const specialtyVets = veterinarians.filter(
        (vet) => vet.specialty.toLowerCase() === String(name).toLowerCase()
    );

    const renderVet = ({ item }: { item: Veterinarian }) => (
        <VetCard vet={item} />
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{name}</Text>
                {name === 'emergency' && (
                    <View style={styles.emergencyBanner}>
                        <Text style={styles.emergencyText}>
                            Call a vet immediately—many offer 24/7 help. Acting fast can save your dog's life.
                        </Text>
                    </View>
                )}
            </View>

            <FlatList
                data={specialtyVets.length > 0 ? specialtyVets : veterinarians}
                renderItem={renderVet}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 16,
        backgroundColor: Colors.white,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 12,
    },
    emergencyBanner: {
        backgroundColor: Colors.primary,
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
    },
    emergencyText: {
        color: Colors.white,
        fontSize: 14,
    },
    listContent: {
        padding: 20,
    },
});