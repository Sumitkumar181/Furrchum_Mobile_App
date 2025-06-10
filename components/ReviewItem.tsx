import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Star, MoreVertical } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { Review } from '@/types';

interface ReviewItemProps {
    review: Review;
}

export default function ReviewItem({ review }: ReviewItemProps) {
    const renderStars = () => {
        const stars = [];

        for (let i = 1; i <= 5; i++) {
            stars.push(
                <Star
                    key={i}
                    size={16}
                    color={Colors.warning}
                    fill={i <= review.rating ? Colors.warning : 'transparent'}
                    style={styles.star}
                />
            );
        }

        return stars;
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={{ uri: review.userPhotoUrl || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' }}
                    style={styles.avatar}
                />

                <View style={styles.userInfo}>
                    <Text style={styles.userName}>{review.userName}</Text>
                    <View style={styles.starsContainer}>
                        {renderStars()}
                    </View>
                </View>

                <MoreVertical size={20} color={Colors.gray} />
            </View>

            <Text style={styles.comment}>{review.comment}</Text>
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
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
    },
    header: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    userInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    userName: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 4,
    },
    starsContainer: {
        flexDirection: 'row',
    },
    star: {
        marginRight: 2,
    },
    comment: {
        fontSize: 14,
        color: Colors.text,
        lineHeight: 20,
    },
});