import { Text, View } from "react-native";

import { CardOperation } from "../../Card/Operation";

import { getDescribedRelativeDate, getWithdrawStatusTranslation } from "@/utils";

import { Transfer } from "@/types/backend";

import { spaces } from "@/constants/styles";
import { styles } from "./styles";

export type ListRenderedByDateProps = {
  date: string;
  list: Transfer[];
  isLoading: boolean;
}

export function ListTransfersRenderedByDate({ date, list, isLoading }: ListRenderedByDateProps) {
  return (
    <View style={styles.container}>
      <View style={isLoading && { marginBottom: spaces.item_space_small }}>
        <Text style={styles.date}>
          {getDescribedRelativeDate(date)}
        </Text>
      </View>
      <View style={styles.content}>
        {
          list.map((item, index) => {
            return (
              <CardOperation
                key={index}
                title={item.bankName}
                info={getWithdrawStatusTranslation(item.status)}
                price={item.amount}
                status={item.status}
                type={"withdraw"}
              />
            )
          })
        }
      </View>
      <View style={styles.divisor} />
    </View>
  );
}
