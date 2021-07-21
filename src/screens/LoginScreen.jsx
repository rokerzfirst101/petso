import React from "react";
import { View, Dimensions, ToastAndroid } from "react-native";
import {
  Caption,
  Subheading,
  TextInput,
  Title,
  useTheme,
} from "react-native-paper";
import { DismissKeyboardView } from "../components/atoms/DismissKeyboardHOC";
import { TouchableOpacity } from "react-native-gesture-handler";
import { login } from "../requests";
import { connect } from "react-redux";
import { signIn } from "../redux/actions/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from '@expo/vector-icons';
import OTPInput from "../components/molecules/OTPInput";

const { width, height } = Dimensions.get("window");

const LoginType = {
  PHONE : "phone",
  EMAIL : "email",
  VERIFY: "verify"
}

const LoginScreen = (props) => {
  
  const [loginType, setLoginType] = React.useState(LoginType.PHONE)

  const [phone, setPhone] = React.useState("7084552191");
  const [code, setCode] = React.useState()

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [hidePassword, setHidePassword] = React.useState(false);
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = React.useState(false);

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const finishLogin = (user, accessToken) => {
    console.log(user)
    AsyncStorage.setItem("@User", JSON.stringify(user));
    AsyncStorage.setItem("@Token", JSON.stringify(accessToken));
    props.signInUser(user, accessToken);
    props.navigation.replace("Dashboard")
  }

  const submitForm = () => {
    if (loginType === LoginType.EMAIL && !validateEmail(email)) {
      ToastAndroid.show("Enter proper email.", ToastAndroid.SHORT);
      return;
    }
    if (loginType === LoginType.EMAIL && password === "") {
      ToastAndroid.show(
        "Please enter the email or password",
        ToastAndroid.SHORT
      );
      return;
    }
    const formData = new FormData();
    if (loginType === LoginType.PHONE) {
      formData.append("phone", phone)
    } else if (loginType === LoginType.VERIFY) {
      formData.append("phone", phone);
      formData.append("code", code)
    } else {
      formData.append("email", email);
      formData.append("password", password);
    }
    login(formData)
      .then((res) => {
        if (loginType === LoginType.EMAIL) {
          finishLogin(res.user, res.accessToken)
        } else if (loginType === LoginType.VERIFY) {
          if (res.resolved && res.registered) {
            finishLogin(res.user, res.accessToken)
          } else if (res.resolved && !res.registered) {
            props.navigation.navigate("Register", {
              phone
            })
          }
        } else {
          setLoginType(LoginType.VERIFY)
        }
      })
      .catch((err) => {
        console.log(err)
        ToastAndroid.show("Incorrect email or password.", ToastAndroid.SHORT);
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
        {
          loginType !== LoginType.VERIFY ? (
            <View style={{marginStart: 18, marginTop: 38}}>
              <Title style={{fontSize: 24}}>Welcome Back!</Title>
              <Caption style={{ opacity: 0.8, fontSize: 14 }}>
                Sign in to continue
              </Caption>
            </View>
          ) : null
        }
        { loginType === "phone" ? (
          <View>
            <View style={{ padding: 10, marginTop: 20 }}>
            <TextInput
              dense
              style={{ backgroundColor: null }}
              label="Phone"
              value={phone}
              onChangeText={setPhone}
              left={<TextInput.Icon name="phone" color={colors.accent} />}
            />
          </View>
          <TouchableOpacity
          style={{ height: 40, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center', marginHorizontal: "20%", marginTop: 80 }}
          onPress={() => {
            submitForm();
          }}
          >
            <Subheading>Continue</Subheading>
          </TouchableOpacity>
          <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginVertical: 20}}>
            <View style={{borderWidth: 0.5, width: "25%", height: 0, borderColor: colors.accent}} />
            <Caption style={{marginHorizontal: 10}}>or</Caption>
            <View style={{borderWidth: 0.5, width: "25%", height: 0, borderColor: colors.accent}} />
          </View>
          <TouchableOpacity
          style={{ height: 40, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center', marginHorizontal: "20%"}}
          onPress={() => setLoginType(LoginType.EMAIL)}
          >
            <Subheading>Login using Email</Subheading>
          </TouchableOpacity>
        </View>
        ) : loginType === LoginType.VERIFY ? (
          <View style={{padding: 18, justifyContent: 'space-between'}}>
            <View>
              <Ionicons name="arrow-back" size={24} color={colors.accent} onPress={() => setLoginType(LoginType.PHONE)} />
              <Subheading style={{marginTop: 10}}>
                Enter the code sent to
              </Subheading>
              <Title>
                +91 {phone} 
              </Title>
              <OTPInput value={code} setValue={setCode} style={{marginTop: 30}} length={6} />
            </View>
            <TouchableOpacity
              onPress={submitForm} 
              style={{marginTop: 80, height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.accent}}
            >
              <Subheading>Verify</Subheading>
            </TouchableOpacity>
          </View>
        ) : (
          (
            <View>
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
            <TouchableOpacity
            style={{ height: 40, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center', marginHorizontal: "20%", marginTop: 80 }}
            onPress={() => {
              submitForm();
            }}
            >
              <Subheading>Continue</Subheading>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginVertical: 10}}>
              <View style={{borderWidth: 0.5, width: "25%", height: 0, borderColor: colors.accent}} />
              <Caption style={{marginHorizontal: 10}}>or</Caption>
              <View style={{borderWidth: 0.5, width: "25%", height: 0, borderColor: colors.accent}} />
            </View>
            <TouchableOpacity
            style={{ height: 40, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center', marginHorizontal: "20%"}}
            onPress={() => setLoginType(LoginType.PHONE)}
            >
              <Subheading>Login using Phone</Subheading>
            </TouchableOpacity>
          </View>
          )
        ) }
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
