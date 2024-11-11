import React, { useRef, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  StyleProp,
  Text,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import { Card } from "@rneui/themed";
import { ViewStyle } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { observer } from "mobx-react-lite";

import { cardStore } from "@/app/_layout";
import { TrampCard } from "@/app/stores/cardStore";

type Props = {
  number: number;
  columnNumber: string;
  mark: TrampCard["type"];
  scale?: number;
  isHide?: boolean;
  style?: StyleProp<ViewStyle>;
  addToCardColumns: (newCardPosX: number, newCardPosY: number) => void;
  index: number;
  reversIndex: number;
};

const MarkColorMap = {
  heart: "red",
  diamond: "red",
  "cards-club": "black",
  "cards-spade": "black",
} as const;

const { width, height } = Dimensions.get("screen");

function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

const TrumpCard = observer(
  ({
    number,
    columnNumber,
    mark,
    scale,
    style,
    isHide = false,
    index,
    reversIndex,
  }: Props) => {
    const translationX = useSharedValue(0);
    const translationY = useSharedValue(0);
    const prevTranslationX = useSharedValue(0);
    const prevTranslationY = useSharedValue(0);
    const zIndex = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(() => ({
      zIndex: zIndex.value,
      transform: [
        { translateX: translationX.value },
        { translateY: translationY.value },
      ],
    }));

    const pan = Gesture.Pan()
      .minDistance(1)
      .onBegin(() => {
        zIndex.value = 50;
        prevTranslationX.value = translationX.value;
        prevTranslationY.value = translationY.value;
        cardStore.setActiveColumnNumber(columnNumber);
      })
      .onUpdate((event) => {
        const maxTranslateX = width / 2 + 1000;
        const maxTranslateY = height / 2 + 50;

        translationX.value = clamp(
          prevTranslationX.value + event.translationX,
          -maxTranslateX,
          maxTranslateX,
        );
        translationY.value = clamp(
          prevTranslationY.value + event.translationY,
          -maxTranslateY,
          maxTranslateY,
        );
      })
      .onFinalize((e) => {
        cardStore.setActiveColumnNumber(null);

        zIndex.value = 0;
        cardStore.cardCoordinates.forEach((cardCoordinate) => {
          if (
            cardCoordinate.xHead < e.absoluteX &&
            e.absoluteX < cardCoordinate.xBottom &&
            cardCoordinate.yHead < e.absoluteY &&
            e.absoluteY < cardCoordinate.yBottom
          ) {
            if (cardCoordinate.id == columnNumber) return;

            const targetCard: TrampCard = { type: mark, number: number };

            cardStore.exchangeCard(columnNumber, cardCoordinate.id, targetCard);
          } else {
            translationX.value = withSpring(0);
            translationY.value = withSpring(0);
          }
        });
      })
      .runOnJS(true);

    return reversIndex == 0 ? (
      <GestureDetector key={`${number}` + columnNumber} gesture={pan}>
        <Animated.View
          style={[
            { flex: 1, position: "absolute", top: index * 50 },
            animatedStyles,
          ]}
        >
          <Card containerStyle={{ width: scale ?? 200 }}>
            <Text>{JSON.stringify(style)}</Text>
            {!isHide ? (
              <>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ color: MarkColorMap[mark], fontSize: 15 }}>
                    {number}
                  </Text>
                  {mark === "cards-club" || mark === "cards-spade" ? (
                    <Icon2 name={mark} size={15} color={MarkColorMap[mark]} />
                  ) : (
                    <Icon name={mark} size={15} color={MarkColorMap[mark]} />
                  )}
                </View>
                <View
                  style={{
                    height: scale ? scale * 1.5 : 300,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: MarkColorMap[mark], fontSize: 30 }}>
                    {number}
                  </Text>
                  {mark === "cards-club" || mark === "cards-spade" ? (
                    <Icon2 name={mark} size={30} color={"black"} />
                  ) : (
                    <Icon name={mark} size={30} color={MarkColorMap[mark]} />
                  )}
                </View>
              </>
            ) : (
              <>
                <ImageBackground
                  // source={{ uri: backFaceImage }}
                  resizeMode="repeat" // 'cover' で画像が画面全体を覆うようにリサイズ
                >
                  <View
                    style={{
                      height: scale ? scale * 1.5 + 15 : 300 + 15,
                    }}
                  ></View>
                </ImageBackground>
              </>
            )}
          </Card>
        </Animated.View>
      </GestureDetector>
    ) : (
      <Animated.View
        style={[
          { flex: 1, position: "absolute", top: index * 50 },
          animatedStyles,
        ]}
      >
        <Card containerStyle={{ width: scale ?? 200 }}>
          <Text>{JSON.stringify(style)}</Text>
          {!isHide ? (
            <>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: MarkColorMap[mark], fontSize: 15 }}>
                  {number}
                </Text>
                {mark === "cards-club" || mark === "cards-spade" ? (
                  <Icon2 name={mark} size={15} color={MarkColorMap[mark]} />
                ) : (
                  <Icon name={mark} size={15} color={MarkColorMap[mark]} />
                )}
              </View>
              <View
                style={{
                  height: scale ? scale * 1.5 : 300,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: MarkColorMap[mark], fontSize: 30 }}>
                  {number}
                </Text>
                {mark === "cards-club" || mark === "cards-spade" ? (
                  <Icon2 name={mark} size={30} color={"black"} />
                ) : (
                  <Icon name={mark} size={30} color={MarkColorMap[mark]} />
                )}
              </View>
            </>
          ) : (
            <>
              <ImageBackground
                // source={{ uri: backFaceImage }}
                resizeMode="repeat" // 'cover' で画像が画面全体を覆うようにリサイズ
              >
                <View
                  style={{
                    height: scale ? scale * 1.5 + 15 : 300 + 15,
                  }}
                ></View>
              </ImageBackground>
            </>
          )}
        </Card>
      </Animated.View>
    );
  },
);

export default TrumpCard;
