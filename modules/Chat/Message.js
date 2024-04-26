
import React, { useState,useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text, ScrollView } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';



const Message = () => {
  
  const [userName, setUsername] = useState('');
  
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userName = await AsyncStorage.getItem('User');
        setUsername(userName);
      } catch (error) {
        console.error('Error retrieving user name from AsyncStorage:', error);
      }
    };
  
    fetchUserName();
  }, []);
  

  return (
    <View style={styles.container}>
      <View>

      <Text style={{fontWeight:"bold", fontSize:30}}>Xin Chào: {userName}</Text>
      <View>
        <Text style={{fontWeight:"bold", fontSize:24, fontFamily:"Roboto"}} >Các đoạn chat của bạn</Text>
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