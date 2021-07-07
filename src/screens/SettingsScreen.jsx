import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "react-native-paper";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Subheading, Switch } from "react-native-paper";
import { PreferencesContext } from "../constants/PreferenceContext";
import { MaterialIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
const SettingsScreen = ({ navigation }) => {
  const preference = React.useContext(PreferencesContext);
  const { colors } = useTheme();
  const handleLogout = () => {
    AsyncStorage.clear();
    navigation.navigate("Welcome");
  };
  return (
    <View
      style={{
        flex: 1,
        padding: 8,
        justifyContent: "space-between",
        paddingBottom: 0,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Subheading>Dark Mode</Subheading>
        <Switch
          style={{ marginStart: 10 }}
          value={preference.isThemeDark}
          onValueChange={() => {
            preference.toggleTheme();
            navigation.pop();
          }}
        />
      </View>
      <TouchableOpacity
        style={{
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
          padding: 8,
          backgroundColor: colors.accent,
          width,
          flexDirection: "row",
        }}
        onPress={handleLogout}
      >
        <MaterialIcons name="logout" size={24} color="white" />
        <Subheading
          style={{ marginStart: 10, color: "white", fontWeight: "bold" }}
        >
          Logout
        </Subheading>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;
