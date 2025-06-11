import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    Image,
    TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Hospital, Star, ArrowLeft } from 'lucide-react-native';
import { doctors } from '@/mocks/doctors';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';



export default function TopDentist() {
    const router = useRouter();

    const handlePress = (id: string) => {
        router.push(`/vet/${id}`);
    };


    return (
        <SafeAreaView style={styles.container}>
           
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push('/allspecialists/AllSpecialists')} style={styles.LeftArrow}>
                    <ArrowLeft size={24} color="#111827" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Top Nutritionist</Text>
                <View style={{ width: 24 }} /> 
            </View>
            <FlatList
                data={doctors}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 16 }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        activeOpacity={0.7}
                        onPress={() => handlePress(item.id)}
                    >
                        <Image source={{ uri: item.image }} style={styles.avatar} />
                        <View style={styles.infoContainer}>
                            <View >
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.specialty}>{item.specialty}</Text>
                                <LinearGradient
                                    colors={['#9CA3AF0D', '#9CA3AF80']}
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 0, y: 0 }}
                                    style={styles.gradientBorder}
                                />
                            </View>
                            <View style={styles.metaRow}>
                                <View style={styles.metaItem}>
                                    <Hospital size={24} color={Colors.primary} />
                                    <Text style={styles.metaText}>{item.hospital}</Text>
                                </View>
                                <View style={styles.metaItem}>
                                    <Star size={18} color="#3B82F6" fill="#3B82F6" />
                                    <Text style={styles.metaText}>{item.rating}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginTop: 50,
        backgroundColor: Colors.lightBlue,
        borderBottomWidth: 1,
        borderBottomColor: '#D1D5DB',
    },
    LeftArrow: {
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: "center",
            borderRadius: 5,
            height: 35,
            width: 40,
            backgroundColor: Colors.primary,
        },
    headerTitle: {
        fontSize: 18,
        fontFamily:"inter",
        fontWeight: '700',
        color: '#111827',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 6,
        padding: 12,
        borderRadius: 10,
        backgroundColor: '#FDFDFD',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.10,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 5,
        elevation: 1,
    },
    avatar: {
        width: 72,
        height: 72,
        borderRadius: 10,
        marginRight: 12,
    },
    infoContainer: {
        flex: 1,
    },
    name: {
        fontSize: 17,
        fontFamily: "inter",
        fontWeight: '600',
        color: Colors.title,
    },
    specialty: {
        fontSize: 14,
        color: '#9CA3AF',
        marginBottom: 8,
    },
    gradientBorder: {
        height: 2,
        borderRadius: 1,
        marginBottom: 7,
      },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    metaItem: {
        flexDirection: 'row',
        gap:4,
        alignItems: 'center',
    },
    metaText: {
        fontSize: 14,
        color: '#4B5563',
        marginLeft: 4,
    },
});
