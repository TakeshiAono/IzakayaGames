import * as React from "react";

import GameSelectScreen from "../../Screens/CardGameSelectScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SolitaireScreen from "../../Screens/SolitaireScreen";
import SettingScreen from "@/app/Screens/SettingScreen";

const Stack = createNativeStackNavigator();

const SettingsScreenStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
    </Stack.Navigator>
  );
};

export default SettingsScreenStack;
