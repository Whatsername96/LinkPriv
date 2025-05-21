import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { useNavigation } from "expo-router";

import { useAuth } from "@/contexts/useAuth";
import { useLoader } from "@/contexts/LoaderProvider";
import { useGetConfigure } from "@/hooks/Api/useConfigure/useGetConfigure.hook";
import { usePutConfigure } from "@/hooks/Api/useConfigure/usePutConfigure.hook";

import { Button, LayoutLogged, LabelSectionTitle, SwitchText } from "@/components";

import { spaces } from "@/constants/styles";

export default function Definitions() {
  const navigation = useNavigation();
  const { signOut, isLoadingStorage } = useAuth();
  const { showLoader, hideLoader } = useLoader();

  const { getConfigure, isLoadingConfigure, listConfigure, fetchedConfigures } = useGetConfigure();
  const { putConfigure } = usePutConfigure();

  const [isLoadingData, setIsLoadingData] = useState(true);
  const [notifyApprovedPix, setNotifyApprovedPix] = useState(false);
  const [notifyGeneratedPix, setNotifyGeneratedPix] = useState(false);
  const [notifyNews, setNotifyNews] = useState(false);
  const [notifyTransferredTransfer, setNotifyTransferredTransfer] = useState(false);
  const [changedSomeConfig, setChangeSomeConfig] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      showLoader();
      setIsLoadingData(true);
      getConfigure();
    });

    const unsubscribeBlur = navigation.addListener('blur', () => {
      setIsLoadingData(false);
      setChangeSomeConfig(false);
    })
    return () => {
      unsubscribe();
      unsubscribeBlur();
    };
  }, [navigation]);

  useEffect(() => {
    setIsLoadingData(isLoadingConfigure);
  }, [isLoadingConfigure]);

  useEffect(() => {
    setNotifyApprovedPix(listConfigure.notifyApprovedPix);
    setNotifyGeneratedPix(listConfigure.notifyGeneratedPix);
    setNotifyNews(listConfigure.notifyNews);
    setNotifyTransferredTransfer(listConfigure.notifyTransferredTransfer);

  }, [listConfigure]);

  useEffect(() => {
    if (!isLoadingConfigure && fetchedConfigures && changedSomeConfig) {
      putConfigure({
        ApprovedPix: notifyApprovedPix,
        GeneratedPix: notifyGeneratedPix,
        News: notifyNews,
        TransferredTransfer: notifyTransferredTransfer
      });
    }
  }, [notifyApprovedPix, notifyGeneratedPix, notifyNews, notifyTransferredTransfer]);

  useEffect(() => {
    if (!isLoadingData) {
      hideLoader();
    }
  }, [isLoadingData]);

  return (
    <LayoutLogged>
      <View style={styles.container}>
        <LabelSectionTitle text={"Ajustes de Notificações"} />
        <View style={styles.container_definitions}>
          <SwitchText
            label={"Pix Gerado"}
            isEnabled={notifyGeneratedPix}
            onToggle={() => {
              setNotifyGeneratedPix(!notifyGeneratedPix);
              setChangeSomeConfig(true);
            }}
          />
          <SwitchText
            label={"Pix Aprovado"}
            isEnabled={notifyApprovedPix}
            onToggle={() => {
              setNotifyApprovedPix(!notifyApprovedPix);
              setChangeSomeConfig(true);
            }}
          />
          <SwitchText
            label={"Saque transferido"}
            isEnabled={notifyTransferredTransfer}
            onToggle={() => {
              setNotifyTransferredTransfer(!notifyTransferredTransfer);
              setChangeSomeConfig(true)
            }}
          />
          <SwitchText
            label={"Atualizações e novidades"}
            isEnabled={notifyNews}
            onToggle={() => {
              setNotifyNews(!notifyNews);
              setChangeSomeConfig(true);
            }}
          />
        </View>
        <Button
          text="Desconectar da conta"
          isLoading={isLoadingStorage}
          onPress={signOut}
        />
      </View>
    </LayoutLogged>
  )
}

const styles = StyleSheet.create(({
  container: {
    flex: 1,
    paddingHorizontal: spaces.item_space_med,
    paddingTop: spaces.item_space_simple,
    paddingBottom: spaces.item_space_plus,
  },
  container_definitions: {
    marginTop: spaces.item_space_simple,
    marginBottom: spaces.item_space_plus,
    flexDirection: "column",
    gap: spaces.item_space_min
  }
}))
