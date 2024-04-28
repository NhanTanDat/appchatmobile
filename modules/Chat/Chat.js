
import React, { useState,useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text, ScrollView, Image } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getRequest, postRequest } from '../service';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';



const Message = () => {
  const navigation = useNavigation();
  const [background,setBackground] = useState("");
  const[error,setError]=useState("")
  const[avatar,setAvatar]=useState("")
  const [userData, setUserData] = useState(null);
  const [userName, setUsername] = useState('');
  const [userid, setUserID] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [chats, setChats] = useState();
  const [OtherMemberId, setOtherMemberId] = useState();
const [otherMemberIds, setOtherMemberIds] = useState([]);
const [friend, setFriend] = useState([]);
const [friendDataLoaded, setFriendDataLoaded] = useState(false);
 
  const nextsendTokentoServer = async () => {
    console.log(1)
console.log(userData)
    userChats()
  }
  const sendTokentoServer = async () => {
    const token = await AsyncStorage.getItem('token');
    
    
    const apiUrl = 'http://localhost:3000/api/users/userInfo';
   
    const requestBody = {
       
      token:token
    };
    const response = await postRequest(
      apiUrl,
      JSON.stringify(requestBody)
    );
    
    if (!response.error) {
      setAvatar(response.avatar)
      setBackground(response.background)
        setUserData(response.data)
        
       console.log(response)
        await AsyncStorage.setItem('_id',response._id);
        await AsyncStorage.setItem('User',response.name);
        setUsername(response.name)
        setUserID(response._id)

        console.log(2)
        console.log(userData);
     
        nextsendTokentoServer()
      

 
    }
   
    if (response.error) {
      console.log(response)
     

    }
    
  }
  useEffect(()=>{
    sendTokentoServer();
   

  },[])
  
  



  const userChats  = async () => {
 
const id = await AsyncStorage.getItem('_id');
    try {
       
        console.log(id);
        const response = await getRequest(`http://localhost:3000/api/chats/${id}`);
                
                if (!response.error) {
                  console.log('====================================');
                  console.log(response);
                  console.log('====================================');
                    setChats(response);
                } else {
                    console.error(response.message);
                }
    } catch (error) {
        console.error('There was a problem with the registration:', error);
        setError('An error occurred while registering. Please try again later.');
    }
}


const renderFriend = async (otherMemberId) => {
  if (!friendDataLoaded) {
    const apiUrl = 'http://localhost:3000/api/users/finduserbyid';
    const requestBody = { receiverId: otherMemberId };
    try {
      const response = await postRequest(apiUrl, JSON.stringify(requestBody));
      if (!response.error) {
       console.log('====================================');
       console.log(response);
       console.log('====================================');
       setFriend(prevFriend => prevFriend.concat(response));

        // Lưu thông tin của bạn bè vào state
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
    setFriendDataLoaded(true);
  }
};

const renderItem = ({ item }) => {
  const myId = userid; // ID của bạn
  const otherMemberId = item.members.find(memberId => memberId !== myId);
  renderFriend(otherMemberId);

  
};

const outputaccepted = ({ item }) =>  (
    <TouchableOpacity
      onPress={() => navigation.navigate('ChatBox')}
    >
      <View >
      <Image
        source={{ uri: item.avatar }}
        style={{ width: 50, height: 50 }} // Điều chỉnh kích thước ảnh theo ý muốn
      />
        <Text>TÊN của bạn bè: {item.name}</Text>
      
      </View>
    </TouchableOpacity>
  );


  return (
    <View style={styles.container}>
      <View>

      <Text style={{fontWeight:"bold", fontSize:30}}>Xin Chào: {userName}</Text>
      <Text style={{fontWeight:"bold", fontSize:30}}>ID:{userid}</Text>
      
     
      <View>
        <Text style={{fontWeight:"bold", fontSize:24, fontFamily:"Roboto"}} >Các đoạn chat của bạn</Text>
      </View>
      </View>

     
      <FlatList
      data={chats}
      renderItem={renderItem}
      keyExtractor={(item) => item._id} // Đảm bảo key là duy nhất
    />

<FlatList
        data={friend}
        renderItem={outputaccepted}
        keyExtractor={item => item._id}
      />

     
     
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