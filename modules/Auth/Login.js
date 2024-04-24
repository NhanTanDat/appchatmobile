
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { baseUrl, postRequest } from "../service"; 
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const navigation = useNavigation();

  const[username,setUsername]=useState("")
  const[password,setPassword]=useState("")
  const[error,setError]=useState("")
  const[token,setToken]=useState("")

  const[token1,setToken1]=useState("")
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
    if (storedToken !== null && storedToken !== 0 && storedToken !== '') {
        // Token is retrieved successfully
        handlePushChat()
      
    } else{
      //Không có token( đăng nhập lần đầu)

      await AsyncStorage.setItem('token',token);  
      const storedToken1 = await AsyncStorage.getItem('token');
      if(storedToken1 !== null && storedToke1 !== 0 && storedToken1 !== ''){
        handlePushChat() 
      }else{
        handleLogin()
      }


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
      await AsyncStorage.setItem('token', response.token);

      console.log(response)
      setToken(response.token)
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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, backgroundColor: '#f0f0f0', borderRadius: 20 }}>
  <TextInput
    style={{ width: '100%', height: 40, marginBottom: 10, paddingHorizontal: 10, backgroundColor: '#fff', borderRadius: 5, borderColor: '#ccc', borderWidth: 1 }}
    placeholder="email hoặc số điện thoại"
    value={username}
    onChangeText={setUsername}
  />
  <Text>{storedUsername}</Text>
  <TextInput
    style={{ width: '100%', height: 40, marginBottom: 10, paddingHorizontal: 10, backgroundColor: '#fff', borderRadius: 5, borderColor: '#ccc', borderWidth: 1 }}
    placeholder="Mật khẩu"
    secureTextEntry={true}
    value={password}
    onChangeText={setPassword}
  />
  {error && <Text style={{ marginVertical: 20, color: 'red', textAlign: 'center' }}>{error}</Text>}
  <TouchableOpacity
    style={{ width: '100%', height: 40, marginBottom: 10, borderRadius: 5, backgroundColor: '#007AFF', justifyContent: 'center', alignItems: 'center' }}
    onPress={fetchDataLogin}
  >
    <Text style={{ color: '#fff', fontSize: 16 }}>Login</Text>
  </TouchableOpacity>
  <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
    <TouchableOpacity
      style={{ width: '48%', height: 40, borderRadius: 5, backgroundColor: '#007AFF', justifyContent: 'center', alignItems: 'center' }}
      onPress={handlePushRegister}
    >
      <Text style={{ color: '#fff', fontSize: 16 }}>Register</Text>
    </TouchableOpacity>
   
  </View>
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

