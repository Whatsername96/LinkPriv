import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { styles } from "./styles";
import { colors, spaces } from "@/constants/styles";

type ButtonProps = TouchableOpacityProps & {
  text: string;
  isLoading?: boolean;
  isDisabled?: boolean;
}

export function Button({ text, isLoading = false, isDisabled = false, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.7}
      {...rest}
      disabled={isDisabled || isLoading}
    >
      <LinearGradient
        colors={isLoading || isDisabled ?
          [colors.pink_2_50, colors.pink_2_100] :
          [colors.pink_2_100, colors.pink_2_50]}
        start={{ x: 0.2, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
        style={styles.gradient_bg}
      >
        {
          isLoading ?
            <View style={styles.container_loading}>
              <ActivityIndicator
                size={spaces.item_space_med_min}
                color={colors.white_50}
              />
            </View>
            :
            <Text
              style={[styles.text, isDisabled ?
                { color: colors.white_50 } :
                { color: colors.white_100 }]}>
              {text}
            </Text>
        }
      </LinearGradient>
    </TouchableOpacity>
  );
}
