// DetailsScreen.js
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Home() {
    const navigation = useNavigation();

    return (
        <View style={styles.background}>
        <View style={styles.container}>
        <Icon name="user-circle" size={50} color="#007bff" style={styles.icon} />   
            <Text style={styles.title}> Welcome To Hallo</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Chat')}
                >
                    <Text style={styles.buttonText}>Chat</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
    
   );
};

const styles = StyleSheet.create({
background: {
    flex: 1,
    backgroundColor: '#b2dfdb',

},
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
},
icon: {
    marginBottom: 20,
},
title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#OOO',
    marginBottom: 35,
    textAlign: 'center',
},
buttonContainer: {
    width: '100%',
    alignItems: 'center',
},
button: {
    backgroundColor: '#007bff',
    width: 127,
    height: 127,
    borderRadius: 127,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
},
buttonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
},
});