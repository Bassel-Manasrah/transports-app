import { Image, FlatList, Pressable, Button } from "react-native";
import { useState } from "react";
// import AwesomeGallery from "react-native-awesome-gallery";

const numColumns = 3;
const spacing = 8;

export default function Gallery({ images, onLongPress }) {
  const renderItem = ({ item }) => {
    return (
      <Pressable
        style={{ aspectRatio: 1, flex: 1 / numColumns, margin: spacing / 2 }}
        onLongPress={onLongPress}
      >
        <Image
          source={{ uri: item }}
          style={{ height: "100%", width: "100%" }}
        />
      </Pressable>
    );
  };

  return (
    <FlatList data={images} renderItem={renderItem} numColumns={numColumns} />
  );
}
