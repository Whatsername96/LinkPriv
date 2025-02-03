import { useEffect, useRef } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { X } from "phosphor-react-native";
import { Shadow } from "react-native-shadow-2";
import Recaptcha, { RecaptchaRef } from 'react-native-recaptcha-that-works';

import { appConfig } from "@/api/appConfig";

import { Button } from "@/components/Button";

import { web } from "@/constants/global";

import { colors, spaces } from "@/constants/styles";
import { styles } from "./styles";

type InputAndConfirmProps = {
  title: string;
  description: string;
  isLoading: boolean,
  handleVerifyCaptcha: (token: string) => void;
  handleClickInClose: () => void;
}

export function ModalChildrenConfirm({
  title,
  description,
  isLoading,
  handleVerifyCaptcha,
  handleClickInClose,
}: InputAndConfirmProps) {

  const recaptcha = useRef<RecaptchaRef | null>(null);
  const isFirstRender = useRef(true);

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
        <View style={styles.container_description_button}>
          <View style={styles.container_description}>
            <Text style={styles.description}>{description}</Text>
          </View>
          <Recaptcha
            ref={recaptcha}
            siteKey={appConfig.siteKeyRecaptcha || ""}
            baseUrl={web.index}
            onVerify={(token) => handleVerifyCaptcha(token)}
            onExpire={onExpireToken}
            onError={onErrorToken}
            size={"normal"}
          />
          <Button
            text={"Confirmar"}
            onPress={handleClickInConfirmButton}
            isLoading={isLoading}
          />
        </View>
      </View>
    </Shadow>
  );
}
