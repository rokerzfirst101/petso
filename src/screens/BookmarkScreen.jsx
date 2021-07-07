import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import HomeListingItem from "../components/molecules/HomeListingItem";
import { Subheading } from "react-native-paper";
import { getBookmarked } from "../requests";
import { connect } from "react-redux";
import { startDetecting } from "react-native/Libraries/Utilities/PixelRatio";

const BookmarkScreen = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getBookmarked(props.token)
      .then((res) => setData(res.listings))
      .catch((err) => console.log(err));
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        style={{ padding: 5, marginTop: 10 }}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                marginTop: "70%",
                opacity: 0.5,
              }}
            >
              <Subheading>Nothing to show.</Subheading>
            </View>
          );
        }}
        renderItem={({ item, index }) => {
          return (
            <HomeListingItem
              navigation={props.navigation}
              token={props.token}
              userId={props.user._id}
              bookmarks={props.user.bookmarked}
              item={item}
            />
          );
        }}
        ItemSeparatorComponent={() => <View style={{ marginVertical: 5 }} />}
        ListFooterComponent={() => <View style={{ marginBottom: 86 }} />}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    token: state.userReducer.token,
  };
};

export default connect(mapStateToProps)(BookmarkScreen);
