import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";
import { Feather } from "@expo/vector-icons";

const NewListingFAB = ({ onPress }) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={{
        backgroundColor: colors.accent,
        height: 50,
        width: 50,
        borderRadius: 25,
        position: "absolute",
        bottom: 0,
        right: 0,
        margin: 16,
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={onPress}
    >
      <Feather name="plus" size={30} color="rgba(255,255,255,0.6)" />
    </TouchableOpacity>
  );
};

export default NewListingFAB;
