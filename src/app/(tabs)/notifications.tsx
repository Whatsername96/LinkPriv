
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { useNavigation } from "expo-router";

import { CardNotification, EmptyState, LayoutLogged, LabelSectionTitle } from "@/components";

import { spaces } from "@/constants/styles";
import { useLoader } from "@/contexts/LoaderProvider";

const listNotifications = [
  {
    id: 1,
    title: "Transação Pix Gerada 👀",
    dateAgo: "2025-01-18T01:10:00",
    description: "Um pix no valor de R$27,90 foi gerado."
  },
  {
    id: 2,
    title: "Transação Pix Gerada 👀",
    dateAgo: "2025-01-18T01:10:00",
    description: "Um pix no valor de R$27,90 foi gerado."
  },
  {
    id: 3,
    title: "Transação Pix Gerada 👀",
    dateAgo: "2025-01-18T01:10:00",
    description: "Um pix no valor de R$27,90 foi gerado."
  },
  {
    id: 4,
    title: "Transação Pix Gerada 👀",
    dateAgo: "2025-01-18T01:10:00",
    description: "Um pix no valor de R$27,90 foi gerado."
  }
]

export default function Notifications() {
  const navigation = useNavigation();
  const { showLoader, hideLoader } = useLoader();

  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      showLoader();
      setIsLoadingData(true);
    });

    const unsubscribeBlur = navigation.addListener('blur', () => {
      setIsLoadingData(false);
    })
    return () => {
      unsubscribe();
      unsubscribeBlur();
    };
  }, [navigation]);

  useEffect(() => {
    setIsLoadingData(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (!isLoadingData) {
      hideLoader();
    }
  }, [isLoadingData]);

  return (
    <LayoutLogged>
      <View style={styles.container}>
        <LabelSectionTitle text={"Últimas notificações"} />
        <View style={styles.container_list}>
          {
            listNotifications.length > 0 ?
              listNotifications.map(notification => {
                return (
                  <CardNotification
                    key={notification.id}
                    title={notification.title}
                    dateAgo={notification.dateAgo}
                    description={notification.description}
                  />
                )
              })
              : <EmptyState text={"Nenhuma notificação"} />
          }
        </View>
      </View>
    </LayoutLogged>
  );
}

const styles = StyleSheet.create(({
  container: {
    flex: 1,
    paddingHorizontal: spaces.item_space_med,
    paddingTop: spaces.item_space_simple,
    paddingBottom: spaces.item_space_plus,
  },
  container_list: {
    marginTop: spaces.item_space_simple,
    marginBottom: spaces.item_space_plus,
    flexDirection: "column",
    gap: spaces.item_space_min
  },
}))
