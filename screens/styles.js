import { StyleSheet } from "react-native";

module.exports = StyleSheet.create({
  containerHome: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "white",
    padding: 25,
  },
  containerSignIn: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: 'rgb(22, 66, 92)',
  },
  SignIn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  formSignIn: {
    width: "70%",
  },
  inputSignIn: {
    fontSize: 15,
    borderColor: "white",
    borderBottomWidth: 1,
    paddingBottom: 1.5,
    marginTop: 25,
  },
  signInButton: {
    alignItems: "center",
    backgroundColor: 'rgb(37, 93, 120)',
    padding: 25,
    borderRadius: 10,
    marginTop: 30,
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
  // ==================================
  // NutritionScreen
  // ==================================
  containerNutScreen: {
    flex: 1,
    flexGrow: 1,
    marginTop: 20
  },
  dateNutScreen: {
    marginTop: 50
  },
  focusedNutScreen: {
    color: 'grey'
  }
  });
