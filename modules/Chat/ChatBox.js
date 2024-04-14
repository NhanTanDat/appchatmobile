import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text, KeyboardAvoidingView } from 'react-native';

const ChatBox = () => {
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
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageBubble,
              { alignSelf: item.sender === 'me' ? 'flex-end' : 'flex-start' },
            ]}>
            <Text style={{ color: '#FFF' }}>{item.text}</Text>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
      <KeyboardAvoidingView behavior="padding" style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputMessage}
          onChangeText={setInputMessage}
          placeholder="Type your message..."
          multiline
        />
        <Button title="Send" onPress={handleSendMessage} />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  messageBubble: {
    backgroundColor: '#007AFF',
    padding: 10,
    margin: 5,
    borderRadius: 10,
    maxWidth: '80%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC',
    padding: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    marginRight: 10,
    paddingHorizontal: 10,
  },
});

export default ChatBox;
