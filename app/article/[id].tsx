import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    Share
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Calendar, Share2, Heart } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { articles } from '@/mocks/articles';

export default function ArticleDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const article = articles.find((a) => a.id === id);

    if (!article) {
        return (
            <View style={styles.notFound}>
                <Text>Article not found</Text>
            </View>
        );
    }

    const handleShare = async () => {
        try {
            await Share.share({
                message: `Check out this article: ${article.title}`,
                url: `https://furrchum.com/article/${article.id}`,
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image
                    source={{ uri: article.imageUrl }}
                    style={styles.image}
                />

                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{article.title}</Text>

                        <View style={styles.metaContainer}>
                            <View style={styles.dateContainer}>
                                <Calendar size={16} color={Colors.lightText} />
                                <Text style={styles.date}>{article.date}</Text>
                            </View>

                            <Text style={styles.author}>By {article.author}</Text>
                        </View>

                        <View style={styles.actions}>
                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={handleShare}
                            >
                                <Share2 size={20} color={Colors.primary} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.actionButton}>
                                <Heart size={20} color={Colors.primary} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Text style={styles.articleContent}>{article.content}</Text>

                    <View style={styles.tagsContainer}>
                        {article.tags.map((tag, index) => (
                            <View key={index} style={styles.tag}>
                                <Text style={styles.tagText}>#{tag}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.relatedArticlesContainer}>
                        <Text style={styles.relatedTitle}>Related Articles</Text>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.relatedArticles}
                        >
                            {articles
                                .filter((a) => a.id !== article.id)
                                .slice(0, 3)
                                .map((relatedArticle) => (
                                    <TouchableOpacity
                                        key={relatedArticle.id}
                                        style={styles.relatedArticle}
                                        onPress={() => router.push(`/article/${relatedArticle.id}`)}
                                    >
                                        <Image
                                            source={{ uri: relatedArticle.imageUrl }}
                                            style={styles.relatedImage}
                                        />
                                        <Text style={styles.relatedArticleTitle}>
                                            {relatedArticle.title}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
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
    image: {
        width: '100%',
        height: 250,
    },
    content: {
        padding: 20,
    },
    header: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 12,
    },
    metaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    date: {
        fontSize: 14,
        color: Colors.lightText,
        marginLeft: 4,
    },
    author: {
        fontSize: 14,
        color: Colors.lightText,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    actionButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.lightBlue,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 12,
    },
    articleContent: {
        fontSize: 16,
        color: Colors.text,
        lineHeight: 24,
        marginBottom: 20,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 24,
    },
    tag: {
        backgroundColor: Colors.lightBlue,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
        marginRight: 8,
        marginBottom: 8,
    },
    tagText: {
        color: Colors.primary,
        fontSize: 14,
    },
    relatedArticlesContainer: {
        marginBottom: 40,
    },
    relatedTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 16,
    },
    relatedArticles: {
        paddingRight: 20,
    },
    relatedArticle: {
        width: 200,
        marginRight: 16,
    },
    relatedImage: {
        width: '100%',
        height: 120,
        borderRadius: 8,
        marginBottom: 8,
    },
    relatedArticleTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.text,
    },
});