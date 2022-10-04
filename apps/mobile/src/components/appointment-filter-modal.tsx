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
          className="flex flex-1 flex-col items-center justify-center bg-black/70"
        >
          <View className="w-10/12 rounded-lg border-2 border-gray-800 bg-gray-900 p-3">
            {Object.entries(FilterTypeNames).map(([key, value]) => (
              <TouchableOpacity
                key={key}
                onPress={() => {
                  setType(key as FilterType);
                }}
              >
                <View
                  className={`w-full rounded-md p-3 ${
                    key === type
                      ? "border-2 border-gray-700 bg-gray-800"
                      : "border-2 border-transparent bg-transparent"
                  }`}
                >
                  <Text className="text-center text-white">{value}</Text>
                </View>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              className="mt-6 w-1/2 self-center rounded-md border-2 border-green-500 bg-green-600 py-2"
              onPress={() => {
                onDismiss(type);
              }}
            >
              <Text className="text-center font-bold text-white">OK</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};
