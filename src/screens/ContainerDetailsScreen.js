import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import UploadImage from "../components/UploadImage";
import Gallery from "../components/Gallery";
import { db } from "../../FirebaseConfig";
import { getStorage, ref } from "firebase/storage";
import { uploadImageForContainer } from "../utils/containerUtils";
import Dropdown from "../components/Dropdown";
import {
  getRecipients,
  createContainerRecipient,
  getRecipientForContainer,
} from "../services/recipientService";
import { getImages } from "../services/imageService";
import { useFocusEffect } from "@react-navigation/native";

const dummy_images = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/ChessSet.jpg/640px-ChessSet.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/ChessSet.jpg/640px-ChessSet.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/ChessSet.jpg/640px-ChessSet.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/ChessSet.jpg/640px-ChessSet.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/ChessSet.jpg/640px-ChessSet.jpg",
  "https://www.lego.com/cdn/cs/set/assets/blt68fab4c5d3f1fb7a/21246_alt1.png?fit=crop&quality=80&width=400&height=400&dpr=1",
];

export default function ContainerDetailsScreen({ route, navigation }) {
  // const containerId = 11;
  // const transportId = 5;
  // const containerNumber = "SUDU7752190";
  const { id: containerId, transportId, containerNumber } = route.params;

  // const containerNumber = "OOLU9472089";
  // const transportId = 6;
  // const containerId = 9;

  const [images, setImages] = useState([]);
  const [dropdownItems, setDropdownItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [galleryLoading, setGalleryLoading] = useState(true);

  console.log(`containerId: ${containerId}, transportId: ${transportId}`);

  // fetch images
  useEffect(() => {
    (async () => {
      // const transportId = "11";
      // const containerNumber = "SUDU8642500";
      const images = await getImages({ transportId, containerNumber });
      console.log(images);
      setImages(images);
      setGalleryLoading(false);
    })();
  }, []);

  // fetch dropdown items (recipients)
  // useEffect(() => {
  //   (async () => {
  //     const recipients = await getRecipients();
  //     const items = recipients.map((recipient) => ({
  //       label: `${recipient.companyName} / ${recipient.driverName}`,
  //       value: recipient.id,
  //     }));
  //     setDropdownItems(items);
  //   })();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchRecipients = async () => {
        const recipients = await getRecipients();
        const items = recipients.map((recipient) => ({
          label: `${recipient.companyName} / ${recipient.driverName}`,
          value: recipient.id,
        }));
        setDropdownItems(items);
      };

      fetchRecipients();
    }, [])
  );

  // fetch selected value (selected recipient)
  useEffect(() => {
    (async () => {
      const recipient = await getRecipientForContainer({
        containerId,
        transportId,
      });
      // console.log(recipient);
      setSelectedValue(recipient.id);
    })();
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     const recipients = await getRecipients();
  //     const recipientForContainer = await getRecipientForContainer({
  //       containerId: 2,
  //       transportId: 11,
  //     });
  //     setInitialValue(recipientForContainer.id);
  //     const options = recipients.map((recipient) => ({
  //       label: `${recipient.companyName} / ${recipient.driverName}`,
  //       value: recipient.id,
  //     }));

  //     setRecipients(recipients);
  //     setDropdownOptions(options);
  //     console.log("here");

  //     setLoading(false);
  //   })();
  // }, []);

  const onImageLongPress = () => {};

  const list = ["this is a test", "this is another test"];

  const onUpload = async (uri) => {
    setGalleryLoading(true);

    // upload new images to firebase storage
    // newImages.forEach((image) => {

    await uploadImageForContainer({ uri, transportId, containerNumber });
    // });

    // console.log("########################");
    // console.log(uri);
    // console.log(images);

    // update ui state
    setImages((prevImages) => [...prevImages, uri]);

    setGalleryLoading(false);
  };

  // const onImageLongPress = () => {
  //   console.log("long press");
  // };

  if (!loading)
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
          <Ionicons
            name="arrow-back"
            color="white"
            size={24}
            onPress={() => {
              navigation.goBack();
            }}
          ></Ionicons>
          <Text style={styles.title}>Container Details</Text>
        </View>
        <View style={styles.bodyContainer}>
          <UploadImage onUpload={onUpload} />
          {/* TODO: uncomment this */}
          <Gallery
            images={images}
            onLongPress={onImageLongPress}
            loading={galleryLoading}
            navigation={navigation}
          />
        </View>

        <Dropdown
          data={dropdownItems}
          disable={selectedValue}
          value={selectedValue}
          onChange={(recipientId) => {
            setSelectedValue(recipientId);
            console.log(recipientId);

            createContainerRecipient({
              transportId,
              containerId,
              recipientId,
            });
          }}
        />
        {}
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.createNewRecipientContainer}
          onPress={() => navigation.navigate("CreateRecipient")}
        >
          {!selectedValue && (
            <Text style={styles.createNewRecipient}>Create New Recipient</Text>
          )}
        </TouchableOpacity>

        <StatusBar backgroundColor="#162534" style="light" />
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "lightblue",
    // padding: 16,
    gap: 16,
    flex: 1,
  },
  titleContainer: {
    width: "100%",
    backgroundColor: "#162534",
    padding: 24,
    height: "10%",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  bodyContainer: {
    padding: 24,
    gap: 8,
  },

  title: {
    color: "white",
    fontSize: 18,
  },
  createNewRecipient: {
    textAlign: "center",
    fontSize: 16,
    color: "royalblue",
    fontWeight: "bold",
  },
  createNewRecipientContainer: {
    padding: 8,
  },
});
