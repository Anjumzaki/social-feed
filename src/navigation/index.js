import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Home from '../screens/home';
import Profile from '../screens/profile';
import Login from '../screens/login';
import SignUp from '../screens/signUp';
import Account from '../screens/account';
import Comments from '../screens/comments';
import CreatePost from '../screens/createPost';
import { Icons } from '../components';

const Stack = createStackNavigator();
const Bottom = createBottomTabNavigator()

const screenOptions = {
  headerShown: false,
  gestureEnabled: false,
  cardShadowEnabled: false,
  cardOverlayEnabled: false,
  ...TransitionPresets.SlideFromRightIOS,
  animationEnabled: true,
  gestureEnabled: true,
  headerTitleAlign: 'center',
  headerStyle: {
    elevation: 1,
    shadowOpacity: 1,
    borderBottomWidth: 0.5,
  }
};

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName='Login' screenOptions={screenOptions}>
      <Stack.Screen name="home" component={BottomTabNavigator} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Account" component={Account} options={{ headerShown: true, headerTitle: "Account" }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: true, headerTitle: "Login" }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: true, headerTitle: "SignUp" }} />
      <Stack.Screen name="Comments" component={Comments} options={{ headerShown: true, headerTitle: "Comments" }} />
      <Stack.Screen name="CreatePost" component={CreatePost} options={{ headerShown: true, headerTitle: "Create Post" }} />
    </Stack.Navigator>
  );
}

function BottomTabNavigator() {
  return (
    <Bottom.Navigator
      initialRouteName="Home"
      screenOptions={({ route, focused }) => ({
        tabBarShowLabel: true,
        headerShown: true,
        headerTitleAlign: 'center',
        headerStyle: {
          elevation: 1,
          shadowOpacity: 1,
          borderBottomWidth: 0.5,
        },
        tabBarActiveTintColor: '#333',
        tabBarInactiveTintColor: '#999',
        tabBarIcon: ({ focused }) => {
          let icon;
          if (route.name === 'Home') {
            icon = focused ? "home" : "home";
          } else if (route.name === 'Profile') {
            icon = focused ? "user" : "user";
          }
          return (
            <Icons.AntDesign name={icon} color={focused ? "#333" : "#999"} size={25} />
          );
        }
      })}
    >
      <Bottom.Screen name="Home" component={Home} />
      <Bottom.Screen name="Profile" component={Profile} />
    </Bottom.Navigator>
  )
}

export default AppNavigator;