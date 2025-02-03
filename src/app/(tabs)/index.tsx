import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ArrowDown, ArrowUp } from "phosphor-react-native";

import { useNavigation } from "expo-router";

import {
  CardBalance,
  ChartLine,
  LabelEmphasys,
  LabelInfo,
  LabelSectionTitle,
  CardTransactionShadow,
  LayoutLogged,
  EmptyState,
  LoaderFull
} from "@/components";

import { useGetLastTransactions } from "@/hooks/Api/useTransactions/useGetLastTransactions.hook";
import { useGetChartInfo } from "@/hooks/Api/useChartInfo/useChartInfo.hook";

import { colors, fonts, fonts_sizes, spaces } from "@/constants/styles";

export default function Home() {
  const navigation = useNavigation();

  const {
    getLastTransactions,
    isLoadingLastTransactions,
    listLastTransactions
  } = useGetLastTransactions();

  const {
    getChartInfo,
    isLoadingChartInfo,
    listChartInfo
  } = useGetChartInfo();

  const [isLoadingChartData, setIsLoadingChartData] = useState(true);
  const [isLoadingLastTransactionsData, setIsLoadingLastTransactionsData] = useState(true);

  useEffect(() => {
    if (navigation.isFocused()) {
      setIsLoadingChartData(true);
      setIsLoadingLastTransactionsData(true);
      getLastTransactions();
      getChartInfo();
    } else {
      setIsLoadingChartData(false);
      setIsLoadingLastTransactionsData(false);
    }
  }, [navigation.isFocused()]);

  useEffect(() => {
    setIsLoadingChartData(isLoadingChartInfo)
  }, [isLoadingChartInfo]);

  useEffect(() => {
    setIsLoadingLastTransactionsData(isLoadingLastTransactions)
  }, [isLoadingLastTransactions]);

  if (isLoadingChartData ||
    isLoadingChartInfo ||
    isLoadingLastTransactions ||
    isLoadingLastTransactionsData) {
    return (
      <LoaderFull
        isVisible={
          isLoadingChartData ||
          isLoadingChartInfo ||
          isLoadingLastTransactions ||
          isLoadingLastTransactionsData}
      />
    )
  }

  return (
    <LayoutLogged>
      <View style={styles.container_balance}>
        <LabelInfo text={"Saldo disponível"} textAlign={"center"} />
        <View style={isLoadingChartData && { marginBottom: spaces.item_space_simple }}>
          <Text
            style={styles.balance_value}
          >
            <Text style={styles.brl}>
              R$
            </Text>
            <LabelEmphasys
              text={
                Math.trunc(listChartInfo.availableAmount).toLocaleString("pt-br", {
                  style: "decimal"
                })
              }
            />
            <Text style={styles.decimal}>
              {"," + (listChartInfo.availableAmount % 1).toFixed(2).replace("0.", "")}
            </Text>
          </Text>
        </View>
      </View>
      <ChartLine list={listChartInfo.chart} />
      <View style={styles.container_section}>
        <LabelSectionTitle text={"Últimos 30 dias"} textAlign={"left"} />
        <View style={styles.container_card_balance}>
          <CardBalance
            backgroundColor={colors.green_1_15}
            iconContainerColor={colors.white_50}
            title={"Entrada"}
            textColor={colors.green_1_100}
            isLoading={isLoadingChartInfo}
            value={listChartInfo.paidAmount}
            icon={
              <ArrowUp
                size={spaces.item_space_simple}
                color={colors.green_1_100}
                weight={"bold"}
              />
            }
          />
          <CardBalance
            backgroundColor={colors.pink_2_15}
            iconContainerColor={colors.white_50}
            title={"Saques"}
            textColor={colors.pink_2_100}
            isLoading={isLoadingChartData}
            value={listChartInfo.transferredAmount}
            icon={
              <ArrowDown
                size={spaces.item_space_simple}
                color={colors.pink_2_100}
                weight={"bold"}
              />
            }
          />
        </View>
      </View>
      <View style={styles.container_section}>
        <LabelSectionTitle text={"Últimas transações"} textAlign={"left"} />
        <View style={styles.container_cards}>
          {listLastTransactions.length > 0 ||
            listLastTransactions.length === 0 &&
            isLoadingLastTransactionsData ?
            listLastTransactions.map(item => {
              return (
                <CardTransactionShadow
                  key={item.publicAccessId}
                  date={item.dateCreated}
                  title={item.productName}
                  price={item.sellerAmount}
                  isLoading={isLoadingLastTransactionsData}
                  transactionStatus={item.status}
                />
              )
            })
            :
            <EmptyState text={"Nenhuma transação encontrada."} />
          }
        </View>
      </View>
    </LayoutLogged>
  );
}

const styles = StyleSheet.create({
  container_balance: {
    paddingHorizontal: spaces.item_space_med,
  },
  balance_value: {
    flexShrink: 1,
    textAlign: "center",
  },
  brl: {
    fontFamily: fonts.sofiapro_regular,
    fontSize: fonts_sizes.emphasis,
    flexShrink: 1
  },
  decimal: {
    fontFamily: fonts.sofiapro_semiBold,
    fontSize: fonts_sizes.text_med,
    flexShrink: 1,
  },
  container_section: {
    marginTop: spaces.item_space_simple_med,
    paddingHorizontal: spaces.item_space_med,
  },
  container_card_balance: {
    flexDirection: "row",
    marginTop: spaces.item_space_small,
    gap: spaces.item_space_extra_min,
    marginBottom: spaces.item_space_tiny_big
  },
  container_cards: {
    marginTop: spaces.item_space_min_big,
    gap: spaces.item_space_min,
    paddingBottom: spaces.item_space_plus
  }
});
