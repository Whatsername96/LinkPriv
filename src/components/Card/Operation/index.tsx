import { Image, Text, View } from "react-native";

import { getTransactionStatusColor, getTransactionStatusTranslation, getWithdrawStatusColor, getWithdrawStatusTranslation } from "@/utils";
import { TransactionStatus, WithdrawStatus } from "@/types/backend";
import { colors } from "@/constants/styles";
import { styles } from "./styles";

export type CardOperationProps = {
  id: number;
  title: string;
  info: string;
  price: number;
  type: "transaction" | "withdraw";
  status: TransactionStatus | WithdrawStatus;
}

type CardOperationPropsShort = Omit<CardOperationProps, "id">

export function CardOperation({
  title,
  info,
  price,
  type,
  status
}: CardOperationPropsShort) {
  return (
    <View style={styles.container}>
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
          <Text style={styles.product_info}>
            {type === "transaction" ? info : getWithdrawStatusTranslation(status as WithdrawStatus)}
          </Text>
        </View>
      </View>
      <View style={styles.container_price_operation_status}>
        <Text style={[
          styles.price,
          type === "transaction" ?
            { color: colors.black_2_100 } :
            {
              color: getWithdrawStatusColor(status as WithdrawStatus),
              textDecorationLine: (status as WithdrawStatus) === WithdrawStatus.Failed ? "line-through" : "none"
            },
        ]}
        >
          {"R$" + (price).toLocaleString("pt-BR", {
            style: "decimal",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}
        </Text>
        {
          type === "transaction" &&
          <Text
            style={[styles.transaction_status,
            { color: getTransactionStatusColor(3) }]}
          >
            {getTransactionStatusTranslation(3)}
          </Text>
        }
      </View>
    </View>
  );
}
