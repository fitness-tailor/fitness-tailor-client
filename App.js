import React from "react";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { NavigationContainer } from "@react-navigation/native";

import AuthNavigator from "./navigation/AuthNavigator";
import MainNavigator from "./navigation/MainNavigator";
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

// Imports necessary for redux
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { AppLoading } from "expo";
import {
  useFonts,
  Inter_600SemiBold,
  Inter_400Regular,
} from "@expo-google-fonts/inter";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqW-IHyiK__ePv6T9JJDky6D1Vgj42iTM",
  authDomain: "fitness-tailor.firebaseapp.com",
  databaseURL: "https://fitness-tailor.firebaseio.com",
  projectId: "fitness-tailor",
  storageBucket: "gs://fitness-tailor.appspot.com/",
  messagingSenderId: "822343603827",
  appId: "1:822343603827:web:76a6256a0fa23496913c06",
  measurementId: "G-48BDZ94KZ2",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      App: MainNavigator,
      Auth: AuthNavigator,
    },
    {
      initialRouteName: "Auth",
    }
  )
);

const App = () => {
  let [fontsLoaded] = useFonts({
    Inter_600SemiBold,
    Inter_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <AppContainer />
        </NavigationContainer>
      </Provider>
    );
  }
};

export default App;
