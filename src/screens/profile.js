import React, { useState } from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ navigation, route }) => {
  return (
    <View style={{ backgroundColor: "#FFF", flex: 1, justifyContent: "center", alignItems: 'center' }}   >
      <Text>Profile</Text>
      <TouchableOpacity style={{
        backgroundColor: '#ADD5E6',
        marginTop: 20,
        width: 200,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50
      }} onPress={() => navigation.navigate("Account")}  >
        <Text style={{
          color: "#FFF"
        }} >Go To Account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{
        backgroundColor: '#ADD5E6',
        marginTop: 20,
        width: 200,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50
      }} onPress={async () => {
        await AsyncStorage.removeItem("user")
        navigation.navigate("Login")
      }} >
        <Text style={{
          color: "#FFF"
        }} >Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;