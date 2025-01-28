import { ReactNode, useEffect, useState } from "react";
import { SafeAreaView, View, Modal, TouchableWithoutFeedback } from "react-native";

import { styles } from "./styles";

type ModalAppProps = {
  isVisible: boolean;
  children: ReactNode;
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline",
  justifyContent?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly",
  handleClickClose: () => void;
}

export function ModalApp({
  isVisible,
  children,
  alignItems = "center",
  justifyContent = "center",
  handleClickClose
}: ModalAppProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setIsModalVisible(isVisible);
  }, [isVisible])

  return (
    <SafeAreaView style={styles.modal_container}>
      <Modal
        animationType={"slide"}
        onDismiss={handleClickClose}
        onRequestClose={handleClickClose}
        visible={isModalVisible}
        transparent={true}
      >
        <TouchableWithoutFeedback onPress={handleClickClose}>
          <View style={[
            styles.modal_content,
            {
              alignItems: alignItems,
              justifyContent: justifyContent
            }
          ]}>
            <TouchableWithoutFeedback onPress={() => { }}>
              <View>
                {children}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}
