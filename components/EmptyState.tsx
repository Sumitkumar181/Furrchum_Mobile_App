import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Button from './Button';
import Colors from '@/constants/Colors';
import { ImageSourcePropType } from 'react-native';

interface EmptyStateProps {
    title: string;
    description: string;
    buttonTitle?: string;
    onButtonPress?: () => void;
    imageUrl?: ImageSourcePropType;
}   

export default function EmptyState({
    title,
    description,
    buttonTitle,
    onButtonPress,
    imageUrl,
}: EmptyStateProps) {
    return (
        <View style={styles.container}>
            

            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            {imageUrl && (
                <Image
                    source={imageUrl}
                    style={styles.image}
                    resizeMode="contain"
                />
            )}

            {buttonTitle && onButtonPress && (
                <Button
                    title={buttonTitle}
                    onPress={onButtonPress}
                    style={styles.button}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    image: {
        width: 300,
        height: 200,
        marginBottom: 24,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 8,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        color: Colors.lightBlack,
        textAlign: 'center',
        marginBottom: 24,
    },
    button: {
        minWidth: 350,
        borderRadius:30,
    },
});