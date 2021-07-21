import React, { useContext, useMemo } from "react";
import { BottomSheetBackgroundProps } from "@gorhom/bottom-sheet";
import Animated, {
  useAnimatedStyle,
  interpolateColor,
} from "react-native-reanimated";
import { useTheme } from "react-native-paper";
import { PreferencesContext } from "../../constants/PreferenceContext";
const CustomBottomSheetBackground = ({ style, animatedIndex }) => {
  const { colors } = useTheme();
  const preference = useContext(PreferencesContext);
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: preference.isThemeDark ? colors.background : "white",
    borderRadius: 20,
  }));
  const containerStyle = useMemo(
    () => [style, containerAnimatedStyle],
    [style, containerAnimatedStyle]
  );

  return <Animated.View pointerEvents="none" style={containerStyle} />;
};

export default CustomBottomSheetBackground;
