// import React, { useState,useEffect, useCallback } from 'react';
// import { View, Text, Button, TouchableOpacity, Modal } from 'react-native';

// import { useNavigation } from '@react-navigation/native';
// import AddfriendModal from './AddfriendModal';
// import { postRequest } from '../service';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons'; 
 import AsyncStorage from '@react-native-async-storage/async-storage';


// export default function Home() {


   

    // const handleLogout = async () => {
    //     try {
    //       await AsyncStorage.removeItem('token');
    //       navigation.navigate('Login');
    //     } catch (error) {
    //       console.error('Error removing token:', error);
    //     }
    //   };
//     const toggleModal = () => {
//         setModalVisible(!isModalVisible);
//     };
    
   
     
//     return (
//         <View style={{
//             flex: 1,
//             backgroundColor: '#fff',
//             alignItems: 'center',
//             justifyContent: 'flex-start',
//         }}>
//             <View><Text>{token}</Text></View>
//             <View style={{ flex: 0.2, width: "100%", backgroundColor: "cyan", alignItems: "flex-end" }}>
//             <TouchableOpacity onPress={toggleModal}>
//                   <Icon1 name="adduser" size={30} color="#FF0000" /> {/* Thay đổi tên icon, kích thước và màu sắc tùy ý */}
//                   </TouchableOpacity>
//                 <TouchableOpacity onPress={handleLogout}>
//                   <Icon name="sign-out" size={30} color="#FF0000" /> {/* Thay đổi tên icon, kích thước và màu sắc tùy ý */}
//                   </TouchableOpacity>
//             </View>

//             <Text style={{
//                 fontSize: 24,
//                 fontWeight: 'bold',
//                 marginBottom: 20,
//             }}>Welcome to Hallo</Text>

//             <View style={{
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 width: '80%',
//             }}>
//                 <Button
//                     title="Go to Register"
//                     onPress={() => navigation.navigate('Register')}
//                     color="#007AFF"
//                 />
//                 <Button
//                     title="Go to Login"
//                     onPress={() => navigation.navigate('Login')}
//                     color="#007AFF"
//                 />
//                 <Button
//                     title="Go to Chat"
//                     onPress={() => navigation.navigate('Message')}
//                     color="#007AFF"
//                 />
//             </View>
          

//             <Modal
//                 animationType="slide"
//                 transparent={true}
//                 visible={isModalVisible}
//                 onRequestClose={toggleModal}
//             >
//                 <View style={{
//                     flex: 1,
                 
//                     justifyContent: "center",
//                     alignItems: "center",
//                     marginTop: 22,
//                     backgroundColor: 'rgba(0,0,0,0.5)'
//                 }}>
//                     <View style={{
//                         margin: 20,
//                         backgroundColor: "white",
//                         borderRadius: 20,
//                         padding: 35,
//                         alignItems: "center",
//                         shadowColor: "#000",
//                         shadowOffset: {
//                             width: 0,
//                             height: 2
//                         },
//                         width:"70%",height:"80%",
//                         shadowOpacity: 0.25,
//                         shadowRadius: 3.84,
//                         elevation: 5
//                     }}>
                        
//                         <AddfriendModal/>

//                         <Button title="Đóng" onPress={toggleModal} />
//                     </View>
//                 </View>
//             </Modal>
//         </View>
//     );
// }
import * as React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Message from '../Chat/Message';
import ProfileScreen from './ProfileScreen';
import AddfriendModal from './AddfriendModal';

function Screen1() {
  return (
    <View style={styles.container}>
      <Text>Screen 1</Text>
    </View>
  );
}

const handleLogout = async () => {
  try {
    await AsyncStorage.removeItem('token');
    navigation.navigate('Login');
  } catch (error) {
    console.error('Error removing token:', error);
  }
};
function Screen2() {
  return (
    <View style={styles.container}>
      <Text>Screen 2</Text>
    </View>
  );
}

function Screen3() {
  return (
    <View style={styles.container}>
      <Text>Screen 3</Text>
    </View>
  );
}

function Screen4() {
  return (
    <View style={styles.container}>
      <Text>Screen 4</Text>
      
                <TouchableOpacity onPress={handleLogout}>
                  <Icon name="sign-out" size={30} color="#FF0000" /> {/* Thay đổi tên icon, kích thước và màu sắc tùy ý */}
                  </TouchableOpacity>
      
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      
        <Tab.Navigator>
          <Tab.Screen name="Message" component={Message}  options={{
      tabBarIcon: ({ color, size }) => (
        <Icon1 name="facebook-messenger" size={size} color={color} /> // Example: Using the Facebook brand icon
      ),
    }}  />
          <Tab.Screen name="Thêm Bạn" component={AddfriendModal} options={{
      tabBarIcon: ({ color, size }) => (
        <Icon2 name="adduser" size={size} color={color} /> // Example: Using the Facebook brand icon
      ),
    }}  />
          <Tab.Screen name="Screen3" component={Screen3} />
          <Tab.Screen name="My Info" component={ProfileScreen} options={{
      tabBarIcon: ({ color, size }) => (
        <Icon name="user" size={size} color={color} /> // Example: Using the Facebook brand icon
      ), headerTitle: 'Thông Tin Tài Khoản',
    }} />
        </Tab.Navigator>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

