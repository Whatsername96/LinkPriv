import { Text, View } from "react-native";
import { Skeleton } from "moti/skeleton";

import { CardOperation } from "../../Card/Operation";

import { getDescribedRelativeDate } from "@/utils";

import { Transaction } from "@/types/backend";

import { COLORS_SKELETON, spaces } from "@/constants/styles";
import { styles } from "./styles";

export type ListRenderedByDateProps = {
  date: string;
  list: Transaction[];
  isLoading: boolean;
}

export function ListTransactionsRenderedByDate({ date, list, isLoading }: ListRenderedByDateProps) {
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
                title={item.buyerName}
                info={item.productName}
                price={item.sellerAmount}
                status={item.status}
                type={"transaction"}
              />

            )
          })
        }
      </View>
      <View style={styles.divisor} />
    </View>
  );
}
