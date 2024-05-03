import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { baseUrl, postRequest } from '../service';

const ProfileScreen = () => {


    const navigation = useNavigation();
    const [user, setUser] = useState(null);  const [userData, setUserData] = useState(null);
    const [friendRequest, setfriendRequest] = useState([{},{}]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [background,setBackground] = useState("");

    const[avatar,setAvatar]=useState("")

    const token = AsyncStorage.getItem('token');

  


  const sendTokentoServer = async () => {
    
    const apiUrl = `${baseUrl}/users/userInfo`;
   
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
        setUserData(response)
       
        await AsyncStorage.setItem('_id',response._id);
        await AsyncStorage.setItem('User',response.name);
        console.log('====================================');
       
        console.log('====================================');
      console.log(response)
      console.log(background)

     
      

 
    }
   
    if (response.error) {
      console.log(response)
     

    }
    
  }
  useEffect(()=>{
    sendTokentoServer();

  },[])
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error removing token:', error);
    }
  };
  return (
   <ScrollView>
          <View style={styles.container}>
        <View style={{width:"100%", height:"100%", flex:1}}>
            {userData ? (
        <>
        <View style={{width:"100%", height:"35%",alignItems:"center", justifyContent:"center"}}>
        <Image
      source={{ uri: background }} // Sử dụng uri để đường dẫn là một chuỗi URL
        style={styles.image} // Kiểu của ảnh
      />
        </View>
        <View style={{ alignItems: "center", justifyContent: "center", width: "100%", height: "75%", backgroundColor: "white", marginTop: "1%" }}>
  <View style={{ width: "100%", flexDirection: "row", marginLeft: "5%" }}>
    <View style={{ width: "45%" }}> 
      <Image
        source={{ uri: avatar }} // Đường dẫn đến ảnh hoặc đối tượng hình ảnh
        style={styles.avatar} 
      />
    </View>
    <View style={{ alignItems: "flex-start", justifyContent: "center", width: "70%" }}>
      <Text style={styles.name}>{userData.name}</Text>
    </View>
  </View>
  <View style={{ marginTop: "1%", backgroundColor: "white", alignItems: "flex-start", justifyContent: "center", width: "100%" }}>


      <Text style={styles.info}><Text style={{fontWeight:"bold"}}>Thông Tin Cá Nhân</Text> </Text> 
      <Text style={styles.space}>{'\u00A0'}</Text> 
      <Text style={styles.info}><Text style={{ fontWeight: 'bold' }}>Ngày sinh:</Text> 20 tháng 02, 2002</Text>
      <Text style={styles.space}>{'\u00A0'}</Text> 
      <Text style={styles.info}><Text style={{ fontWeight: 'bold' }}>Email:</Text> {userData.email}</Text>
      <Text style={styles.space}>{'\u00A0'}</Text> 
      <Text style={styles.info}><Text style={{ fontWeight: 'bold' }}>Điện thoại:</Text> +84 {userData.phone}</Text>
   
  </View>

  <View style={{marginTop:30}}>
            <TouchableOpacity onPress={handleLogout}>
                  <Icon name="sign-out" size={30} color="#FF0000" />
                  </TouchableOpacity>
            </View>
</View>

        
    
        </>
      ) : (
        <Text>Đang tải thông tin người dùng...</Text>
      )}
            </View>
            
     
      
    </View>
   </ScrollView>
  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    alignItems: 'center',
    justifyContent: 'center',backgroundColor:"clyan",
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 100, 
    marginBottom: 20,
  }, space: {
    width: 10,
  },

  name: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
  },image: {
 flex:1,
 width:"100%",
 height:"30%"
   
  },
  info: {
    fontSize: 24,
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    marginBottom: 10,
  },
  bio: {
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default ProfileScreen;
