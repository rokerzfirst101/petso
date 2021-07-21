import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerContent from "../components/molecules/CustomDrawerContent";
import { SafeAreaView } from "react-native";
import { useTheme } from "react-native-paper";
import { PreferencesContext } from "../constants/PreferenceContext";
import { AntDesign, Feather, FontAwesome5 } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import BookmarkScreen from "../screens/BookmarkScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

const Tab = createMaterialBottomTabNavigator();

const MainDrawer = () => {
  const { colors } = useTheme();
  const preference = React.useContext(PreferencesContext);

  const returnIconColor = (focused) => {
    if (!preference.isThemeDark && focused) return "white";
    if (focused) return colors.accent;
    else return colors.dark100;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator>
        <Tab.Screen
          options={{
            drawerIcon: ({ focused }) => (
              <AntDesign
                name="home"
                size={20}
                color={returnIconColor(focused)}
              />
            ),
          }}
          name="Home"
          component={HomeScreen}
        />
        <Tab.Screen
          options={{
            drawerIcon: ({ focused }) => (
              <FontAwesome5
                name="store"
                size={18}
                color={returnIconColor(focused)}
              />
            ),
          }}
          name="Bookmarked"
          component={BookmarkScreen}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default MainDrawer;
