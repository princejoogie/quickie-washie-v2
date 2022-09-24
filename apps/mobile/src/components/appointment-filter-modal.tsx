import { useState } from "react";
import { View, Modal, Text, TouchableOpacity } from "react-native";
import { FilterTypeNames, FilterType } from "../constants";

interface AppointmentFilterModalProps {
  initialValue: FilterType;
  visible: boolean;
  closeModal: () => void;
  onDismiss: (type: FilterType) => void;
}

export const AppointmentFilterModal = ({
  visible,
  onDismiss,
  closeModal,
  initialValue,
}: AppointmentFilterModalProps) => {
  const [type, setType] = useState<FilterType>(initialValue);

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
            {Object.entries(FilterTypeNames).map(([key, value]) => (
              <TouchableOpacity
                key={key}
                onPress={() => {
                  setType(key as FilterType);
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
