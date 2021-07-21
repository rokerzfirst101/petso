import React, { useState } from "react";
import MainStack from "./src/navigation/MainStack";
import { Asset } from "expo-asset";
import AppLoading from "expo-app-loading";
import * as SplashScreen from "expo-splash-screen";
import Constants from "expo-constants";
import { View, StyleSheet, Animated, SafeAreaView } from "react-native";
import {
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_700Bold,
  OpenSans_400Regular_Italic,
} from "@expo-google-fonts/open-sans";
import { Staatliches_400Regular } from "@expo-google-fonts/staatliches";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";
import { connect, Provider } from "react-redux";
import configureStore from "./src/redux/store";
import { signIn } from "./src/redux/actions/user";

const customFonts = {
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_700Bold,
  OpenSans_400Regular_Italic,
  Staatliches_400Regular,
};

SplashScreen.preventAutoHideAsync().catch(() => {});

const store = configureStore();

export default function App() {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  return (
    <Provider store={store}>
      <AnimatedAppLoader setUser={setUser} setToken={setToken}>
        <MainStack user={user} token={token} />
      </AnimatedAppLoader>
    </Provider>
  );
}

function AnimatedAppLoader({ children, setUser, setToken }) {
  const [isSplashReady, setSplashReady] = React.useState(false);
  const image = require("./assets/logo.png");
  const background = require("./assets/background.jpg");
  const startAsync = React.useMemo(
    () => Asset.loadAsync([image, background]),
    [image]
  );

  const onFinish = React.useMemo(() => setSplashReady(true), []);

  if (!isSplashReady) {
    return (
      <AppLoading
        autoHideSplash={false}
        startAsync={startAsync}
        onError={console.error}
        onFinish={onFinish}
      />
    );
  }

  return (
    <AnimatedSplashScreen setUser={setUser} setToken={setToken} image={image}>
      {children}
    </AnimatedSplashScreen>
  );
}

const AnimatedSplashScreen = ({ children, image, setUser, setToken }) => {
  const animation = React.useMemo(() => new Animated.Value(1), []);
  const [isAppReady, setAppReady] = React.useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] =
    React.useState(false);

  React.useEffect(() => {
    if (isAppReady) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true));
    }
  }, [isAppReady]);

  const loadUserData = () =>
    new Promise((resolve, reject) => {
      AsyncStorage.getItem("@User")
        .then((userString) => {
          AsyncStorage.getItem("@Token").then((token) => {
            setUser(JSON.parse(userString));
            setToken(JSON.parse(token));
            resolve();
          });
        })
        .catch((err) => reject(err));
    });

  const onImageLoaded = React.useMemo(() => async () => {
    try {
      await SplashScreen.hideAsync();
      await Promise.all([Font.loadAsync(customFonts), loadUserData()]);
    } catch (e) {
      //handle errors
    } finally {
      setAppReady(true);
    }
  });

  return (
    <View style={{ flex: 1 }}>
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: Constants.manifest.splash.backgroundColor,
              opacity: animation,
            },
          ]}
        >
          <Animated.Image
            style={{
              width: "100%",
              height: "100%",
              resizeMode: Constants.manifest.splash.resizeMode || "contain",
              transform: [
                {
                  scale: animation,
                },
              ],
            }}
            source={image}
            onLoadEnd={onImageLoaded}
            fadeDuration={0}
          />
        </Animated.View>
      )}
    </View>
  );
};
