import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Calendar, Clock, Video, MessageSquare, Phone, Building2 } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { veterinarians } from '@/mocks/veterinarians';
import { usePetStore } from '@/store/pet-store';
import { useAppointmentStore } from '@/store/appointment-store';
import Button from '@/components/Button';

export default function NewAppointmentScreen() {
    const { vetId } = useLocalSearchParams();
    const router = useRouter();
    const pets = usePetStore((state) => state.pets);
    const bookAppointment = useAppointmentStore((state) => state.bookAppointment);

    const vet = veterinarians.find((v) => v.id === vetId) || veterinarians[0];
    const [selectedPet, setSelectedPet] = useState(pets[0]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedType, setSelectedType] = useState<'video' | 'chat' | 'clinic'>('video');
    const [notes, setNotes] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Mock available dates (next 7 days)
    const availableDates = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i + 1);
        return date.toISOString().split('T')[0];
    });

    // Mock available times
    const availableTimes = [
        '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
    ];

    const getAppointmentPrice = () => {
        switch (selectedType) {
            case 'video':
                return 400;
            case 'chat':
                return 250;
            case 'clinic':
                return 550;
            default:
                return 0;
        }
    };

    const handleBookAppointment = async () => {
        if (!selectedPet) {
            Alert.alert('Error', 'Please select a pet');
            return;
        }

        if (!selectedDate) {
            Alert.alert('Error', 'Please select a date');
            return;
        }

        if (!selectedTime) {
            Alert.alert('Error', 'Please select a time');
            return;
        }

        setIsLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            bookAppointment({
                userId: '1',
                vetId: vet.id,
                petId: selectedPet.id,
                date: selectedDate,
                time: selectedTime,
                type: selectedType,
                status: 'scheduled',
                notes,
                price: getAppointmentPrice(),
            });

            Alert.alert(
                'Success',
                'Appointment booked successfully',
                [
                    {
                        text: 'OK',
                        onPress: () => router.push('/appoinments')
                    }
                ]
            );
        } catch (error) {
            console.error('Book appointment error:', error);
            Alert.alert('Error', 'Failed to book appointment');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Select Date</Text>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.datesContainer}
                    >
                        {availableDates.map((date) => {
                            const dateObj = new Date(date);
                            const day = dateObj.getDate();
                            const month = dateObj.toLocaleString('default', { month: 'short' });
                            const isSelected = date === selectedDate;

                            return (
                                <TouchableOpacity
                                    key={date}
                                    style={[
                                        styles.dateItem,
                                        isSelected && styles.selectedDateItem
                                    ]}
                                    onPress={() => setSelectedDate(date)}
                                >
                                    <Text
                                        style={[
                                            styles.dateMonth,
                                            isSelected && styles.selectedDateText
                                        ]}
                                    >
                                        {month}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.dateDay,
                                            isSelected && styles.selectedDateText
                                        ]}
                                    >
                                        {day}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Select Time</Text>

                    <View style={styles.timesContainer}>
                        {availableTimes.map((time) => {
                            const isSelected = time === selectedTime;

                            return (
                                <TouchableOpacity
                                    key={time}
                                    style={[
                                        styles.timeItem,
                                        isSelected && styles.selectedTimeItem
                                    ]}
                                    onPress={() => setSelectedTime(time)}
                                >
                                    <Clock
                                        size={16}
                                        color={isSelected ? Colors.white : Colors.primary}
                                    />
                                    <Text
                                        style={[
                                            styles.timeText,
                                            isSelected && styles.selectedTimeText
                                        ]}
                                    >
                                        {time}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Select Communication</Text>

                    <View style={styles.communicationContainer}>
                        <View style={styles.communicationGroup}>
                            <Text style={styles.communicationGroupTitle}>Virtual</Text>

                            <View style={[
                                styles.communicationOptions,
                                selectedType === 'video' || selectedType === 'chat'
                                    ? styles.selectedCommunicationGroup
                                    : null
                            ]}>
                                <TouchableOpacity
                                    style={styles.communicationOption}
                                    onPress={() => setSelectedType('video')}
                                >
                                    <View style={styles.communicationIconContainer}>
                                        <Video size={24} color={Colors.primary} />
                                    </View>
                                    <Text style={[styles.communicationOptionText, (selectedType === 'video' || selectedType === 'chat') && styles.selectedOptionText]}>Video Call</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.communicationOption}
                                    onPress={() => setSelectedType('chat')}
                                >
                                    <View style={styles.communicationIconContainer}>
                                        <MessageSquare size={24} color={Colors.primary} />
                                    </View>
                                    <Text style={[styles.communicationOptionText, (selectedType === 'video' || selectedType === 'chat') && styles.selectedOptionText]}>Chat</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.communicationOption}
                                    onPress={() => setSelectedType('video')}
                                >
                                    <View style={styles.communicationIconContainer}>
                                        <Phone size={24} color={Colors.primary} />
                                    </View>
                                    <Text style={[styles.communicationOptionText, (selectedType === 'video' || selectedType === 'chat') && styles.selectedOptionText]}>Phone Call</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                style={[
                                    styles.selectButton,
                                    (selectedType === 'video' || selectedType === 'chat') && styles.selectedButton
                                ]}
                                onPress={() => setSelectedType('video')}
                            >
                                <Text style={[styles.communicationOptionText, (selectedType === 'video' || selectedType === 'chat') && styles.selectedOptionText]}>
                                    ₹{getAppointmentPrice()} Select
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.communicationGroup}>
                            <Text style={styles.communicationGroupTitle}>In Clinic</Text>

                            <View style={[
                                styles.communicationOptions,
                                selectedType === 'clinic' ? styles.selectedCommunicationGroup : null
                            ]}>
                                <TouchableOpacity
                                    style={styles.communicationOption}
                                    onPress={() => setSelectedType('clinic')}
                                >
                                    <View style={styles.communicationIconContainer}>
                                        <Building2 size={30} color={Colors.primary} />
                                    </View>
                                    
                                    <Text style={[styles.communicationOptionText, selectedType === 'clinic' && styles.selectedOptionText]}>Clinic</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                style={[
                                    styles.selectButton,
                                    selectedType === 'clinic' && styles.selectedButton
                                ]}
                                onPress={() => setSelectedType('clinic')}
                            >
                                <Text style={[styles.communicationOptionText, selectedType === 'clinic' && styles.selectedOptionText]}>
                                    ₹550 Select
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.summarySection}>
                    <Text style={styles.sectionTitle}>Appointment Summary</Text>

                    <View style={styles.summaryItem}>
                        <Text style={styles.summaryLabel}>Doctor</Text>
                        <Text style={styles.summaryValue}>{vet.name}</Text>
                    </View>

                    <View style={styles.summaryItem}>
                        <Text style={styles.summaryLabel}>Date & Time</Text>
                        <Text style={styles.summaryValue}>
                            {selectedDate && selectedTime
                                ? `${new Date(selectedDate).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                })} at ${selectedTime}`
                                : 'Not selected'}
                        </Text>
                    </View>

                    <View style={styles.summaryItem}>
                        <Text style={styles.summaryLabel}>Consultation Type</Text>
                        <Text style={styles.summaryValue}>
                            {selectedType === 'video'
                                ? 'Video Call'
                                : selectedType === 'chat'
                                    ? 'Chat'
                                    : 'In-Clinic Visit'}
                        </Text>
                    </View>

                    <View style={styles.summaryItem}>
                        <Text style={styles.summaryLabel}>Pet</Text>
                        <Text style={styles.summaryValue}>
                            {selectedPet ? selectedPet.name : 'Not selected'}
                        </Text>
                    </View>

                    <View style={styles.summaryItem}>
                        <Text style={styles.summaryLabel}>Fee</Text>
                        <Text style={styles.summaryValue}>₹{getAppointmentPrice()}</Text>
                    </View>
                </View>

                <View style={styles.bottomPadding} />
            </ScrollView>

            <View style={styles.footer}>
                <Button
                    title="Continue to Payment"
                    onPress={handleBookAppointment}
                    loading={isLoading}
                    disabled={isLoading || !selectedDate || !selectedTime || !selectedPet}
                    fullWidth
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        marginTop: 20,
    },
    section: {
        backgroundColor: Colors.white,
        padding: 20,
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 16,
    },
    datesContainer: {
        paddingRight: 20,
    },
    dateItem: {
        width: 70,
        height: 80,
        borderRadius: 12,
        backgroundColor: Colors.lightGray,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    selectedDateItem: {
        backgroundColor: Colors.primary,
    },
    dateMonth: {
        fontSize: 14,
        color: Colors.text,
        marginBottom: 4,
    },
    dateDay: {
        fontSize: 20,
        fontWeight: '600',
        color: Colors.text,
    },
    selectedDateText: {
        color: Colors.white,
    },
    timesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    timeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.primary,
        marginRight: 12,
        marginBottom: 12,
    },
    selectedTimeItem: {
        backgroundColor: Colors.primary,
    },
    timeText: {
        fontSize: 14,
        color: Colors.primary,
        marginLeft: 4,
    },
    selectedTimeText: {
        color: Colors.white,
    },
    communicationContainer: {
        gap: 16,
    },
    communicationGroup: {
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    communicationGroupTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.text,
        marginBottom: 16,
    },
    communicationOptions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    selectedCommunicationGroup: {
        backgroundColor: Colors.primary,
        borderRadius: 8,
        padding: 16,
    },
    selectedOptionText: {
        color: Colors.white,
    },
    communicationOption: {
        alignItems: 'center',
    },
    communicationIconContainer: {
        width: 50,
        height: 50,
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
    selectedIconContainer: {
        backgroundColor: Colors.primary,
    },
    communicationOptionText: {
        fontSize: 14,
        color: Colors.primary,
    },
    selectButton: {
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 8,
        paddingVertical: 10,
        alignItems: 'center',
    },
    selectedButton: {
        backgroundColor: Colors.primary,
    },
    selectButtonText: {
        color: 'white',
        fontWeight: '500',
    },
    petsContainer: {
        paddingRight: 20,
    },
    petItem: {
        width: 120,
        height: 80,
        borderRadius: 12,
        backgroundColor: Colors.lightGray,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        padding: 12,
    },
    selectedPetItem: {
        backgroundColor: Colors.primary,
    },
    petName: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 4,
        textAlign: 'center',
    },
    petInfo: {
        fontSize: 12,
        color: Colors.lightText,
        textAlign: 'center',
    },
    selectedPetText: {
        color: Colors.white,
    },
    summarySection: {
        backgroundColor: Colors.white,
        padding: 20,
        marginBottom: 12,
    },
    summaryItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightBorder,
    },
    summaryLabel: {
        fontSize: 16,
        color: Colors.lightText,
    },
    summaryValue: {
        fontSize: 16,
        color: Colors.text,
        fontWeight: '500',
        maxWidth: '60%',
        textAlign: 'right',
    },
    bottomPadding: {
        height: 100,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Colors.white,
        paddingHorizontal: 20,
        paddingVertical: 16,
        marginBottom: 50,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    },
});