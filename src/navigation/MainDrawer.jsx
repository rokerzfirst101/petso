import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainTab from "./MainTab";
import CustomDrawerContent from "../components/molecules/CustomDrawerContent";
import { SafeAreaView } from "react-native";
import { useTheme } from "react-native-paper";
import { PreferencesContext } from "../constants/PreferenceContext";
import { AntDesign, Feather, FontAwesome5 } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Drawer = createDrawerNavigator();

const MainDrawer = () => {
  const { colors } = useTheme();
  const preference = React.useContext(PreferencesContext);

  const returnIconColor = (focused) => {
    if (focused) return colors.accent;
    else return colors.dark100;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Drawer.Navigator
        drawerType="front"
        drawerContentOptions={{
          labelStyle: {
            marginStart: -10,
          },
          itemStyle: {
            marginVertical: 5,
            borderRadius: 20,
            paddingHorizontal: 5,
          },
          inactiveTintColor: preference.isThemeDark
            ? colors.light100
            : colors.dark100,
          activeTintColor: colors.accent,
          activeBackgroundColor: preference.isThemeDark
            ? colors.dark100
            : "white",
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
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
        <Drawer.Screen
          options={{
            drawerIcon: ({ focused }) => (
              <FontAwesome5
                name="store"
                size={18}
                color={returnIconColor(focused)}
              />
            ),
          }}
          name="Listings"
          component={MainTab}
        />
        <Drawer.Screen
          options={{
            drawerIcon: ({ focused }) => (
              <Feather
                name="settings"
                size={20}
                color={returnIconColor(focused)}
              />
            ),
          }}
          name="Settings"
          component={SettingsScreen}
        />
        <Drawer.Screen
          options={{
            drawerIcon: ({ focused }) => (
              <Feather
                name="trending-up"
                size={20}
                color={returnIconColor(focused)}
              />
            ),
          }}
          name="Trending"
          component={MainTab}
        />
      </Drawer.Navigator>
    </SafeAreaView>
  );
};

export default MainDrawer;
