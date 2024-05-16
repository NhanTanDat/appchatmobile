import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Image, Text } from 'react-native';
import { baseUrl, getRequest, postRequest } from '../service';
import IntroduceUser from './IntroduceUser';
import FriendRequest from './FriendRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';

function AddFriendModal() {
  const [searchQuery, setSearchQuery] = useState('');
  const [ID, setID] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
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
    const fetchData = async () => {
      setResponseMessage("");
      setIsLoading(true);
      try {
        const apiUrl = `${baseUrl}/users/`;
        const requestBody = { id: userId };

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

    fetchData();
  }, [searchQuery]);

  const filteredItems = searchResults.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.phone.includes(searchQuery)
  );

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const handleSelectFriend = (friendId) => {
    setResponseMessage("Gửi yêu cầu kết bạn thành công");
    selectedFriendId = friendId;
    handlesendFriendRequest();
  };

  const handlesendFriendRequest = async () => {
    const apiUrl = `${baseUrl}/users/sendfriendrequest`;
    const requestBody = JSON.stringify({ senderId: userId, receiverId: selectedFriendId });

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
  };

  const renderItem = ({ item }) => (
    <View style={styles.userItem}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text>Email: {item.email}</Text>
        <Text>Phone: {item.phone}</Text>
      </View>
      <TouchableOpacity onPress={() => handleSelectFriend(item._id)}>
        <Text style={styles.actionButton}>Kết bạn</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Nhập số điện thoại, tên, email để tìm kiếm"
          value={searchQuery}
          onChangeText={handleSearch}
          style={styles.input}
        />
        {searchQuery !== '' && !isLoading ? (
          <FlatList
            data={filteredItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            style={styles.list}
          />
        ) : null}
        {isLoading ? <ActivityIndicator size="small" /> : null}
        <Text>{responseMessage}</Text>
      </View>
      <View style={styles.additionalInfo}>
        <FriendRequest />
        <IntroduceUser />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#E6F7FF',
    width: '100%',
  },
  searchContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#E6F7FF',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 25,
    backgroundColor: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  list: {
    marginTop: 10,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  actionButton: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  additionalInfo: {
    width: '100%',
    padding: 20,
  },
});

export default AddFriendModal;
