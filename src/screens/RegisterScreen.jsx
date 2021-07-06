import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
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

const RegisterScreen = () => {
  const { colors } = useTheme();
  const preference = React.useContext(PreferencesContext);

  const [name, setName] = React.useState("Rakshit Singh");
  const [email, setEmail] = React.useState("rakshit.lko@gmail.com");
  const [phone, setPhone] = React.useState("7084552191");
  const [password, setPassword] = React.useState("226012rak");
  const [password2, setPassword2] = React.useState("226012rak");
  const [profilePicture, setProfilePicture] = React.useState("");

  const [hidePassword, setHidePassword] = React.useState(true);
  const [hidePassword2, setHidePassword2] = React.useState(true);

  const [isLoading, setIsLoading] = React.useState(false);

  const submitForm = () => {
    let formData = new FormData();
    let localUri = profilePicture.uri;
    let filename = localUri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    formData.append("email", email);
    formData.append("password", password);
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("category", "default");
    formData.append("avatar", {
      uri: profilePicture.uri,
      name: filename,
      type,
    });
    register(formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
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
          <Avatar.Image
            size={100}
            source={
              profilePicture != ""
                ? {
                    uri: profilePicture.uri,
                  }
                : undefined
            }
          />
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
          left={<TextInput.Icon name="at" color={colors.accent} />}
        />
        <TextInput
          style={{
            marginTop: 8,
            backgroundColor: preference.isThemeDark ? null : "white",
          }}
          placeholder="Phone Number"
          dense
          value={phone}
          onChangeText={setPhone}
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

export default RegisterScreen;
