import React, { useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";

export default function MemoRGBHexPicker() {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#38BDF8");

  const colors = [
    "#38BDF8", "#34D399", "#FBBF24", "#FB7185",
    "#A78BFA", "#F472B6", "#60A5FA", "#4ADE80",
    "#FACC15", "#F87171", "#C084FC", "#F472B6"
  ];

  const togglePicker = () => {
    setIsPickerOpen(!isPickerOpen);
  };

  const handleSelectColor = (color: string) => {
    setSelectedColor(color);
    setIsPickerOpen(false);
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <TouchableOpacity
        className="bg-blue-500 p-4 rounded-xl"
        onPress={togglePicker}
      >
        <Text className="text-white font-bold">Pick a Color</Text>
      </TouchableOpacity>

      <View
        className="w-24 h-24 rounded-full mt-8"
        style={{ backgroundColor: selectedColor }}
      />

      {isPickerOpen && (
        <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 items-center justify-center">
          <View className="bg-white p-6 rounded-2xl w-80">
            <Text className="text-lg font-bold text-center mb-4">Choose Color</Text>
            
            <View className="flex flex-row flex-wrap justify-center">
              {colors.map((color) => (
                <Pressable
                  key={color}
                  onPress={() => handleSelectColor(color)}
                  className="w-12 h-12 m-2 rounded-full"
                  style={{ backgroundColor: color }}
                />
              ))}
            </View>

            <TouchableOpacity
              className="mt-6 bg-gray-300 p-3 rounded-xl"
              onPress={togglePicker}
            >
              <Text className="text-black font-semibold text-center">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
