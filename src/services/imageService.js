import { doc, getDoc } from "firebase/firestore";
import { db } from "../../FirebaseConfig";

const getImages = async ({ transportId, containerNumber }) => {
  const docRef = doc(
    db,
    "transports",
    `${transportId}_container_${containerNumber}`
  );
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    data = docSnap.data();
    console.log("Document data:", data.files);
    return data.files;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
};

export { getImages };
