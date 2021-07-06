import React from "react";
import { StyleSheet, View, Dimensions, ToastAndroid } from "react-native";
import {
  Button,
  Caption,
  Subheading,
  TextInput,
  Title,
  useTheme,
} from "react-native-paper";
import { DismissKeyboardView } from "../components/atoms/DismissKeyboardHOC";
import { PreferencesContext } from "../constants/PreferenceContext";
import AnimatedLottieView from "lottie-react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { login } from "../requests";
import { connect } from "react-redux";
import { signIn } from "../redux/actions/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const LoginScreen = (props) => {
  const preference = React.useContext(PreferencesContext);
  const animationRef = React.useRef();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [hidePassword, setHidePassword] = React.useState(false);
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = React.useState(false);
  const [loop, setLoop] = React.useState(true);

  const submitForm = () => {
    if (email === "" || password === "") {
      ToastAndroid.show(
        "Please enter the email or password",
        ToastAndroid.SHORT
      );
      return;
    }
    animationRef.current.play(50, 110);
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    login(formData)
      .then((res) => {
        AsyncStorage.setItem("@User", JSON.stringify(res.user));
        AsyncStorage.setItem("@Token", JSON.stringify(res.accessToken));
        props.signInUser(res.user, res.accessToken);
        setLoop(false);
        animationRef.current.play(110, 200);
      })
      .catch((err) => {
        ToastAndroid.show("An error occured.", ToastAndroid.SHORT);
        animationRef.current.play(0, 0);
      });
  };

  return (
    <DismissKeyboardView
      style={{
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      <View>
        <View style={{ alignItems: "center" }}>
          <Title style={{ marginTop: 20 }}>Welcome Back!</Title>
          <Subheading style={{ opacity: 0.8 }}>
            Login to your Petso account
          </Subheading>
        </View>
        <View style={{ padding: 10, marginTop: 20 }}>
          <TextInput
            dense
            style={{ backgroundColor: null }}
            label="Email"
            value={email}
            onChangeText={setEmail}
            left={<TextInput.Icon name="account" color={colors.accent} />}
          />
          <TextInput
            dense
            style={{ marginTop: 8, backgroundColor: null }}
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={hidePassword}
            left={<TextInput.Icon name="lock" color={colors.accent} />}
            right={
              hidePassword ? (
                <TextInput.Icon
                  name="eye"
                  color={colors.accent}
                  onPress={() => setHidePassword(!hidePassword)}
                />
              ) : (
                <TextInput.Icon
                  name="eye-off"
                  color={colors.accent}
                  onPress={() => setHidePassword(!hidePassword)}
                />
              )
            }
          />
        </View>
        <View style={{ alignItems: "flex-end", paddingHorizontal: 12 }}>
          <Caption style={{ color: colors.accent }}>Forgot Password?</Caption>
        </View>
        <TouchableOpacity
          style={{ height: 80, marginTop: 100 }}
          onPress={() => {
            // animationRef.current.play(50, 110);
            // setTimeout(() => {
            //   setLoop(false);
            //   animationRef.current.play(110, 200);
            // }, 5000);
            submitForm();
          }}
        >
          <AnimatedLottieView
            ref={animationRef}
            loop={loop}
            onAnimationFinish={() => props.navigation.replace("CategoryScreen")}
            source={require("../../assets/lottie/submit.json")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignSelf: "center" }}
          onPress={() => props.navigation.navigate("Register")}
        >
          <Subheading>Don't have an account? Signup</Subheading>
        </TouchableOpacity>
      </View>
    </DismissKeyboardView>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    signInUser: (user, token) => dispatch(signIn(user, token)),
  };
};

export default connect(null, mapDispatchToProps)(LoginScreen);
