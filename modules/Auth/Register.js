import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { baseUrl, postRequest } from "../service";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigation = useNavigation();

    const handlePushChat = () => {
      navigation.navigate('Chat');
    }

    const handleRegister = () => {
        console.log(name);
        console.log(username);
        console.log(password);
        // Call the function to register the user
        fetchDataRegister();
       
    }
      const fetchDataRegister = async () => {
        const apiUrl = 'http://localhost:5000/api/users/register';
        const headers = {
            'Content-Type': 'application/json; charset=utf-8',
            // 'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJUYW4gRGF0Iiwic3ViIjoiNjVlNzM2MTk1MDA5ZTQ2ZWE4ZTE0Zjc0IiwiaWF0IjoxNzA5NjUxNTE5NTY0LCJleHAiOjE3MDk4MjQzMTk1NjR9.-JXf68b7vaUQpTtkK5Z_A0QkoalNlUwWvdldiXMlnPM'
        };
        const requestBody = {
            name: name,
            email: username,
            password: password
        };
        const response = await postRequest(
          apiUrl,
          JSON.stringify(requestBody)
        );
        
       
        if (response) {
          console.log(response)
          await AsyncStorage.setItem('token', response.token);
          handlePushChat()
        }
       
        if (response.error) {
          console.log(response.message)
          return setError(response.message);
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>User Registration</Text>
            <TextInput
                style={styles.input}
                placeholder="Tên"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Tên đăng nhập"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />
            {error && ( <Text style={error ?  {margin: "20px"} : {margin: "0px"} }>
            {error}
            </Text>)}
            <Button
                title="Register"
                onPress={handleRegister}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    heading: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
    },
});

export default Register;
