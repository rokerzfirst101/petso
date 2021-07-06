import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button, Subheading, useTheme } from "react-native-paper";

const { width, height } = Dimensions.get("window");
const NewListingCarousel = ({ images, height, popImage, addImage }) => {
  const [current, setCurrent] = React.useState(0);
  const { colors } = useTheme();
  return (
    <View>
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
                source={{ uri: item.uri }}
                style={{ width, height: height ? height : 200 }}
              />
            );
          }}
        />
        <View
          style={{
            position: "absolute",
            bottom: 10,
            alignSelf: "center",
            backgroundColor: colors.surface,
            padding: 5,
            paddingHorizontal: 10,
            borderRadius: 10,
            opacity: 0.8,
          }}
        >
          <Subheading>{images.length}/5</Subheading>
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button compact={true} onPress={popImage}>
          Remove Image
        </Button>
        <Button disabled={images.length == 5} compact={true} onPress={addImage}>
          Add Image
        </Button>
      </View>
    </View>
  );
};

export default NewListingCarousel;
