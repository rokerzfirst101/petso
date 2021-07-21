import React from "react";
import { StatusBar, View } from "react-native";
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
import CategoryScreen from "../screens/CategoryScreen";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import MainDrawer from "./MainDrawer";
import ListingDetailScreen from "../screens/ListingDetailScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ChatScreen from "../screens/ChatScreen";
import { darkTheme, defaultTheme } from "../constants/Themes";
import NewListingScreen from "../screens/NewListingScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { connect } from "react-redux";
import { signIn } from "../redux/actions/user";
import BookmarkScreen from "../screens/BookmarkScreen";

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
              initialRouteName={user ? "CategoryScreen" : "Welcome"}
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
                component={MainDrawer}
              />
              <Stack.Screen
                options={{ header: () => null }}
                name="CategoryScreen"
                component={CategoryScreen}
              />
              <Stack.Screen
                options={{ headerTitle: " " }}
                name="ListingDetailScreen"
                component={ListingDetailScreen}
              />
              <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
              <Stack.Screen name="ChatScreen" component={ChatScreen} />
              <Stack.Screen
                options={{ headerTitle: "Create Listing" }}
                name="NewListingScreen"
                component={NewListingScreen}
              />
              <Stack.Screen
                options={{ headerTitle: "Settings" }}
                name="SettingsScreen"
                component={SettingsScreen}
              />
              <Stack.Screen
                options={{ headerTitle: "Bookmarked Listings" }}
                name="BookmarkScreen"
                component={BookmarkScreen}
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
