import { Pressable, StyleProp, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import { Card } from "@rneui/themed";

type Props = {
  number: number;
  mark: string;
  scale?: number;
};

const MarkColorMap = {
  heart: "red",
  diamond: "red",
  "cards-club": "black",
  "cards-spade": "black",
} as const;

const TrumpCard = ({ number, mark, scale }: Props) => {
  return (
    <View>
      <Pressable onPress={() => {console.log(number)}}>
        <Card containerStyle={{width: scale ?? 200}}>
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
              height:  scale ? scale * 1.5 : 300,
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
        </Card>
      </Pressable>
    </View>
  );
};

export default TrumpCard;
