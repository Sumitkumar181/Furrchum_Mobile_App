import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, ArrowLeft } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Input from '@/components/Input';
import Button from '@/components/Button';

export default function ForgotPasswordScreen() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const validateEmail = () => {
        if (!email) {
            setError('Email is required');
            return false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Email is invalid');
            return false;
        }

        setError('');
        return true;
    };

    const handleResetPassword = async () => {
        if (!validateEmail()) return;

        setIsLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            Alert.alert(
                'Reset Link Sent',
                `We've sent a password reset link to ${email}. Please check your email.`,
                [
                    {
                        text: 'OK',
                        onPress: () => router.push('/login')
                    }
                ]
            );
        } catch (error) {
            console.error('Reset password error:', error);
            setError('Failed to send reset link. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <ArrowLeft size={24} color={Colors.text} />
                </TouchableOpacity>

                <View style={styles.contentContainer}>
                    <Text style={styles.title}>Forgot Password</Text>
                    <Text style={styles.description}>
                        Enter your email address and we'll send you a link to reset your password.
                    </Text>

                    <View style={styles.formContainer}>
                        <Input
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Enter your email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            error={error}
                            icon={<Mail size={20} color={Colors.gray} />}
                        />

                        <Button
                            title="Send Reset Link"
                            onPress={handleResetPassword}
                            loading={isLoading}
                            disabled={isLoading}
                            style={styles.resetButton}
                            fullWidth
                        />

                        <TouchableOpacity
                            style={styles.loginContainer}
                            onPress={() => router.push('/login')}
                        >
                            <Text style={styles.loginText}>Back to Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    scrollContent: {
        flexGrow: 1,
        padding: 24,
    },
    backButton: {
        marginBottom: 24,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        color: Colors.lightText,
        marginBottom: 32,
    },
    formContainer: {
        width: '100%',
    },
    resetButton: {
        marginTop: 16,
        marginBottom: 24,
    },
    loginContainer: {
        alignSelf: 'center',
    },
    loginText: {
        color: Colors.primary,
        fontSize: 16,
        fontWeight: '500',
    },
});