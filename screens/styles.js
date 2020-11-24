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
    textAlign: "center",
    marginBottom: "4%",
    fontFamily: "Montserrat_600SemiBold",
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
    width: "88%",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#0c3045",
    fontFamily: "OpenSans_400Regular",
  },
  signInButton: {
    alignItems: "center",
    backgroundColor: "rgb(37, 93, 120)",
    padding: 25,
    borderRadius: 100,
    marginTop: 10,
  },
  signInButtonText: {
    fontSize: 24,
    color: "white",
    fontFamily: "OpenSans_600SemiBold",
  },
  authOptionsText: {
    fontWeight: "200",
    fontSize: 20,
    textAlign: "center",
    color: "white",
    fontFamily: "Lato_300Light",
  },
  containerLoading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  // ==================================
  // Home Style
  // ==================================
  containerHome: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  userInfoHome: {
    position: "absolute",
    top: "50%",
    alignItems: "center",
    justifyContent: "space-between",
    height: "40%",
    paddingHorizontal: 20,
  },
  calGoals: {
    borderColor: "white",
    borderWidth: 1,
    height: 120,
    maxWidth: "110%",
    paddingHorizontal: 25,
    borderRadius: 20,
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
  },
  // ==================================
  // Nutrition Card Styles
  // ==================================
  containerNutScreen: {
    alignItems: "center",
  },
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
  centeredIndicator: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(22, 66, 92)",
    flex: 1,
  },
  containerProfile: {
    flex: 2,
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
  profileTitle: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
    fontFamily: "OpenSans_400Regular",
  },
  profileUsername: {
    fontSize: 30,
    color: "white",
    fontFamily: "OpenSans_600SemiBold",
  },
  profileGeneralText: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 20,
    color: "white",
  },
  userInputProfile: {
    flex: 2,
    width: "90%",
    justifyContent: "space-evenly",
  },
  userProfileRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileInputBoxes: {
    fontSize: 20,
    color: "white",
    backgroundColor: "rgb(37, 93, 120)",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
  },
  profileButtonText: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 22,
    color: "white",
  },
  profileButton: {
    alignItems: "center",
    backgroundColor: "rgb(37, 93, 120)",
    padding: 20,
    borderRadius: 50,
    marginTop: 5,
  },
  // ==================================
  // Recipe List Screen
  // ==================================
  containerRecipeList: {
    width: "100%",
    backgroundColor: "rgb(37, 93, 120)",
  },
  scrollViewRecipeList: {
    paddingHorizontal: "5%",
    padding: 0,
  },
  searchContainerRecipeList: {
    minWidth: "100%",
  },
  cardsContainerRecipeList: {
    marginTop: "5%",
    alignItems: "center",
    // backgroundColor: "black",
  },
  messageContainerRecipeList: {
    backgroundColor: "#cad3d9",
    padding: 10,
    borderRadius: 10,
  },
  errorMessageRecipeList: {
    fontSize: 20,
    textAlign: "center",
    color: "#E00000",
    fontFamily: "OpenSans_700Bold",
  },
  oneCardContainerRecipeList: {
    marginBottom: "5%",
  },
  // ==================================
  // NutritionScreen
  // ==================================
  containerNutScreen: {
    flex: 2,
    flexGrow: 1,
    flexDirection: "column",
    backgroundColor: "#d9d5c7",
  },
  calendar: {
    flex: 1,
  },
  focusedNutScreen: {
    color: "rgb(22, 66, 92)",
  },
  date: {
    fontSize: 20,
    margin: 5,
    fontFamily: "OpenSans_600SemiBold",
  },
  totalCal: {
    fontSize: 18,
    fontFamily: "OpenSans_400Regular",
  },
  journalNut: {
    alignItems: "center",
    minHeight: "100%",
  },
});
