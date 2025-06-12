import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView,  } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Video, Building2, Calendar } from 'lucide-react-native';
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
                    <View style={styles.cancelContainer}>
                        <View style={styles.statusBadge}>
                            <Text style={styles.statusText}>Cancel</Text>
                        </View>
                        <View style={styles.buldingIcon}>
                            <Building2 size={28} color={Colors.primary} />
                        </View>
                    </View>
                    <View style={styles.appoimentDate}>
                    <Calendar size={20} color={Colors.primary} />
                        <Text>28 May 2025</Text>
                    </View>
                </View>
            </View>

            <View style={styles.callCard}>
                <View style={styles.callVideo}>
                    <Video size={38} color={Colors.primary} />
                </View>
                
                <View style={styles.callDetails}>
                    <Text style={styles.callType}>Video Call</Text>
                    <View style={styles.callDescContainer}>
                    <Text style={styles.callDesc}>Interact with vet via </Text>
                        <Text style={styles.callDesc}>video call</Text>
                    </View>
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
        marginTop: 50,
        elevation: 2,
    },
    vetImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 12,
    },
    vetName: {
        fontSize: 20,
        fontWeight: '600',
        color: Colors.text,
    },
    cancelContainer: {
        flexDirection: 'row',
        gap:25,
        justifyContent: 'space-between'
    },
    buldingIcon: {
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        width: 50,
        borderRadius: 20,
        backgroundColor: Colors.lightBlue,
    },
    appoimentDate: {
        flexDirection: 'row',
        gap: 8,
        marginTop:8,     
    },
    appoimenteText: {
        color: Colors.lightBlack,
        fontSize: 20,
    },
    statusBadge: {
        marginTop: 8,
        borderColor: Colors.error,
        borderWidth: 1,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
        height: 35,
        width: 150,
        alignItems: "center",
        justifyContent: "center",

    },
    statusText: {
        color: Colors.error,
        fontWeight: '500',
        textAlign: 'center',
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
    callVideo: {
            width: 80,
            height: 80,
            borderRadius: 10,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 8,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,

            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        
    },
    callDetails: {
        flex: 1,
        marginLeft: 12,
    },
    callType: {
        color: Colors.white,
        fontWeight: '600',
        fontSize:18,
    },
    callDescContainer: {
        marginTop:8,
    },
    callDesc: {
        color: Colors.white,
        fontSize: 12,
    },
    callPrice: {
        color: Colors.white,
        fontWeight: '600',
        marginRight: 20,
        fontSize: 16,
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
