import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { allspecialists } from '@/mocks/allspecialties';
import { Specialist } from '@/types';
import Colors from '@/constants/Colors';


export default function AllSpecialists() {

    const router = useRouter();

    const handleSpecialistPress = (specialtyName: string) => {
        if (specialtyName === 'Surgeon') {
            router.push('/surgeon/TopSurgeons');
        }
        if (specialtyName === 'Emergency') {
            router.push('/emergency/OnEmergency');
        }
        if (specialtyName === 'Nutritionist') {
            router.push('/nehaviorist/TopNutritionist');
        }
        if (specialtyName === 'Dentist') {
            router.push('/dentist/TopDentist');
        }
        if (specialtyName === 'Neurologist') {
            // router.push('/neurologist/Neurologist');
        }
        if (specialtyName === 'Oncologist') {
            // router.push('/oncologist/TopOncologist');
        }
        if (specialtyName === 'Cardiologist') {
            // router.push('/cardiologist/TopCardiologist');
        }


    };


    const renderItem = ({ item }: { item: Specialist }) => {
        const Icon = item.icon;
        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() => handleSpecialistPress(item.name)}
            >
                <View style={styles.iconContainer}>
                    <Icon width={50} height={50}/>
                </View>
                <Text style={styles.label}>{item.name}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push('/(tabs)')} style={styles.LeftArrow}>
                    <ArrowLeft size={24} color="#111827" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>All Specialists</Text>
                <View style={{ width: 24 }} />
            </View>

            <FlatList
                data={allspecialists}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
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
        fontFamily: 'inter',
        fontWeight: '700',
        color: '#111827',
    },
    card: {
        width: '48%',
        backgroundColor: '#f1f5ff',
        borderRadius: 20,
        paddingVertical: 20,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 16,
    },
    iconContainer: {
        backgroundColor: '#fff',
        padding: 18,
        borderRadius: 16,
        marginBottom: 14,
    },
    label: {
        fontSize: 18,
        fontWeight: '500',
        color: '#007bff',
    },
});
