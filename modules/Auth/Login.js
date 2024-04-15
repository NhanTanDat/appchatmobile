
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ImageBackground, TouchableOpacity } from 'react-native';
import { baseUrl, postRequest } from "../service"; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Login() {
  const navigation = useNavigation();

  const[username,setUsername]=useState("")
  const[password,setPassword]=useState("")
  const[error,setError]=useState("")
  const[token,setToken]=useState("")
  const[storedUsername,setstoredUsername]=useState("")
  const handlePushChat = () => {
    navigation.navigate('Home');
  }

  const handlePushRegister = () => {
    navigation.navigate('Register');
  }
const checkUser =async()=>{
  try {
    const storedToken = await AsyncStorage.getItem('token');
   

    //const storedUsername = await AsyncStorage.getItem('username');
    if (storedToken !== null) {
        // Token is retrieved successfully
        
        handlePushChat()
      
    } else{
      await AsyncStorage.setItem('token',token);  
    
      handlePushChat() 
     
    }
} catch (error) {
    // Error retrieving data
    console.error('Error retrieving token:', error);
}
}

  useEffect(()=>{
    checkUser();

  },[])
  const fetchDataLogin = async () => {
    console.log("1")
    const apiUrl = 'http://localhost:3000/api/users/login';
    const headers = {
        'Content-Type': 'application/json; charset=utf-8',
        // 'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJUYW4gRGF0Iiwic3ViIjoiNjVlNzM2MTk1MDA5ZTQ2ZWE4ZTE0Zjc0IiwiaWF0IjoxNzA5NjUxNTE5NTY0LCJleHAiOjE3MDk4MjQzMTk1NjR9.-JXf68b7vaUQpTtkK5Z_A0QkoalNlUwWvdldiXMlnPM'
    };
    const requestBody = {
       
      emailOrPhone: username,
        password: password
    };
    const response = await postRequest(
      apiUrl,
      JSON.stringify(requestBody)
    );
    
    if (!response.error) {
      console.log(response)
      setToken(response.token)
      await AsyncStorage.setItem('username',response.name);
      setstoredUsername()
      

      
    }
   
    if (response.error) {
      console.log(response)
      console.log(username)
      console.log(password)
      
      console.log(response.message)
      return setError(response.message);
    }
    checkUser();
  }
  return (
    <ImageBackground
    source={require('../../assets/anhnen-1.png')}
   style={styles.background}
>
    
<View style={styles.container}>
    <Text style={styles.title}>Login</Text> 
    <View style={styles.inputContainer}>
                <Icon name="user" size={20} color="#007bff" style={styles.inputIcon} />
                <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#007bff"
                value={username}
                onChangeText={setUsername}
            />
         </View>
        <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#007bff" style={styles.inputIcon} />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#007bff"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
               
            />
    
    
    </View>
            <TouchableOpacity
                style={styles.button}
                onPress={fetchDataLogin}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.link}
                onPress={handlePushRegister}
            >
                <Text style={styles.linkText}>Don't have an account? Register here</Text>
            </TouchableOpacity>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',

},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#b2dfdb',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#007bff',
},
inputContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  marginBottom: 20,
  borderWidth: 1,
  borderColor: '#007bff',
  borderRadius: 5,
  paddingHorizontal: 10,
},
inputIcon: {
  marginRight: 10,
},
input: {
  flex: 1,
  height: 40,
  color: '#007bff',
},
button: {
  backgroundColor: '#007bff',
  width: '100%',
  height: 40,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 5,
  marginTop: 10,
},
buttonText: {
  color: '#fff',
  fontSize: 18,
  fontWeight: 'bold',
},
link: {
  marginTop: 20,
},
linkText: {
  color: '#007bff',
  fontSize: 16,
},
});


 
