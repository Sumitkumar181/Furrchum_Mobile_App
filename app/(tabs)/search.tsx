import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    Image,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import { router, useRouter } from 'expo-router';
import { Search as SearchIcon, Hospital, Star } from 'lucide-react-native';
import { doctors } from '@/mocks/doctors';
import { Doctor } from '@/types';

export default function SearchScreen() {
    const router = useRouter();
    const [locationFilter, setLocationFilter] = useState('');
    const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>(doctors);

    const handelLocationFilter = (location: string) => {
        setLocationFilter(location);

        if (location === '') {
            setFilteredDoctors(doctors);
        } else {
            const filtered = doctors.filter((doctor: Doctor) =>
                doctor.hospital.toLowerCase().includes(location.toLowerCase())
            );
            setFilteredDoctors(filtered);
        }
    }

    
    
    const handlePress = (id: string) => {
        router.push(`/vet/${id}`);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchBar}>
                <TextInput
                    placeholder="Search"
                    placeholderTextColor="#555"
                    style={styles.searchInput}
                    value={locationFilter}
                    onChangeText={handelLocationFilter}
                />
                <SearchIcon color="#000" size={20} />
            </View>

            {filteredDoctors.length === 0 ? (
                <Text style={styles.noResults}>No doctors found.</Text>
            ) : (
                <FlatList
                    data={filteredDoctors}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.card}
                            activeOpacity={0.7}
                            onPress={() => handlePress(item.id)}
                        >
                            <Image source={{ uri: item.image }} style={styles.avatar} />
                            <View style={styles.infoContainer}>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.specialty}>{item.specialty}</Text>
                                <View style={styles.metaRow}>
                                    <View style={styles.metaItem}>
                                        <Hospital size={16} color="#4B5563" />
                                        <Text style={styles.metaText}>{item.hospital}</Text>
                                    </View>
                                    <View style={styles.metaItem}>
                                        <Star size={16} color="#3B82F6" fill="#3B82F6" />
                                        <Text style={styles.metaText}>{item.rating}</Text>
                                    </View>
                                </View>
                            </View>
                            </TouchableOpacity>
                        )}
                        
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 16,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FDE68A',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 30,
        marginTop: 50,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#000',
        marginRight: 8,
    },
    listContainer: {
        paddingVertical: 16,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 16,
        borderRadius: 16,
        backgroundColor: '#fff',
        marginBottom: 16,
        borderColor: '#E5E7EB',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
        elevation: 2,
    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        marginRight: 16,
    },
    infoContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
    },
    specialty: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 4,
    },
    metaRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    metaText: {
        fontSize: 13,
        color: '#4B5563',
        marginLeft: 4,
    },
    noResults: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#6B7280',
    },
});
