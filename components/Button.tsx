import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle
} from 'react-native';
import Colors from '@/constants/Colors';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'danger';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    loading?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    fullWidth?: boolean;
}

export default function Button({
    title,
    onPress,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
    style,
    textStyle,
    fullWidth = false,
}: ButtonProps) {
    const getButtonStyle = () => {
        let buttonStyle: ViewStyle = {};

        // Variant styles
        switch (variant) {
            case 'primary':
                buttonStyle.backgroundColor = Colors.primary;
                break;
            case 'secondary':
                buttonStyle.backgroundColor = Colors.secondary;
                break;
            case 'outline':
                buttonStyle.backgroundColor = 'transparent';
                buttonStyle.borderWidth = 1;
                buttonStyle.borderColor = Colors.primary;
                break;
            case 'danger':
                buttonStyle.backgroundColor = Colors.error;
                break;
        }

        // Size styles
        switch (size) {
            case 'small':
                buttonStyle.paddingVertical = 8;
                buttonStyle.paddingHorizontal = 16;
                break;
            case 'medium':
                buttonStyle.paddingVertical = 12;
                buttonStyle.paddingHorizontal = 24;
                break;
            case 'large':
                buttonStyle.paddingVertical = 16;
                buttonStyle.paddingHorizontal = 32;
                break;
        }

        // Disabled style
        if (disabled) {
            buttonStyle.opacity = 0.5;
        }

        // Full width
        if (fullWidth) {
            buttonStyle.width = '100%';
        }

        return buttonStyle;
    };

    const getTextStyle = () => {
        let style: TextStyle = {};

        switch (variant) {
            case 'outline':
                style.color = Colors.primary;
                break;
            default:
                style.color = Colors.white;
        }

        switch (size) {
            case 'small':
                style.fontSize = 14;
                break;
            case 'medium':
                style.fontSize = 16;
                break;
            case 'large':
                style.fontSize = 18;
                break;
        }

        return style;
    };

    return (
        <TouchableOpacity
            style={[
                styles.button,
                getButtonStyle(),
                style
            ]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator
                    color={variant === 'outline' ? Colors.primary : Colors.white}
                    size="small"
                />
            ) : (
                <Text style={[styles.text, getTextStyle(), textStyle]}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontWeight: '600',
        textAlign: 'center',
    },
});