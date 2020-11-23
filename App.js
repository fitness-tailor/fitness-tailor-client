import React from "react";

import { RECIPE_API_KEYS } from "./assets/API_KEYS.json";
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
import {
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
} from "@expo-google-fonts/open-sans";
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";
import { Lato_300Light } from "@expo-google-fonts/lato";

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(RECIPE_API_KEYS.FIREBASE_CONFIG);
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
    Inter_400Regular,
    Inter_600SemiBold,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Lato_300Light,
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
