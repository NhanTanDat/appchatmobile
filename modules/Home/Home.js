// DetailsScreen.js
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Home() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <View style={styles.buttonContainer}>
                <Button
                    title="Go to Register"
                    onPress={() => navigation.navigate('Register')}
                />
                <Button
                    title="Go to Login"
                    onPress={() => navigation.navigate('Login')}
                />
                <Button
                    title="Go to Chat"
                    onPress={() => navigation.navigate('Message')}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
});
