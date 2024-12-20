import * as React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SolitaireScreen from "../../Screens/SolitaireScreen";
import CardGameSelectScreen from "@/app/Screens/CardGameSelectScreen";

const Stack = createNativeStackNavigator();

export default function CardGamesScreenStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CardGameSelectScreen"
        component={CardGameSelectScreen}
      />
      <Stack.Screen name="SolitaireScreen" component={SolitaireScreen} />
    </Stack.Navigator>
  );
}
