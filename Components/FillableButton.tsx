import {useState, useEffect} from "react";
import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

type propsType = {
  onPress: () => any
  isActive: boolean,
  emptyIconStyle: keyof typeof Ionicons.glyphMap
  filledIconStyle: keyof typeof Ionicons.glyphMap
  emptyIconColor?: string
  filledIconColor: string
}

function FillableButton({onPress, isActive, emptyIconStyle, filledIconStyle, filledIconColor, emptyIconColor = '#444'}: propsType) {
  const [iconStyle, setIconStyle]: [typeof filledIconStyle | typeof emptyIconStyle, any] = useState(emptyIconStyle)
  const [iconColor, setIconColor]: [typeof filledIconColor | typeof emptyIconColor, any] = useState(emptyIconColor)

  useEffect(() => {
    setIconStyle(isActive ? filledIconStyle : emptyIconStyle);
    setIconColor(isActive ? filledIconColor : emptyIconColor);
  }, [isActive]);

  return (
    <Pressable onPress={onPress} style={ ({pressed}) => pressed && styles.pressed }>
      <Ionicons name={iconStyle} size={24} color={iconColor} />
    </Pressable>
  );
}

export function StarButton({onPress, isActive}: {onPress: () => any, isActive: boolean}) {
  return FillableButton({
    onPress: onPress,
    isActive: isActive,
    emptyIconStyle: 'star-outline',
    filledIconStyle: 'star',
    filledIconColor: 'gold',
  })
}

export function HeartButton({onPress, isActive}: {onPress: () => any, isActive: boolean}) {
  return FillableButton({
    onPress: onPress,
    isActive: isActive,
    emptyIconStyle: 'heart-outline',
    filledIconStyle: 'heart',
    filledIconColor: 'red',
  })
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  }
})