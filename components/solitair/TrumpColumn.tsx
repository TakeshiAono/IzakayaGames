import { View } from "react-native";
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
        {cards.map((card, index) => {
          if (index != undefined) {
            return (
              <TrumpCard
                columnNumber={columnIndex.toString()}
                number={card?.number}
                mark={card?.mark}
                scale={70}
                joinMethod={join}
                index={index}
                reversIndex={cards.length - 1 - index}
                key={`${card?.number} + ${card?.mark}`}
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
