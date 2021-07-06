import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { baseUrl } from "../../requests";

const { width, height } = Dimensions.get("window");
const ImageCarousel = ({ id, images, height }) => {
  const [current, setCurrent] = React.useState(0);

  return (
    <View>
      <FlatList
        data={images}
        horizontal={true}
        keyExtractor={(item, index) => index.toString()}
        pagingEnabled={true}
        renderItem={({ item, index }) => {
          return (
            <Image
              resizeMode="cover"
              source={{ uri: `${baseUrl}listings/${id}/${item}` }}
              style={{ width, height: height ? height : 200 }}
            />
          );
        }}
      />
    </View>
  );
};

export default ImageCarousel;
