import React from 'react';
import { StatusBar, View } from 'react-native'
import { 
  Provider as PaperProvider, 
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme 
} from 'react-native-paper'
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import merge from 'deepmerge'
import { PreferencesContext } from '../constants/PreferenceContext';
import WelcomeScreen from '../screens/WelcomeScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import { SafeAreaView } from 'react-native';
import AppHeader from '../components/molecules/AppHeader';
import MainTab from './MainTab';
import CategoryScreen from '../screens/CategoryScreen';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import MainDrawer from './MainDrawer';
import ListingDetailScreen from '../screens/ListingDetailScreen';
import ProfileScreen from '../screens/ProfileScreen';

const combinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const combinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);
const Stack = createStackNavigator();

export default function MainStack() {

  const [isThemeDark, setIsThemeDark] = React.useState(true)
  let theme = isThemeDark ? combinedDarkTheme : combinedDefaultTheme

  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark])

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark
    }),
    [toggleTheme, isThemeDark]
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: isThemeDark ? "#121212" : "#FFF"}}>
      <PreferencesContext.Provider value={preferences}>
        <PaperProvider theme={theme}>
          <NavigationContainer theme={theme}>
            <Stack.Navigator
              initialRouteName="Welcome"
              screenOptions={{
                header: (props) => <AppHeader {...props} />
              }}
            >
                <Stack.Screen options={{header: () => null}} name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen options={{header: () => null}} name="Dashboard" component={MainDrawer} />
                <Stack.Screen options={{header: () => null}} name="CategoryScreen" component={CategoryScreen} />
                <Stack.Screen name="ListingDetailScreen" component={ListingDetailScreen} />
                <Stack.Screen name="ProfileScreen" component={ProfileScreen} /> 
            </Stack.Navigator>
          </NavigationContainer>
          <ExpoStatusBar style={isThemeDark ? "light" : "dark"} />
        </PaperProvider>
      </PreferencesContext.Provider>
    </SafeAreaView>
  );
}