// import { createBottomTabNavigator } from "react-navigation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import NutritionScreen from "../screens/NutritionScreen";
import RecipeListScreen from "../screens/RecipeListScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ReduxPlayground from "../screens/ReduxPlayground";

const Tab = createBottomTabNavigator();

function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case "Home":
              iconName = "md-home";
              break;
            case "Nutrition":
              iconName = "md-journal";
              break;
            case "Recipe List":
              iconName = "md-search";
              break;
            case "Profile":
              iconName = "md-search";
              break;
            case "Playground":
              iconName = "md-happy";
              break;
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "dodgerblue",
        inactiveTintColor: "gray",
        labelStyle: {
          fontSize: 13,
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Nutrition" component={NutritionScreen} />
      <Tab.Screen name="Recipe List" component={RecipeListScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Playground" component={ReduxPlayground} />
    </Tab.Navigator>
  );
}

// const MainNavigator = createBottomTabNavigator(
//   {
//     Home: { screen: HomeScreen },
//     Nutrition: { screen: NutritionScreen },
//     RecipeList: { screen: RecipeListScreen },
//     Playground: { screen: ReduxPlayground },
//   },
//   { initialRouteName: "Home" }
// );

export default MainNavigator;
