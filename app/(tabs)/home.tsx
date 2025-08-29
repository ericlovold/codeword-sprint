import { Link } from "expo-router";
import { Text, View, Pressable } from "react-native";
import Screen from "../../src/components/Screen";

export default function Home() {
  const Button = ({ href, title, variant="primary" }:{href:string; title:string; variant?: "primary"|"outline"}) => (
    <Link href={href} asChild>
      <Pressable
        style={{
          marginTop: 16,
          paddingVertical: 18,
          borderRadius: 16,
          alignItems: "center",
          backgroundColor: variant === "primary" ? "#6B57C8" : "#F3F4F6",
          borderWidth: variant === "outline" ? 1 : 0,
          borderColor: "#D1D5DB"
        }}
      >
        <Text style={{ color: variant === "primary" ? "white" : "#1F2937", fontSize: 18, fontWeight: "700" }}>
          {title}
        </Text>
      </Pressable>
    </Link>
  );

  return (
    <Screen>
      <Text style={{ fontSize: 36, fontWeight: "800", color: "#2563EB", marginBottom: 8 }}>Codeword</Text>
      <Text style={{ fontSize: 22, marginBottom: 16 }}>Pick a flow to QA:</Text>

      <Button href="/onboarding" title="Onboarding" />
      <Button href="/create-codeword" title="Create Codeword" variant="outline" />
      <Button href="/review-invite" title="Review Invite" variant="outline" />
      <Button href="/invite-sent" title="Invite Sent" variant="outline" />
      <Button href="/chat" title="Open Chat" variant="outline" />
    </Screen>
  );
}
