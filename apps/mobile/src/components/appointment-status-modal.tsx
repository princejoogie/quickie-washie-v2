import { useState } from "react";
import { View, Modal, Text, TouchableOpacity } from "react-native";
import { IAppointmentStatus, IAppointmentStatusNames } from "../constants";

interface AppointmentStatusModalProps {
  initialValue: IAppointmentStatus;
  visible: boolean;
  closeModal: () => void;
  onDismiss: (type: IAppointmentStatus) => void;
}

export const AppointmentStatusModal = ({
  visible,
  onDismiss,
  closeModal,
  initialValue,
}: AppointmentStatusModalProps) => {
  const [type, setType] = useState<IAppointmentStatus>(initialValue);

  return (
    <View className="flex-1">
      <Modal
        transparent
        animationType="fade"
        visible={visible}
        onRequestClose={closeModal}
      >
        <TouchableOpacity
          activeOpacity={90}
          onPress={closeModal}
          className="flex flex-col flex-1 items-center justify-center bg-black/70"
        >
          <View className="bg-gray-900 w-10/12 rounded-lg border-2 border-gray-800 p-3">
            {Object.entries(IAppointmentStatusNames).map(([key, value]) => (
              <TouchableOpacity
                key={key}
                onPress={() => {
                  setType(key as IAppointmentStatus);
                }}
              >
                <View
                  className={`w-full p-3 rounded-md ${
                    key === type
                      ? "bg-gray-800 border-2 border-gray-700"
                      : "bg-transparent border-2 border-transparent"
                  }`}
                >
                  <Text className="text-white text-center">{value}</Text>
                </View>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              className="bg-green-600 border-2 border-green-500 py-2 w-1/2 rounded-md self-center mt-6"
              onPress={() => {
                onDismiss(type);
              }}
            >
              <Text className="text-white text-center font-bold">OK</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};
