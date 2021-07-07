import { useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  View,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Surface, Title, Subheading } from "react-native-paper";
import SearchWithLogo from "../components/molecules/SearchWithLogo";
import { PreferencesContext } from "../constants/PreferenceContext";
import { getRandomColor } from "../constants/RandomColors";

const data = [
  {
    url: "https://static01.nyt.com/images/2019/06/17/science/17DOGS/17DOGS-jumbo.jpg?quality=90&auto=webp",
    text: "Dog 1",
  },
  {
    url: "https://images.theconversation.com/files/319652/original/file-20200310-61148-vllmgm.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=600&h=400&fit=crop&dpr=1",
    text: "Dog 2",
  },
  {
    url: "https://images.theconversation.com/files/319652/original/file-20200310-61148-vllmgm.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=600&h=400&fit=crop&dpr=1",
    text: "Dog 2",
  },
  {
    url: "https://images.theconversation.com/files/319652/original/file-20200310-61148-vllmgm.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=600&h=400&fit=crop&dpr=1",
    text: "Dog 2",
  },
  {
    url: "https://images.theconversation.com/files/319652/original/file-20200310-61148-vllmgm.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=600&h=400&fit=crop&dpr=1",
    text: "Dog 2",
  },
];

const { width } = Dimensions.get("window");

const CategoryScreen = (props) => {
  const preference = React.useContext(PreferencesContext);
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        marginTop: StatusBar.currentHeight + 20,
        backgroundColor: preference.isThemeDark ? "#121212" : "#F4F5F7",
      }}
    >
      {/* <FlatList
        style={{ marginTop: StatusBar.currentHeight }}
        numColumns={2}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={() => {
          return (
            <Title
              style={{
                fontFamily: "Staatliches_400Regular",
                fontSize: 28,
                marginBottom: 15,
              }}
            >
              TELL US WHAT YOU LIKE
            </Title>
          );
        }}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => props.navigation.replace("Dashboard")}
            >
              <Surface
                style={{
                  width: width / 2 - 30,
                  marginRight: 10,
                  marginLeft: 10,
                  borderRadius: 30,
                  elevation: 4,
                }}
              >
                <View
                  style={{
                    width: width / 2 - 30,
                    height: 200,
                    borderRadius: 30,
                  }}
                >
                  <Image
                    source={{ uri: item.url }}
                    style={{
                      height: 200,
                      width: width / 2 - 30,
                      borderRadius: 30,
                    }}
                  />
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    colors={["transparent", getRandomColor(index)]}
                    style={{
                      position: "absolute",
                      height: 200,
                      width: width / 2 - 30,
                      borderRadius: 30,
                    }}
                  />
                </View>
              </Surface>
            </TouchableOpacity>
          );
        }}
        ItemSeparatorComponent={() => <View style={{ margin: 7.5 }} />}
        contentContainerStyle={{ alignItems: "center", paddingVertical: 15 }}
      /> */}
      <Title
        style={{
          fontFamily: "Staatliches_400Regular",
          fontSize: 28,
          marginBottom: 15,
        }}
      >
        TELL US WHAT YOU LIKE
      </Title>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => props.navigation.replace("Dashboard")}
      >
        <Surface
          style={{
            width: width / 1.5,
            marginRight: 10,
            marginLeft: 10,
            borderRadius: 30,
            elevation: 4,
            marginTop: 20,
          }}
        >
          <View
            style={{
              width: width / 1.5,
              height: 400,
              borderRadius: 30,
            }}
          >
            <Image
              source={require("../../assets/dog-category.jpg")}
              style={{
                height: 400,
                width: width / 1.5,
                borderRadius: 30,
              }}
            />
            <LinearGradient
              start={{ x: 0, y: 0 }}
              colors={["#3793b380", "#3793b366"]}
              style={{
                position: "absolute",
                height: 400,
                width: width / 1.5,
                borderRadius: 30,
              }}
            />
          </View>
        </Surface>
      </TouchableOpacity>
      <Subheading style={{ marginTop: 50 }}>More coming soon...</Subheading>
    </View>
  );
};

export default CategoryScreen;
