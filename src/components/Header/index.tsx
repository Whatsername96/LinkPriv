import { Image, View, TouchableOpacity } from "react-native";

import { router } from "expo-router";

import { LabelTitle } from "../Label/Title";
import { Icon } from "../Icons";

import { useAuth } from "@/contexts/useAuth";

import { colors, spaces } from "@/constants/styles";
import { styles } from "./styles";

type HeaderProps = {
  hasConfigs?: boolean,
  hasNotifications?: boolean;
}

export function Header({
  hasConfigs = true,
  hasNotifications = true
}: HeaderProps) {

  const { session } = useAuth();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.container_items}
        activeOpacity={0.6}
      >
        <Image
          source={{ uri: session?.profileImage }}
          resizeMode={"cover"}
          alt={session?.firstName}
          style={styles.image}
        />
        {
          hasConfigs && <View style={[styles.marker_ball, styles.marker_ball_image]} />
        }
      </TouchableOpacity>
      <LabelTitle text={session?.firstName || ""} />
      <View style={styles.container_items} />
      {/* <TouchableOpacity
        style={[styles.container_items, styles.container_notifications]}
        activeOpacity={0.6}
        onPress={() => router.push("/notifications")}
      >
        <Icon
          name={"Bell"}
          color={colors.gray_1_100}
          size={spaces.item_space_simple}
          weight={"light"}
        />
        {
          hasNotifications && <View style={[styles.marker_ball, styles.marker_ball_notifications]} />
        }
      </TouchableOpacity> */}
    </View>
  );
}
