import React, { useState, useEffect } from "react";
import { View, Image, ActivityIndicator, StyleSheet } from "react-native";

export default function ImageWrapper({ uri }) {
  const [isPdf, setIsPdf] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkFileType = async () => {
      try {
        // We don't fetch the file content; only check its MIME type
        const response = await fetch(uri);
        const contentType = response.headers.get("Content-Type");

        // Check if the MIME type is PDF
        if (contentType && contentType.includes("application/pdf")) {
          setIsPdf(true);
        } else {
          setIsPdf(false);
        }
      } catch (error) {
        console.error("Error fetching file:", error);
      } finally {
        setLoading(false); // Hide the loading spinner when done
      }
    };

    checkFileType();
  }, [uri]); // Only run this effect when the uri changes

  if (loading) {
    return <ActivityIndicator color="royalblue" />;
  }

  return (
    <View style={{ flex: 1 }}>
      {isPdf ? (
        // If it's a PDF, display the placeholder
        <Image
          source={require("../../assets/pdf-placeholder.png")}
          style={{
            width: 100,
            height: 100,
            alignSelf: "center",
            backgroundColor: "blue",
          }}
        />
      ) : (
        // If it's an image, display it
        <Image source={{ uri }} style={{ height: "100%", width: "100%" }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
