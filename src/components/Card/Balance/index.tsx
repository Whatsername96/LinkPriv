import { ReactNode } from "react";
import { Text, View } from "react-native";

import { styles } from "./styles";
import { Skeleton } from "moti/skeleton";
import { COLORS_SKELETON } from "@/constants/styles";

type CardBalance = {
  backgroundColor: string;
  iconContainerColor?: string;
  title: string;
  textColor: string;
  value: number;
  icon?: ReactNode | undefined;
  isLoading: boolean;
}

export function CardBalance({
  backgroundColor,
  iconContainerColor = "",
  textColor,
  title,
  icon = undefined,
  value = 0.00,
  isLoading
}: CardBalance) {

  return (
    <View
      style={[styles.container, { backgroundColor: backgroundColor }]}
    >
      <View style={styles.content_group}>
        <View style={styles.content}>
          <Text style={[styles.title, { color: textColor }]}>
            {title}
          </Text>
          {
            icon &&
            <View style={[styles.container_icon, { backgroundColor: iconContainerColor }]}>
              {icon}
            </View>
          }
        </View>
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
            <Text style={[styles.trunc, { color: textColor }]}>
              {Math.trunc(value).toLocaleString("pt-br", {
                style: "decimal"
              })}
            </Text>
            <Text style={[styles.decimal, { color: textColor }]}>
              {"," + (value % 1).toFixed(2).replace("0.", "")}
            </Text>
          </Text>
          {/* </Skeleton> */}
        </View>
      </View>
    </View>
  );
}
