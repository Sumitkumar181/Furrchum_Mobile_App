import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Star, MessageCircle, Building2 } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { Veterinarian } from '@/types';

interface VetCardProps {
    vet: Veterinarian;
    showBookButton?: boolean;
}

export default function VetCard({ vet, showBookButton = true }: VetCardProps) {
    const router = useRouter();

    const handlePress = () => {
        router.push(`/vet/${vet.id}`);
    };

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <View style={styles.card}>
                <View style={styles.header}>
                    <Image
                        source={{ uri: vet.photoUrl }}
                        style={styles.image}
                    />
                    <View style={styles.headerInfo}>
                        <Text style={styles.name}>{vet.name}</Text>
                        <Text style={styles.specialty}>{vet.specialty}</Text>
                        <View style={styles.hospitalContainer}>
                            <Building2 size={14} color={Colors.primary} />
                            <Text style={styles.hospital}>{vet.hospital}</Text>
                            <View style={styles.ratingContainer}>
                                <Star size={14} fill={Colors.warning} color={Colors.warning} />
                                <Text style={styles.rating}>
                                    {vet.rating}({vet.reviewCount})
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {showBookButton && (
                    <View style={styles.footer}>
                        <TouchableOpacity
                            style={styles.messageButton}
                            // onPress={() => router.push(`/chat/${vet.id}`)}
                        >
                            <MessageCircle size={20} color={Colors.primary} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.bookButton}
                            onPress={() => router.push(`/appointment/new?vetId=${vet.id}`)}
                        >
                            <Text style={styles.bookButtonText}>Book Appointment</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
        
        
    },
    card: {
        backgroundColor: Colors.white,
        borderRadius: 12,
        padding: 16,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 12,
    },
    headerInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 2,
    },
    specialty: {
        fontSize: 14,
        color: Colors.lightText,
        marginBottom: 4,
    },
    hospitalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    hospital: {
        fontSize: 12,
        color: Colors.primary,
        marginLeft: 4,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 8,
    },
    rating: {
        fontSize: 12,
        color: Colors.text,
        marginLeft: 2,
    },
    footer: {
        flexDirection: 'row',
        marginTop: 16,
        alignItems: 'center',
    },
    messageButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.lightBlue,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    bookButton: {
        flex: 1,
        backgroundColor: Colors.primary,
        borderRadius: 8,
        paddingVertical: 10,
        alignItems: 'center',
    },
    bookButtonText: {
        color: Colors.white,
        fontWeight: '600',
        fontSize: 14,
    },
});