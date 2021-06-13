import React from 'react';
import MainStack from './src/navigation/MainStack';
import { Asset } from 'expo-asset'
import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';
import Constants from 'expo-constants';
import { View, StyleSheet, Animated, SafeAreaView } from 'react-native';

SplashScreen.preventAutoHideAsync().catch(() => {

});

export default function App() {
  return (
    <AnimatedAppLoader image="https://pbs.twimg.com/media/EuZ5hHFVkAYXaVa?format=png&name=240x240">
      <MainStack />
    </AnimatedAppLoader>
  );
}

function AnimatedAppLoader({ children, image }) {
  const [isSplashReady, setSplashReady] = React.useState(false);

  const startAsync = React.useMemo(
    () => () => Asset.fromURI(image).downloadAsync(),
    [image]
  )

  const onFinish = React.useMemo(() => setSplashReady(true), [])

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
  
  return <AnimatedSplashScreen image={image}>{children}</AnimatedSplashScreen>
}

function AnimatedSplashScreen({ children, image }) {
  const animation = React.useMemo(() => new Animated.Value(1), [])
  const [isAppReady, setAppReady] = React.useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] = React.useState(false);

  React.useEffect(() => {
    if (isAppReady) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }).start(() => setAnimationComplete(true));
    }
  }, [isAppReady])

  const onImageLoaded = React.useMemo(() => async() => {
    try {
      await SplashScreen.hideAsync();
      //Load Stuff Here
      await Promise.all([]);
    } catch(e) {
      //handle errors
    } finally {
      setAppReady(true)
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
              opacity: animation
            }
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
            source={{uri: image}}
            onLoadEnd={onImageLoaded}
            fadeDuration={0}
          />
        </Animated.View>
      )}
    </View>
  )
}