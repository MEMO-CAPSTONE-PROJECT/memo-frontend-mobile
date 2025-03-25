import React, { useState } from 'react';
import { PanResponder, Text, View } from 'react-native';

interface MemoRGBHexPickerProps {
  hue: number;
  setHue: React.Dispatch<React.SetStateAction<number>>;
}

const MemoRGBHexPicker = () => {
    const [hue, setHue] = useState<number>(0);

    const hslToHex = (h: number): string => {
      const f = (n: number, k = (n + h / 30) % 12) =>
        Math.round(255 * (1 - Math.max(0, Math.min(k - 3, 9 - k, 1))));
      return `#${[f(0), f(8), f(4)].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase()}`;
    };
  
    const panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const newHue = Math.max(0, Math.min(360, hue + gestureState.dx * 0.5));
        setHue(newHue);
      }
    });
  
    return (
      <View className="flex justify-center items-center bg-white gap-y-lg">
        <View className="w-16 h-16 border border-black rounded-circle" style={{ backgroundColor: hslToHex(hue) }} />
        <Text className="text-xl font-bold">{hslToHex(hue)}</Text>
        <View 
          className="w-full h-3 bg-system-gray rounded-lg" 
          {...panResponder.panHandlers}
        />
      </View>
    );
};

export default MemoRGBHexPicker;
