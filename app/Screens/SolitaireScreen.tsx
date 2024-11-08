import {
  Button,
  ScrollView,
  Text,
  View,
} from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect, useRef, useState } from "react";
import TrumpCard from "@/components/TrumpCard";
import TrumpColumn from "@/components/solitair/TrumpColumn";
import React from "react";
import { cardStore } from "../_layout";
import { CardCoordinate, DealtCards } from "../stores/cardStore";
import { observer } from "mobx-react-lite";

const SolitaireScreen = observer(() => {
  const splitNumber = 4;

  const [gameVisible, setGameVisible] = useState(false);

  const viewRefs = useRef<View[]>([]);

  const measure = async (
    index: number,
  ): Promise<CardCoordinate[] | undefined> => {
    // splitNumberに達するまで計測を行わない
    if (splitNumber !== index + 1) return;

    // viewRefs内の全ての座標を計測
    const cardCoordinatesPromises = viewRefs.current.map((viewRef, index2) => {
      return new Promise<CardCoordinate>((resolve) => {
        viewRef?.measure((x, y, width, height, pageX, pageY) => {
          const cardCoordinate: CardCoordinate = {
            id: index2.toString(),
            xHead: pageX,
            yHead: pageY,
            xBottom: pageX + width,
            yBottom: pageY + height,
          };
          resolve(cardCoordinate);
        });
      });
    });

    // 全ての計測が完了するまで待機
    const cardCoordinates = await Promise.all(cardCoordinatesPromises);
    return cardCoordinates;
  };

  useEffect(() => {
    ScreenOrientation.unlockAsync();
    return () => {
      cardStore.initialize();
    };
  }, []);

  const convertCard = (dealtCards: DealtCards) => {
    const { cards } = dealtCards;
    return cards.map((card) => {
      if (card.number != null) {
        return { mark: card.type, number: card.number };
      }
    });
  };

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
              cardStore.solitaireStart(splitNumber, true);
            }}
          />
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ height: 1000 }}>
          <View style={{ justifyContent: "space-between", flex: 1 }}>
            <View style={{ flexDirection: "row", flex: 1 }}>
              {cardStore.getDealtCardsList.map((dealtCards, index) => {
                return (
                  <View
                    key={dealtCards.id}
                    style={{ flex: 1, zIndex: index == 0 ? 1 : 0 }}
                    ref={(c) => {
                      if (c && !viewRefs.current.includes(c)) {
                        // 重複追加を防ぐ
                        viewRefs.current.push(c);
                      }
                    }}
                    onLayout={async () => {
                      const cardCoordinates = await measure(+dealtCards.id);
                      cardStore.setCardCoordinates(cardCoordinates);
                    }}
                  >
                    <Text>{dealtCards.cards.length}</Text>
                    <TrumpColumn
                      columnIndex={+dealtCards.id}
                      // TODO: スプレッド構文使わなくても良くなるように修正
                      cards={convertCard(dealtCards)}
                    />
                  </View>
                );
              })}
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <TrumpCard isHide={true} scale={120} />
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
});

export default SolitaireScreen;
