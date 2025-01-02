import { Image, FlatList, Pressable, Button } from "react-native";
import { useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import ImageWrapper from "./ImageWrapper";
// import AwesomeGallery from "react-native-awesome-gallery";

const numColumns = 3;
const spacing = 8;

export default function Gallery({ images, onLongPress, loading }) {
  const renderItem = ({ item }) => {
    return (
      <Pressable
        style={{ aspectRatio: 1, flex: 1 / numColumns, margin: spacing / 2 }}
        onLongPress={onLongPress}
      >
        {/* <Image
          source={{ uri: item }}
          style={{ height: "100%", width: "100%" }}
        /> */}
        <ImageWrapper uri={item} />
      </Pressable>
    );
  };

  if (loading) return <ActivityIndicator color="royalblue" />;

  return (
    <FlatList
      data={images}
      renderItem={renderItem}
      numColumns={numColumns}
      // contentContainerStyle={{ backgroundColor: "lightblue" }}
    />
  );
}
