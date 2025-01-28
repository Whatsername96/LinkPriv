import { Text, TouchableOpacity, View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { Skeleton } from "moti/skeleton";

import { colors, COLORS_SKELETON, fonts_sizes } from "@/constants/styles";
import { styles } from "./styles";

type CardBalanceAvaliableProps = {
  backgroundColor: string;
  title: string;
  textColor: string;
  valueSize?: number;
  value: number;
  valueDecimalSize?: number;
  buttonBackgroundColor?: string;
  buttonText?: string | undefined;
  buttonTextColor?: string;
  isLoading: boolean;
  handleClickInButton?: () => void;
}

export function CardBalanceAvaliable({
  backgroundColor,
  textColor,
  title = "",
  valueSize = fonts_sizes.text_med,
  value = 0.00,
  valueDecimalSize = fonts_sizes.detail,
  buttonBackgroundColor = "",
  buttonText = "",
  buttonTextColor = "",
  isLoading,
  handleClickInButton = () => { }
}: CardBalanceAvaliableProps) {

  return (
    <View
      style={[styles.container, { backgroundColor: backgroundColor }]}
    >
      <View style={styles.content}>
        <View>
          <Text style={[styles.title, { color: textColor }]}>
            {title}
          </Text>
          <View>
            {/* <Skeleton
              show={isLoading}
              colorMode={'light'}
              colors={COLORS_SKELETON}
            > */}
            <Text
              style={styles.text_price_full}
            >
              <Text style={[styles.brl, { color: textColor }]}>
                R$
              </Text>
              <Text style={[styles.trunc, { color: textColor }, { fontSize: valueSize }]}>
                {Math.trunc(value).toLocaleString("pt-br", {
                  style: "decimal"
                })}
              </Text>
              <Text style={[styles.decimal, { color: textColor }, { fontSize: valueDecimalSize }]}>
                {"," + (value % 1).toFixed(2).replace("0.", "")}
              </Text>
            </Text>
            {/* </Skeleton> */}
          </View>
        </View>
        {buttonText &&
          <Shadow
            startColor={colors.gray_8_25}
            endColor={colors.transparent}
            style={styles.button_right_shadow}
            distance={3}
          >
            {/* <Skeleton
              show={isLoading}
              colorMode={'light'}
              colors={COLORS_SKELETON}
            > */}
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={handleClickInButton}
              disabled={isLoading}
              style={
                [styles.button_right,
                { backgroundColor: buttonBackgroundColor }]
              }
            >
              <Text style={[styles.button_right_text, { color: buttonTextColor }]}>
                {buttonText}
              </Text>
            </TouchableOpacity>
            {/* </Skeleton> */}
          </Shadow>
        }
      </View>
    </View>
  );
}
