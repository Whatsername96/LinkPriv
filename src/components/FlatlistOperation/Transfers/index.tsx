import { ReactNode, useState, useEffect, Fragment } from "react";
import { FlatList, Text, View } from "react-native";

import { ListTransfersRenderedByDate } from "@/components/List/ListTransfersRenderedByDate";
import { EmptyState } from "@/components/EmptyState";
import { FlatlistOperationHeader } from "../Header";

import { TransferByDate } from "@/types/backend";

import { spaces } from "@/constants/styles";
import { styles } from "./styles";
import { LoaderSimple } from "@/components/Loader/Simple";


type FlatlistOperaationListProps = {
  titleSection: string;
  textEmptyState: string;
  textEndReachedData?: string;
  list: TransferByDate[];
  emptyStateInternalCtaText?: string;
  handleClickInCtaInEmptyState?: () => void;
  handleScrollToEnd?: () => void;
  extraContentHeader?: ReactNode | undefined;
  isLoading: boolean;
  fetchedListFirstTime: boolean;
};

export function FlatlistTransfersList({
  titleSection,
  textEmptyState,
  textEndReachedData = "",
  emptyStateInternalCtaText = "",
  handleClickInCtaInEmptyState = () => { },
  handleScrollToEnd = () => { },
  list,
  extraContentHeader,
  isLoading,
  fetchedListFirstTime
}: FlatlistOperaationListProps) {
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  useEffect(() => {
    if (!isLoading && list.length > 0) {
      setInitialLoadComplete(true);
    } else if (!isLoading && list.length === 0 && initialLoadComplete) {
      setInitialLoadComplete(true);
    }

    return () => setInitialLoadComplete(false);
  }, [isLoading, list]);

  return (
    <FlatList
      style={styles.container}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <FlatlistOperationHeader
          textSection={titleSection}
          extraContent={extraContentHeader}
        />
      }
      data={list}
      renderItem={({ item }) => (
        <ListTransfersRenderedByDate
          date={item.date}
          list={item.transfers}
          isLoading={isLoading}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
      ListFooterComponent={() =>
        isLoading ? (
          <Fragment>
            <LoaderSimple />
          </Fragment>
        ) : (
          <View style={styles.container_end}>
            {textEndReachedData.length > 0 && initialLoadComplete && (
              <Text style={styles.text_end}>{textEndReachedData}</Text>
            )}
          </View>
        )
      }
      ListFooterComponentStyle={{ paddingBottom: spaces.item_space_med_min }}
      ListEmptyComponent={
        initialLoadComplete && !isLoading && fetchedListFirstTime && list.length === 0 ? (
          <View style={styles.container_empty_state}>
            <EmptyState
              text={textEmptyState}
              internalCtaText={emptyStateInternalCtaText}
              handleClickInCta={handleClickInCtaInEmptyState}
            />
          </View>
        ) : null
      }
      onEndReached={handleScrollToEnd}
      onEndReachedThreshold={0.1}
    />
  );
}
