import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { postRequest } from "../service";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState(null);
   
    const navigation = useNavigation();

    const handlePushChat = () => {
        navigation.navigate('Message');
    }

    const handleRegister = async () => {
        const apiUrl = 'http://localhost:3000/api/users/register';
        const requestBody = JSON.stringify({ name, email: username, password, phone });

        try {
            const response = await postRequest(apiUrl, requestBody);

            if (!response.error) {
                await AsyncStorage.setItem('token', response.token);
                handlePushChat();
            } else {
                setError(response.message);
            }
        } catch (error) {
            console.error('There was a problem with the registration:', error);
            setError('An error occurred while registering. Please try again later.');
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>User Registration</Text>
            <View style={styles.inputContainer}>
                <Icon name="user" size={20} color="#007bff" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />
            </View>
            <View style={styles.inputContainer}>
                <Icon name="phone" size={20} color="#007bff" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    value={phone}
                    onChangeText={setPhone}
                />
            </View>
            <View style={styles.inputContainer}>
                <Icon name="user" size={20} color="#007bff" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                />
            </View>
            <View style={styles.inputContainer}>
                <Icon name="lock" size={20} color="#007bff" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />
            </View>
            {error && <Text style={styles.error}>{error}</Text>}
            <TouchableOpacity
                style={styles.button}
                onPress={handleRegister}
            >
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#f0f8ff', // Light blue background
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: '#007bff', // Blue text color
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#007bff', // Blue border color
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
        color: '#007bff', // Blue input text color
    },
    button: {
        backgroundColor: '#007bff', // Blue button background color
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff', // White button text color
        fontSize: 18,
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        marginTop: 10,
    },
});

export default Register;
