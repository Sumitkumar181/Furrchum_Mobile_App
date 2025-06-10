import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Alert,
    Platform,
    Linking
} from 'react-native';
import { Veterinarian } from '@/types';
import { useRouter } from 'expo-router';
import { Phone, MapPin, AlertTriangle } from 'lucide-react-native';
import * as Location from 'expo-location';
import Colors from '@/constants/Colors';
import { veterinarians } from '@/mocks/veterinarians';
import VetCard from '@/components/VetCard';
import Button from '@/components/Button';

interface Clinic {
    id: string;
    name: string;
    address: string;
    distance: string;
    phone: string;
    isOpen24Hours: boolean;
}

const mockClinics: Clinic[] = [
    {
        id: '1',
        name: 'PetCare Emergency Hospital',
        address: '123 Main St, Anytown',
        distance: '1.2 miles',
        phone: '+1234567890',
        isOpen24Hours: true,
    },
    {
        id: '2',
        name: 'Animal Emergency Center',
        address: '456 Oak Ave, Anytown',
        distance: '2.5 miles',
        phone: '+1234567891',
        isOpen24Hours: true,
    },
    {
        id: '3',
        name: 'Urgent Pet Care',
        address: '789 Pine Rd, Anytown',
        distance: '3.8 miles',
        phone: '+1234567892',
        isOpen24Hours: false,
    },
];

export default function EmergencyScreen() {
    const router = useRouter();
    const [locationPermission, setLocationPermission] = useState<boolean | null>(null);

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            setLocationPermission(status === 'granted');

            if (status !== 'granted') {
                Alert.alert(
                    'Location Permission',
                    'We need your location to find nearby emergency clinics. Please enable location services in your settings.'
                );
            }
        })();
    }, []);

    const handleCall = (phone: string) => {
        const phoneUrl = Platform.OS === 'android' ? `tel:${phone}` : `telprompt:${phone}`;
        Linking.openURL(phoneUrl).catch(err => {
            console.error('Error opening phone app:', err);
            Alert.alert('Error', 'Could not open phone app');
        });
    };

    const handleGetDirections = (address: string) => {
        const url = Platform.OS === 'ios'
            ? `maps:q=${encodeURIComponent(address)}`
            : `geo:0,0?q=${encodeURIComponent(address)}`;

        Linking.openURL(url).catch(err => {
            console.error('Error opening maps app:', err);
            Alert.alert('Error', 'Could not open maps app');
        });
    };

    const renderClinic = ({ item }: { item: Clinic }) => (
        <View style={styles.clinicCard}>
            <View style={styles.clinicHeader}>
                <Text style={styles.clinicName}>{item.name}</Text>
                {item.isOpen24Hours && (
                    <View style={styles.openBadge}>
                        <Text style={styles.openBadgeText}>Open 24/7</Text>
                    </View>
                )}
            </View>

            <View style={styles.clinicInfo}>
                <View style={styles.addressContainer}>
                    <MapPin size={16} color={Colors.primary} />
                    <Text style={styles.address}>{item.address}</Text>
                </View>
                <Text style={styles.distance}>{item.distance}</Text>
            </View>

            <View style={styles.clinicActions}>
                <TouchableOpacity
                    style={styles.callButton}
                    onPress={() => handleCall(item.phone)}
                >
                    <Phone size={20} color={Colors.white} />
                    <Text style={styles.callButtonText}>Call</Text>
                </TouchableOpacity>

                <Button
                    title="Get Directions"
                    onPress={() => handleGetDirections(item.address)}
                    variant="outline"
                    style={styles.directionsButton}
                />
            </View>
        </View>
    );

    const renderVet = ({ item }: { item: Veterinarian }) => (
        <VetCard vet={item} />
    );
    

    return (
        <View style={styles.container}>
            <View style={styles.emergencyBanner}>
                <AlertTriangle size={24} color={Colors.white} />
                <Text style={styles.emergencyText}>
                    If your pet is experiencing a life-threatening emergency, call a clinic immediately or head to the nearest emergency center.
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Nearby Emergency Clinics</Text>

                {locationPermission === false && (
                    <View style={styles.permissionWarning}>
                        <Text style={styles.permissionText}>
                            Location permission is required to find nearby clinics.
                        </Text>
                        <Button
                            title="Enable Location"
                            onPress={async () => {
                                const { status } = await Location.requestForegroundPermissionsAsync();
                                setLocationPermission(status === 'granted');
                            }}
                            size="small"
                            style={styles.permissionButton}
                        />
                    </View>
                )}

                <FlatList
                    data={mockClinics}
                    renderItem={renderClinic}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.clinicsList}
                    scrollEnabled={false}
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Emergency Veterinarians</Text>

                <FlatList
                    data={veterinarians.slice(0, 3)}
                    renderItem={renderVet}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.vetsList}
                    scrollEnabled={false}
                />

                <Button
                    title="View All Emergency Vets"
                    onPress={() => router.push('/specialty/emergency')}
                    variant="outline"
                    style={styles.viewAllButton}
                />
            </View>

            <View style={styles.callSupportSection}>
                <Text style={styles.callSupportTitle}>Need immediate assistance?</Text>
                <Button
                    title="Call 24/7 Pet Support"
                    onPress={() => handleCall('+18001234567')}
                    style={styles.callSupportButton}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 20,
    },
    emergencyBanner: {
        flexDirection: 'row',
        backgroundColor: Colors.emergency,
        padding: 16,
        borderRadius: 12,
        marginBottom: 20,
        alignItems: 'center',
    },
    emergencyText: {
        color: Colors.white,
        fontSize: 14,
        marginLeft: 12,
        flex: 1,
    },
    section: {
        backgroundColor: Colors.white,
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 16,
    },
    permissionWarning: {
        backgroundColor: Colors.lightGray,
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    permissionText: {
        fontSize: 14,
        color: Colors.text,
        flex: 1,
        marginRight: 12,
    },
    permissionButton: {
        minWidth: 120,
    },
    clinicsList: {
        gap: 16,
    },
    clinicCard: {
        backgroundColor: Colors.lightGray,
        borderRadius: 12,
        padding: 16,
    },
    clinicHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    clinicName: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text,
        flex: 1,
    },
    openBadge: {
        backgroundColor: Colors.success,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 4,
    },
    openBadgeText: {
        color: Colors.white,
        fontSize: 12,
        fontWeight: '500',
    },
    clinicInfo: {
        marginBottom: 12,
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    address: {
        fontSize: 14,
        color: Colors.text,
        marginLeft: 4,
    },
    distance: {
        fontSize: 14,
        color: Colors.lightText,
        marginLeft: 20,
    },
    clinicActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    callButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 16,
        flex: 1,
        marginRight: 8,
    },
    callButtonText: {
        color: Colors.white,
        fontWeight: '500',
        marginLeft: 8,
    },
    directionsButton: {
        flex: 1,
        marginLeft: 8,
    },
    vetsList: {
        gap: 16,
        marginBottom: 16,
    },
    viewAllButton: {
        marginTop: 8,
    },
    callSupportSection: {
        backgroundColor: Colors.white,
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
    },
    callSupportTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.text,
        marginBottom: 12,
    },
    callSupportButton: {
        width: '100%',
    },
});
