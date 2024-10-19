import { Text, View } from "react-native";
import TrumpCard from "../TrumpCard";

type Props = {
  cards: { number: number; mark: string }[];
};

const TrumpColumn = ({ cards }: Props) => {
  return (
    <View>
      {cards.map((card, index) => (
        <View
          style={{
            position: "absolute",
            top: index * 50,
          }}
        >
          <View>
            <TrumpCard number={card.number} mark={card.mark} scale={120} />
          </View>
        </View>
      ))}
    </View>
  );
};

export default TrumpColumn;
