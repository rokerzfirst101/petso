import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Subheading, Title } from "react-native-paper";

const DualButton = () => {
  return (
    <View
      style={{
        marginHorizontal: "25%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          borderBottomColor: "#1F456E",
          borderBottomWidth: 2,
        }}
      >
        <Title style={{ fontSize: 16 }}>Login</Title>
      </View>
      <View
        style={{
          height: 30,
          borderWidth: 0.5,
          borderColor: "white",
          marginHorizontal: 15,
        }}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <Title style={{ fontSize: 16 }}>Register</Title>
      </View>
    </View>
  );
};

export default DualButton;
