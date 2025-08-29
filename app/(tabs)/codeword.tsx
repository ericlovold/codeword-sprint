import { View, Text } from "react-native";
export default function Codeword(){
  return (
    <View style={{ flex:1, padding:24, gap:8 }}>
      <Text style={{ fontSize:24, fontWeight:"800" }}>Your Codeword</Text>
      <Text>Set or update the word your allies recognize.</Text>
    </View>
  );
}
