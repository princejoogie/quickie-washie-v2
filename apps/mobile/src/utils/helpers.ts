import { AxiosError } from "axios";
import * as ImagePicker from "expo-image-picker";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

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
    base64: true,
  });

  if (!result.cancelled) {
    const file = await manipulateAsync(
      result.uri,
      result.width > 500 ? [{ resize: { width: 500 } }] : undefined,
      {
        base64: true,
        format: SaveFormat.JPEG,
        compress: 0.5,
      }
    );

    return {
      uri: file.uri,
      base64: file.base64,
    };
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
