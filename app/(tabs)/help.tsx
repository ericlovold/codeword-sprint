import { Text } from "react-native";
import Screen from "../../src/components/Screen";

export default function Help() {
  return (
    <Screen>
      <Text style={{ fontSize: 34, fontWeight: "800" }}>Get Help</Text>
      <Text style={{ marginTop: 12, fontSize: 18 }}>
        Quick actions for 911, 988, and sending a Codeword alert.
      </Text>
    </Screen>
  );
}
