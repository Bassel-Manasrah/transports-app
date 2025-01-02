import axios from "axios";

const getRecipients = async () => {
  console.log("getRecipients");

  const url = `https://kareem-transportation.online/api/recipients`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching recipients:", error);
  }
};

const createContainerRecipient = async ({
  transportId,
  containerId,
  recipientId,
}) => {
  console.log("createContainerRecipient");

  const url =
    "https://kareem-transportation.online/api/recipientContainer/createContainerRecipient";
  const data = {
    containerId,
    transportId,
    recipientId,
  };
  axios
    .post(url, data)
    .then((response) => {
      console.log("Response:", response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const getRecipientForContainer = async ({ containerId, transportId }) => {
  console.log("getRecipientForContainer");

  console.log(`containerId: ${containerId}, transportId: ${transportId}`);

  const url = `https://kareem-transportation.online/api/recipients/by-container-transport?containerId=${containerId}&transportId=${transportId}`;

  try {
    const response = await axios.get(url);
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    return null;
  }
};

export { getRecipients, createContainerRecipient, getRecipientForContainer };
