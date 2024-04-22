import React, { useState,useEffect, useCallback } from 'react';
import { View, Text, Button, TouchableOpacity, Modal } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import AddfriendModal from './AddfriendModal';
import { postRequest } from '../service';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import Icon1 from 'react-native-vector-icons/AntDesign'; 
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Home() {


    const navigation = useNavigation();
    const [user, setUser] = useState(null);  const [userData, setUserData] = useState(null);
    const [friendRequest, setfriendRequest] = useState([{},{}]);
    const [isModalVisible, setModalVisible] = useState(false);
    const token = localStorage.getItem('token');


    const handleLogout = async () => {
        try {
          await AsyncStorage.removeItem('token');
          navigation.navigate('Login');
        } catch (error) {
          console.error('Error removing token:', error);
        }
      };
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const sendTokentoServer = async () => {
        console.log("1")
        const apiUrl = 'http://localhost:3000/api/users/userInfo';
       
        const requestBody = {
           
          token:token
        };
        const response = await postRequest(
          apiUrl,
          JSON.stringify(requestBody)
        );
        
        if (!response.error) {
            setUserData(response)
            await AsyncStorage.setItem('_id',response._id);
            await AsyncStorage.setItem('User',response.name);
            console.log('====================================');
           
            console.log('====================================');
          console.log(response)

         
          
    
     
        }
       
        if (response.error) {
          console.log(response)
         

        }
        
      }
   
      useEffect(()=>{
        sendTokentoServer();
    
      },[])
    return (
        <View style={{
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'flex-start',
        }}>
            <View><Text>{token}</Text></View>
            <View style={{ flex: 0.2, width: "100%", backgroundColor: "cyan", alignItems: "flex-end" }}>
            <TouchableOpacity onPress={toggleModal}>
                  <Icon1 name="adduser" size={30} color="#FF0000" /> {/* Thay đổi tên icon, kích thước và màu sắc tùy ý */}
                  </TouchableOpacity>
                <TouchableOpacity onPress={handleLogout}>
                  <Icon name="sign-out" size={30} color="#FF0000" /> {/* Thay đổi tên icon, kích thước và màu sắc tùy ý */}
                  </TouchableOpacity>
            </View>

            <Text style={{
                fontSize: 24,
                fontWeight: 'bold',
                marginBottom: 20,
            }}>Welcome to Hallo</Text>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '80%',
            }}>
                <Button
                    title="Go to Register"
                    onPress={() => navigation.navigate('Register')}
                    color="#007AFF"
                />
                <Button
                    title="Go to Login"
                    onPress={() => navigation.navigate('Login')}
                    color="#007AFF"
                />
                <Button
                    title="Go to Chat"
                    onPress={() => navigation.navigate('Message')}
                    color="#007AFF"
                />
            </View>
            <View>
            {userData ? (
        <>
        
          <Text>Thông tin người dùng:</Text>
          <Text>ID: {userData._id}</Text>
          <Text>Name: {userData.name}</Text>
          <Text>Email: {userData.email}</Text>
          <Text>Phone Number: {userData.phone}</Text>
          
          
          
          

        </>
      ) : (
        <Text>Đang tải thông tin người dùng...</Text>
      )}
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={toggleModal}
            >
                <View style={{
                    flex: 1,
                 
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 22,
                    backgroundColor: 'rgba(0,0,0,0.5)'
                }}>
                    <View style={{
                        margin: 20,
                        backgroundColor: "white",
                        borderRadius: 20,
                        padding: 35,
                        alignItems: "center",
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2
                        },
                        width:"70%",height:"80%",
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5
                    }}>
                        
                        <AddfriendModal/>

                        <Button title="Đóng" onPress={toggleModal} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}
