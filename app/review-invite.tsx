import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";
export default function Screen(){
  return (
    <View style={{ flex:1, padding:24, gap:16, justifyContent:"center" }}>
      <Text style={{ fontSize:32, fontWeight:"800" }}>Review invite</Text>
      <Text style={{ color:"#475569" }}>We will invite your selected allies.</Text>
      <Pressable onPress={()=>router.push("/invite-sent")} style={{ padding:16, borderRadius:16, backgroundColor:"#5B48B3" }}>
        <Text style={{ textAlign:"center", color:"white", fontWeight:"700" }}>Send</Text>
      </Pressable>
    </View>
  );
}
