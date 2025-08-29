import { Slot } from "expo-router";
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from "@expo-google-fonts/inter";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter_400Regular, Inter_500Medium, Inter_600SemiBold
  });
  if (!loaded) {
    return <View style={{flex:1,justifyContent:"center",alignItems:"center"}}><ActivityIndicator /></View>;
  }
  return <Slot />;
}
