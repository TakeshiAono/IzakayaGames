import * as React from "react";
import TopNavigation from "./navigations/TopNavigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CardStore from "./stores/cardStore";

export const cardStore = new CardStore();

export default function App() {
  return (
    <GestureHandlerRootView>
      <TopNavigation />
    </GestureHandlerRootView>
  );
}
