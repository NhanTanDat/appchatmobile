import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postRequest } from '../service';

const FriendRequest = () => {

  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerError, setRegisterError] = useState(null);
  const [friendRequests, setFriendRequests] = useState([{},{}]);
  const [selectedUserId, setSelectedUserId] = useState("");

  const handleSelectAccept = (user) => {
   console.log(user)
    setSelectedUserId(user);
    
    
    handlesendFriendRequest()
  };
  const handlesendFriendRequest=() => {
    console.log('====================================1111');
    console.log(selectedUserId) /*123*/
    console.log('====================================1111');
    acceptFriendRequest()
  };
  const acceptFriendRequest = async (senderId) => {

    setIsRegisterLoading(true);
    setRegisterError(null);


    const data = {
      requestId: selectedUserId,
    }
    const response = await postRequest(
      `http://localhost:3000/api/users/acceptfriendrequest`,
      JSON.stringify(data)
    );

    setIsRegisterLoading(false);

};


  

  const getFriendRequests = async () => {
    setIsRegisterLoading(true);
    setRegisterError(null);

    try {
      const id = await AsyncStorage.getItem("_id"); // Use AsyncStorage.getItem instead of localStorage.getItem
      //const user = userString; // Parse JSON string to object
     // const senderId = user._id;
      //const id = senderId.replace(/^"|"$/g, '');

      const userId = {
        senderId: id,
      };


      const response = await postRequest(
        `http://localhost:3000/api/users/getsenderinfo`,
        JSON.stringify(userId)
      );

      setIsRegisterLoading(false);

      if (response && !response.error) {
 
        console.log('====================================');
        console.log(response)
        console.log('====================================');
        setFriendRequests(response);
        console.log(friendRequests)
      } else {
        // Handle server errors
        console.log('===============123=====================');
        console.log(response)
        console.log('================123====================');
  
        setRegisterError(response);
      }
    } catch (error) {
      console.error(error);
      // Handle client errors
      setRegisterError({ error: true, message: "An error occurred while fetching friend requests." });
      setIsRegisterLoading(false);
    }
  };
useEffect(() => {
    getFriendRequests();
  }, []);


  const renderItem = ({ item  }) => (
    <View style={{flexDirection:"row",backgroundColor:"yellow", width:"100%"}}>
      <TouchableOpacity style={styles.userItem}>
       <View>
       <Text>Name:{item.id}</Text>
          <Text>Name: {item.name}</Text>
          <Text>Email: {item.email}</Text>
          <Text>Phone: {item.phone}</Text>
         
          {/* Hiển thị các thuộc tính khác của person nếu cần */}
        </View>
    </TouchableOpacity >
    <TouchableOpacity onPress={() => handleSelectAccept(item.id)}>
      <Text>Chấp nhận</Text>
    </TouchableOpacity>
    </View>
    
  );
  return (
    <View style={styles.container}>
      
        <Text style={{fontWeight:"bold",width:"100%"}}>Lời mời kết bạn cần xác nhận:</Text>
        {isRegisterLoading ? (
  <Text>Loading...</Text>
) : (
  <FlatList
    data={friendRequests}
    renderItem={renderItem}
    keyExtractor={(item, index) => index.toString()}
 // hoặc thay vì toString() bạn có thể sử dụng một giá trị khóa duy nhất khác của item
  />
)}

{registerError && (
  <Text>Error: {response.message}</Text>
)}
    </View>
  )
}

export default FriendRequest

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'white ',
        width: '100%',
        justifyContent:"flex-start",
        alignItems:"flex-start",
        margin:10
      }



})