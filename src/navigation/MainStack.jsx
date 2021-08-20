import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import merge from "deepmerge";
import { PreferencesContext } from "../constants/PreferenceContext";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { SafeAreaView } from "react-native";
import AppHeader from "../components/molecules/AppHeader";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import MainBottomTab from "./MainBottomTab";
import ListingDetailScreen from "../screens/ListingDetailScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ChatScreen from "../screens/ChatScreen";
import { darkTheme, defaultTheme } from "../constants/Themes";
import NewListingScreen from "../screens/NewListingScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { connect } from "react-redux";
import { signIn } from "../redux/actions/user";
import NewExpertScreen from "../screens/NewExpertScreen";
import NewQuestionAnswerScreen from "../screens/NewQuestionAnswerScreen";
import ProfileEditScreen from "../screens/ProfileEditScreen";
import NewConsultScreen from "../screens/NewConsultScreen";
import ConsultDetailScreen from "../screens/ConsultDetailScreen";
import AdminScreen from "../screens/AdminScreen";

const combinedDefaultTheme = merge(NavigationDefaultTheme, defaultTheme);
const combinedDarkTheme = merge(NavigationDarkTheme, darkTheme);
const Stack = createStackNavigator();

const MainStack = ({ user, token, signInUser }) => {
  React.useEffect(() => {
    signInUser(user, token);
  }, [user, token]);

  const [isThemeDark, setIsThemeDark] = React.useState(true);
  let theme = isThemeDark ? combinedDarkTheme : combinedDefaultTheme;

  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark]
  );

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: isThemeDark ? "#121212" : "#FFF" }}
    >
      <PreferencesContext.Provider value={preferences}>
        <PaperProvider theme={theme}>
          <NavigationContainer theme={theme}>
            <Stack.Navigator
              initialRouteName={user ? "Dashboard" : "Welcome"}
              screenOptions={{
                header: (props) => <AppHeader {...props} />,
              }}
            >
              <Stack.Screen
                options={{ header: () => null }}
                name="Welcome"
                component={WelcomeScreen}
              />
              <Stack.Screen
                options={{ header: () => null }}
                name="Login"
                component={LoginScreen}
              />
              <Stack.Screen
                options={{ headerTitle: " " }}
                name="Register"
                component={RegisterScreen}
              />
              <Stack.Screen
                options={{ header: () => null }}
                name="Dashboard"
                component={MainBottomTab}
              />
              <Stack.Screen
                options={{ headerTitle: " " }}
                name="ListingDetailScreen"
                component={ListingDetailScreen}
              />
              <Stack.Screen options={{ header: () => null }} name="ProfileScreen" component={ProfileScreen} />
              <Stack.Screen name="ChatScreen" component={ChatScreen} />
              <Stack.Screen
                options={{ headerTitle: "Create Listing" }}
                name="NewListingScreen"
                component={NewListingScreen}
              />
              <Stack.Screen
                options={{ headerTitle: "Create Expert Post" }}
                name="NewExpertScreen"
                component={NewExpertScreen}
              />
              <Stack.Screen
                options={{ headerTitle: "Create Q&A Post" }}
                name="NewQuestionAnswerScreen"
                component={NewQuestionAnswerScreen}
              />
              <Stack.Screen
                options={{ headerTitle: "Settings" }}
                name="SettingsScreen"
                component={SettingsScreen}
              />
              <Stack.Screen
                options={{ header: () => null }}
                name="ProfileEditScreen"
                component={ProfileEditScreen}
              />
              <Stack.Screen
                options={{ headerTitle: " " }}
                name="NewConsultScreen"
                component={NewConsultScreen}
              />
              <Stack.Screen
                options={{ headerTitle: " " }}
                name="ConsultDetailScreen"
                component={ConsultDetailScreen}
              />
              <Stack.Screen
                options={{ headerTitle: "Admin Panel" }}
                name="AdminScreen"
                component={AdminScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
          <ExpoStatusBar style={isThemeDark ? "light" : "dark"} />
        </PaperProvider>
      </PreferencesContext.Provider>
    </SafeAreaView>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    signInUser: (user, token) => dispatch(signIn(user, token)),
  };
};

export default connect(null, mapDispatchToProps)(MainStack);