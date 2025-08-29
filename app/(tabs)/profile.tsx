import { Text } from "react-native";
import Screen from "../../src/components/Screen";

export default function Profile() {
  return (
    <Screen>
      <Text style={{ fontSize: 34, fontWeight: "800" }}>Profile</Text>
      <Text style={{ marginTop: 12, fontSize: 18 }}>Settings & account will live here.</Text>
    </Screen>
  );
}
