import { StyleSheet } from "react-native";

module.exports = StyleSheet.create({
  containerHome: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containerSignIn: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  formSignIn: {
    width: "85%",
    marginTop: 15,
  },
  inputSignIn: {
    fontSize: 15,
    borderColor: "black",
    borderBottomWidth: 1,
    paddingBottom: 1.5,
    marginTop: 25,
  },
  containerSignUp: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  formSignUp: {
    width: "85%",
    marginTop: 15,
  },
  inputSignUp: {
    fontSize: 15,
    borderColor: "black",
    borderBottomWidth: 1,
    paddingBottom: 1.5,
    marginTop: 25,
  },
  containerLoading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containerNutScreen: {
    alignItems: "center",
  },
  // ==================================
  // Nutrition Card Styles
  // ==================================
  percentageContainerNutScreen: {
    marginTop: "4%",
    width: "90%",
    justifyContent: "center",
  },
  cardsContainerNutScreen: {
    marginTop: "5%",
    alignItems: "center",
    width: "90%",
  },
  oneCardContainerNutScreen: {
    borderWidth: 1,
    marginBottom: "4%",
    width: "100%",
    borderRadius: 10,
  },
  // ==================================
  // Profile Screen
  // ==================================
  containerProfile: {
    flex: 1,
    // flexDirection: 'column',
    marginTop: "20%",
    // backgroundColor: 'red',
    // alignItems: 'center',
    marginLeft: "20%",
    justifyContent: "space-evenly",
  },
  userInputProfile: {
    // backgroundColor: 'blue',
    width: "70%",
  },
  userGenderProfile: {
    // backgroundColor: 'green',
    height: "20%",
  },
  userHeightProfile: {
    // backgroundColor: 'purple',
    height: "30%",
  },
  userWeightProfile: {
    // backgroundColor: 'grey',
    height: "20%",
  },
  // ==================================
  // Recipe List Screen
  // ==================================
  containerRecipeList: {
    alignItems: "center",
    width: "100%",
  },
  scrollViewRecipeList: {
    paddingHorizontal: "4%",
    padding: 0,
  },
  searchContainerRecipeList: {
    minWidth: "100%",
  },
  cardsContainerRecipeList: {
    marginTop: "6%",
    alignItems: "center",
  },
  messageContainerRecipeList: {
    padding: 5,
    margin: 5,
  },
  errorMessageRecipeList: {
    fontSize: 20,
    paddingHorizontal: 20,
    textAlign: "center",
    color: "red",
  },
  oneCardContainerRecipeList: {
    borderWidth: 1,
    marginBottom: "5%",
    width: "100%",
    borderRadius: 10,
  },
});
