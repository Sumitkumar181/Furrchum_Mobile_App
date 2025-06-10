import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
    Star,
    Users,
    TrendingUp,
    MessageSquare,
    Building2,
    Calendar
} from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { veterinarians } from '@/mocks/veterinarians';
import { reviews } from '@/mocks/reviews';
import ReviewItem from '@/components/ReviewItem';
import Button from '@/components/Button';

export default function VetDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const vet = veterinarians.find((v) => v.id === id);

    if (!vet) {
        return (
            <View style={styles.notFound}>
                <Text>Veterinarian not found</Text>
            </View>
        );
    }

    const handleBookAppointment = () => {
        router.push(`/appointment/new?vetId=${vet.id}`);
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Image
                        source={{ uri: vet.photoUrl }}
                        style={styles.image}
                    />

                    <View style={styles.headerInfo}>
                        <Text style={styles.name}>{vet.name}</Text>
                        <Text style={styles.specialty}>{vet.specialty}</Text>

                        <View style={styles.hospitalContainer}>
                            <Building2 size={16} color={Colors.primary} />
                            <Text style={styles.hospital}>{vet.hospital}</Text>
                            <View style={styles.ratingContainer}>
                                <Star size={16} fill={Colors.warning} color={Colors.warning} />
                                <Text style={styles.rating}>
                                    {vet.rating}({vet.reviewCount})
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{vet.patientCount}+</Text>
                        <Users size={16} color={Colors.primary} />
                        <Text style={styles.statLabel}>Patients</Text>
                    </View>

                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{vet.experience}+</Text>
                        <TrendingUp size={16} color={Colors.primary} />
                        <Text style={styles.statLabel}>Experience</Text>
                    </View>

                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{vet.rating}</Text>
                        <Star size={16} color={Colors.primary} />
                        <Text style={styles.statLabel}>Rating</Text>
                    </View>

                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{vet.reviewCount}</Text>
                        <MessageSquare size={16} color={Colors.primary} />
                        <Text style={styles.statLabel}>Reviews</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>About {vet.name}</Text>
                    <Text style={styles.aboutText}>{vet.about}</Text>
                    <TouchableOpacity>
                        <Text style={styles.viewMoreText}>View more</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Availability</Text>
                    <View style={styles.availabilityContainer}>
                        <Calendar size={16} color={Colors.primary} />
                        <Text style={styles.availabilityText}>{vet.availability}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.reviewsHeader}>
                        <Text style={styles.sectionTitle}>Reviews</Text>
                        <TouchableOpacity>
                            <Text style={styles.viewAllText}>View all</Text>
                        </TouchableOpacity>
                    </View>

                    {reviews.slice(0, 2).map((review) => (
                        <ReviewItem key={review.id} review={review} />
                    ))}
                </View>

                <View style={styles.bottomPadding} />
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.chatButton}
                    // onPress={() => router.push(`/chat/${vet.id}`)}
                >
                    <MessageSquare size={24} color={Colors.primary} />
                </TouchableOpacity>

                <Button
                    title="Book Appointment"
                    onPress={handleBookAppointment}
                    style={styles.bookButton}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    notFound: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        padding: 20,
        marginTop:50,
        backgroundColor: Colors.white,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 16,
    },
    headerInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    name: {
        fontSize: 20,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 4,
    },
    specialty: {
        fontSize: 16,
        color: Colors.lightText,
        marginBottom: 8,
    },
    hospitalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    hospital: {
        fontSize: 14,
        color: Colors.primary,
        marginLeft: 4,
        marginRight: 12,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        fontSize: 14,
        color: Colors.text,
        marginLeft: 4,
    },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statValue: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.primary,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: Colors.lightText,
        marginTop: 4,
    },
    section: {
        backgroundColor: Colors.white,
        padding: 20,
        marginTop: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 12,
    },
    aboutText: {
        fontSize: 14,
        color: Colors.text,
        lineHeight: 20,
        marginBottom: 8,
    },
    viewMoreText: {
        color: Colors.primary,
        fontSize: 14,
        fontWeight: '500',
    },
    availabilityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.lightBlue,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    availabilityText: {
        fontSize: 14,
        color: Colors.primary,
        marginLeft: 8,
    },
    reviewsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    viewAllText: {
        color: Colors.primary,
        fontSize: 14,
        fontWeight: '500',
    },
    bottomPadding: {
        height: 100,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        backgroundColor: Colors.white,
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderTopWidth: 1,
        marginBottom:40,
        borderTopColor: Colors.border,
    },
    chatButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: Colors.lightBlue,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    bookButton: {
        flex: 1,
    },
});