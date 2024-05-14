import AsyncStorage from "@react-native-async-storage/async-storage";

export const baseUrl = "http://192.168.10.43:3000/api";

export const postRequest = async (url, body) => {
  const token = await AsyncStorage.getItem('token');
  const response = await fetch(url, {
    
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization':token
    },
    body,
  });

  const data = await response.json();

  if (!response.ok) {
    let message;

    if (data?.message) {
      message = data.message;
    } else {
      message = data;
    }

    return { error: true, status: response.status, message };
  }

  return data;
};

export const getRequest = async (url) => {
  

  const response = await fetch(url);

  const data = await response.json();

  if (!response.ok) {
    let message = "An error occured...";

    if (data?.message) {
      message = data.message;
    }

    return { error: true, status: response.status, message };
  }

  return data;
};