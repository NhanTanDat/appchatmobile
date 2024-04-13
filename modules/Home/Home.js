// DetailsScreen.js
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text,Button } from 'react-native';

export default function Home() {
    const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
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
    onPress={() => navigation.navigate('Chat')}
  />
    </View>
  );
}
