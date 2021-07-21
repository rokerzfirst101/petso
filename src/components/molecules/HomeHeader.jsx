import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image
} from "react-native";
import { Subheading, Title, useTheme } from "react-native-paper";
import {
  Feather,
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeHeader = (props) => {
  const { colors } = useTheme();
  const logout = () => {
    AsyncStorage.clear();
  }

  return (
    <View
      style={{
        elevation: 5,
        backgroundColor: "#1F456E",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 4,
      }}
    >
      <View
        style={{
          marginTop: StatusBar.currentHeight,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: 8,
          marginHorizontal: 16
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Title
            style={{
              color: "white",
              fontFamily: "Staatliches_400Regular",
              letterSpacing: 1.5,
            }}
          >
            PETSO
          </Title>
        </View>
        <View style={{ flexDirection: "row", alignItems: 'center' }}>
          <Feather name="bell" size={20} color={colors.light300} />
          <TouchableOpacity onPress={() => props.navigation.navigate("ProfileScreen")}>
            <Image style={{height: 30, width: 30, marginStart: 20, borderRadius: 15}} source={{uri: "https://api.time.com/wp-content/uploads/2021/02/Demon-Slayer.jpg"}} />
          </TouchableOpacity>
          <Feather name="bell" size={20} color={colors.light300} onPress={logout} />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderColor: colors.light300,
          padding: 10,
          paddingHorizontal: 20,
          justifyContent: "space-between",
          borderRadius: 30,
          marginHorizontal: 25,
          marginVertical: 12,
        }}
      >
        <TextInput
          style={{ fontSize: 15, color: "white" }}
          placeholderTextColor={colors.light100}
          onChangeText={(text) => props.search(text)}
          placeholder="What are you looking for?"
        />
        <AntDesign name="search1" size={20} color={colors.light300} />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 10,
          marginBottom: 10,
        }}
      >
        <TouchableOpacity
          style={
            props.tab === "trending"
              ? [styles.tabStyle, styles.activeTabStyle]
              : styles.tabStyle
          }
          onPress={() => props.setTab("trending")}
        >
          <MaterialCommunityIcons
            name="lightbulb-on-outline"
            size={22}
            color={props.tab === "trending" ? colors.accent : colors.light100}
          />
          <Subheading
            style={
              props.tab === "trending"
                ? [styles.tabTextStyle, { color: colors.accent }]
                : styles.tabTextStyle
            }
          >
            Trending
          </Subheading>
        </TouchableOpacity>
        <View
          style={{
            height: 25,
            borderWidth: 0.5,
            borderColor: colors.light300,
            marginHorizontal: 30,
          }}
        />
        <TouchableOpacity
          style={
            props.tab === "latest"
              ? [styles.tabStyle, styles.activeTabStyle]
              : styles.tabStyle
          }
          onPress={() => props.setTab("latest")}
        >
          <Entypo
            name="line-graph"
            size={20}
            color={props.tab === "latest" ? colors.accent : colors.light100}
          />
          <Subheading
            style={
              props.tab === "latest"
                ? [styles.tabTextStyle, { color: colors.accent }]
                : styles.tabTextStyle
            }
          >
            Latest
          </Subheading>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  tabStyle: {
    padding: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  activeTabStyle: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 15,
  },
  tabTextStyle: {
    marginStart: 10,
    color: "white",
    fontFamily: "Staatliches_400Regular",
    letterSpacing: 1.5,
  },
});
