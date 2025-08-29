import { Text } from "react-native";
import Screen from "../../src/components/Screen";

export default function Library() {
  return (
    <Screen>
      <Text style={{ fontSize: 34, fontWeight: "800" }}>Resources</Text>
      <Text style={{ marginTop: 12, fontSize: 18, color: "#374151" }}>
        Coming soon: guides & saved content.
      </Text>
    </Screen>
  );
}
