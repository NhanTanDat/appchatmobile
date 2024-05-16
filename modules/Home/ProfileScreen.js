import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { baseUrl, postRequest } from '../service';

const ProfileScreen = () => {
    const navigation = useNavigation();
    const [userData, setUserData] = useState(null);
    const [background, setBackground] = useState("");
    const [avatar, setAvatar] = useState("");

    const token = AsyncStorage.getItem('token');

    const sendTokentoServer = async () => {
        const apiUrl = `${baseUrl}/users/userInfo`;
        const requestBody = { token: token };

        const response = await postRequest(apiUrl, JSON.stringify(requestBody));
        
        if (!response.error) {
            setAvatar(response.avatar);
            setBackground(response.background);
            setUserData(response);
            await AsyncStorage.setItem('_id', response._id);
            await AsyncStorage.setItem('User', response.name);
        }

        if (response.error) {
            console.log(response);
        }
    };

    useEffect(() => {
        sendTokentoServer();
    }, []);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('token');
            navigation.navigate('Login');
        } catch (error) {
            console.error('Error removing token:', error);
        }
    };

    const handleEditProfile = () => {
        Alert.alert('Edit Profile', 'This is where the edit profile functionality will go.');
        // Navigate to the edit profile screen or show a modal
    };

    const handleSettings = () => {
        Alert.alert('Settings', 'This is where the settings functionality will go.');
        // Navigate to the settings screen or show a menu
    };

    return (
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>
                {userData ? (
                    <>
                        <View style={styles.coverPhotoContainer}>
                            <Image
                                source={{ uri: background }}
                                style={styles.coverPhoto}
                            />
                            <TouchableOpacity style={styles.editCoverPhotoButton} onPress={handleEditProfile}>
                                <Icon name="camera" size={25} color="#fff" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.profileSection}>
                            <View style={styles.avatarContainer}>
                                <Image
                                    source={{ uri: avatar }}
                                    style={styles.avatar}
                                />
                                <TouchableOpacity style={styles.cameraIcon} onPress={handleEditProfile}>
                                    <Icon name="camera" size={20} color="#fff" />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.name}>{userData.name}</Text>
                            <TouchableOpacity style={styles.editProfileButton} onPress={handleEditProfile}>
                                <Text style={styles.editProfileButtonText}>Edit Profile</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.userInfoSection}>
                            <Text style={styles.infoHeader}>Personal Information</Text>
                            <Text style={styles.infoText}><Text style={styles.infoLabel}>Date of Birth:</Text> 20 February 2002</Text>
                            <Text style={styles.infoText}><Text style={styles.infoLabel}>Email:</Text> {userData.email}</Text>
                            <Text style={styles.infoText}><Text style={styles.infoLabel}>Phone:</Text> +84 {userData.phone}</Text>
                        </View>
                        <TouchableOpacity style={styles.settingsButton} onPress={handleSettings}>
                            <Icon name="cog" size={30} color="#000" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                            <Icon name="sign-out" size={30} color="#FF0000" />
                            <Text style={styles.logoutText}>Logout</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <Text>Loading user information...</Text>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        backgroundColor: '#ADD8E6', // Light blue color
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ADD8E6', // Light blue color
    },
    coverPhotoContainer: {
        width: '100%',
        height: 200,
        position: 'relative',
    },
    coverPhoto: {
        width: '100%',
        height: '100%',
    },
    editCoverPhotoButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 5,
        borderRadius: 20,
    },
    profileSection: {
        alignItems: 'center',
        marginTop: -75, // Adjust to overlap the cover photo
    },
    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 4,
        borderColor: '#fff',
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 5,
        borderRadius: 15,
    },
    name: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 10,
    },
    editProfileButton: {
        marginTop: 10,
        backgroundColor: '#fff',
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    editProfileButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    userInfoSection: {
        width: '90%',
        backgroundColor: '#fff',
        padding: 15,
        marginTop: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    infoHeader: {
        fontSize: 26, // Increased font size
        fontWeight: 'bold',
        marginBottom: 10,
    },
    infoText: {
        fontSize: 20, // Increased font size
        fontWeight: '600', // Increased font weight
        marginBottom: 5,
    },
    infoLabel: {
        fontWeight: 'bold',
    },
    settingsButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    logoutText: {
        fontSize: 18,
        color: '#FF0000',
        marginLeft: 5,
    },
});

export default ProfileScreen;
