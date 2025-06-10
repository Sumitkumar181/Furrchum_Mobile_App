import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Lock } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { useAuthStore } from '@/store/auth-store';

export default function LoginScreen() {
    const router = useRouter();
    const signIn = useAuthStore((state) => state.signIn);
    const isLoading = useAuthStore((state) => state.isLoading);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const validateForm = () => {
        let isValid = true;
        const newErrors = { email: '', password: '' };

        if (!email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
            isValid = false;
        }

        if (!password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleLogin = async () => {
        if (!validateForm()) return;

        try {
            await signIn(email, password);
        } catch (error) {
            console.error('Login error:', error);
            // Handle login error
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
                <View style={styles.logoContainer}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' }}
                        style={styles.logo}
                    />
                    <Text style={styles.logoText}>sign in FurrChum</Text>
                </View>

                <Text style={styles.welcomeText}>
                    Where expert care meets furry friends—
                    sign in to continue.
                </Text>

                <View style={styles.formContainer}>
                    <Input
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Type your email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        error={errors.email}
                        icon={<Mail size={20} color={Colors.gray} />}
                    />

                    <Input
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Enter your Password"
                        secureTextEntry
                        error={errors.password}
                        icon={<Lock size={20} color={Colors.gray} />}
                    />

                    <TouchableOpacity
                        style={styles.forgotPasswordContainer}
                        onPress={() => router.push('/forgot-password')}
                    >
                        <Text style={styles.forgotPasswordText}>Forget password?</Text>
                    </TouchableOpacity>

                    <Button
                        title="Sign in"
                        onPress={handleLogin}
                        loading={isLoading}
                        disabled={isLoading}
                        style={styles.loginButton}
                        fullWidth
                    />

                    <View style={styles.signupContainer}>
                        <Text style={styles.signupText}>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => router.push('/register')}>
                            <Text style={styles.signupLink}>Sign up Now</Text>
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
    logoContainer: {
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 24,
    },
    logo: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    logoText: {
        fontSize: 16,
        color: Colors.primary,
        marginTop: 8,
    },
    welcomeText: {
        fontSize: 16,
        color: Colors.text,
        textAlign: 'center',
        marginBottom: 32,
    },
    formContainer: {
        width: '100%',
    },
    forgotPasswordContainer: {
        alignSelf: 'flex-end',
        marginBottom: 24,
    },
    forgotPasswordText: {
        color: Colors.primary,
        fontSize: 14,
    },
    loginButton: {
        marginBottom: 24,
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    signupText: {
        color: Colors.text,
        fontSize: 14,
    },
    signupLink: {
        color: Colors.primary,
        fontSize: 14,
        fontWeight: '600',
    },
});