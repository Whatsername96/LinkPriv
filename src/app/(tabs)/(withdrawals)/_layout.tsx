import { Stack } from "expo-router";

export default function StackLayout() {
  return (
    <Stack
      initialRouteName="list-withdrawals"
      screenOptions={{ headerShown: false, animation: "default" }}
    >
      <Stack.Screen
        name="list-withdrawals"
      />
      <Stack.Screen
        name="create-withdrawal"
      />
    </Stack>
  )
}
