import 'react-native-reanimated';
import { Fragment, useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { enableScreens } from 'react-native-screens';
import moment from 'moment';
import 'moment/min/locales';

import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { Slot, SplashScreen } from 'expo-router';
import {
  Poppins_500Medium,
  Poppins_600SemiBold
} from '@expo-google-fonts/poppins';
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_700Bold,
} from '@expo-google-fonts/plus-jakarta-sans';

import { useTestConnectionUser } from '@/hooks/General/UseTestConnectionUser/UseTestConnectionUser.hook';
import { SessionProvider } from '@/contexts/useAuth';

import { NoConnected } from '@/components';

import { colors } from '@/constants/styles';
import { useOneSignal } from '@/hooks/OneSignal/useOneSignal.hook';

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '/',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SofiaPro_700Bold: require('../../assets/fonts/SofiaPro-Bold.otf'),
    SofiaPro_600SemiBold: require('../../assets/fonts/SofiaPro-SemiBold.otf'),
    SofiaPro_500Medium: require('../../assets/fonts/SofiaPro-Medium.otf'),
    SofiaPro_400Regular: require('../../assets/fonts/SofiaPro-Regular.otf'),

    Helvetica_700Bold: require("../../assets/fonts/Helvetica-Bold.ttf"),
    Helvetica_400Regular: require("../../assets/fonts/Helvetica-Regular.ttf"),

    Poppins_500Medium,
    Poppins_600SemiBold,

    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_700Bold
  });

  const insets = useSafeAreaInsets();
  enableScreens();
  moment.locale('pt');

  const { isConnected, isLoadingConnectionStatus, testConnectionApp } = useTestConnectionUser();

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded && !isLoadingConnectionStatus) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isLoadingConnectionStatus]);

  if (!loaded) {
    return null;
  }
  return (
    <Fragment>
      <View style={{
        flex: 0,
        backgroundColor: colors.pink_1_100,
        paddingTop: insets.top
      }}
      />
      <StatusBar
        backgroundColor={colors.pink_1_100}
        style={'dark'}
        translucent
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.white_100 }}>
        {
          isConnected ?
            <Fragment>
              <SessionProvider>
                <Slot />
              </SessionProvider>
              <Toast />
            </Fragment>
            :
            <NoConnected
              isConnectionRetryingLoading={isLoadingConnectionStatus}
              handleClickReconnect={testConnectionApp}
            />
        }
      </SafeAreaView>
    </Fragment>
  );
}
