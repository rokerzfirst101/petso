import React, { useMemo } from "react";
import { Image, StatusBar } from "react-native";
import { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useTheme } from "react-native-paper";

const CustomBottomSheetBackdrop = ({ animatedIndex, style }) => {
  const { colors } = useTheme();
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [0, 1],
      [0, 1],
      Extrapolate.CLAMP
    ),
  }));

  // styles
  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: colors.accent,
        alignItems: "center",
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle]
  );
  return (
    <Animated.View style={containerStyle}>
      <Image
        resizeMode="contain"
        style={{
          height: "10%",
          width: "80%",
          marginTop: StatusBar.currentHeight + 20,
        }}
        source={require("../../../assets/logo.png")}
      />
    </Animated.View>
  );
};

export default CustomBottomSheetBackdrop;
