import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import realm, { addUser, getUserById } from '../models/model2';
import { theme } from '../utils';
const SignUp = ({ navigation }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("")
    const [aboutMe, setAboutMe] = useState("")
    const [username, setUsername] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [pass, setPass] = useState("")



    const user = getUserById(1)[0];

    const add = async () => {
        if (firstName && lastName && aboutMe && username && confirmPass && pass) {
            if (pass == confirmPass) {
                // realm.delete('User')
                let allUsers = realm.objects('User')
                console.log(allUsers)
                let userFound = false
                for (let i = 0; i < allUsers.length; i++) {
                    if (allUsers[i].username == username) {
                        userFound = true
                    }
                }
                if (userFound) {
                    alert("username already exist!")
                }
                else {
                    alert(pass)
                    addUser(
                        new Date().getTime() + Math.random(),
                        firstName,
                        lastName,
                        username,
                        'https://api.irevu.org/public/images/1629374652.Hacker.jpg',
                        aboutMe,
                        pass,
                    );
                    alert("User created! Please login to continue")
                    navigation.navigate("Login")
                }

            }
            else {
                alert("Confirm pass is not matching ")
            }
        }
        else {
            alert("Please enter all values")
        }
        // const userData = {
        //   aboutMe: 'Dev',
        //   firstName: 'Saif',
        //   id: 1,
        //   lastName: 'Ali',
        //   profilePicture:
        //     'https://api.irevu.org/public/images/1629374652.Hacker.jpg',
        //   username: 'saif9',
        // };

        // user.id === userData.id
        //   ? navigation.navigate('home')
        //   :
        // await addUser(
        //   1111,
        //   'Saif',
        //   'Ali',
        //   'saif9',
        //   'https://api.irevu.org/public/images/1629374652.Hacker.jpg',
        //   'Dev',
        // );
        // navigation.navigate('home');
    };
    return (
        <View
            style={{
                backgroundColor: '#FFF',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 20
            }}>
            <TextInput onChangeText={(text) => setFirstName(text)} value={firstName} placeholder='First Name' style={theme.textInput} />
            <TextInput onChangeText={(text) => setLastName(text)} value={lastName} placeholder='Last Name' style={theme.textInput} />
            <TextInput onChangeText={(text) => setAboutMe(text)} value={aboutMe} placeholder='About Me' style={theme.textInput} />
            <TextInput onChangeText={(text) => setUsername(text)} value={username} placeholder='UserName or email' style={theme.textInput} />
            <TextInput onChangeText={(text) => setPass(text)} value={pass} placeholder='Password' secureTextEntry={true} style={theme.textInput} />
            <TextInput onChangeText={(text) => setConfirmPass(text)} value={confirmPass} placeholder='Confirm Password' secureTextEntry={true} style={theme.textInput} />
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
                    SignUp
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default SignUp;