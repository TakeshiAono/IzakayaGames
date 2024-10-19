import * as React from "react";
import { Button, Text, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import GameSelectScreen from "./Screens/CardGameSelectScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TopNavigation from "./navigations/TopNavigation";

// function HomeScreen({ navigation }) {
//   return (
//     <Stack.Navigator>
//     {/* <Drawer.Screen name="Home" component={Home} />
//     <Drawer.Screen name="Profile" component={Profile} /> */}
//       <Stack.Screen name="SettingsScreenb" component={SettingsScreen} />
//   </Stack.Navigator>
//   );
// }

// function HomeScreen2({ navigation }) {
//   return (
//     <Stack.Navigator>
//     {/* <Drawer.Screen name="Home" component={Home} />
//     <Drawer.Screen name="Profile" component={Profile} /> */}
//       <Stack.Screen name="SettingsScreena" component={SettingsScreena} />
//   </Stack.Navigator>
//   );
// }

// function SettingsScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>普通の</Text>
//       <Button onPress={() => navigation.navigate('Notifications')} title="Go back home" />
//     </View>
//   );
// }

// function SettingsScreena({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>a</Text>
//       <Button onPress={() => navigation.navigate('SettingsScreenb')} title="Go back home" />
//     </View>
//   );
// }

// function NotificationsScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button onPress={() => navigation.goBack()} title="Go back home" />
//     </View>
//   );
// }

// const Drawer = createDrawerNavigator();
// const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <NavigationContainer  independent={true}>
    //   <Drawer.Navigator initialRouteName="Home">
    //     <Drawer.Screen name="GameSelectScreen" component={GameSelectScreen} />
    //     <Drawer.Screen name="HomeScreen" component={HomeScreen} />
    //     <Drawer.Screen name="HomeScreen2" component={HomeScreen2} />
    //     <Drawer.Screen name="Notifications" component={NotificationsScreen} />
    //   </Drawer.Navigator>
    // </NavigationContainer>
    <TopNavigation />
  );
}
