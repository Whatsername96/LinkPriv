import { Fragment, useEffect, useState } from "react";

import { useNavigation } from "expo-router";

import { useLoader } from "@/contexts/LoaderProvider";
import { useGetTransactions } from "@/hooks/Api/useTransactions/useGetTransactions.hook";

import { FlatlistTransactionsList } from "@/components";

import { TransactionByDateResponse } from "@/types/backend";

export default function Transactions() {
  const navigation = useNavigation();
  const ITEMS_PER_PAGE = 25;
  const { isLoadingTransactions, listTransactions, getTransactionsPaginated } = useGetTransactions();
  const { showLoader, hideLoader } = useLoader();
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [fetchedListFirstTime, setFetchedListFirstTime] = useState(false);
  const [listTransactionsAll, setListTransactionsAll] = useState<TransactionByDateResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [allTransactionsFetched, setAllTransactionsFetched] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setIsLoadingData(true);
      showLoader();
      fetchPage(1);
    });

    const unsubscribeBlur = navigation.addListener('blur', () => {
      resetList();
    });

    return () => {
      unsubscribe();
      unsubscribeBlur();
    };
  }, [navigation]);

  useEffect(() => {
    if (!fetchedListFirstTime) {
      setIsLoadingData(isLoadingTransactions);
    }
  }, [isLoadingTransactions]);

  useEffect(() => {
    if (!fetchedListFirstTime && listTransactions.length > 0 && !isLoadingTransactions) {
      setFetchedListFirstTime(true);
    }

    if (listTransactions.length > 0) {
      setListTransactionsAll((prev) => mergeTransfers(prev, listTransactions));
    } else if (!isLoadingTransactions && fetchedListFirstTime) {
      setAllTransactionsFetched(true);
    }
    setIsFetching(false);
  }, [listTransactions]);

  useEffect(() => {
    if (!isLoadingData) {
      hideLoader();
    }
  }, [isLoadingData])

  function fetchPage(page: number) {
    if (!allTransactionsFetched && !isLoadingTransactions && !isFetching) {
      setIsFetching(true);
      getTransactionsPaginated(page, ITEMS_PER_PAGE);
    }
  };

  function resetList() {
    setCurrentPage(1);
    setFetchedListFirstTime(false);
    setAllTransactionsFetched(false);
    setListTransactionsAll([]);
    setIsFetching(false);
    setIsLoadingData(false);
  };

  function mergeTransfers(prevTransfers: TransactionByDateResponse[], newTransfers: TransactionByDateResponse[]) {
    const updatedTransfers = [...prevTransfers];

    newTransfers.forEach((newTransfer) => {
      const { date, transactions } = newTransfer;

      const existingIndex = updatedTransfers.findIndex(
        (transferGroup) => transferGroup.date === date
      );

      if (existingIndex !== -1) {
        updatedTransfers[existingIndex].transactions = updatedTransfers[existingIndex].transactions.concat(
          transactions
        );
      } else {
        updatedTransfers.push({ date, transactions });
      }
    });

    return updatedTransfers;
  };

  function handleScrollToEnd() {
    if (fetchedListFirstTime &&
      !allTransactionsFetched &&
      !isLoadingTransactions &&
      !isFetching &&
      listTransactionsAll.length > 0) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchPage(nextPage);
    }
  };

  return (
    <Fragment>
      <FlatlistTransactionsList
        titleSection={"Transações"}
        list={listTransactionsAll}
        isLoading={isLoadingTransactions}
        textEndReachedData={!allTransactionsFetched ||
          (listTransactionsAll.length === 0 && !isLoadingTransactions && !isFetching)
          ? ""
          : "Sem mais transações."}
        textEmptyState={"Nenhuma transação encontrada."}
        handleScrollToEnd={handleScrollToEnd}
        fetchedListFirstTime={fetchedListFirstTime}
      />
    </Fragment>
  )
}
