import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";
export default function Screen(){
  return (
    <View style={{ flex:1, padding:24, gap:16, justifyContent:"center" }}>
      <Text style={{ fontSize:40, fontWeight:"800" }}>Onboarding</Text>
      <Text style={{ fontSize:18, color:"#475569" }}>Welcome to Codeword</Text>
      <Pressable onPress={()=>router.push("/create-codeword")} style={{ padding:16, borderRadius:16, backgroundColor:"#5B48B3" }}>
        <Text style={{ textAlign:"center", color:"white", fontWeight:"700" }}>Next: Create Codeword</Text>
      </Pressable>
    </View>
  );
}
