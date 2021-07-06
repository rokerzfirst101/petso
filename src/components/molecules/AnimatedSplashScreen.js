import React from "react";
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
import { connect } from "react-redux";
import { signIn } from "../../redux/actions/user";
import { reject } from "core-js/fn/promise";

let customFonts = {
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_700Bold,
  OpenSans_400Regular_Italic,
  Staatliches_400Regular,
};

const AnimatedSplashScreen = ({ children, image, signInUser }) => {
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
        .then((data) => {
          const user = JSON.parse(userString);
          signInUser(user);
          resolve();
        })
        .catch((err) => reject(err));
    });

  const onImageLoaded = React.useMemo(() => async () => {
    try {
      await SplashScreen.hideAsync();
      await Promise.all([Font.loadAsync(customFonts), loadUserData]);
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
            source={{ uri: image }}
            onLoadEnd={onImageLoaded}
            fadeDuration={0}
          />
        </Animated.View>
      )}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    signedIn: state.userReducer.signedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signInUser: (user) => dispatch(signIn(user)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnimatedSplashScreen);
