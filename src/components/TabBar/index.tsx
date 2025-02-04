import { View, TouchableOpacity } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

import { colors, spaces } from "@/constants/styles";
import { styles } from "./styles";
import { ExternalPathString, useRouter } from "expo-router";

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const router = useRouter();

  return (
    <Shadow
      startColor={colors.gray_9_100}
      endColor={colors.transparent}
      style={styles.container}
      distance={spaces.item_space_simple}
      offset={[0, -3]}
    >
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const iconProps = {
            focused: isFocused,
            color: isFocused ? colors.pink_2_100 : colors.gray_3_100,
            size: spaces.item_space_simple_med,
          };

          function onPress() {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              if (route.name === "(withdrawals)") {
                router.push(`/(tabs)/(withdrawals)/list-withdrawals`);
              } else {
                router.push(`/(tabs)/${route.name !== "index" ? route.name : ""}` as ExternalPathString);
              }
            }
          };
          if (route.name !== "notifications") {
            return (
              <TouchableOpacity
                key={route.key}
                activeOpacity={0.6}
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarButtonTestID}
                onPress={onPress}
                style={styles.tabItem}
              >
                {options.tabBarIcon && typeof options.tabBarIcon === "function"
                  ? options.tabBarIcon(iconProps)
                  : options.tabBarIcon}
              </TouchableOpacity>
            );
          }
        })}
      </View>
    </Shadow>
  );
}
