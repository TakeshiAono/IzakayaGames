import { useNavigation } from "expo-router";
import { Button, Text, View } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import TrumpCard from "@/components/TrumpCard";
import TrumpColumn from "@/components/solitair/TrumpColumn";
import React from "react";

const SolitaireScreen = () => {
  const navigation = useNavigation();
  const [gameVisible, setGameVisible] = useState(false);

  useEffect(() => {
    ScreenOrientation.unlockAsync();
  }, []);

  return (
    <>
      {!gameVisible ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Button
            title="ゲームを始める"
            onPress={() => {
              setGameVisible(true);
            }}
          />
        </View>
      ) : (
        <View style={{flexDirection: "row", flex:1}}>
          <View style={{flex: 1}}>
            <TrumpColumn
              cards={[
                { number: 1, mark: "diamond" },
                { number: 2, mark: "diamond" },
                { number: 3, mark: "diamond" },
                { number: 4, mark: "diamond" },
              ]}
            />
          </View>
          <View style={{flex:1}}>
            <TrumpColumn
              cards={[
                { number: 5, mark: "diamond" },
                { number: 6, mark: "diamond" },
                { number: 7, mark: "diamond" },
                { number: 8, mark: "diamond" },
              ]}
            />
          </View>
          <View style={{flex:1}}>
            <TrumpColumn
              cards={[
                { number: 5, mark: "diamond" },
                { number: 6, mark: "diamond" },
                { number: 7, mark: "diamond" },
                { number: 8, mark: "diamond" },
              ]}
            />
          </View>
        </View>
      )}
    </>
  );
};

export default SolitaireScreen;
