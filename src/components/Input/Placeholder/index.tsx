import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import { colors, fonts_sizes } from "@/constants/styles";
import { styles } from "./styles";

type PlaceholderProps = {
  isFocused: boolean;
  isFilled: boolean;
  placeholder: string;
  handleClickInPlaceholder: () => void;
};

export function Placeholder({ isFocused, isFilled, placeholder, handleClickInPlaceholder }: PlaceholderProps) {
  const translateY = useSharedValue(12);
  const fontSize = useSharedValue(fonts_sizes.text_small);
  const color = useSharedValue(colors.black_1_100);

  useEffect(() => {
    const active = isFocused || isFilled;
    translateY.value = withTiming(active ? -10 : 12, { duration: 200 });
    fontSize.value = withTiming(active ? fonts_sizes.detail : fonts_sizes.text_small, {
      duration: 200,
    });
    color.value = withTiming(active ? colors.pink_2_100 : colors.black_1_100, {
      duration: 200,
    });
  }, [isFocused, isFilled]);

  // Estilo animado
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    fontSize: fontSize.value,
    color: color.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.placeholder, animatedStyle]} onPress={handleClickInPlaceholder}>
        {placeholder}
      </Animated.Text>
    </View>
  );
}
