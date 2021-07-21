import React from "react";
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  Surface,
  Subheading,
  Caption,
  Button,
  useTheme,
} from "react-native-paper";
import ImageCarousel from "./ImageCarousel";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import {
  baseUrl,
  bookmarkListing,
  unbookmarkListing,
  likeListing,
  unlikeListing,
} from "../../requests";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { updateUser } from "../../redux/actions/user";
import { connect } from "react-redux";

TimeAgo.addLocale(en);
TimeAgo.setDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

const { width, height } = Dimensions.get("window");
const HomeListingItem = ({
  token,
  userId,
  item,
  navigation,
  bookmarks,
  update,
}) => {
  const { colors } = useTheme();
  const [like, setLike] = React.useState(item.likedBy.length);
  const [isLiked, setIsLiked] = React.useState(item.likedBy.includes(userId));
  const [isLoading, setIsLoading] = React.useState(false);
  const [isBookmarked, setIsBookmarked] = React.useState(
    bookmarks && bookmarks.includes(item._id)
  );
  const handleLike = () => {
    if (!isLoading) {
      setIsLoading(true);
      if (isLiked) {
        unlikeListing(token, item._id)
          .then((res) => {
            setIsLiked(false);
            setLike(like - 1);
            setIsLoading(false);
          })
          .catch((err) => setIsLoading(false));
      } else {
        likeListing(token, item._id)
          .then((res) => {
            setIsLiked(true);
            setLike(like + 1);
            setIsLoading(false);
          })
          .catch((err) => setIsLoading(false));
      }
    }
  };

  const handleBookmark = () => {
    if (!isLoading) {
      setIsLoading(true);
      if (isBookmarked) {
        unbookmarkListing(token, item._id)
          .then((res) => {
            setIsBookmarked(false);
            update(res.user);
            setIsLoading(false);
          })
          .catch((err) => setIsLoading(false));
      } else {
        bookmarkListing(token, item._id)
          .then((res) => {
            setIsBookmarked(true);
            update(res.user);
            setIsLoading(false);
          })
          .catch((err) => console.log(err.reponse));
      }
    }
  };

  return (
    <Surface
      style={{
        flex: 1,
        elevation: 2,
        backgroundColor: colors.surface,
        borderRadius: 5,
      }}
    >
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
        <TouchableOpacity onPress={handleBookmark}>
          <Ionicons
            name={isBookmarked ? "bookmark" : "bookmark-outline"}
            size={24}
            color={colors.light100}
          />
        </TouchableOpacity>
      </View>
      <ImageCarousel id={item._id} images={item.images} />
      <Subheading lineBreakMode="tail" style={{ padding: 8 }}>
        {item.title}
      </Subheading>
      <View
        style={{
          padding: 5,
          paddingHorizontal: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={handleLike}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <AntDesign
            name={isLiked ? "like1" : "like2"}
            size={20}
            color={colors.accent}
          />
          <Subheading style={{ marginStart: 5 }}>{like}</Subheading>
        </TouchableOpacity>
        <Button
          compact={true}
          labelStyle={{
            fontFamily: "Staatliches_400Regular",
            fontSize: 18,
            letterSpacing: 1.5,
          }}
          onPress={() =>
            navigation.navigate("ListingDetailScreen", {
              listing: item,
            })
          }
        >
          Details
        </Button>
      </View>
    </Surface>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    update: (user) => dispatch(updateUser(user)),
  };
};

export default connect(null, mapDispatchToProps)(HomeListingItem);
