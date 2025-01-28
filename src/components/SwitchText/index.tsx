import { Dispatch, SetStateAction } from "react";
import { Text, View } from "react-native";
import ToggleSwitch from "toggle-switch-react-native";

import { styles } from "./styles";
import { colors } from "@/constants/styles";

type SwitchTextProps = {
  label: string;
  isEnabled: boolean;
  onToggle: () => void;
}

export function SwitchText({ label, isEnabled, onToggle }: SwitchTextProps) {
  return (
    <View style={styles.container}>
      <ToggleSwitch
        isOn={isEnabled}
        onColor={colors.pink_2_100}
        offColor={colors.gray_4_100}
        size="medium"
        onToggle={onToggle}
      />
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}
