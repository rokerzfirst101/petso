import React from "react";
import { View, Text, Image } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import {
  Caption,
  Title,
  Switch,
  useTheme,
  Subheading,
} from "react-native-paper";
import { AntDesign, Feather } from "@expo/vector-icons";
import { PreferencesContext } from "../../constants/PreferenceContext";
import { connect } from "react-redux";
import { baseUrl } from "../../requests";

const value = 4;

const CustomDrawerContent = (props) => {
  const { colors } = useTheme();
  const preference = React.useContext(PreferencesContext);
  const [isDark, setIsDark] = React.useState(preference.isThemeDark);
  return (
    <DrawerContentScrollView
      {...props}
      style={{
        backgroundColor: colors.background,
      }}
    >
      <View style={{ flex: 1, padding: 8, paddingHorizontal: 16 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.surface,
            borderRadius: 25,
            padding: 15,
            paddingTop: 5,
          }}
        >
          <Image
            source={{
              uri: `${baseUrl}${props.user.avatar}`,
            }}
            style={{ height: 60, width: 60, borderRadius: 30, marginTop: 8 }}
          />
          <View style={{ marginStart: 10 }}>
            <Title style={{ fontSize: 18, color: colors.accent }}>
              {props.user.name}
            </Title>
            <Caption style={{ color: colors.accent, marginTop: -4 }}>
              {props.user.category}
            </Caption>
            <View style={{ flexDirection: "row" }}>
              {Array.from({ length: value }).map((value, index) => {
                return (
                  <AntDesign
                    key={index.toString()}
                    style={{ marginStart: 1.5 }}
                    name="star"
                    size={14}
                    color={colors.accent}
                  />
                );
              })}
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          borderWidth: 0.5,
          borderColor: colors.accent,
          marginVertical: 10,
          marginHorizontal: 30,
        }}
      />
      <View style={{ paddingHorizontal: 12 }}>
        <DrawerItemList {...props} />
        <DrawerItem
          icon={() => (
            <Feather name="settings" size={20} color={colors.dark100} />
          )}
          label="Settings"
          onPress={() => props.navigation.navigate("SettingsScreen")}
        />
      </View>
      <View
        style={{
          borderWidth: 0.5,
          borderColor: colors.accent,
          marginVertical: 10,
          marginHorizontal: 30,
        }}
      />
      <View
        style={{
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Caption>v 0.0.1</Caption>
      </View>
    </DrawerContentScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};

export default connect(mapStateToProps)(CustomDrawerContent);
