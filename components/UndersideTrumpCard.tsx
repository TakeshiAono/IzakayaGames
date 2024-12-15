import React, { useRef, useState } from "react";
import {
  ImageBackground,
  Pressable,
  View,
} from "react-native";
import { observer } from "mobx-react-lite";

import { cardStore } from "@/app/_layout";

type Props = {
  scale: number;
};

const UndersideTrumpCard = observer(({scale}: Props) => {
  return (
    <Pressable onPress={() => {
      cardStore.dealOne()
    }}>
      <ImageBackground
        // source={{ uri: backFaceImage }}
        resizeMode="repeat" // 'cover' で画像が画面全体を覆うようにリサイズ
      >
        <View
          style={{
            backgroundColor: "blue", // ダミー色
            borderRadius: 10,
            height: (scale * (1.5 + 1.6)),
            width: scale * 1.5,
          }}
          >
        </View>
      </ImageBackground>
    </Pressable>
  );
});

export default UndersideTrumpCard;
