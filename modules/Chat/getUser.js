import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const GetUser = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getUsers();
  }, []);

  const handleUserPress = (name) => {
    setSelectedUser(name);
  };

  return (
    <View style={styles.container}>
      {users.map(user => (
        <TouchableOpacity key={user._id} onPress={() => handleUserPress(user.name)}>
          <View style={styles.userContainer}>
            <View>
              <Text style={styles.userName}>{user.name}</Text>
            </View>
            <View>
              <Text style={styles.userName}>{user.phone}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
      {selectedUser && (
        <View style={styles.selectedUserView}>
          <Text style={styles.selectedUserText}>{selectedUser}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: 'pink',
  },
  userContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  userName: {
    textAlign: 'center',
  },
  selectedUserView: {
    position: 'absolute',
 
width:'100%',
  //  backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'red',
    marginTop:"9%",
    marginLeft:"100",justifyContent:"center",alignItems:"center"
  },
  selectedUserText: {
    fontSize: 14,
    fontWeight: 'bold',
    justifyContent:"center",
    alignItems:"center",
    marginTop:"30"
  },
});

export default GetUser;
