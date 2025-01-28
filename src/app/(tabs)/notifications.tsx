
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Skeleton } from "moti/skeleton";

import { useNavigation } from "expo-router";

import { CardNotification, EmptyState, LayoutLogged, LabelSectionTitle, LoaderFull } from "@/components";

import { COLORS_SKELETON, spaces } from "@/constants/styles";

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

  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (navigation.isFocused()) {
      setIsLoadingData(true);
      // get;
    } else {
      setIsLoadingData(false);
    }
  }, [navigation.isFocused()]);

  useEffect(() => {
    setIsLoadingData(isLoading);
  }, [isLoading]);

  if (isLoadingData) {
    return (
      <LoaderFull isVisible={isLoadingData} />
    )
  }

  return (
    <LayoutLogged>
      <View style={styles.container}>
        <LabelSectionTitle text={"Últimas notificações"} />
        <View style={styles.container_list}>
          {
            listNotifications.length > 0 ?
              listNotifications.map(notification => {
                return (
                  // <Skeleton
                  //   key={notification.id}
                  //   show={isLoadingData}
                  //   colorMode={'light'}
                  //   colors={COLORS_SKELETON}
                  // >
                  <CardNotification
                    key={notification.id}
                    title={notification.title}
                    dateAgo={notification.dateAgo}
                    description={notification.description}
                  />
                  // </Skeleton>
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
