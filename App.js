
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';

import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './modules/Auth/Login';
import Register from './modules/Auth/Register';
import Home from './modules/Home/Home';

import Message from './modules/Chat/Chat';
import ChatBox from './modules/Chat/Chatbox';
import Story from './modules/Home/Story';


const Stack = createStackNavigator();




export default function App() {
 
  return (
    <NavigationContainer>
      <Stack.Navigator>
        
        <Stack.Screen name="Login"  component={Login} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Message" component={Message} />
        <Stack.Screen name="ChatBox" component={ChatBox} />
        <Stack.Screen name="Story" component={Story} />
          
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
