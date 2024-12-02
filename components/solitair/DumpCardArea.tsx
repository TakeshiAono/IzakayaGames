import React from "react";
import { StyleProp, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import { ViewStyle } from "react-native";
import { observer } from "mobx-react-lite";

import { MarkColorMap, TrampCard } from "@/app/stores/cardStore";
import TrumpCard from "../TrumpCard";

type Props = {
  mark: Exclude<TrampCard["type"], "joker">;
  number?: number | null;
  scale?: number;
  isHide?: boolean;
  style?: StyleProp<ViewStyle>;
};

const DumpCardArea = observer(({ number, mark }: Props) => {
  return (
    <View>
      {!!number ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: 100,
            width: 50,
            borderWidth: 1,
            // borderStyle: "dashed",
            borderRadius: 10,
            backgroundColor: "white",
          }}
        >
          <Text> {number}</Text>
          {mark === "cards-club" || mark === "cards-spade" ? (
            <Icon2 name={mark} size={20} color={"black"} />
          ) : (
            <Icon name={mark} size={20} color={MarkColorMap[mark]} />
          )}
        </View>
      ) : (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: 100,
            width: 50,
            borderWidth: 1,
            borderStyle: "dashed",
            borderRadius: 10,
          }}
        >
          {mark === "cards-club" || mark === "cards-spade" ? (
            <Icon2 name={mark} size={20} color={"black"} />
          ) : (
            <Icon name={mark} size={20} color={MarkColorMap[mark]} />
          )}
        </View>
      )}
    </View>
  );
});

export default DumpCardArea;
