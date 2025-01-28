import { Text, View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import moment from "moment";

import { MainLogo } from "@/assets/logos/MainLogo";

import { colors, spaces } from "@/constants/styles";

import { styles } from "./styles";

type CardNotificationProps = {
  title: string;
  dateAgo: string;
  description: string;
}

export function CardNotification({ title, dateAgo, description }: CardNotificationProps) {
  return (
    <Shadow
      startColor={colors.gray_9_100}
      endColor={colors.transparent}
      style={styles.container}
      distance={spaces.item_space_small}
      offset={[0, 0]}
    >
      <View style={styles.content}>
        <MainLogo
          width={spaces.item_space_plus}
          height={spaces.item_space_plus}
          style={styles.logo}
        />
        <View style={styles.textContainer}>
          <View style={styles.title_date_container}>
            <Text style={styles.title}>
              Transação Pix Gerada 👀
            </Text>
            <Text style={styles.date}>
              {moment("2025-01-18T01:10:00").fromNow(false)}
            </Text>
          </View>
          <Text style={styles.description}>
            Um pix no valor de R$27,90 foi gerado.
          </Text>
        </View>
      </View>
    </Shadow>
  );
}


