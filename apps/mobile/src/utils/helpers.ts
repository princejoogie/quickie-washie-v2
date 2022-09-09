import { AxiosError } from "axios";
import * as ImagePicker from "expo-image-picker";

export const getImage = async ({
  mediaTypes = ImagePicker.MediaTypeOptions.Images,
  allowsEditing = true,
  quality = 0.5,
  ...rest
}: ImagePicker.ImagePickerOptions = {}) => {
  const result = await ImagePicker.launchImageLibraryAsync({
    ...rest,
    mediaTypes,
    allowsEditing,
    quality,
  });

  if (!result.cancelled) {
    return result.uri;
  }

  return null;
};

export const handleServerError = (error: unknown) => {
  if (error instanceof AxiosError) {
    return error.response?.data;
  }

  return new Error("Something went wrong");
};
