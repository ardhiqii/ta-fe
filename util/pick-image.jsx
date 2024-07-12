import * as ImagePicker from "expo-image-picker";

const imageToFormData = async (image) => {
  const formData = new FormData();
  const uri = image;
  const fileType = uri.split(".").pop();

  // Convert the image to a binary string (base64)
  const response = await fetch(uri);
  const blob = await response.blob();
  // Get file size in bytes
  const fileSize = blob.size;

  // Optional: Convert size to kilobytes (KB) or megabytes (MB) for easier readability
  const fileSizeInKB = fileSize / 1024;
  const fileSizeInMB = fileSizeInKB / 1024;

  console.log(`File size: ${fileSize} bytes`);
  console.log(`File size: ${fileSizeInKB.toFixed(2)} KB`);
  console.log(`File size: ${fileSizeInMB.toFixed(2)} MB`);
  const base64Data = await blobToBase64(blob);

  formData.append("file", {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });
  formData.append("binary", base64Data);
  return formData;
};

const blobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const pick = async (allowsEditing = true) => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: allowsEditing, // Set to true if you want to allow image editing
    quality:0.2,
  });

  if (!result.canceled && result.assets.length === 1) {
    return result.assets[0].uri;
  } else {
    return null;
  }
};

export const PickImage = {
  pick,
  imageToFormData,
};
