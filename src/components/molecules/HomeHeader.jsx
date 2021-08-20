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
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";
import { baseUrl } from "../../requests";
import { color } from "react-native-reanimated";

const HomeHeader = (props) => {
  const { colors } = useTheme();
  
  return (
    <View
      style={{
        elevation: 5,
        // backgroundColor: "#1F456E",
        backgroundColor: colors.accent,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 0,
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
            {props.title}
          </Title>
        </View>
        <View style={{ flexDirection: "row", alignItems: 'center' }}>
          {/* <Feather name="bell" size={20} color={colors.light300} /> */}
          {
            props.doctor && !props.user.access.doctor ? (
              <MaterialCommunityIcons name="account-plus-outline" size={24} color={colors.light300} onPress={props.onPress} />
            ) : null
          }
          <TouchableOpacity onPress={() => props.navigation.navigate("ProfileScreen")}>
            <Image source={{uri: props.user && props.user.avatar && props.user.avatar != "" ? `${baseUrl}${props.user.avatar}` : `https://hips.hearstapps.com/digitalspyuk.cdnds.net/17/13/1490989105-twitter1.jpg?resize=480:*`}} style={{height: 30, width: 30, borderRadius: 15, marginStart: 20}} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user
  }
}

export default connect(mapStateToProps)(HomeHeader);

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
