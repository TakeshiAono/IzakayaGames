import { Text, View } from "react-native";
import TrumpCard from "../TrumpCard";
import React, {
  useRef,
} from "react";

type Props = {
  cards: { number: number; mark: string }[];
  columnIndex: number;
};

const TrumpColumn = ({ cards, columnIndex }: Props) => {
  const viewRef = useRef<View>(null);

  const join = (newCardPosX, newCardPosY) => {
    viewRef.current?.measure((x, y, width, height, pageX, pageY) => {});
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          width: 100,
        }}
      >
        <Text>{columnIndex}</Text>
        {cards.map((card, index) => {
          return (
            <View
              style={{
                position: "absolute",
                top: index * 50,
                zIndex: 0
              }}
              key={`${card.number} + ${card.mark}`}
            >
              <View style={{ position: "relative", zIndex: 0 }}>
                <TrumpCard
                  columnNumber={columnIndex}
                  number={card?.number ?? "jocker"}
                  mark={card?.mark}
                  scale={70}
                  joinMethod={join}
                />
              </View>
            </View>
          );
        })}
      </View>
    </>
  );
};

export default TrumpColumn;
