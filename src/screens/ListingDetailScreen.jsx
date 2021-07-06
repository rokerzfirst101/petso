import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Caption, Subheading, Title } from "react-native-paper";
import ImageCarousel from "../components/molecules/ImageCarousel";

const { width, height } = Dimensions.get("window");
const ListingDetailScreen = ({ route }) => {
  const listing = route.params.listing;
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{ flex: 2, justifyContent: "center", backgroundColor: "black" }}
      >
        <ImageCarousel
          id={listing._id}
          height={(height / 5) * 2}
          images={listing.images}
        />
      </View>
      <View style={{ flex: 3, padding: 8 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Title>{listing.title}</Title>
          <Title>&#8377; {listing.price}</Title>
        </View>
        <Caption>{listing.contact}</Caption>
        <Subheading>{listing.message}</Subheading>
      </View>
    </View>
  );
};

export default ListingDetailScreen;
