import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Subheading, Title, useTheme } from "react-native-paper";
import {
  Feather,
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import MenuSVG from "../MenuSVG";

const HomeHeader = (props) => {
  const { colors } = useTheme();
  const { search, setSearch } = useState();
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
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 8,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
            <MenuSVG color={colors.light300} height={20} width={20} />
          </TouchableOpacity>
          <Title style={{ marginStart: 16, color: "white" }}>
            {props.title}
          </Title>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Feather name="bell" size={20} color={colors.light300} />
          <MaterialIcons
            style={{ marginStart: 15 }}
            name="history"
            size={22}
            color={colors.light300}
          />
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
          value={search}
          onChange={setSearch}
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
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialCommunityIcons
            name="lightbulb-on-outline"
            size={22}
            color={colors.light100}
          />
          <Subheading style={{ marginStart: 10, color: "white" }}>
            Trending
          </Subheading>
        </View>
        <View
          style={{
            height: 25,
            borderWidth: 0.5,
            borderColor: colors.light300,
            marginHorizontal: 30,
          }}
        />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Entypo name="line-graph" size={20} color={colors.light100} />
          <Subheading style={{ marginStart: 10, color: "white" }}>
            Latest
          </Subheading>
        </View>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({});
