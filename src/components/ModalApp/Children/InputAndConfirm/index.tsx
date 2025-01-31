import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { X } from "phosphor-react-native";
import { Shadow } from "react-native-shadow-2";
import Recaptcha, { RecaptchaRef } from "react-native-recaptcha-that-works";

import { appConfig } from "@/api/appConfig";

import { Button } from "@/components/Button";

import { colors, spaces } from "@/constants/styles";
import { styles } from "./styles";
import CurrencyInput from "react-native-currency-input";

type InputAndConfirmProps = {
  title: string;
  description: string;
  textButton: string;
  valueInput: number | null;
  isLoading: boolean;
  maxValueInput: number;
  setValueInput: Dispatch<SetStateAction<number | null>>;
  handleClickInClose: () => void;
  handleVerifyCaptcha: (token: string) => void;
}

export function ModalChildrenInputAndConfirm({
  title,
  description,
  textButton,
  valueInput,
  isLoading,
  maxValueInput,
  setValueInput,
  handleVerifyCaptcha,
  handleClickInClose
}: InputAndConfirmProps) {

  const recaptcha = useRef<RecaptchaRef | null>(null);
  const isFirstRender = useRef(true);

  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    return () => {
      recaptcha.current?.close();
    }
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!isLoading) {
      handleClickInClose();
    }
  }, [isLoading]);

  function onExpireToken() {
    Alert.alert("Erro!", "O captcha expirou, tente novamente.");
  }

  function onErrorToken() {
    Alert.alert("Erro!", "Ocorreu um erro no captcha, possivelmente por problemas de conexão. Verifique e tente novamente.");
  }

  function handleClickInConfirmButton() {
    recaptcha.current?.open();
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
          activeOpacity={0.4}
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
        <View style={styles.form}>
          <View style={styles.container_description}>
            <Text style={styles.description}>{description}</Text>
          </View>
          <Recaptcha
            ref={recaptcha}
            siteKey={appConfig.siteKeyRecaptcha || ""}
            // baseUrl={"https://www.conteudinhos.com.br"}
            baseUrl={"https://www.linkpriv.com"}
            onVerify={(token) => handleVerifyCaptcha(token)}
            onExpire={onExpireToken}
            onError={onErrorToken}
            size={"normal"}
          />
          <View>
            <CurrencyInput
              style={[
                styles.input,
                isFocused ? { borderColor: colors.pink_2_100 } : { borderColor: colors.gray_3_100 },
                isLoading && styles.input_disabled
              ]}
              prefix="R$ "
              delimiter="."
              separator=","
              precision={2}
              autoFocus
              editable={!isLoading}
              maxValue={maxValueInput}
              value={valueInput}
              onChangeValue={(value) => setValueInput(value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <Text style={styles.info_withdraw}>
              O valor do saque precisa ser de pelo menos R$ 10,00.
            </Text>
          </View>
          <Button
            text={textButton}
            onPress={handleClickInConfirmButton}
            isLoading={isLoading}
            isDisabled={valueInput === 0 || valueInput === null || valueInput < 10}
          />
        </View>
      </View>
    </Shadow>
  );
}
