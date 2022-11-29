import { AxiosError } from "axios";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { GetAllAppointmentsResponse } from "@qw/dto";
import { endOfDay, startOfDay } from "date-fns";

export const getDocument = async () => {
  const result = await DocumentPicker.getDocumentAsync({
    copyToCacheDirectory: false,
  });

  if (result.type === "success") {
    return {
      uri: result.uri,
      name: result.name,
      mimeType: result.mimeType,
      size: result.size,
    };
  }

  return null;
};

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

export interface IsAllowedForBookingProps {
  date: Date;
  apts: GetAllAppointmentsResponse;
  maxBookingsPerDay: number;
  serviceId: string;
}

export const isAllowedForBooking = ({
  date,
  apts,
  serviceId,
  maxBookingsPerDay,
}: IsAllowedForBookingProps) => {
  const start = startOfDay(date);
  const end = endOfDay(date);

  const filtered = apts
    .filter((e) => e.serviceId === serviceId)
    .filter((apt) => {
      const aptDate = new Date(apt.date);
      return aptDate >= start && aptDate <= end;
    });

  return {
    numberOfBookings: filtered.length,
    isAllowed: filtered.length < maxBookingsPerDay,
  };
};
