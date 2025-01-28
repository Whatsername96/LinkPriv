import { ReactNode } from "react";
import { ScrollView } from "react-native";

import { Header } from "../Header";

import { styles } from "./styles";

type LayoutLoggedProps = {
  children: ReactNode
}

export function LayoutLogged({ children }: LayoutLoggedProps) {
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Header
        hasConfigs={false}
      />
      {children}
    </ScrollView>
  )
}
