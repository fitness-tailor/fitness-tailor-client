import { StyleSheet } from "react-native";

module.exports = StyleSheet.create({
  containerHome: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
    color: "white",
    top: "16%",
    fontFamily: "Inter_400Regular",
    position: "absolute",
  },
  containerSignIn: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "rgb(22, 66, 92)",
  },
  SignIn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  formSignIn: {
    top: "10%",
    width: "80%",
  },
  inputSignInContainer: {
    flexDirection: "row",
    backgroundColor: "#0c3045",
    marginBottom: 5,
    alignItems: "center",
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
  },
  inputSignIn: {
    fontSize: 22,
    borderColor: "white",
    marginHorizontal: "4%",
    borderLeftWidth: 1,
    width: "auto",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#0c3045",
    fontFamily: "Inter_400Regular",
  },
  signInButton: {
    alignItems: "center",
    backgroundColor: "rgb(37, 93, 120)",
    padding: 25,
    borderRadius: 100,
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
    flex: 2,
    // justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "rgb(22, 66, 92)",
  },
  userSumsProfile: {
    backgroundColor: "rgb(37, 93, 120)",
    flex: 1,
    alignItems: "center",
    width: "100%",
    justifyContent: "space-evenly",
  },
  userInputProfile: {
    // backgroundColor: 'blue',
    flex: 2,
    width: "90%",
    justifyContent: "space-evenly",
    // flexDirection: 'row'
  },
  userGenderProfile: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userActivityLevelProfile: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userHeightProfile: {
    // backgroundColor: 'purple',
    // height: "30%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userHeightNumbersProfile: {
    flexDirection: "row",
  },
  userWeightProfile: {
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: 'grey',
    // height: "20%",
  },
  userWeightNumbersProfile: {
    flexDirection: "row",
  },
  userAgeProfile: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userAgeNumbersProfile: {
    flexDirection: "row",
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
    marginTop: 20,
  },
  dateNutScreen: {
    marginTop: 50,
  },
  focusedNutScreen: {
    color: "grey",
  },
});
