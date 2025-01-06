import { Image, FlatList, Pressable, Button } from "react-native";
import { useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import ImageWrapper from "./ImageWrapper";

const numColumns = 3;
const spacing = 8;

export default function Gallery({ images, onLongPress, loading, navigation }) {
  const renderItem = ({ item }) => {
    return (
      <Pressable
        style={{ aspectRatio: 1, flex: 1 / numColumns, margin: spacing / 2 }}
        onLongPress={onLongPress}
      >
        <ImageWrapper
          uri={item}
          onPress={() => navigation.navigate("ImagePreview", { uri: item })}
        />
      </Pressable>
    );
  };

  if (loading) return <ActivityIndicator color="royalblue" />;

  return (
    <FlatList data={images} renderItem={renderItem} numColumns={numColumns} />
  );
}
