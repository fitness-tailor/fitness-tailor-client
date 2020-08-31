import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AuthNavigator from './navigation/AuthNavigator';
import HomeScreen from './screens/HomeScreen.js';
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqW-IHyiK__ePv6T9JJDky6D1Vgj42iTM",
  authDomain: "fitness-tailor.firebaseapp.com",
  databaseURL: "https://fitness-tailor.firebaseio.com",
  projectId: "fitness-tailor",
  storageBucket: "fitness-tailor.appspot.com",
  messagingSenderId: "822343603827",
  appId: "1:822343603827:web:76a6256a0fa23496913c06",
  measurementId: "G-48BDZ94KZ2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default createAppContainer(
  createSwitchNavigator(
    {
      App: HomeScreen,
      Auth: AuthNavigator,
    },
    {
      initialRouteName: 'Auth',
    }
  )
);