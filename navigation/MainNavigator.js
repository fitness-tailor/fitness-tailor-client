// import { createBottomTabNavigator } from "react-navigation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import NutritionScreen from "../screens/NutritionScreen";
import RecipeListScreen from "../screens/RecipeListScreen";
import ReduxPlayground from "../screens/ReduxPlayground";

const Tab = createBottomTabNavigator();

function MainNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Nutrition" component={NutritionScreen} />
      <Tab.Screen name="Recipe List" component={RecipeListScreen} />
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
