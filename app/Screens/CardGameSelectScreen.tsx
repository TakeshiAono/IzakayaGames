import { useNavigation } from "expo-router";
import React from "react";

import { Button, Text, View } from "react-native";

export default function CardGameSelectScreen() {
  const navigation = useNavigation();
  return (
    <>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{ width: 100, backgroundColor: "red" }}>
          <Button
            title="ソリティア"
            onPress={() => {
              navigation.navigate("SolitaireScreen");
            }}
          ></Button>
        </View>
      </View>
    </>
  );
}
