import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { getRequest, postRequest } from '../service';
import IntroduceUser from './IntroduceUser';
import FriendRequest from './FriendRequest';

function AddfriendModal() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const _id = localStorage.getItem('_id');
  let selectedFriendId = null;
  const [responseMessage, setResponseMessage] = useState('');


  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const apiUrl = 'http://localhost:3000/api/users/find/user';
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
    selectedFriendId = friendId;
    handlesendFriendRequest();
  };

  const handlesendFriendRequest = () => {
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
    try {
      const apiUrl = `http://localhost:3000/api/users/sendfriendrequest`;
      const requestBody = {
        senderId: _id,
        receiverId: selectedFriendId
      };
      const response = await postRequest(apiUrl, JSON.stringify(requestBody));

      if (response.error) {
        console.error('Error sending friend request:', response.message);
        setResponseMessage(response.message);
        throw new Error('Failed to send friend request');
      }

      if (!response.error) {
        console.log(response);
      }

    } catch (error) {
      console.error('Error sending friend request:', error.message);
      throw error;
    }
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
    justifyContent: 'flex-start',
    backgroundColor: 'blue',
    width: '90%',
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
