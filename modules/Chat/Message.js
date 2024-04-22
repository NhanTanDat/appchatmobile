
import React, { useState,useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text, ScrollView } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';



const Message = () => {
  
  const [username, setUsername] = useState('');
 
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');


  useEffect(() => {
    retrieveUsername();
  }, []);
  const retrieveUsername = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('username');
      if (storedUsername !== null) {
        setUsername(storedUsername);
      }
    } catch (error) {
      console.log('Error retrieving username:', error);
    }
  };


  const handleSendMessage = () => {
    if (inputMessage.trim() === '') {
      return;
    }

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'me', // You can set the sender dynamically here
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');
  };

  return (
    <View style={styles.container}>
      
      <Text>Hallo{username}</Text>
      
     
      <View style={{ flex: 1, padding: 10 }}>
        <ScrollView>
        <View style={{ flex: 0.3 }}>
        {messages.map(message => (
          <View key={message.id} style={{ alignSelf: message.sender === 'me' ? 'flex-end' : 'flex-start', backgroundColor: message.sender === 'me' ? '#DCF8C6' : '#E5E5EA', padding: 10, marginVertical: 5, borderRadius: 8 }}>
            <Text>{message.text}</Text>
          </View>
        ))}
      </View>
        </ScrollView>
      
     <View>
   <Text>Hallo</Text> 
     </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chatContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-start',
  },
  messagesBox: {
    flexGrow: 0,
    paddingRight: 16,
  },
  messagesContainer: {
    paddingVertical: 16,
  },
  loading: {
    fontSize: 16,
    color: '#666',
  },
  noChats: {
    fontSize: 16,
    color: '#666',
  },
  userCardContainer: {
    marginVertical: 8,
  },
});

export default Message;