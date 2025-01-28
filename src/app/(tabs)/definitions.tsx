import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Skeleton } from "moti/skeleton";

import { useNavigation } from "expo-router";

import { useAuth } from "@/contexts/useAuth";
import { useGetConfigure } from "@/hooks/Api/useConfigure/useGetConfigure.hook";
import { usePutConfigure } from "@/hooks/Api/useConfigure/usePutConfigure.hook";

import { Button, LayoutLogged, LabelSectionTitle, SwitchText, LoaderFull } from "@/components";

import { COLORS_SKELETON, spaces } from "@/constants/styles";

export default function Definitions() {
  const navigation = useNavigation();
  const { signOut, isLoadingStorage } = useAuth();

  const { getConfigure, isLoadingConfigure, listConfigure } = useGetConfigure();
  const { putConfigure } = usePutConfigure();

  const [isLoadingData, setIsLoadingData] = useState(true);
  const [notifyApprovedPix, setNotifyApprovedPix] = useState(false);
  const [notifyGeneratedPix, setNotifyGeneratedPix] = useState(false);
  const [notifyNews, setNotifyNews] = useState(false);
  const [notifyTransferredTransfer, setNotifyTransferredTransfer] = useState(false);

  useEffect(() => {
    if (navigation.isFocused()) {
      setIsLoadingData(true);
      getConfigure();
    } else {
      setIsLoadingData(false);
    }
  }, [navigation.isFocused()]);

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
    if (!isLoadingConfigure &&
      (listConfigure.notifyApprovedPix !== notifyApprovedPix) ||
      (listConfigure.notifyGeneratedPix !== notifyGeneratedPix) ||
      (listConfigure.notifyNews !== notifyNews) ||
      (listConfigure.notifyTransferredTransfer !== notifyTransferredTransfer)
    ) {
      putConfigure({
        ApprovedPix: notifyApprovedPix,
        GeneratedPix: notifyGeneratedPix,
        News: notifyNews,
        TransferredTransfer: notifyTransferredTransfer
      });
    }
  }, [notifyApprovedPix, notifyGeneratedPix, notifyNews, notifyTransferredTransfer]);

  if (isLoadingData) {
    return (
      <LoaderFull isVisible={isLoadingConfigure} />
    )
  }

  return (
    <LayoutLogged>
      <View style={styles.container}>
        <LabelSectionTitle text={"Ajustes de Notificações"} />
        <View style={styles.container_definitions}>
          {/* <Skeleton
            show={isLoadingConfigure}
            colorMode={'light'}
            colors={COLORS_SKELETON}
          > */}
          <SwitchText
            label={"Pix Gerado"}
            isEnabled={notifyGeneratedPix}
            onToggle={() => setNotifyGeneratedPix(!notifyGeneratedPix)}
          />
          {/* </Skeleton> */}
          {/* <Skeleton
            show={isLoadingConfigure}
            colorMode={'light'}
            colors={COLORS_SKELETON}
          > */}
          <SwitchText
            label={"Pix Aprovado"}
            isEnabled={notifyApprovedPix}
            onToggle={() => setNotifyApprovedPix(!notifyApprovedPix)}
          />
          {/* </Skeleton> */}
          {/* <Skeleton
            show={isLoadingConfigure}
            colorMode={'light'}
            colors={COLORS_SKELETON}
          > */}
          <SwitchText
            label={"Saque transferido"}
            isEnabled={notifyTransferredTransfer}
            onToggle={() => setNotifyTransferredTransfer(!notifyTransferredTransfer)}
          />
          {/* </Skeleton> */}
          {/* <Skeleton
            show={isLoadingConfigure}
            colorMode={'light'}
            colors={COLORS_SKELETON}
          > */}
          <SwitchText
            label={"Atualizações e novidades"}
            isEnabled={notifyNews}
            onToggle={() => setNotifyNews(!notifyNews)}
          />
          {/* </Skeleton> */}
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
