import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Subheading, Switch } from "react-native-paper";
import { PreferencesContext } from "../constants/PreferenceContext";

const SettingsScreen = () => {
  const preference = React.useContext(PreferencesContext);
  return (
    <View style={{ flex: 1, padding: 8 }}>
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
          }}
        />
      </View>
    </View>
  );
};

export default SettingsScreen;
