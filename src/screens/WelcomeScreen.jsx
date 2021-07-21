import React from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { Button, Title, useTheme } from "react-native-paper";
import BottomSheet from "@gorhom/bottom-sheet";
import LoginScreen from "./LoginScreen";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import CustomBottomSheetBackground from "../components/molecules/CustomBottomSheetBackground";
import CustomBottomSheetHandle from "../components/molecules/CustomBottomSheetHandle";

const { width, height } = Dimensions.get("window");
const WelcomeScreen = (props) => {
  const bottomSheetModalRef = React.useRef(null);
  const [modalState, setModalState] = React.useState(0);
  const snapPoints = React.useMemo(() => ["65%"], []);

  const showModal = React.useCallback(() => {
    bottomSheetModalRef.current.present();
  }, []);

  const handleSheetChanges = React.useCallback((index) => {
    if (index == 0) setModalState(1);
    else setModalState(0);
  });

  return (
    <BottomSheetModalProvider>
      <ImageBackground
        source={require("../../assets/background.jpg")}
        style={[{ width, height }, styles.view]}
      >
        <View
          style={{
            width,
            height: "120%",
            position: "absolute",
            backgroundColor: "#1F456E80",
          }}
        />
        <View style={styles.view}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={require("../../assets/logo.png")}
          />
          <View style={{ width: 250 }}>
            {modalState == 0 ? (
              <Button
                labelStyle={{
                  fontSize: 28,
                  fontFamily: "Staatliches_400Regular",
                  color: "#1F456E",
                }}
                style={{
                  height: 60,
                  justifyContent: "center",
                  borderRadius: 30,
                  borderWidth: 2,
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  elevation: 4,
                }}
                mode="contained"
                onPress={showModal}
              >
                Get Started
              </Button>
            ) : null}
          </View>
        </View>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          handleComponent={CustomBottomSheetHandle}
          backgroundComponent={CustomBottomSheetBackground}
        >
          <LoginScreen navigation={props.navigation} />
        </BottomSheetModal>
      </ImageBackground>
    </BottomSheetModalProvider>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 35,
  },
  image: {
    height: 100,
    width: 400,
    marginTop: 25,
    opacity: 0.9,
  },
});
