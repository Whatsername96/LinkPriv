
import { Text, TouchableOpacity, View } from "react-native";
import { Shadow } from "react-native-shadow-2";

import { colors, spaces } from "@/constants/styles";
import { styles } from "./styles";

type EmptyStateProps = {
  text: string;
  internalCtaText?: string;
  handleClickInCta?: () => void;
}

export function EmptyState({ text, internalCtaText = "", handleClickInCta = () => { } }: EmptyStateProps) {
  return (
    <Shadow
      startColor={colors.gray_10_25}
      endColor={colors.transparent}
      style={styles.container}
      distance={spaces.item_space_tiny_big}
      offset={[3, 2]}
    >
      <View style={styles.content}>
        <Text style={styles.text}>
          {text}{" "}
        </Text>
        {
          internalCtaText.length > 0 &&
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleClickInCta}
          >
            <Text style={[styles.text, styles.cta]}>
              {internalCtaText}
            </Text>
          </TouchableOpacity>
        }
      </View>
    </Shadow>
  );
}
