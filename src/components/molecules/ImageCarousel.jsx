import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useTheme } from "react-native-paper";
import { baseUrl } from "../../requests";

const { width, height } = Dimensions.get("window");
const ImageCarousel = ({ id, images, height, containerStyle, imageStyle }) => {
  const [current, setCurrent] = React.useState(0);
  const { colors } = useTheme();
  return (
    <View>
      <FlatList
        data={images}
        style={[containerStyle]}
        horizontal={true}
        keyExtractor={(item, index) => index.toString()}
        pagingEnabled={true}
        renderItem={({ item, index }) => {
          return (
            <Image
              resizeMode="cover"
              source={{ uri: `${baseUrl}listings/${id}/${item}` }}
              style={[
                {
                  width,
                  height: height ? height : 200,
                },
                imageStyle,
              ]}
            />
          );
        }}
      />
    </View>
  );
};

export default ImageCarousel;
