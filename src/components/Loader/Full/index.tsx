import { useEffect } from "react";
import { View, Dimensions, Modal } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  interpolate,
  Easing,
} from "react-native-reanimated";

import { colors } from "@/constants/styles";
import { MainLogo } from "@/assets/logos/MainLogo";
import { styles } from "./styles";

type LoaderFullProps = {
  isVisible: boolean;
}

export function LoaderFull({ isVisible }: LoaderFullProps) {
  const { height } = Dimensions.get("screen");
  const progress = useSharedValue(0);
  const scale = useSharedValue(1);
  const fadeAnim = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 3000, easing: Easing.linear }),
      -1,
      false
    );

    scale.value = withRepeat(
      withTiming(1.2, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease)
      }),
      -1,
      true
    );
  }, []);


  useEffect(() => {
    if (isVisible) {
      fadeAnim.value = withTiming(1, { duration: 500 });
    } else {
      fadeAnim.value = withTiming(0, { duration: 500 });
    }
  }, [isVisible]);

  function renderCircle(index: number, initialSize: number, maxSize: number, color: string) {
    const animatedStyle = useAnimatedStyle(() => {
      const cycleProgress = (progress.value + index * 0.25) % 1;

      const size = interpolate(cycleProgress, [0, 1], [initialSize, maxSize]);

      const opacity = interpolate(cycleProgress, [0, 0.8, 1], [0, 1, 0]);

      return {
        width: size,
        height: size,
        borderRadius: size / 2,
        overflow: "hidden",
        opacity,
        backgroundColor: color,
      };
    });

    return <Animated.View key={index} style={[styles.circle, animatedStyle]} />;
  };

  const breathingAnimation = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const circles = [
    { initialSize: height / 8, maxSize: height / 1.2, color: colors.pink_2_10 },
    { initialSize: height / 8, maxSize: height / 1.2, color: colors.pink_2_10 },
    { initialSize: height / 8, maxSize: height / 1.2, color: colors.pink_2_10 },
    { initialSize: height / 8, maxSize: height / 1.2, color: colors.pink_2_10 },
  ];

  return (
    <Modal
      visible={isVisible}
      animationType={"fade"}
      onDismiss={() => { }}
      onRequestClose={() => { }}
    >
      <Animated.View
        style={[
          styles.container,
          { opacity: fadeAnim },
        ]}
      >
        {circles.map((circle, index) =>
          renderCircle(index, circle.initialSize, circle.maxSize, circle.color)
        )}
        <Animated.View style={[breathingAnimation]}>
          <MainLogo width={height / 8} height={height / 8} />
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}
