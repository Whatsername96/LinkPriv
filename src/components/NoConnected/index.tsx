import { Dimensions, Text, View } from "react-native";
import { WifiX } from "phosphor-react-native";

import { Button } from "../Button";

import { styles } from "./styles";
import { colors } from "@/constants/styles";

type NoConnectedProps = {
  handleClickReconnect: () => void;
  isConnectionRetryingLoading: boolean;
}

export function NoConnected({ handleClickReconnect, isConnectionRetryingLoading }: NoConnectedProps) {
  const { width } = Dimensions.get("screen")
  return (
    <View style={styles.container}>
      <View style={styles.container_image}>
        <WifiX size={width / 2} color={colors.pink_2_100} />
      </View>
      <Text style={styles.info}>
        Você está sem internet! Tente conectar novamente.
      </Text>
      <Button
        text="Reconectar"
        isLoading={isConnectionRetryingLoading}
        onPress={handleClickReconnect}
      />
    </View>
  );
}
