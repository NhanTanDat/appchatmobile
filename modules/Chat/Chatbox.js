import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons'; // Import FontAwesome here
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatBox = () => {
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity>
          <Ionicons name="call" size={24} color="green" />
        </TouchableOpacity>
        <Text style={styles.header}>Chat</Text>
        <TouchableOpacity>
          <FontAwesome name="ellipsis-v" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.chatContainer}>
        <FlatList
          data={messages}
          renderItem={({ item }) => (
            <View
              style={[
                styles.message,
                { alignSelf: item.sender === 'me' ? 'flex-end' : 'flex-start' },
              ]}
            >
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.messagesContainer}
          inverted
        />
      </View>
      <View style={styles.inputContainer}>
        <TouchableOpacity>
          <MaterialIcons name="attach-file" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="smile-o" size={24} color="black" /> {/* Change to smile-o */}
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="microphone" size={24} color="black" /> {/* Change to microphone */}
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={inputMessage}
          onChangeText={setInputMessage}
          placeholder="Type your message here..."
          placeholderTextColor="#777"
          multiline={true}
          numberOfLines={4}
        />
        <TouchableOpacity style={styles.sendButton}>
        <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  chatContainer: {
    flex: 1,
  },
  message: {
    maxWidth: '70%',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  messageText: {
    fontSize: 16,
  },
  messagesContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChatBox;