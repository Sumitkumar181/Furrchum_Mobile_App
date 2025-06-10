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
import { User, Mail, Phone, Lock } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { useAuthStore } from '@/store/auth-store';

export default function RegisterScreen() {
    const router = useRouter();
    const signUp = useAuthStore((state) => state.signUp);
    const isLoading = useAuthStore((state) => state.isLoading);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        terms: '',
    });

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            name: '',
            email: '',
            phone: '',
            password: '',
            terms: '',
        };

        if (!name) {
            newErrors.name = 'Name is required';
            isValid = false;
        }

        if (!email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
            isValid = false;
        }

        if (!phone) {
            newErrors.phone = 'Phone number is required';
            isValid = false;
        }

        if (!password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        if (!agreeToTerms) {
            newErrors.terms = 'You must agree to the terms and conditions';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleRegister = async () => {
        if (!validateForm()) return;

        try {
            await signUp(name, email, phone, password);
        } catch (error) {
            console.error('Registration error:', error);
            // Handle registration error
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
                    <Text style={styles.logoText}>sign up FurrChum</Text>
                </View>

                <Text style={styles.welcomeText}>
                    Where expert care meets furry friends—
                    sign in to continue.
                </Text>

                <View style={styles.formContainer}>
                    <Input
                        value={name}
                        onChangeText={setName}
                        placeholder="Type your name"
                        autoCapitalize="words"
                        error={errors.name}
                        icon={<User size={20} color={Colors.gray} />}
                    />

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
                        value={phone}
                        onChangeText={setPhone}
                        placeholder="Type your number"
                        keyboardType="phone-pad"
                        error={errors.phone}
                        icon={<Phone size={20} color={Colors.gray} />}
                    />

                    <Input
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Enter Password"
                        secureTextEntry
                        error={errors.password}
                        icon={<Lock size={20} color={Colors.gray} />}
                    />

                    <View style={styles.termsContainer}>
                        <TouchableOpacity
                            style={styles.checkbox}
                            onPress={() => setAgreeToTerms(!agreeToTerms)}
                        >
                            <View style={[
                                styles.checkboxInner,
                                agreeToTerms && styles.checkboxChecked
                            ]} />
                        </TouchableOpacity>

                        <Text style={styles.termsText}>
                            By proceeding, you agree to FurrChum's Terms & Conditions.
                        </Text>
                    </View>

                    {errors.terms ? (
                        <Text style={styles.termsError}>{errors.terms}</Text>
                    ) : null}

                    <Button
                        title="Sign up"
                        onPress={handleRegister}
                        loading={isLoading}
                        disabled={isLoading}
                        style={styles.registerButton}
                        fullWidth
                    />

                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>I have already an account? </Text>
                        <TouchableOpacity onPress={() => router.push('/login')}>
                            <Text style={styles.loginLink}>Sign in</Text>
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
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 4,
        marginRight: 8,
        marginTop: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxInner: {
        width: 12,
        height: 12,
        borderRadius: 2,
    },
    checkboxChecked: {
        backgroundColor: Colors.primary,
    },
    termsText: {
        flex: 1,
        fontSize: 14,
        color: Colors.text,
    },
    termsError: {
        color: Colors.error,
        fontSize: 12,
        marginBottom: 16,
    },
    registerButton: {
        marginTop: 16,
        marginBottom: 24,
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    loginText: {
        color: Colors.text,
        fontSize: 14,
    },
    loginLink: {
        color: Colors.primary,
        fontSize: 14,
        fontWeight: '600',
    },
});