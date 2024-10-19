import * as React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import SettingsScreenStack from "./stacks/SettingsScreenStack";
import CardGamesScreenStack from "./stacks/CardGamesScreenStack";

const Drawer = createDrawerNavigator();

export default function TopNavigation() {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          name="CardGamesScreenStack"
          component={CardGamesScreenStack}
        />
        <Drawer.Screen
          name="SettingsScreenStack"
          component={SettingsScreenStack}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
