import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Alert,
    Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import {
    Camera,
    ChevronRight,
    Heart,
    Bell,
    Shield,
    HelpCircle,
    LogOut
} from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import Colors from '@/constants/Colors';
import { useAuthStore } from '@/store/auth-store';
import { usePetStore } from '@/store/pet-store';
import Input from '@/components/Input';
import Button from '@/components/Button';

export default function ProfileScreen() {
    const router = useRouter();
    const user = useAuthStore((state) => state.user);
    const updateProfile = useAuthStore((state) => state.updateProfile);
    const signOut = useAuthStore((state) => state.signOut);
    const pets = usePetStore((state) => state.pets);

    const [name, setName] = useState(user?.name || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [email, setEmail] = useState(user?.email || '');
    const [address, setAddress] = useState(user?.address || '');
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = async () => {
        setIsLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            updateProfile({
                name,
                phone,
                email,
                address,
            });

            setIsEditing(false);
            Alert.alert('Success', 'Profile updated successfully');
        } catch (error) {
            console.error('Update profile error:', error);
            Alert.alert('Error', 'Failed to update profile');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Logout',
                    onPress: signOut,
                    style: 'destructive',
                },
            ]
        );
    };

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Permission Required', 'Please allow access to your photo library');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            updateProfile({ photoUrl: result.assets[0].uri });
        }
    };

    const menuItems = [
        {
            icon: <Heart size={20} color={Colors.primary} />,
            title: 'My Pets',   
            // onPress: () => router.push('/pets'),
        },
        {
            icon: <Bell size={20} color={Colors.primary} />,
            title: 'Notifications',
            // onPress: () => router.push('/notifications'),
        },
        {
            icon: <Shield size={20} color={Colors.primary} />,
            title: 'Privacy & Security',
            // onPress: () => router.push('/privacy'),
        },
        {
            icon: <HelpCircle size={20} color={Colors.primary} />,
            title: 'Help & Support',
            // onPress: () => router.push('/support'),
        },
        {
            icon: <LogOut size={20} color={Colors.error} />,
            title: 'Logout',
            onPress: handleLogout,
            isDestructive: true,
        },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Profile</Text>
                {!isEditing && (
                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => setIsEditing(true)}
                    >
                        <Text style={styles.editButtonText}>Edit</Text>
                    </TouchableOpacity>
                )}
            </View>

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.profileSection}>
                    <TouchableOpacity
                        style={styles.avatarContainer}
                        onPress={pickImage}
                    >
                        <Image
                            source={{
                                uri: user?.photoUrl || 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
                            }}
                            style={styles.avatar}
                        />
                        <View style={styles.cameraButton}>
                            <Camera size={16} color={Colors.white} />
                        </View>
                    </TouchableOpacity>

                    <Text style={styles.changePhotoText}>Change Photo</Text>

                    {isEditing ? (
                        <View style={styles.form}>
                            <Input
                                label="Full Name"
                                value={name}
                                onChangeText={setName}
                                placeholder="Type your name"
                            />

                            <Input
                                label="Your Number"
                                value={phone}
                                onChangeText={setPhone}
                                placeholder="Type your number"
                                keyboardType="phone-pad"
                            />

                            <Input
                                label="Your mail"
                                value={email}
                                onChangeText={setEmail}
                                placeholder="Enter your mail"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />

                            <Input
                                label="Full Address"
                                value={address}
                                onChangeText={setAddress}
                                placeholder="Type your address"
                                multiline
                                numberOfLines={3}
                            />

                            <Button
                                title="Save"
                                onPress={handleSave}
                                loading={isLoading}
                                disabled={isLoading}
                                style={styles.saveButton}
                                fullWidth
                            />
                        </View>
                    ) : (
                        <View style={styles.infoContainer}>
                            <View style={styles.infoItem}>
                                <Text style={styles.infoLabel}>Name</Text>
                                <Text style={styles.infoValue}>{user?.name}</Text>
                            </View>

                            <View style={styles.infoItem}>
                                <Text style={styles.infoLabel}>Phone</Text>
                                <Text style={styles.infoValue}>{user?.phone}</Text>
                            </View>

                            <View style={styles.infoItem}>
                                <Text style={styles.infoLabel}>Email</Text>
                                <Text style={styles.infoValue}>{user?.email}</Text>
                            </View>

                            {user?.address && (
                                <View style={styles.infoItem}>
                                    <Text style={styles.infoLabel}>Address</Text>
                                    <Text style={styles.infoValue}>{user.address}</Text>
                                </View>
                            )}

                            <View style={styles.infoItem}>
                                <Text style={styles.infoLabel}>Pets</Text>
                                <Text style={styles.infoValue}>{pets.length} pets</Text>
                            </View>
                        </View>
                    )}
                </View>

                {!isEditing && (
                    <View style={styles.menuSection}>
                        {menuItems.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.menuItem}
                                onPress={item.onPress}
                            >
                                <View style={styles.menuItemLeft}>
                                    {item.icon}
                                    <Text
                                        style={[
                                            styles.menuItemText,
                                            item.isDestructive && styles.destructiveText
                                        ]}
                                    >
                                        {item.title}
                                    </Text>
                                </View>

                                {!item.isDestructive && (
                                    <ChevronRight size={20} color={Colors.gray} />
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                <View style={styles.bottomPadding} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        backgroundColor: Colors.white,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.text,
    },
    editButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
        backgroundColor: Colors.lightBlue,
    },
    editButtonText: {
        color: Colors.primary,
        fontWeight: '500',
    },
    content: {
        flex: 1,
    },
    profileSection: {
        backgroundColor: Colors.white,
        padding: 20,
        alignItems: 'center',
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 8,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    cameraButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: Colors.primary,
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.white,
    },
    changePhotoText: {
        color: Colors.primary,
        marginBottom: 20,
    },
    form: {
        width: '100%',
    },
    saveButton: {
        marginTop: 16,
    },
    infoContainer: {
        width: '100%',
    },
    infoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightBorder,
    },
    infoLabel: {
        fontSize: 16,
        color: Colors.lightText,
    },
    infoValue: {
        fontSize: 16,
        color: Colors.text,
        fontWeight: '500',
        maxWidth: '60%',
        textAlign: 'right',
    },
    menuSection: {
        backgroundColor: Colors.white,
        marginTop: 20,
        paddingHorizontal: 20,
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightBorder,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuItemText: {
        fontSize: 16,
        color: Colors.text,
        marginLeft: 12,
    },
    destructiveText: {
        color: Colors.error,
    },
    bottomPadding: {
        height: 100,
    },
});