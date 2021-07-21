import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ToastAndroid,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  TextInput,
  Button,
  useTheme,
  Title,
  Subheading,
  Avatar,
} from "react-native-paper";
import { PreferencesContext } from "../constants/PreferenceContext";
import * as ImagePicker from "expo-image-picker";
import { register } from "../requests";
import { connect } from "react-redux";
import { signIn } from "../redux/actions/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterScreen = (props) => {
  const { colors } = useTheme();
  const preference = React.useContext(PreferencesContext);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState(props.route.params.phone ? props.route.params.phone :  "");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [profilePicture, setProfilePicture] = React.useState("");

  const [hidePassword, setHidePassword] = React.useState(true);
  const [hidePassword2, setHidePassword2] = React.useState(true);

  const [validate, setValidate] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);

  const nameError = () => validate && name === "";
  const emailError = () => validate && email === "";
  const phoneError = () => validate && phone === "";
  const passwordError = () => validate && password === "";
  const password2Error = () =>
    validate && password2 === "" && password2 !== password;

  const validateData = () => {
    setValidate(true);
    return (
      nameError() &&
      emailError() &&
      phoneError() &&
      passwordError() &&
      password2Error()
    );
  };

  const submitForm = () => {
    if (validateData()) return;
    setIsLoading(true);
    let formData = new FormData();
    if (profilePicture) {
      let localUri = profilePicture.uri;
      let filename = localUri.split("/").pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      formData.append("avatar", {
        uri: profilePicture.uri,
        name: filename,
        type,
      });
    }
    formData.append("email", email);
    formData.append("password", password);
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("category", "default");
    register(formData)
      .then((res) => {
        console.log(res);
        props.signInUser(res.user, res.accessToken);
        AsyncStorage.setItem("@User", JSON.stringify(res.user));
        AsyncStorage.setItem("@Token", JSON.stringify(res.accessToken));
        props.navigation.navigate("CategoryScreen");
      })
      .catch((err) => {
        console.log(err.response);
        setIsLoading(false);
        ToastAndroid.show("An error occured", ToastAndroid.SHORT);
      });
  };

  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to add Image!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.cancelled) {
      console.log(result);
      setProfilePicture(result);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: preference.isThemeDark ? null : "white",
      }}
    >
      <View style={{ padding: 8 }}>
        <View style={{ alignItems: "center" }}>
          <Title>Let's Get Started!</Title>
          <Subheading style={{ opacity: 0.8 }}>
            Create an account to get all features
          </Subheading>
        </View>
        <TouchableOpacity
          onPress={pickImage}
          style={{ alignItems: "center", marginVertical: 30 }}
        >
          {profilePicture != "" ? (
            <Avatar.Image size={100} source={{ uri: profilePicture.uri }} />
          ) : (
            <Avatar.Icon size={100} icon="camera-plus-outline" />
          )}
        </TouchableOpacity>
        <TextInput
          style={{
            marginTop: 8,
            backgroundColor: preference.isThemeDark ? null : "white",
          }}
          placeholder="Name"
          dense
          value={name}
          onChangeText={setName}
          error={nameError()}
          left={<TextInput.Icon name="account" color={colors.accent} />}
        />
        <TextInput
          style={{
            marginTop: 8,
            backgroundColor: preference.isThemeDark ? null : "white",
          }}
          placeholder="Email"
          dense
          value={email}
          onChangeText={setEmail}
          error={emailError()}
          left={<TextInput.Icon name="at" color={colors.accent} />}
        />
        <TextInput
          style={{
            marginTop: 8,
            backgroundColor: preference.isThemeDark ? null : "white",
          }}
          placeholder="Phone Number"
          editable={props.route.params.phone ? false : true}
          dense
          value={phone}
          onChangeText={setPhone}
          error={phoneError()}
          left={<TextInput.Icon name="phone" color={colors.accent} />}
        />
        <TextInput
          style={{
            marginTop: 8,
            backgroundColor: preference.isThemeDark ? null : "white",
          }}
          placeholder="Password"
          dense
          value={password}
          onChangeText={setPassword}
          secureTextEntry={hidePassword}
          error={passwordError()}
          left={<TextInput.Icon name="lock" color={colors.accent} />}
          right={
            !hidePassword ? (
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
        <TextInput
          style={{
            marginTop: 8,
            backgroundColor: preference.isThemeDark ? null : "white",
          }}
          placeholder="Confirm Password"
          dense
          value={password2}
          onChangeText={setPassword2}
          secureTextEntry={hidePassword2}
          error={password2Error()}
          left={<TextInput.Icon name="lock" color={colors.accent} />}
          right={
            !hidePassword2 ? (
              <TextInput.Icon
                name="eye"
                color={colors.accent}
                onPress={() => setHidePassword2(!hidePassword2)}
              />
            ) : (
              <TextInput.Icon
                name="eye-off"
                color={colors.accent}
                onPress={() => setHidePassword2(!hidePassword2)}
              />
            )
          }
        />
      </View>
      <Button style={{ padding: 10 }} onPress={submitForm} loading={isLoading}>
        {isLoading ? "" : "Submit"}
      </Button>
    </KeyboardAvoidingView>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    signInUser: (user, token) => dispatch(signIn(user, token)),
  };
};

export default connect(null, mapDispatchToProps)(RegisterScreen);
