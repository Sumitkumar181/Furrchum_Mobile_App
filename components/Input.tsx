import React from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    ViewStyle,
    TextStyle,
    KeyboardTypeOptions,
    TouchableOpacity
} from 'react-native';
import Colors from '@/constants/Colors';
import { Eye, EyeOff } from 'lucide-react-native';

interface InputProps {
    label?: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    secureTextEntry?: boolean;
    keyboardType?: KeyboardTypeOptions;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    error?: string;
    style?: ViewStyle;
    inputStyle?: TextStyle;
    multiline?: boolean;
    numberOfLines?: number;
    editable?: boolean;
    icon?: React.ReactNode;
    onIconPress?: () => void;
}

export default function Input({
    label,
    value,
    onChangeText,
    placeholder,
    secureTextEntry = false,
    keyboardType = 'default',
    autoCapitalize = 'none',
    error,
    style,
    inputStyle,
    multiline = false,
    numberOfLines = 1,
    editable = true,
    icon,
    onIconPress,
}: InputProps) {
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(!secureTextEntry);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <View style={[styles.container, style]}>
            {label && <Text style={styles.label}>{label}</Text>}

            <View style={[
                styles.inputContainer,
                error ? styles.inputError : null,
                !editable ? styles.inputDisabled : null
            ]}>
                <TextInput
                    style={[styles.input, inputStyle, icon ? styles.inputWithIcon : null]}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    secureTextEntry={secureTextEntry && !isPasswordVisible}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    multiline={multiline}
                    numberOfLines={multiline ? numberOfLines : 1}
                    editable={editable}
                    placeholderTextColor={Colors.gray}
                />

                {secureTextEntry && (
                    <TouchableOpacity
                        style={styles.iconContainer}
                        onPress={togglePasswordVisibility}
                    >
                        {isPasswordVisible ? (
                            <EyeOff size={20} color={Colors.gray} />
                        ) : (
                            <Eye size={20} color={Colors.gray} />
                        )}
                    </TouchableOpacity>
                )}

                {icon && !secureTextEntry && (
                    <TouchableOpacity
                        style={styles.iconContainer}
                        onPress={onIconPress}
                        disabled={!onIconPress}
                    >
                        {icon}
                    </TouchableOpacity>
                )}
            </View>

            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        marginBottom: 8,
        color: Colors.text,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 8,
        backgroundColor: Colors.white,
    },
    input: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        color: Colors.text,
    },
    inputWithIcon: {
        paddingRight: 40,
    },
    inputError: {
        borderColor: Colors.error,
    },
    inputDisabled: {
        backgroundColor: Colors.lightGray,
    },
    iconContainer: {
        position: 'absolute',
        right: 12,
        padding: 4,
    },
    errorText: {
        color: Colors.error,
        fontSize: 12,
        marginTop: 4,
    },
});