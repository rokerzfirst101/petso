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
  Menu,
} from "react-native-paper";
import ImageCarousel from "./ImageCarousel";
import { Entypo, AntDesign } from "@expo/vector-icons";
import {
  baseUrl,
  getReportName,
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

const HomeListingItem = ({
  token,
  userId,
  item,
  navigation,
  isAdmin,
  report,
  reportType,
  approveReport,
  rejectReport
}) => {

  const { colors } = useTheme();

  const [like, setLike] = React.useState(item.likedBy.length);
  const [isLiked, setIsLiked] = React.useState(item.likedBy.includes(userId));
  const [isLoading, setIsLoading] = React.useState(false);

  const [menuVisible, setMenuVisible] = React.useState(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

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

  return (
    <View>
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
            paddingEnd: 14
          }}
        >
          <View style={{ flexDirection: "row" }}>
            {
              item.createdBy.avatar && item.createdBy.avatar != "" ? (
                <Image
                  source={{ uri: `${baseUrl}${item.createdBy.avatar}` }}
                  style={{ height: 50, width: 50, borderRadius: 25 }}
                />
              ) : (
                <Image
                  source={{ uri: `https://hips.hearstapps.com/digitalspyuk.cdnds.net/17/13/1490989105-twitter1.jpg?resize=480:*` }}
                  style={{ height: 50, width: 50, borderRadius: 25 }}
                />
              )
            }
            <Subheading style={{ marginStart: 8 }}>
              {
                item.createdBy.name && item.createdBy.name != "" ? (
                  `${item.createdBy.name}\n`
                ) : (
                  `Petso User\n`
                )
              }
              <Caption>{timeAgo.format(new Date(item.createdOn))}</Caption>
            </Subheading>
          </View>
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={<Entypo onPress={openMenu} name="dots-three-horizontal" size={18} color={colors.accent} />}
          >
            <Menu.Item onPress={() => {
              setMenuVisible(false)
              report("listing", item._id)
            }} title="Report" />
            {
              isAdmin ? <Menu.Item onPress={() => {}} title="Delete" /> : null
            }
          </Menu>
        </View>
        <ImageCarousel id={item._id} images={item.images} />
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
      {
        reportType ? (
          <View style={{padding: 8}}>
            <Subheading>Reported for : {getReportName(reportType)}</Subheading>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Button onPress={approveReport}>Approve Report</Button>
                <Button onPress={rejectReport}>Reject Report</Button>
            </View>
          </View>
        ) : null
      }
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    update: (user) => dispatch(updateUser(user)),
  };
};

export default connect(null, mapDispatchToProps)(HomeListingItem);
