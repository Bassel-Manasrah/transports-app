import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../FirebaseConfig";
import {
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
  getDocFromServer,
  setDoc,
} from "firebase/firestore";

const uploadImageForContainer = async ({
  uri,
  transportId,
  containerNumber,
}) => {
  console.log("uploadImageForContainer");
  console.log({ uri, transportId, containerNumber });

  const fetchResponse = await fetch(uri);
  const blob = await fetchResponse.blob();
  const metadata = {
    contentType: blob.type,
  };

  const extention = uri.split(".").pop();

  const fileName = `${containerNumber}_transport${transportId}_document_${Date.now()}.${extention}`;

  console.log(`fileName: ${fileName}`);
  getDoc;
  console.log(`extention: ${extention}`);

  const imageRef = ref(
    storage,
    `uploads/container/${containerNumber}/${transportId}/${Date.now()}.${extention}`
  );

  console.log(imageRef);

  try {
    await uploadBytes(imageRef, blob, metadata);
  } catch (error) {
    console.log(error);
  }
  console.log("Image Uploaded!");
  const downloadUrl = await getDownloadURL(imageRef);
  console.log(`${downloadUrl}`);
  console.log(`${transportId}_container_${containerNumber}`);

  const docRef = doc(
    db,
    "transports",
    `${transportId}_container_${containerNumber}`
  );
  console.log(`${transportId}_container_${containerNumber}`);
  console.log(docRef);

  try {
    await updateDoc(docRef, {
      files: arrayUnion(downloadUrl),
    });
    console.log("Doc Updated!");
  } catch {
    await setDoc(docRef, {
      files: [downloadUrl],
      containerNumber: containerNumber,
      transportNumber: transportId,
    });
    console.log("Doc Created!");
  }

  // const doc = await getDoc(docRef);
  // if (doc.exists) {
  //   await updateDoc(docRef, {
  //     files: arrayUnion(downloadUrl),
  //   });
  //   console.log("Doc Updated!");
  // } else {
  //   await setDoc(docRef, {
  //     files: [downloadUrl],
  //     containerNumber: containerNumber,
  //     transportNumber: transportId,
  //   });
  //   console.log("Doc Created!");
  // }
};

export { uploadImageForContainer };
