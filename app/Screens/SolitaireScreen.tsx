import { Button, ScrollView, View } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect, useRef, useState } from "react";
import TrumpColumn from "@/components/solitair/TrumpColumn";
import React from "react";
import { cardStore } from "../_layout";
import { CardCoordinate, DealtCards } from "../stores/cardStore";
import { observer } from "mobx-react-lite";
import DumpCardArea from "@/components/solitair/DumpCardArea";

const SolitaireScreen = observer(() => {
  const splitNumber = 7;
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
        <View>
          <ScrollView contentContainerStyle={{ height: 1000, zIndex: 5 }}>
            <View style={{ justifyContent: "space-between", flex: 1 }}>
              <View style={{ flexDirection: "row", flex: 1 }}>
                {cardStore.getDealtCardsList.map((dealtCards, index) => {
                  return (
                    <View
                      key={dealtCards.id}
                      style={{
                        flex: 1,
                        zIndex:
                          cardStore.activeColumnNumber != null
                            ? cardStore.activeColumnNumber == index.toString()
                              ? 99
                              : 0
                            : 0,
                      }}
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
                {/* <TrumpCard isHide={true} scale={120} /> */}
              </View>
            </View>
          </ScrollView>
          <View
            style={{
              flexDirection: "row",
              position: "absolute",
              zIndex: 1,
              bottom: 0,
              left: 0,
            }}
          >
            <View style={{ margin: 5 }}>
              <DumpCardArea mark={"heart"} />
            </View>
            <View style={{ margin: 5 }}>
              <DumpCardArea mark={"diamond"} />
            </View>
            <View style={{ margin: 5 }}>
              <DumpCardArea mark={"cards-spade"} />
            </View>
            <View style={{ margin: 5 }}>
              <DumpCardArea mark={"cards-club"} />
            </View>
          </View>
        </View>
      )}
    </>
  );
});

export default SolitaireScreen;
