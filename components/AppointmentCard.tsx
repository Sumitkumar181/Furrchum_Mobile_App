import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Calendar, MessageCircle, Video } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { Appointment } from '@/types';
import { veterinarians } from '@/mocks/veterinarians';

interface AppointmentCardProps {
    appointment: Appointment;
    showActions?: boolean;
}

export default function AppointmentCard({
    appointment,
    showActions = true
}: AppointmentCardProps) {
    const router = useRouter();

    const vet = veterinarians.find(v => v.id === appointment.vetId);

    if (!vet) return null;

    const getStatusColor = () => {
        switch (appointment.status) {
            case 'scheduled':
                return Colors.success;
            case 'cancelled':
                return Colors.error;
            case 'completed':
                return Colors.primary;
            default:
                return Colors.gray;
        }
    };

    const getStatusText = () => {
        switch (appointment.status) {
            case 'scheduled':
                return 'Appointed';
            case 'cancelled':
                return 'Cancelled';
            case 'completed':
                return 'Completed';
            default:
                return '';
        }
    };

    // Fixed here: use pathname + params object for dynamic routing
    const handleCancel = () => {
        router.push({
            pathname: '/appointment/cancel/[id]',
            params: { id: appointment.id },
        });
    };

    const handleReschedule = () => {
        router.push({
            pathname: '/appointment/reschedule/[id]',
            params: { id: appointment.id },
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={{ uri: vet.photoUrl }}
                    style={styles.image}
                />
                <View style={styles.headerInfo}>
                    <Text style={styles.name}>{vet.name}</Text>
                    <View style={styles.statusContainer}>
                        <View style={[styles.statusBadge, { borderColor: getStatusColor() }]}>
                            <Text style={[styles.statusText, { color: getStatusColor() }]}>
                                {getStatusText()}
                            </Text>
                        </View>
                        {appointment.type === 'video' && (
                            <Video size={16} color={Colors.primary} style={styles.typeIcon} />
                        )}
                        {appointment.type === 'chat' && (
                            <MessageCircle size={16} color={Colors.primary} style={styles.typeIcon} />
                        )}
                    </View>
                </View>
            </View>

            <View style={styles.dateContainer}>
                <Calendar size={16} color={Colors.primary} />
                <Text style={styles.date}>{appointment.date}</Text>
            </View>

            {showActions && appointment.status === 'scheduled' && (
                <View style={styles.actions}>
                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={handleCancel}
                    >
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.rescheduleButton}
                        onPress={handleReschedule}
                    >
                        <Text style={styles.rescheduleButtonText}>Reschedule</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
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
        marginBottom: 4,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusBadge: {
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingVertical: 2,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '500',
    },
    typeIcon: {
        marginLeft: 8,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    date: {
        fontSize: 14,
        color: Colors.text,
        marginLeft: 8,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cancelButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: Colors.error,
        borderRadius: 8,
        paddingVertical: 8,
        alignItems: 'center',
        marginRight: 8,
    },
    cancelButtonText: {
        color: Colors.error,
        fontWeight: '500',
    },
    rescheduleButton: {
        flex: 1,
        backgroundColor: Colors.primary,
        borderRadius: 8,
        paddingVertical: 8,
        alignItems: 'center',
        marginLeft: 8,
    },
    rescheduleButtonText: {
        color: Colors.white,
        fontWeight: '500',
    },
});
