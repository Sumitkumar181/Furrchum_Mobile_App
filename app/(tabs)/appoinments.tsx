import React, { useState } from 'react';
import { Appointment } from '@/types';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList
} from 'react-native';

import { useRouter } from 'expo-router';
import { Plus } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { useAppointmentStore } from '@/store/appointment-store';
import AppointmentCard from '@/components/AppointmentCard';
import EmptyState from '@/components/EmptyState';

export default function AppointmentsScreen() {
    const router = useRouter();
    const appointments = useAppointmentStore((state) => state.appointments);
    const [activeTab, setActiveTab] = useState<'scheduled' | 'cancelled'>('scheduled');

    const filteredAppointments = appointments.filter(
        (appointment) =>
            activeTab === 'scheduled'
                ? appointment.status === 'scheduled'
                : appointment.status === 'cancelled'
    );

    const renderAppointment = ({ item }: { item: Appointment }) => (
        <AppointmentCard appointment={item} />
    );
    

    const renderEmptyState = () => (
        <EmptyState
            title="You haven't done the appointment yet"
            description="You haven't made a schedule for an appointment with a vet"
            buttonTitle="Schedule a Appointment"
            onButtonPress={() => router.push('/appointment/new')}
            imageUrl={require('@/assets/images/dog.png')}
        />
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Appointments</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => router.push('/appointment/new')}
                >
                    <Plus size={24} color={Colors.white} />
                </TouchableOpacity>
            </View>

            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[
                        styles.tab,
                        activeTab === 'scheduled' && styles.activeTab
                    ]}
                    onPress={() => setActiveTab('scheduled')}
                >
                    <Text
                        style={[
                            styles.tabText,
                            activeTab === 'scheduled' && styles.activeTabText
                        ]}
                    >
                        Scheduled
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.tab,
                        activeTab === 'cancelled' && styles.activeTab
                    ]}
                    onPress={() => setActiveTab('cancelled')}
                >
                    <Text
                        style={[
                            styles.tabText,
                            activeTab === 'cancelled' && styles.activeTabText
                        ]}
                    >
                        Cancelled
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={filteredAppointments}
                renderItem={renderAppointment}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={renderEmptyState}
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        backgroundColor: Colors.white,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.text,
    },
    addButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        paddingHorizontal: 20,
        paddingBottom: 16,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: Colors.primary,
    },
    tabText: {
        fontSize: 16,
        color: Colors.lightText,
    },
    activeTabText: {
        color: Colors.primary,
        fontWeight: '600',
    },
    listContent: {
        padding: 20,
        flexGrow: 1,
    },
});