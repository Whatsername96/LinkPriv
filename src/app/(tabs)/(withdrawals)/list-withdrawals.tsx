import { Fragment, useEffect, useState } from "react";

import { router, useNavigation } from "expo-router";


import { useGetTransfers } from "@/hooks/Api/useTransfers/useGetTransfers.hook";
import { useLoader } from "@/contexts/LoaderProvider";

import { CardBalanceAvaliable, FlatlistTransfersList } from "@/components";

import { TransferByDate } from "@/types/backend";

import { colors } from "@/constants/styles";

export default function ListWithdrawals() {
  const navigation = useNavigation();
  const ITEMS_PER_PAGE = 25;
  const { isLoadingTransfers, listTransfers, getTransfersPaginated } = useGetTransfers();
  const { showLoader, hideLoader } = useLoader();

  const [isLoadingData, setIsLoadingData] = useState(true);
  const [fetchedListFirstTime, setFetchedListFirstTime] = useState(false);
  const [listTransfersAll, setListTransfersAll] = useState<TransferByDate[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [allTransfersFetched, setAllTransfersFetched] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      showLoader();
      setIsLoadingData(true);
      fetchPage(1);
    });

    const unsubscribeBlur = navigation.addListener('blur', () => {
      resetList();
    })
    return () => {
      unsubscribe();
      unsubscribeBlur();
    };
  }, [navigation]);

  useEffect(() => {
    if (!fetchedListFirstTime) {
      setIsLoadingData(isLoadingTransfers);
    }
  }, [isLoadingTransfers]);

  useEffect(() => {
    if (!fetchedListFirstTime && listTransfers.transfers.length > 0 && !isLoadingTransfers) {
      setFetchedListFirstTime(true);
    }

    if (listTransfers.transfers.length > 0) {
      setListTransfersAll((prev) => mergeTransfers(prev, listTransfers.transfers));
    } else if (!isLoadingTransfers && fetchedListFirstTime) {
      setAllTransfersFetched(true);
    }
    setIsFetching(false);

  }, [listTransfers.transfers]);

  useEffect(() => {
    if (!isLoadingData) {
      hideLoader();
    }
  }, [isLoadingData])


  function fetchPage(page: number) {
    if (!allTransfersFetched && !isLoadingTransfers && !isFetching) {
      setIsFetching(true);
      getTransfersPaginated(page, ITEMS_PER_PAGE);
    }
  };

  function resetList() {
    setCurrentPage(1);
    setFetchedListFirstTime(false);
    setAllTransfersFetched(false);
    setListTransfersAll([]);
    setIsFetching(false);
    setIsLoadingData(false);
  };

  function mergeTransfers(prevTransfers: TransferByDate[], newTransfers: TransferByDate[]) {
    const updatedTransfers = [...prevTransfers];

    newTransfers.forEach((newTransfer) => {
      const { date, transfers } = newTransfer;

      const existingIndex = updatedTransfers.findIndex(
        (transferGroup) => transferGroup.date === date
      );

      if (existingIndex !== -1) {
        updatedTransfers[existingIndex].transfers = updatedTransfers[existingIndex].transfers.concat(
          transfers
        );
      } else {
        updatedTransfers.push({ date, transfers });
      }
    });

    return updatedTransfers;
  };

  function handleScrollToEnd() {
    if (fetchedListFirstTime &&
      !allTransfersFetched &&
      !isLoadingTransfers &&
      !isFetching &&
      listTransfersAll.length > 0
    ) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchPage(nextPage);
    }
  };

  return (
    <Fragment>
      <FlatlistTransfersList
        key={"FlatlistTransfersList"}
        titleSection={"Últimos saques"}
        list={listTransfersAll}
        emptyStateInternalCtaText={"faça o primeiro!"}
        textEmptyState={"Nenhum saque encontrado,"}
        handleClickInCtaInEmptyState={() =>
          router.push({
            pathname: "/create-withdrawal",
            params: {
              bankAccountsRoute: JSON.stringify(listTransfers.bankAccounts),
              avaliableAmountRoute: JSON.stringify(listTransfers.availableAmount),
              transferFeeRoute: JSON.stringify(listTransfers.transferFee)
            },
          })
        }
        isLoading={isLoadingTransfers}
        fetchedListFirstTime={fetchedListFirstTime}
        textEndReachedData={
          !allTransfersFetched ||
            (listTransfersAll.length === 0 && !isLoadingTransfers && !isFetching)
            ? ""
            : "Sem mais saques."
        }
        extraContentHeader={
          <CardBalanceAvaliable
            backgroundColor={colors.green_1_15}
            title={"Saldo disponível"}
            textColor={colors.green_1_100}
            value={listTransfers.availableAmount}
            buttonText={"Solicitar saque"}
            buttonBackgroundColor={colors.white_50}
            buttonTextColor={colors.gray_11_100}
            isButtonDisabled={listTransfers.availableAmount < 10}
            isLoading={isLoadingTransfers || isFetching}
            handleClickInButton={() =>
              router.push({
                pathname: "/create-withdrawal",
                params: {
                  bankAccountsRoute: JSON.stringify(listTransfers.bankAccounts),
                  avaliableAmountRoute: JSON.stringify(listTransfers.availableAmount),
                  transferFeeRoute: JSON.stringify(listTransfers.transferFee)
                },
              })
            }
          />
        }
        handleScrollToEnd={handleScrollToEnd}
      />
    </Fragment>
  );
}
