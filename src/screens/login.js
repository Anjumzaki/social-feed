import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import realm, { addUser, getUserById } from '../models/model2';
import { theme } from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createIconSet } from 'react-native-vector-icons';
import { ActivityIndicator } from 'react-native-paper';
const Login = ({ navigation }) => {

  const [username, setUsername] = useState("")
  const [pass, setPass] = useState("")
  const [loading, setLoading] = useState(true)

  const add = async () => {
    let allUsers = realm.objects('User')
    let userFound = false
    let index = 0
    console.log(allUsers)
    for (let i = 0; i < allUsers.length; i++) {
      if (allUsers[i].username == username) {
        userFound = true
        index = i
      }
    }
    if (userFound) {
      if (pass == allUsers[index].pass) {
        setPass('');
        setUsername('')
        navigation.navigate('home', {
          screen: 'Home',
          params: { user: allUsers[index] },

        });
        await AsyncStorage.setItem('user', JSON.stringify(allUsers[index]))
      }
      else {
        alert("pass is not correct")
      }
    }
    else {
      alert("user name does not exist")
    }
  };
  const getItem = async () => {
    const user = await AsyncStorage.getItem('user')
    if (user) {
      setLoading(false)
      setPass('');
      setUsername('')
      navigation.navigate('home', {
        screen: 'Home',
        params: { user: JSON.parse(user) },
      });
    }
    else {
      setLoading(false)
    }
  }
  useEffect(() => {
    setPass('');
    setUsername('')
    getItem()
  }, [navigation]);
  return (
    <>
      {loading ? <View
        style={{
          backgroundColor: '#FFF',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20
        }}><ActivityIndicator />
      </View> :
        <View
          style={{
            backgroundColor: '#FFF',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20
          }}>

          <TextInput onChangeText={(text) => setUsername(text)} value={username} placeholder='Username or Email' style={theme.textInput} />
          <TextInput onChangeText={(text) => setPass(text)} value={pass} placeholder='Password' secureTextEntry={true} style={theme.textInput} />

          <TouchableOpacity
            style={{
              backgroundColor: '#ADD5E6',
              marginTop: 20,
              width: 200,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 50,
            }}
            onPress={() => add()}>
            <Text
              style={{
                color: '#FFF',
              }}>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text
              style={{
                marginTop: 10,
                color: 'blue',
                padding: 10
              }}>
              Don't have an account? Sign up here!
            </Text>
          </TouchableOpacity>
        </View>
      }
    </>
  );
};

export default Login;