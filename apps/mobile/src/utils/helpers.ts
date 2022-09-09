import * as ImagePicker from "expo-image-picker";

export const getImage = async ({
  mediaTypes = ImagePicker.MediaTypeOptions.Images,
  allowsEditing = true,
  aspect = [1, 1],
  quality = 0.5,
  ...rest
}: ImagePicker.ImagePickerOptions = {}) => {
  const result = await ImagePicker.launchImageLibraryAsync({
    ...rest,
    mediaTypes,
    allowsEditing,
    aspect,
    quality,
  });

  if (!result.cancelled) {
    return result.uri;
  }

  return null;
};
