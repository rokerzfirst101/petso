import React from "react";
import {
  Platform,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  ToastAndroid,
} from "react-native";
import { Button, Portal, Modal, TextInput } from "react-native-paper";
import { Subheading, Title, useTheme } from "react-native-paper";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useEffect } from "react";
import NewListingCarousel from "../components/molecules/NewListingCarousel";
import { newListing } from "../requests";
import { connect } from "react-redux";

const NewListingScreen = ({ navigation, token }) => {
  const { colors } = useTheme();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [keyboard, setKeyboard] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to add Image!");
        }
      }
    })();
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    return () => {
      Keyboard.removeAllListeners("keyboardDidShow");
      Keyboard.removeAllListeners("keyboardDidHide");
    };
  }, []);

  const _keyboardDidShow = () => setKeyboard(true);
  const _keyboardDidHide = () => setKeyboard(false);

  const createListing = () => {
    if (title === "" || message === "" || price === "" || images.length === 0) {
      ToastAndroid.show("Fill in the details", ToastAndroid.SHORT);
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    for (var i = 0; i < images.length; i++) {
      let localUri = images[i].uri;
      let filename = localUri.split("/").pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      formData.append("images", {
        uri: images[i].uri,
        name: filename,
        type,
      });
    }
    formData.append("title", title);
    formData.append("message", message);
    formData.append("price", price);
    newListing(token, formData)
      .then((res) => {
        setIsLoading(false);
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
          navigation.pop();
        }, 1000);
      })
      .catch((err) => {
        ToastAndroid.show("An error occured.", ToastAndroid.SHORT);
        setIsLoading(false);
      });
  };

  const popImage = () => {
    var temp = [...images];
    temp.pop();
    console.log(temp);
    setImages(temp);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImages([...images, result]);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      {images.length == 0 ? (
        <View
          style={{
            flex: 2,
            borderWidth: 1,
            borderStyle: "dashed",
            borderRadius: 1,
            borderColor: colors.accent,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={pickImage}
          >
            <Feather name="plus" size={35} color={colors.accent} />
            <Subheading style={{ color: colors.accent }}>
              Add an image
            </Subheading>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flex: 2 }}>
          <NewListingCarousel
            popImage={popImage}
            addImage={pickImage}
            images={images}
          />
        </View>
      )}
      <View style={{ flex: 3 }}>
        <TextInput value={title} onChangeText={setTitle} placeholder="Title" />
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Message"
        />
        <TextInput value={price} onChangeText={setPrice} placeholder="Price" />
      </View>
      {!keyboard ? (
        <Button
          style={{ marginBottom: 20 }}
          loading={isLoading}
          onPress={createListing}
        >
          Submit
        </Button>
      ) : null}
      <Portal>
        <Modal
          visible={modalVisible}
          contentContainerStyle={{
            marginHorizontal: 10,
            alignItems: "center",
            backgroundColor: "green",
            padding: 10,
            flexDirection: "row",
          }}
        >
          <Ionicons name="checkmark-circle-outline" size={24} color="white" />
          <Subheading style={{ marginStart: 10 }}>
            Listing posted successfully.
          </Subheading>
        </Modal>
      </Portal>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    token: state.userReducer.token,
  };
};

export default connect(mapStateToProps)(NewListingScreen);
