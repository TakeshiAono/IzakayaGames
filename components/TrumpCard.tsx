import {
  Image,
  ImageBackground,
  Pressable,
  StyleProp,
  Text,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import { Card } from "@rneui/themed";
import React from "react";

type Props = {
  number?: number;
  mark?: string;
  scale?: number;
  isHide?: boolean;
};

const MarkColorMap = {
  heart: "red",
  diamond: "red",
  "cards-club": "black",
  "cards-spade": "black",
} as const;

const TrumpCard = ({ number, mark, scale, isHide = false }: Props) => {
  return (
    <View>
      <Pressable
        onPress={() => {
          console.log(number);
        }}
      >
        <Card containerStyle={{ width: scale ?? 200 }}>
          {!isHide ? (
            <>
              <View>
                <Text style={{ color: "red", fontSize: 15 }}>
                  {number}
                  {mark === "cards-club" || mark === "cards-spade" ? (
                    <Icon2 name={mark} size={15} />
                  ) : (
                    <Icon name={mark} size={15} color={MarkColorMap[mark]} />
                  )}
                </Text>
              </View>
              <View
                style={{
                  height: scale ? scale * 1.5 : 300,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "red", fontSize: 30 }}>
                  {number}
                  {mark === "cards-club" || mark === "cards-spade" ? (
                    <Icon2 name={mark} size={30} />
                  ) : (
                    <Icon name={mark} size={30} color={MarkColorMap[mark]} />
                  )}
                </Text>
              </View>
            </>
          ) : (
            <>
              <ImageBackground
                source={require("@/assets/images/back_face.png")}
                resizeMode="repeat" // 'cover' で画像が画面全体を覆うようにリサイズ
              >
                <View
                  style={{
                    height: scale ? scale * 1.5 + 15 : 300 + 15,
                  }}
                >
                </View>
              </ImageBackground>
            </>
          )}
        </Card>
      </Pressable>
    </View>
  );
};

export default TrumpCard;
