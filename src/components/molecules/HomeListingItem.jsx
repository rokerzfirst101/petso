import React from "react";
import { StyleSheet, Image, View, Dimensions } from "react-native";
import {
  Surface,
  Subheading,
  Caption,
  Button,
  useTheme,
} from "react-native-paper";
import ImageCarousel from "./ImageCarousel";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { baseUrl } from "../../requests";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addLocale(en);
TimeAgo.setDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

const { width, height } = Dimensions.get("window");
const HomeListingItem = ({ userId, item }) => {
  const { colors } = useTheme();
  const [like, setLike] = React.useState(item.likedBy.length);
  const [isLiked, setIsLiked] = React.useState(item.likedBy.includes(userId));

  return (
    <Surface style={{ flex: 1, width, elevation: 1 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 8,
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Image
            source={{ uri: `${baseUrl}${item.createdBy.avatar}` }}
            style={{ height: 40, width: 40, borderRadius: 20 }}
          />
          <Subheading style={{ marginStart: 8 }}>
            {`${item.createdBy.name}\n`}
            <Caption>{timeAgo.format(new Date(item.createdOn))}</Caption>
          </Subheading>
        </View>
        <Ionicons
          style={{ marginEnd: 25 }}
          name={true ? "bookmark-outline" : "bookmark"}
          size={24}
          color={colors.light100}
        />
      </View>
      <ImageCarousel id={item._id} images={item.images} />
      <View
        style={{
          padding: 12,
          paddingHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <AntDesign
            name={false ? "like2" : "like1"}
            size={20}
            color={colors.accent}
          />
          <Caption style={{ marginStart: 5 }}>{like}</Caption>
        </View>
        <Button
          compact={true}
          onPress={() =>
            props.navigation.navigate("ListingDetailScreen", {
              listing: item,
            })
          }
        >
          Interested
        </Button>
      </View>
    </Surface>
  );
};

export default HomeListingItem;

const styles = StyleSheet.create({});
