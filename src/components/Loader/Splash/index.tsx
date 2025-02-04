import { Image, View } from "react-native";

import { StatusBar } from "expo-status-bar";

import { colors } from "@/constants/styles";
import { styles } from "./styles";

export function LoaderSplash() {
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.pink_1_100}
        style={'dark'}
        translucent
      />
      <Image
        source={require("../../../../assets/images/icon.png")}
        resizeMode={'contain'}
        style={styles.image}
      />
    </View>
  )
}
