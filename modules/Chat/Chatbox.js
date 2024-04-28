import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text, ScrollView, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons'; // Import FontAwesome here
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getRequest, postRequest } from '../service';

const ChatBox = ({ route }) => {
  const windowWidth = Dimensions.get('window').width;

  const { item } = route.params;
  //const [firstId, setFirstId] = useState('');
  const [secondId, setSecondId] = useState('');
  const [chat, setChat] = useState('');
  const [chatId, setChatId] = useState('');
  const [messages, setMessages] = useState([]);

  const [inputMessage, setInputMessage] = useState('');


  
  useEffect(() => {

handleFindChat();

  }, [item]);




    const handleFindChat = async () => {
      try {
        setSecondId(item._id)
        const firstId = await AsyncStorage.getItem('_id');
        
        const url = `http://localhost:3000/api/chats/find/${firstId}/${item._id}`; 
        const response = await getRequest(url);
  
        if (response.error) {
          console.error('Error fetching chat:', response.message);
        } else {
          setChat(response);
          setChatId(response._id)
        }
      } catch (error) {
        console.error('Error fetching chat:', error);
      }
    };
   
    
    const sendMessage = async () => {
      if (inputMessage.trim() === '') {
        // Nếu TextInput rỗng, hiển thị thông báo cho người dùng
        Alert.alert('Error', 'Không thể gửi tin nhắn rỗng');
        return;
      }
      try {
        
        const firstId = await AsyncStorage.getItem('_id');
        const requestBody = {
          chatId:chatId,
          senderId:firstId,
          text:inputMessage
        };
        const url = `http://localhost:3000/api/messages/`; 
        const response = await postRequest(url,  JSON.stringify(requestBody));
  
        if (response.error) {
          console.error('Error fetching chat:', response.message);
        } else {
          console.log(response);
          // Xóa hết dữ liệu trên TextInput
    setInputMessage('');
        }
      } catch (error) {
        console.error('Error fetching chat:', error);
      }

      
    };
  











  return (
    <View style={styles.container}>
     <View style={styles.headerContainer}>
      {/* <Text>{secondId}</Text>
      <Text> {chatId}</Text> */}
     <Image
    source={{ uri: item.avatar }}
    style={{
      marginLeft: windowWidth * 0.05, // Chiều rộng của ảnh là 10% của chiều rộng màn hình
      width: windowWidth * 0.1, // Chiều rộng của ảnh là 20% của chiều rộng màn hình
      height: windowWidth * 0.1, // Chiều cao của ảnh cũng là 20% của chiều rộng màn hình để tạo thành hình tròn
      borderRadius: (windowWidth * 0.2) / 2, // Bán kính là nửa chiều rộng của ảnh
    }} 
  />
  <Text style={[styles.header, { width: windowWidth * 0.6, marginLeft:windowWidth*0.1 }]}>{item.name}</Text> {/* Chiều rộng của văn bản là 60% của chiều rộng màn hình */}
  <TouchableOpacity style={{ width: windowWidth * 0.1, alignItems: 'center' }}> {/* Chiều rộng của nút là 10% của chiều rộng màn hình */}
    <Ionicons name="call" size={24} color="green" />
  </TouchableOpacity>
  <TouchableOpacity style={{ width: windowWidth * 0.1, alignItems: 'center' }}> {/* Chiều rộng của nút là 10% của chiều rộng màn hình */}
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
  <TouchableOpacity style={{ width: '15%', alignItems: 'center' }}>
    <MaterialIcons name="attach-file" size={24} color="black" />
  </TouchableOpacity>
  <TouchableOpacity style={{ width: '15%', alignItems: 'center' }}>
    <FontAwesome name="smile-o" size={24} color="black" /> {/* Change to smile-o */}
  </TouchableOpacity>
 
  <TextInput
    style={{ width: '45%', paddingHorizontal: 10, borderRadius:20 }} // Đặt chiều rộng là 50% và padding ngang là 10
    value={inputMessage}
    onChangeText={setInputMessage}
    placeholder="Type your message here..."
    placeholderTextColor="#777"
    multiline={true}
    numberOfLines={2}
  />
  <TouchableOpacity style={{ width: '15%', alignItems: 'center',marginLeft:"5%" }}>
    <View style={styles.sendButton}>
      <Text style={styles.sendButtonText} onPress={sendMessage}>Send</Text>
    </View>
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
  }, avatar: {
    marginLeft:20,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default ChatBox;