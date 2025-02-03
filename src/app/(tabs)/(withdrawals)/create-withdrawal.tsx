import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { router, useLocalSearchParams } from "expo-router";

import { usePostBankAccountWithdraw } from "@/hooks/Api/useBankAccountWithdraw/useBankAccountWithdraw.hook";

import {
  CardBalanceAvaliable,
  CardValueShadow,
  HeaderPage,
  LabelInfo,
  LayoutLogged,
  ModalChildrenListSelection,
  ModalApp,
  Select,
  ModalChildrenInputAndConfirm
} from "@/components";

import { BankAccount } from "@/types/backend";

import { colors, fonts, fonts_sizes, spaces } from "@/constants/styles";
import { ModalChildrenConfirm } from "@/components/ModalApp/Children/Confirm";
import Toast from "react-native-toast-message";

export default function CreateWithdrawal() {
  const { bankAccountsRoute, avaliableAmountRoute, transferFeeRoute } = useLocalSearchParams<{ bankAccountsRoute: string, avaliableAmountRoute: string, transferFeeRoute: string }>();
  const { isLoadingWithdraw, successWithdraw, postBankAccountsWithdraw } = usePostBankAccountWithdraw();

  const bankAccounts = JSON.parse(bankAccountsRoute) as BankAccount[];
  const transferFee = Number(transferFeeRoute);
  const valuesList = [10, 50, 100, 150, 200];

  const [avaliableAmount, setAvaliableAmount] = useState(0);

  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [selectedBankAccount, setSelectedBankAccount] = useState<{ label: string, value: number } | null>(null);
  const [selectedWithdrawValue, setSelectedWithdrawValue] = useState<number | null>(null);

  const [isModalBankAccountOpened, setIsModalBankAccountOpened] = useState(false);
  const [isModalAnotherValueOpened, setIsModalAnotherValueOpened] = useState(false);
  const [isModalConfirmOpened, setIsModalConfirmOpened] = useState(false);

  const [tokenCaptcha, setTokenCaptcha] = useState("");

  useEffect(() => {
    if (avaliableAmountRoute) {
      setAvaliableAmount(Number(avaliableAmountRoute));
    }
  }, []);

  useEffect(() => {
    if (!isModalConfirmOpened) {
      setSelectedValue(null);
    }
  }, [isModalConfirmOpened]);

  useEffect(() => {
    if (!isModalAnotherValueOpened) {
      setSelectedWithdrawValue(0);
    }
  }, [isModalAnotherValueOpened]);

  useEffect(() => {
    if (tokenCaptcha.length > 0) {
      handleClickInMakeWithdraw();
    }
  }, [tokenCaptcha]);

  useEffect(() => {
    if (successWithdraw && selectedWithdrawValue) {
      setAvaliableAmount(avaliableAmount - selectedWithdrawValue);
    }
  }, [successWithdraw]);

  function handleClickInOtherValue() {
    if (!selectedBankAccount) {
      Toast.show({
        type: "error",
        text1: "Conta bancária",
        text2: "Preencha a conta bancária primeiro."
      });
    } else {
      setSelectedValue(null);
      setSelectedWithdrawValue(0);
      setIsModalAnotherValueOpened(true);
    }
  }

  function handleClickInValue(value: number) {
    if (!selectedBankAccount) {
      Toast.show({
        type: "error",
        text1: "Conta bancária",
        text2: "Preencha a conta bancária primeiro."
      });
    } else {
      setSelectedValue(value);
      setSelectedWithdrawValue(value);
      setIsModalConfirmOpened(true);
    }
  }

  function handleClickInMakeWithdraw() {
    if (selectedBankAccount && (selectedWithdrawValue && selectedWithdrawValue > 0)) {
      postBankAccountsWithdraw({
        amount: selectedWithdrawValue || 0,
        bankAccountId: selectedBankAccount.value,
        captchaToken: tokenCaptcha
      });
    }
  }

  return (
    <LayoutLogged>
      <View style={styles.container}>
        <HeaderPage
          title={"Pedido de saque"}
          handleClickInBackButton={() => router.back()}
        />
        <CardBalanceAvaliable
          backgroundColor={colors.green_1_15}
          textColor={colors.green_1_100}
          title={"Saldo disponível"}
          valueSize={fonts_sizes.emphasys_min}
          value={avaliableAmount}
          isLoading={false}
          valueDecimalSize={fonts_sizes.small}
        />
        <Select
          text={selectedBankAccount ? selectedBankAccount.label : "Escolha a conta bancária"}
          handleClickInSelect={() => setIsModalBankAccountOpened(true)}
        />
        <View>
          <LabelInfo text={"Escolha um valor"} />
          <View style={styles.list_values}>
            {
              valuesList.map(value => {
                return (
                  <CardValueShadow
                    key={value}
                    value={value}
                    isSelected={value === selectedValue}
                    isDisabled={value > avaliableAmount}
                    handleClickInValue={() => handleClickInValue(value)}
                  />
                )
              })
            }
            <CardValueShadow
              value={"Outro"}
              isSelected={false}
              handleClickInValue={handleClickInOtherValue}
            />
          </View>
        </View>
        <View style={styles.container_info_fee}>
          <Text style={styles.text_info_fee}>
            * Note que a taxa de saque é {transferFee.toLocaleString("pt-br", {
              currency: "BRL",
              style: "currency",
              maximumFractionDigits: 2,
              minimumFractionDigits: 2
            })}. Portanto, o valor escolhido terá {transferFee.toLocaleString("pt-br", {
              currency: "BRL",
              style: "currency",
              maximumFractionDigits: 2,
              minimumFractionDigits: 2
            })} de desconto.
          </Text>
        </View>
      </View>
      <ModalApp
        isVisible={isModalBankAccountOpened}
        handleClickClose={() => setIsModalBankAccountOpened(false)}
      >
        <ModalChildrenListSelection
          list={bankAccounts}
          title={"Escolha a conta bancária"}
          bankAccountId={selectedBankAccount}
          setBankAccountId={setSelectedBankAccount}
          handleClickInClose={() => setIsModalBankAccountOpened(false)}
        />
      </ModalApp>
      <ModalApp
        isVisible={isModalAnotherValueOpened}
        handleClickClose={() => !isLoadingWithdraw && setIsModalAnotherValueOpened(false)}
      >
        <ModalChildrenInputAndConfirm
          title={"Saque"}
          description={"Digite o valor que deseja sacar:"}
          textButton={"Sacar"}
          valueInput={selectedWithdrawValue}
          maxValueInput={avaliableAmount}
          isLoading={isLoadingWithdraw}
          setValueInput={setSelectedWithdrawValue}
          handleClickInClose={() => setIsModalAnotherValueOpened(false)}
          handleVerifyCaptcha={(token) => setTokenCaptcha(token)}
        />
      </ModalApp>
      <ModalApp
        isVisible={isModalConfirmOpened}
        handleClickClose={() => !isLoadingWithdraw && setIsModalConfirmOpened(false)}
      >
        <ModalChildrenConfirm
          title={"Confirmação"}
          description={"Confirma o valor de R$ " + selectedValue + " para o saque?"}
          isLoading={isLoadingWithdraw}
          handleClickInClose={() => setIsModalConfirmOpened(false)}
          handleVerifyCaptcha={(token) => setTokenCaptcha(token)}
        />
      </ModalApp>
    </LayoutLogged>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spaces.item_space_med,
    paddingTop: spaces.item_space_simple,
    paddingBottom: spaces.item_space_plus,
    gap: spaces.item_space_simple_med_min
  },
  list_values: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spaces.item_space_min,
    marginTop: spaces.item_space_simple
  },
  container_info_fee: {
    marginTop: spaces.item_space_small
  },
  text_info_fee: {
    fontFamily: fonts.plusJakartaSans_regular,
    fontSize: fonts_sizes.detail,
    flexShrink: 1,
  }
});
