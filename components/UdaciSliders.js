import React from 'react';
import { View, Text, Slider } from 'react-native';

export default function UdaciSliders({ max, value, step, unit, onChange }) {
  return (
    <View>
      <Slider
        value={value}
        maximumValue={max}
        minimumValue={0}
        onValueChange={onChange}
        step={step}
      />

      <View>
        <Text>{value}</Text>
        <Text>{unit}</Text>
      </View>
    </View>
  );
}
