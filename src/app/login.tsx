import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";

import { Eye, EyeSlash } from "phosphor-react-native";

import { Redirect } from "expo-router";
import * as WebBrowser from 'expo-web-browser';

import { useAuth } from "@/contexts/useAuth";
import { useLoader } from "@/contexts/LoaderProvider";

import {
  InputDefault,
  Button,
  LabelTitle,
  CardError
} from "@/components";

import { web } from "@/constants/global";

import { colors, fonts, fonts_sizes, spaces } from "@/constants/styles";

export default function Login() {
  const { isLoadingStorage, isLoadingSession, signIn, session, error } = useAuth();
  const { showLoader, hideLoader } = useLoader();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const passwordInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (isLoadingStorage || isLoadingSession) {
      showLoader();
    } else {
      hideLoader();
    }
  }, [isLoadingStorage, isLoadingSession]);

  function handleClickSignIn() {
    Keyboard.dismiss();
    signIn({
      email: email,
      password: password
    });
  }

  function handlePasswordVisibility() {
    setIsPasswordVisible(!isPasswordVisible);
  };

  async function handleClickInOpenLink() {
    try {
      await WebBrowser.openBrowserAsync('https://www.linkpriv.com/login');
    } catch (e) {
      Alert.alert("Ocorreu um erro ao abrir o link.");
    }
  };

  if (session) {
    return <Redirect href={"/(tabs)"} />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.container_scroll_view}
          bounces={false}
          keyboardShouldPersistTaps={"handled"}
        >
          <View style={styles.content}>
            <View style={styles.header_login}>
              <LabelTitle text={"Olá novamente!"} textAlign={"left"} />
              {
                Platform.OS === 'android' &&
                <View style={styles.container_register}>
                  <Text style={styles.register_text}>
                    Não tem uma conta ainda?{" "}
                  </Text>
                  <TouchableOpacity
                    onPress={handleClickInOpenLink}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.register_link}>
                      Registre-se
                    </Text>
                  </TouchableOpacity>
                </View>
              }
            </View>
            <View style={styles.container_form}>
              <InputDefault
                placeholder={"Digite o email"}
                keyboardType={"email-address"}
                inputMode={"email"}
                textContentType={"emailAddress"}
                returnKeyType={"go"}
                autoCapitalize={"none"}
                errorMessage={"Por favor, digite seu e-mail."}
                value={email}
                onChangeText={setEmail}
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />
              <View style={styles.input_wrapper}>
                <InputDefault
                  ref={passwordInputRef}
                  placeholder={"Digite a senha"}
                  secureTextEntry={!isPasswordVisible}
                  autoCapitalize={"none"}
                  textContentType={"password"}
                  errorMessage={"Por favor, digite sua senha."}
                  value={password}
                  onChangeText={setPassword}
                  paddingRight={48}
                  onSubmitEditing={() => signIn({
                    email: email,
                    password: password
                  })}
                />
                <TouchableOpacity
                  style={styles.eye_icon}
                  onPressIn={(e) => e.stopPropagation()}
                  onPress={() => handlePasswordVisibility()}
                >
                  {
                    !isPasswordVisible ?
                      <Eye
                        color={colors.gray_3_100}
                        size={spaces.item_space_simple}
                        weight={"light"}
                      />
                      :
                      <EyeSlash
                        color={colors.gray_3_100}
                        size={spaces.item_space_simple}
                        weight={"light"}
                      />
                  }
                </TouchableOpacity>
              </View>
              {error && error.length > 0 &&
                <CardError message={error} />
              }
              <View style={styles.forget_pass_container}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPressIn={(e) => e.stopPropagation()}
                  onPress={handleClickInOpenLink}
                >
                  <Text style={styles.forget_pass}>Esqueci minha senha</Text>
                </TouchableOpacity>
              </View>
              <Button
                text={"Fazer Login"}
                isDisabled={!email || !password}
                isLoading={isLoadingStorage}
                onPress={handleClickSignIn}
              />
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container_scroll_view: {
    flexGrow: 1,
    justifyContent: "center",
  },
  header_login: {
    marginBottom: spaces.item_space_min,
  },
  container_register: {
    flexDirection: "row",
    alignItems: "center"
  },
  register_text: {
    flexShrink: 1,
    fontFamily: fonts.sofiapro_regular,
    fontSize: fonts_sizes.text,
    color: colors.black_1_100,
  },
  register_link: {
    flexShrink: 1,
    fontFamily: fonts.sofiapro_regular,
    fontSize: fonts_sizes.text,
    color: colors.pink_2_100,
    borderBottomWidth: spaces.item_space_extra_tiny,
    borderBottomColor: colors.pink_2_100
  },
  content: {
    paddingBottom: spaces.item_space_plus_big,
    paddingHorizontal: spaces.item_space_simple,
    paddingTop: spaces.item_space_simple,
    gap: spaces.item_space_simple_med,
    alignContent: "center"
  },
  container_form: {
    gap: spaces.item_space_simple
  },
  input_wrapper: {
    position: "relative",
  },
  eye_icon: {
    position: "absolute",
    top: 0,
    right: 0,
    paddingHorizontal: spaces.item_space_min,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  forget_pass_container: {
    width: "100%",
    alignItems: "flex-end",
  },
  forget_pass: {
    flexShrink: 1,
    fontFamily: fonts.plusJakartaSans_regular,
    fontSize: fonts_sizes.text_small,
    color: colors.blue_2_100,
    borderBottomWidth: spaces.item_space_extra_tiny,
    borderBottomColor: colors.blue_2_100
  }
});
