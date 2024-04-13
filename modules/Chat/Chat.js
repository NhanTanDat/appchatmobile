
import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text } from 'react-native';
import GetUser from './getUser';


const Chat = () => {
  

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

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
      
      <Text>Hallo</Text>
      <GetUser/>
      <View style={{ flex: 1, padding: 10 }}>
      <View style={{ flex: 1 }}>
        {messages.map(message => (
          <View key={message.id} style={{ alignSelf: message.sender === 'me' ? 'flex-end' : 'flex-start', backgroundColor: message.sender === 'me' ? '#DCF8C6' : '#E5E5EA', padding: 10, marginVertical: 5, borderRadius: 8 }}>
            <Text>{message.text}</Text>
          </View>
        ))}
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#ccc', paddingVertical: 10 }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 10, marginRight: 10 }}
          value={inputMessage}
          onChangeText={setInputMessage}
          placeholder="Type your message..."
          multiline
        />
        <Button title="Send" onPress={handleSendMessage} />
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

export default Chat;