import * as ImagePicker from "expo-image-picker";

const imageToFormData = async (image) => {
  const formData = new FormData();
  const uri = image;
  const fileType = uri.split(".").pop();

  // Convert the image to a binary string (base64)
  const response = await fetch(uri);
  const blob = await response.blob();
  const base64Data = await blobToBase64(blob);

  formData.append("file", {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });
  formData.append("binary", base64Data);
  return formData
};

const blobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const pick = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true, // Set to true if you want to allow image editing
    quality: 1,
  });

  if (!result.canceled && result.assets.length === 1) {
    return result.assets[0].uri;
  } else {
    return null;
  }
};

export const PickImage = {
  pick,
  imageToFormData
};
