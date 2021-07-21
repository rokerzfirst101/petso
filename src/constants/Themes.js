import {
  configureFonts,
  DarkTheme,
  DarkTheme as PaperDarkTheme,
  DefaultTheme,
  DefaultTheme as PaperDefaultTheme,
} from "react-native-paper";

// OpenSans_300Light,
// OpenSans_400Regular,
// OpenSans_700Bold,
// OpenSans_400Regular_Italic,

const fontConfig = {
  web: {
    regular: {
      fontFamily: "OpenSans_400Regular",
      fontWeight: "normal",
    },
    medium: {
      fontFamily: "OpenSans_700Bold",
      fontWeight: "normal",
    },
    light: {
      fontFamily: "OpenSans_300Light",
      fontWeight: "normal",
    },
    thin: {
      fontFamily: "OpenSans_400Regular_Italic",
      fontWeight: "normal",
    },
  },
  ios: {
    regular: {
      fontFamily: "OpenSans_400Regular",
      fontWeight: "normal",
    },
    medium: {
      fontFamily: "OpenSans_700Bold",
      fontWeight: "normal",
    },
    light: {
      fontFamily: "OpenSans_300Light",
      fontWeight: "normal",
    },
    thin: {
      fontFamily: "OpenSans_400Regular_Italic",
      fontWeight: "normal",
    },
  },
  android: {
    regular: {
      fontFamily: "OpenSans_400Regular",
      fontWeight: "normal",
    },
    medium: {
      fontFamily: "OpenSans_700Bold",
      fontWeight: "normal",
    },
    light: {
      fontFamily: "OpenSans_300Light",
      fontWeight: "normal",
    },
    thin: {
      fontFamily: "OpenSans_400Regular_Italic",
      fontWeight: "normal",
    },
  },
};

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#3676BE",
    accent: "#3676BE",
    onSurface: "#3676BE",
    background: "#121212",
    surface: "#2c2c2c",
    dark300: "#1F1F1F",
    dark200: "#121212",
    dark100: "#2c2c2c",
    light300: "rgba(255, 255, 255, 0.8)",
    light100: "rgba(255, 255, 255, 0.6)",
  },
  fonts: configureFonts(fontConfig),
};

export const defaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    accent: "#1F456E",
    primary: "#1F456E",
    onSurface: "white",
    background: "rgba(31,69,100, 0.07)",
    surface: "#f2f2f2",
    dark300: "#1F1F1F",
    dark200: "#121212",
    dark100: "#2c2c2c",
    light300: "rgba(255, 255, 255, 0.8)",
    light100: "rgba(255, 255, 255, 0.6)",
  },
  fonts: configureFonts(fontConfig),
};
