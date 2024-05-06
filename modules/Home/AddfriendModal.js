import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { baseUrl, getRequest, postRequest } from '../service';
import IntroduceUser from './IntroduceUser';
import FriendRequest from './FriendRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';

function AddfriendModal() {
  const [searchQuery, setSearchQuery] = useState('');
  const [ID, setID] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const _id = AsyncStorage.getItem('_id');
  let selectedFriendId = null;
  const [responseMessage, setResponseMessage] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = await AsyncStorage.getItem('_id');
        setUserId(id);
      } catch (error) {
        console.error('Error getting user ID:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      setResponseMessage("");
      setIsLoading(true);
      try {
        const apiUrl = `${baseUrl}/users/find/user`;
        const requestBody = { data: searchQuery };

        const response = await postRequest(apiUrl, JSON.stringify(requestBody));

        if (!response.error) {
          setSearchResults(response);
        } else {
          console.error('Error fetching users:', response.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [searchQuery]);


  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const handleSelectFriend = (friendId) => {
     setResponseMessage("Gửi yêu cầu kết bạn thành công")
    console.log(0)
    console.log(friendId)
    
    selectedFriendId = friendId;
    console.log('====================================');
    console.log(friendId);
    console.log('====================================');
    handlesendFriendRequest();
  };

  const handlesendFriendRequest = () => {
    setID(_id);
    sendFriendRequest();
  };

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: "row", backgroundColor: "yellow" }}>
      <TouchableOpacity style={styles.userItem}>
        <View>
          <Text>id: {item._id}</Text>
          <Text>Name: {item.name}</Text>
          <Text>Email: {item.email}</Text>
          <Text>Phone: {item.phone}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleSelectFriend(item._id)}>
        <Text>Kết bạn</Text>
      </TouchableOpacity>
    </View>
  );

  const sendFriendRequest = async () => {
    
   
        
      const apiUrl = `http://172.20.33.83:3000/api/users/sendfriendrequest`;
      const requestBody = JSON.stringify({  senderId: userId,   receiverId: selectedFriendId });
console.log('====================================IDID');
      console.log(selectedFriendId);
      console.log('====================================');



      console.log('====================================id');
      console.log(_id);
      console.log('====================================');
      try {
          const response = await postRequest(apiUrl, requestBody);

          if (!response.error) {
                console.log(response);
               
          } else {
           setResponseMessage(response.message);
          }
      } catch (error) {
          console.error('There was a problem with the registration:', error);
          setError('An error occurred while registering. Please try again later.');
      }
  
    
      // console.log('====================================IDID');
      // console.log(selectedFriendId);
      // console.log('====================================');



      // console.log('====================================id');
      // console.log(_id);
      // console.log('====================================');
      // const apiUrl = `${baseUrl}/users/sendfriendrequest`;
      // const requestBody = {
      //   senderId: _id,
      //   receiverId: selectedFriendId
      // };
      // const response = await postRequest(apiUrl, JSON.stringify(requestBody));

      // if (response.error) {
      //   console.error('Error sending friend request:', response.message);
      //   setResponseMessage(response.message);
      //   throw new Error('Failed to send friend request');
      // }

      // if (!response.error) {
      //   console.log(response);
      // }

    
  };

   return (

  <ScrollView style={{ width: "100%", height: "100%" }}>
  <View style={styles.container}>
    <View style={styles.searchContainer}>
      <TextInput
        placeholder="Enter phone, name, or email"
        value={searchQuery}
        onChangeText={handleSearch}
        style={styles.input}
      />
      {searchQuery !== '' && !isLoading ? (
        <FlatList
          data={searchResults}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          style={styles.list}
        />
      ) : null}
      {isLoading ? <ActivityIndicator size="small" /> : null}
    </View>
    <Text>{responseMessage}</Text>
    <View style={{ width: '100%', height: '100%', flex: 1 }}>
      <FriendRequest></FriendRequest>
      <IntroduceUser></IntroduceUser>
    </View>
  </View>
</ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    width: '100%',
    height:"100%"
  },
  searchContainer: {
    flexDirection: 'column',
    backgroundColor: '#E0FFFF',
    width: "100%"
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    flex: 1,
  },
  list: {
    flex: 1,
  },
  userItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: "80%"
  },
  userName: {
    fontWeight: 'bold',
  }
});

export default AddfriendModal;
