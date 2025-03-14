import { Platform, Text, TouchableOpacity, View } from "react-native";
import { Shadow } from "react-native-shadow-2";

import { colors, fonts_sizes } from "@/constants/styles";
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
  isButtonDisabled?: boolean;
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
  isButtonDisabled = false,
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
          </View>
        </View>
        {buttonText &&
          <Shadow
            startColor={colors.gray_8_25}
            endColor={colors.transparent}
            style={styles.button_right_shadow}
            distance={3}
          >
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={handleClickInButton}
              disabled={isLoading || isButtonDisabled || Platform.OS === 'ios'}
              style={[
                styles.button_right,
                { backgroundColor: buttonBackgroundColor },
                (isButtonDisabled || isLoading || Platform.OS === 'ios') && { opacity: 0.7 }
              ]}
            >
              <Text style={[styles.button_right_text, { color: buttonTextColor }]}>
                {buttonText}
              </Text>
            </TouchableOpacity>
            {isButtonDisabled && value < 10 &&
              <Text style={styles.info_withdraw}>
                O valor mínimo para saques é R$ 10,00.
              </Text>
            }
          </Shadow>
        }
        {Platform.OS === 'ios' &&
          <Text style={styles.info_withdraw}>* Realize os pedidos de saque na versão online.</Text>
        }
      </View>
    </View>
  );
}
