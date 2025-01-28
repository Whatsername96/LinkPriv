import { Dispatch, SetStateAction } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { Check, X } from "phosphor-react-native";

import { BankAccount } from "@/types/backend";

import { colors, spaces } from "@/constants/styles";
import { styles } from "./styles";

type ListSelectionProps = {
  title: string;
  list: BankAccount[];
  bankAccountId: { label: string; value: number } | null;
  setBankAccountId: Dispatch<SetStateAction<{ label: string; value: number } | null>>;
  handleClickInClose: () => void;
}

export function ModalChildrenListSelection({
  title,
  list,
  bankAccountId,
  setBankAccountId,
  handleClickInClose,
}: ListSelectionProps) {

  function handleClickInBankAccount(bankName: string, bankAccountId: number) {
    setBankAccountId({
      label: bankName,
      value: bankAccountId
    });
    handleClickInClose();
  }

  return (
    <Shadow
      startColor={colors.white_100}
      endColor={colors.gray_9_100}
      style={styles.container}
      distance={spaces.item_space_tiny}
      offset={[0, 0]}
    >
      <View style={styles.content}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleClickInClose}
          style={styles.close_button}
        >
          <X size={spaces.item_space_simple}
            color={colors.gray_14_100}
            weight={"regular"}
          />
        </TouchableOpacity>
        <Text style={styles.title}>
          {title}
        </Text>
        <View style={styles.list_content}>
          {list.length > 0 ?
            list.map(item => {
              return (
                <TouchableOpacity
                  style={styles.item_select}
                  activeOpacity={0.6}
                  key={item.id}
                  onPress={() => handleClickInBankAccount(item.bank.name, item.id)}
                >
                  <View style={styles.aux_view} />
                  <Text style={[
                    styles.text_select,
                    bankAccountId?.value === item.id ?
                      { color: colors.blue_1_100 } :
                      { color: colors.gray_13_100, }
                  ]}>
                    {item.bank.name}
                  </Text>
                  {bankAccountId?.value === item.id ?
                    <Check
                      size={spaces.item_space_min_big}
                      color={colors.blue_1_100}
                      weight={"bold"}
                    />
                    :
                    <View style={styles.aux_view} />
                  }
                </TouchableOpacity>
              )
            })
            :
            <View style={styles.container_empty_state}>
              <Text style={styles.text_empty_state}>
                Não há conta bancária cadastrada.
              </Text>
            </View>
          }
        </View>
      </View>
    </Shadow>
  );
}
