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

interface ErrorReponse {
  statusCode: number;
  message: string;
}

export const handleError = (error: unknown): ErrorReponse => {
  if (error instanceof AxiosError) {
    return error.response?.data;
  }

  return {
    statusCode: 500,
    message: "Something went wrong",
  };
};
