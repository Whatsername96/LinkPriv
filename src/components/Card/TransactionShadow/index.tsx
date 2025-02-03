import { Image, Text, View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import moment from "moment";

import { getTransactionStatusColor, getTransactionStatusTranslation } from "@/utils";
import { TransactionStatus } from "@/types/backend";

import { colors, spaces } from "@/constants/styles";
import { styles } from "./styles";

type CardOperationProps = {
  date: string;
  title: string;
  price: number;
  transactionStatus: TransactionStatus;
  isLoading: boolean;
}

export function CardTransactionShadow({
  date = moment(new Date()).format("YYYY-MM-DD"),
  title = "Título",
  price = 0.00,
  transactionStatus = TransactionStatus.Paid,
  isLoading
}: CardOperationProps) {
  return (
    <Shadow
      startColor={colors.gray_9_100}
      endColor={colors.transparent}
      style={styles.container}
      distance={spaces.item_space_small}
      offset={[0, -3]}
    >
      <View style={styles.container_image_info}>
        <View style={styles.container_image}>
          <Image
            source={require("@/assets/icons/pix.png")}
            resizeMode={"contain"}
            style={styles.image}
          />
        </View>
        <View style={styles.text_info_container}>
          <Text style={styles.name_info}
            numberOfLines={3}
            ellipsizeMode={"tail"}
          >
            {title}
          </Text>
          <Text style={styles.time_ago}>
            {moment(date).fromNow()}
          </Text>
        </View>
      </View>
      <View style={styles.container_value}>
        <Text style={styles.text_price}>
          <Text style={styles.brl}>
            R$
          </Text>
          <Text style={styles.value}>
            {
              Math.trunc(price).toLocaleString("pt-br", {
                style: "decimal"
              })
            }
          </Text>
          <Text style={styles.decimal}>
            {"," + (price % 1).toFixed(2).replace("0.", "")}
          </Text>
        </Text>
        <Text
          style={[styles.transaction_status,
          { color: getTransactionStatusColor(transactionStatus) }]}
        >
          {getTransactionStatusTranslation(transactionStatus)}
        </Text>
      </View>
    </Shadow>
  );
}
