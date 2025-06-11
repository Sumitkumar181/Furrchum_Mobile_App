import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Video } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { useAppointmentStore } from '@/store/appointment-store';
import { veterinarians } from '@/mocks/veterinarians';

export default function CancelAppointmentScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const appointments = useAppointmentStore(state => state.appointments);
    const cancelAppointment = useAppointmentStore(state => state.cancelAppointment);

    const appointment = appointments.find(appt => appt.id === id);
    const vet = veterinarians.find(v => v.id === appointment?.vetId);

    if (!appointment || !vet) return <Text>Appointment not found</Text>;

    const handleCancel = () => {
       cancelAppointment(id)
        router.back(); 
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerCard}>
                <Image source={{ uri: vet.photoUrl }} style={styles.vetImage} />
                <View>
                    <Text style={styles.vetName}>{vet.name}</Text>
                    <View style={styles.statusBadge}>
                        <Text style={styles.statusText}>Cancelled</Text>
                    </View>
                </View>
            </View>

            <View style={styles.callCard}>
                <Video size={20} color={Colors.white} />
                <View style={styles.callDetails}>
                    <Text style={styles.callType}>Video Call</Text>
                    <Text style={styles.callDesc}>Interact with vet via video call</Text>
                </View>
                <Text style={styles.callPrice}>₹400</Text>
            </View>

            <Text style={styles.sectionTitle}>Appointment Schedule</Text>
            <View style={styles.dateBox}>
                <Text style={styles.dateText}>
                    Today, {appointment.date} ({appointment.time})
                </Text>
            </View>

            <Text style={styles.sectionTitle}>Your Details -</Text>
            {/* <View style={styles.detailsBox}>
                <Text style={styles.detail}>Pet Name: {appointment.petName}</Text>
                <Text style={styles.detail}>Age: {appointment.petAge}</Text>
                <Text style={styles.detail}>Weight: {appointment.petWeight} kg</Text>
                <Text style={styles.detail}>Disease: {appointment.disease}</Text>
            </View> */}

            <TouchableOpacity style={styles.connectBtn}>
                <Video size={16} color={Colors.white} />
                <Text style={styles.connectText}>Connect Now</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
                <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 16,
    },
    headerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        padding: 12,
        borderRadius: 12,
        marginBottom: 16,
        elevation: 2,
    },
    vetImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 12,
    },
    vetName: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text,
    },
    statusBadge: {
        marginTop: 4,
        borderColor: Colors.error,
        borderWidth: 1,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
    },
    statusText: {
        color: Colors.error,
        fontWeight: '500',
        fontSize: 12,
    },
    callCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
    },
    callDetails: {
        flex: 1,
        marginLeft: 12,
    },
    callType: {
        color: Colors.white,
        fontWeight: '600',
    },
    callDesc: {
        color: Colors.white,
        fontSize: 12,
    },
    callPrice: {
        color: Colors.white,
        fontWeight: '600',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text,
        marginVertical: 8,
    },
    dateBox: {
        borderColor: Colors.primary,
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 12,
    },
    dateText: {
        color: Colors.primary,
        fontWeight: '500',
    },
    detailsBox: {
        backgroundColor: Colors.white,
        borderRadius: 8,
        padding: 12,
        marginBottom: 20,
    },
    detail: {
        fontSize: 14,
        color: Colors.text,
        marginBottom: 4,
    },
    connectBtn: {
        flexDirection: 'row',
        backgroundColor: Colors.primary,
        borderRadius: 24,
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    connectText: {
        color: Colors.white,
        fontWeight: '600',
        marginLeft: 8,
    },
    cancelBtn: {
        borderColor: Colors.error,
        borderWidth: 1,
        borderRadius: 24,
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelText: {
        color: Colors.error,
        fontWeight: '600',
    },
});
