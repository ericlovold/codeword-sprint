import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { router } from "expo-router";
export default function Screen(){
  const [cw,setCw]=useState("");
  return (
    <View style={{ flex:1, padding:24, gap:16, justifyContent:"center" }}>
      <Text style={{ fontSize:32, fontWeight:"800" }}>Create your codeword</Text>
      <TextInput
        placeholder="Codeword"
        value={cw}
        onChangeText={setCw}
        style={{ padding:16, borderRadius:14, backgroundColor:"#EDE7F6", borderWidth:1, borderColor:"#e5e7eb" }}
      />
      <Pressable
        disabled={!cw.trim()}
        onPress={()=>router.push("/review-invite")}
        style={{ padding:16, borderRadius:16, backgroundColor: cw.trim() ? "#5B48B3" : "#e5e7eb" }}>
        <Text style={{ textAlign:"center", color: cw.trim() ? "white" : "#94a3b8", fontWeight:"700" }}>Continue</Text>
      </Pressable>
    </View>
  );
}
