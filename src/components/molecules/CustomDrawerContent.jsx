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
  Surface,
  useTheme,
  Subheading,
} from "react-native-paper";
import { AntDesign, Feather, FontAwesome5 } from "@expo/vector-icons";
import { PreferencesContext } from "../../constants/PreferenceContext";
import { connect } from "react-redux";
import { baseUrl } from "../../requests";

const value = 4;

const CustomDrawerContent = (props) => {
  const { colors } = useTheme();
  const preference = React.useContext(PreferencesContext);
  return (
    <DrawerContentScrollView
      {...props}
      style={{
        backgroundColor: colors.background,
      }}
    >
      <View style={{ flex: 1, padding: 8, paddingHorizontal: 16 }}>
        <Surface
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: preference.isThemeDark
              ? colors.surface
              : colors.accent,
            borderRadius: 25,
            padding: 15,
            paddingTop: 5,
            elevation: 3,
          }}
        >
          <Image
            source={{
              uri: `${baseUrl}${props.user.avatar}`,
            }}
            style={{ height: 60, width: 60, borderRadius: 30, marginTop: 8 }}
          />
          <View style={{ marginStart: 10 }}>
            <Title style={{ fontSize: 18, color: colors.onSurface }}>
              {props.user.name}
            </Title>
            <Caption style={{ color: colors.onSurface, marginTop: -4 }}>
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
                    color={colors.onSurface}
                  />
                );
              })}
            </View>
          </View>
        </Surface>
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
        <View style={{ paddingHorizontal: 5 }}>
          <DrawerItem
            icon={() => (
              <FontAwesome5 name="dog" size={20} color={colors.dark100} />
            )}
            labelStyle={{ marginStart: -12 }}
            label="Change Category"
            onPress={() => props.navigation.navigate("CategoryScreen")}
          />
          <DrawerItem
            icon={() => (
              <FontAwesome5 name="store" size={18} color={colors.dark100} />
            )}
            labelStyle={{ marginStart: -12 }}
            label="Bookmarked"
            onPress={() => props.navigation.navigate("BookmarkScreen")}
          />
          <DrawerItem
            icon={() => (
              <Feather name="settings" size={20} color={colors.dark100} />
            )}
            labelStyle={{ marginStart: -12 }}
            label="Settings"
            onPress={() => props.navigation.navigate("SettingsScreen")}
          />
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
