import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";
export default function Screen(){
  return (
    <View style={{ flex:1, padding:24, gap:16, justifyContent:"center" }}>
      <Text style={{ fontSize:32, fontWeight:"800" }}>Invite sent ✅</Text>
      <Pressable onPress={()=>router.replace("/(tabs)/home")} style={{ padding:16, borderRadius:16, backgroundColor:"#5B48B3" }}>
        <Text style={{ textAlign:"center", color:"white", fontWeight:"700" }}>Go to Home</Text>
      </Pressable>
    </View>
  );
}
