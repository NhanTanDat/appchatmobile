import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';

import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './modules/Auth/Login';
import Register from './modules/Auth/Register';
import Home from './modules/Home/Home';
import Chat from './modules/Chat/Chat';


const Stack = createStackNavigator();




export default function App() {
  const [data, setData] = useState(null);

  const [name, setName] = useState(null);
  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);

  const fetchdataresgiter = () => {
    // Define the endpoint URL
    const apiUrl = 'http://localhost:5000/api/users/register';

    // If the API requires authentication, include your API key or token
    const headers = {
      'Content-Type': 'application/json; charset=utf-8'
    };

    const requestBody = {
      name: name,
      email: email,
      password: password
    };

    // Make the API call
    fetch(apiUrl, {
      method: 'POST', // Specify the HTTP method
      headers: headers,
      body: JSON.stringify(requestBody) // Convert request body to JSON string
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Handle the API response data
        setData(data);
      })
      .catch(error => {
        console.error('There was a problem with the API call:', error);
      });
  }

  useEffect(() => {
    fetchdataresgiter();
  },[data]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
         <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login"  component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
    alignItems: 'center',
    justifyContent: 'center',
  },
});
