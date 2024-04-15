
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { baseUrl, postRequest } from "../service"; 
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    console.log("a  x")
    const apiUrl = 'http://localhost:3000/api/users/login';
    const headers = {
        'Content-Type': 'application/json; charset=utf-8',
        // 'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJUYW4gRGF0Iiwic3ViIjoiNjVlNzM2MTk1MDA5ZTQ2ZWE4ZTE0Zjc0IiwiaWF0IjoxNzA5NjUxNTE5NTY0LCJleHAiOjE3MDk4MjQzMTk1NjR9.-JXf68b7vaUQpTtkK5Z_A0QkoalNlUwWvdldiXMlnPM'
    };
    const requestBody = {
       
        email: username,
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
      console.log(response.name)

      
    }
   
    if (response.error) {
      console.log(username)
      console.log(password)
      
      console.log(response.message)
      return setError(response.message);
    }
    checkUser();
  }
  return (
    <View style={styles.container}>
      <TextInput
                style={styles.input}
                placeholder="Tên đăng nhập"
                value={username}
                onChangeText={setUsername}
            />
            <Text>{storedUsername}</Text>
            <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
               
            />
    
    <Button title="Login" onPress={fetchDataLogin}/>
    <Button title="Register" onPress={handlePushRegister}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

