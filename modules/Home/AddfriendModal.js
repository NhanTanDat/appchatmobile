/*import * as React from 'react';
import { useState,useEffect } from 'react';
import { Button, View, Text, TextInput, FlatList,Alert } from 'react-native';
import { getRequest } from '../service';


function AddfriendModal() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);


  const findUser = async () => {
    const apiUrl = 'http://localhost:3000/api/users/find/user';
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
     
    };
    console.log(searchQuery)
    const requestBody = {
     
    };
  
    const response = await getRequest(
      apiUrl,
      JSON.stringify(requestBody)
    );
  
    
    if (!response.error) {
      console.log(response);
    } else {
      console.log(response);
    }
  };
const renderItem = ({ item }) => (
  <TouchableOpacity>
      <Text>{item.name}</Text>
      <Text>{item.email}</Text>
      <Text>{item.phone}</Text>
  </TouchableOpacity>
);


   
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start',backgroundColor:"blue",width:"90%" }}>
        <View style={{flexDirection:"row",backgroundColor:"red"}}>
        <TextInput
                placeholder="Enter phone, name, or email"
                value={searchQuery}
                onChangeText={text => setSearchQuery(text)} 
                style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 }}
            />
            <Button title="Search" onPress={findUser} />
          

        </View>


        
    </View>
  );
}

export default AddfriendModal
// ... other code from the previous section
*/
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { getRequest, postRequest } from '../service';
import IntroduceUser from './IntroduceUser';
import FriendRequest from './FriendRequest';

function AddfriendModal() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([{},{}]);
  const[receiverId,setReceiverId]=useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const _id= localStorage.getItem('_id');
  let selectedFriendId = null;

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const apiUrl = 'http://localhost:3000/api/users/find/user';
        const requestBody = { data: searchQuery };

        const response = await postRequest(apiUrl, JSON.stringify(requestBody)); // Truyền requestBody vào hàm getRequest
        console.log(response);

        if (!response.error) {
          setSearchResults(response);
          console.log(1)
          console.log(searchResults)
        } else {
          setError(response.message);
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
    console.log('====================================1111');
    console.log(selectedFriendId)
    console.log('====================================1111');
    
    handlesendFriendRequest()
  };
  const handlesendFriendRequest=() => {
  
    sendFriendRequest()
  };
  const renderItem = ({ item  }) => (
    <View style={{flexDirection:"row",backgroundColor:"yellow"}}>
      <TouchableOpacity style={styles.userItem}>
       <View>
       <Text>id: {item._id}</Text>
          <Text>Name: {item.name}</Text>
          <Text>Email: {item.email}</Text>
          <Text>Phone: {item.phone}</Text>
          {/* Hiển thị các thuộc tính khác của person nếu cần */}
        </View>
    </TouchableOpacity >
    <TouchableOpacity onPress={() => handleSelectFriend(item._id)}>
      <Text>Kết bạn</Text>
    </TouchableOpacity>
    </View>
    
  );

  


  ////Gửi lời mời kết bạn
 const sendFriendRequest = async (senderId, receiverId) => {
    try {
      const apiUrl = `http://localhost:3000/api/users/sendfriendrequest`; 
      const requestBody = {
            
        senderId: _id,
        receiverId: selectedFriendId
    };
    const response = await postRequest(
      apiUrl,
      JSON.stringify(requestBody)
    );
      // Check if the request was successful
      if (response.error) {
        // If there was an error, handle it
        console.error('Error sending friend request:', response.message);
        throw new Error('Failed to send friend request');
      }
      if (!response.error) {
        
        
        console.log('====================================');
        console.log(response);
        console.log('====================================');
      }
  
    } catch (error) {
      // Handle any errors that occur during the process
      console.error('Error sending friend request:', error.message);
      throw error;
    }
  };


  return (
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
      <View style={{ width: '100%', height: '100%', flex: 1 }}>
        <View>
          <Text>{receiverId}</Text>
        </View>
        <FriendRequest></FriendRequest>

        <IntroduceUser></IntroduceUser>
        
        
      </View>
    </View>
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
    width:"100%"
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
  error: {
    color: 'red',
    marginVertical: 10,
  },
  userItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width:"80%"
  },
  userName: {
    fontWeight: 'bold',
  },
});

export default AddfriendModal;
