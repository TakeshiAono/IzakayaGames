import { Text, View } from "react-native";
import TrumpCard from "../TrumpCard";
import React, { useRef } from "react";

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
          if (index != undefined) {
            return (
              <TrumpCard
                columnNumber={columnIndex}
                number={card?.number ?? "jocker"}
                mark={card?.mark}
                scale={70}
                joinMethod={join}
                index={index}
                key={`${card.number} + ${card.mark}`}
              />
            );
          } else {
            return <></>;
          }
        })}
      </View>
    </>
  );
};

export default TrumpColumn;
