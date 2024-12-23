import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../FirebaseConfig";
import {
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
  getDocFromServer,
} from "firebase/firestore";

const uploadImageForContainer = async (
  uri,
  transportNumber,
  containerNumber
) => {
  const fetchResponse = await fetch(uri);
  const blob = await fetchResponse.blob();
  const metadata = {
    contentType: blob.type,
  };

  const extention = uri.split(".").pop();

  const fileName = `${containerNumber}_transport${transportNumber}_document_${Date.now()}.${extention}
  }`;

  console.log(
    `uploads/container/${containerNumber}/${transportNumber}/${fileName}`
  );

  const imageRef = ref(
    storage,
    `uploads/container/${containerNumber}/${transportNumber}/${Date.now()}`
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
  const docRef = doc(
    db,
    "transports",
    `${transportNumber}_container_${containerNumber}`
  );
  console.log(`${transportNumber}_container_${containerNumber}`);
  console.log(docRef);
  await updateDoc(docRef, {
    files: arrayUnion(downloadUrl),
  });
  console.log("Doc Updated!");
};

export { uploadImageForContainer };
