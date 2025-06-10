import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Calendar } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { Article } from '@/types';

interface ArticleCardProps {
    article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
    const router = useRouter();

    const handlePress = () => {
        router.push(`/article/${article.id}`);
    };

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <Image
                source={{ uri: article.imageUrl }}
                style={styles.image}
            />
            <View style={styles.overlay}>
                <Text style={styles.title}>{article.title}</Text>
                <View style={styles.dateContainer}>
                    <Calendar size={14} color={Colors.white} />
                    <Text style={styles.date}>{article.date}</Text>
                    <Text style={styles.author}>By {article.author}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
        borderRadius: 12,
        overflow: 'hidden',
        height: 180,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        padding: 16,
        justifyContent: 'flex-end',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.white,
        marginBottom: 8,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    date: {
        fontSize: 12,
        color: Colors.white,
        marginLeft: 4,
        marginRight: 8,
    },
    author: {
        fontSize: 12,
        color: Colors.white,
    },
});