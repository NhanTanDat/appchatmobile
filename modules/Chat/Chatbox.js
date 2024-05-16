import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TextInput, FlatList, Text,Modal, ScrollView, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons'; // Import FontAwesome here
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl, getRequest, postRequest } from '../service';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import EmojiSelector from 'react-native-emoji-selector';
import { io } from "socket.io-client";
const ChatBox = ({ route }) => {
  
  

  const { item } = route.params;
  const [firstId, setFirstId] = useState('');
  const [secondId, setSecondId] = useState('');
  const [chat, setChat] = useState('');
  const [chatId, setChatId] = useState('');
  const [messages, setMessages] = useState([]);
  const flatListRef = useRef(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [socket, setSocket] = useState(null);
  const [inputMessage, setInputMessage] = useState('');
  const [newMessage, setNewMessage] = useState(null);
  const [recipientId, setRecipientId] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
 

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleEmojiSelect = (emoji) => {
    setInputMessage(emoji);
    toggleModal(); // Đóng modal sau khi chọn emoji
  };











  

  useEffect(() => {
    const newSocket = io(`http://192.168.0.26:80`); // Thay đổi URL server tương ứng
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [item]);

  useEffect(() => {
    setRecipientId(item._id)
  
  }, [item]);



  useEffect(() => {
    setCurrentChat(item)
  }, [item]);


  useEffect(() => {
    if (socket === null) return;
    socket.emit("addNewUser", item?._id);
    socket.on("getUsers", (res) => {
      setOnlineUsers(res);
    });
    return () => {
      socket.off("getUsers");
    };
  }, [socket]);

  useEffect(() => {
    if (socket === null) return;
  
    socket.on("getMessage", (res) => {
      // Kiểm tra nếu currentChat không tồn tại hoặc không có thành viên
      if (!currentChat || !currentChat.members) return;
  
      if (currentChat._id !== res.chatId) return;
      
      // Kiểm tra nếu currentChat.members là một mảng có ít nhất một phần tử
      const isChatOpen = currentChat.members.some((Id) => Id === res.senderId);
      if (isChatOpen) {
        setMessages((prev) => [...prev, res]);
      } else {
        // Xử lý logic nếu cuộc trò chuyện không được mở
      }
    });
  
    socket.on("getNotification", (res) => {
      // Xử lý logic cho sự kiện getNotification tương tự
    });
  
    return () => {
      socket.off("getMessage");
      socket.off("getNotification");
    };
  }, [socket, currentChat]);
  

  
  useEffect(() => {
    if (socket === null) return;
    const recipientId = currentChat?.members.find((id) => id !== item?._id);
    socket.emit("sendMessage", { ...newMessage, recipientId });
  }, [newMessage]);

  useEffect(() => {
    if (socket === null) return;

    socket.on("getMessage", (res) => {
      if (currentChat?._id !== res.chatId) return;
      setMessages((prev) => [...prev, res]);
    });

    socket.on("getNotification", (res) => {
      const isChatOpen = currentChat?.members.some((Id) => Id === res.senderId);
      if (isChatOpen) {
        setNotifications((prev) => [{ ...res, isRead: true }, ...prev]);
      } else {
        setNotifications((prev) => [res, ...prev]);
      }
    });

    return () => {
      socket.off("getMessage");
      socket.off("getNotification");
    };
  }, [socket, currentChat]);

























  useEffect(() => {

handleFindChat();

  }, [item]);




    const handleFindChat = async () => {
      try {
        setSecondId(item._id)
        const firstId = await AsyncStorage.getItem('_id');
        setFirstId(firstId);
        
        const url = `${baseUrl}/chats/find/${firstId}/${item._id}`; 
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
      else{
        if (flatListRef.current) {
          const newPosition = 0; // Vị trí mong muốn
          flatListRef.current.scrollToOffset({ offset: newPosition, animated: true });
        }
      }
      try {
        console.log('===================recipientId=================');
        console.log(recipientId);
        console.log('====================================');
        const firstId = await AsyncStorage.getItem('_id');
        const requestBody = {
          chatId:chatId,
          senderId:firstId,
          text:inputMessage
        };
        const url = `${baseUrl}/messages/`; 
        const response = await postRequest(url,  JSON.stringify(requestBody));
  
        if (response.error) {
          console.error('Error fetching chat:', response.message);
        } else {
          console.log(response);
          setMessages()




          socket.emit('sendMessage', { message: inputMessage, recipientId: recipientId });
          // Xóa hết dữ liệu trên TextInput
          
    setInputMessage('');
        }
      } catch (error) {
        console.error('Error fetching chat:', error);
      }

      
    };
  


    const getMessage = async () => {
      try {
       
        
        const url = `${baseUrl}/messages/${chatId}`; 
        const response = await getRequest(url);
  
        if (response.error) {
          console.error('Error fetching chat:', response.message);
        } else {
          setMessages(response);
          
        }
      } catch (error) {
        console.error('Error fetching chat:', error);
      }
    };


    useEffect(() => {
      getMessage(); // Gọi hàm getMessage khi chatId thay đổi
    }, [inputMessage]);
    useEffect(() => {
      getMessage(); // Gọi hàm getMessage khi chatId thay đổi
    }, [chatId]);





  return (
    <View style={styles.container}>
     <View style={styles.headerContainer}>
      
     <Image
    source={{ uri: item.avatar }}
    style={{
      
      width: windowWidth * 0.15, // Chiều rộng của ảnh là 20% của chiều rộng màn hình
      height: windowWidth * 0.15, // Chiều cao của ảnh cũng là 20% của chiều rộng màn hình để tạo thành hình tròn
      borderRadius: (windowWidth * 0.2) / 2, // Bán kính là nửa chiều rộng của ảnh
    }} 
  />
  <Text style={[styles.header, { width: windowWidth * 0.4,marginLeft:"5%" }]}>{item.name}</Text> 
  <TouchableOpacity style={{ width: windowWidth * 0.1, alignItems: 'center' }}> 
    <Ionicons name="call" size={24} color="green" />
  </TouchableOpacity>


  <TouchableOpacity style={{ width: windowWidth * 0.2, alignItems: 'center' }}> 
    <FontAwesome name="ellipsis-v" size={24} color="black" />
  </TouchableOpacity>
</View>

<Modal visible={isModalVisible} animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ScrollView>
            <EmojiSelector onEmojiSelected={handleEmojiSelect} />
          </ScrollView>
        </View>
      </Modal>


      <View style={styles.chatContainer}>
        
        <FlatList
        ref={flatListRef}
  data={messages}
  renderItem={({ item, index }) => (
    <View
      style={[
        styles.message,
        { alignSelf: item.senderId === firstId ? 'flex-end' : 'flex-start' },
        { backgroundColor: item.senderId === firstId ? 'white' : 'white' }
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  )}
  keyExtractor={(item, index) => index.toString()} // Sử dụng index của mỗi mục làm khóa
  contentContainerStyle={styles.messagesContainer}
  
/>

       
        
      
      </View>
      <View style={styles.inputContainer}>
  <TouchableOpacity style={{ width: '15%', alignItems: 'center' }}>
    <MaterialIcons name="attach-file" size={24} color="black" />
  </TouchableOpacity>
  <TouchableOpacity onPress={toggleModal} style={{ width: '15%', alignItems: 'center' }}>
    <FontAwesome name="smile-o" size={24} color="black" /> 
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
    height: windowHeight * 0.9,
    backgroundColor: '#ADD8E6', // Light blue color
    padding: 5,
    width: windowWidth * 1
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: "10%",
    width: windowWidth * 1
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    justifyContent: "center",
    alignItems: "center"
  },
  chatContainer: {
    width: windowWidth * 1,
    height: windowHeight * 0.68,
    backgroundColor: "#ADD8E6" // Light blue color
  },
  message: {
    maxWidth: '70%',
    padding: 10,
    borderRadius: 20,
    marginVertical: 5
  },
  messageText: {
    fontSize: 16,
  },
  messagesContainer: {
    flexGrow: 1,margin:20
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
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
  avatar: {
    marginLeft: 20,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default ChatBox;
