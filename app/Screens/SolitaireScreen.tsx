import { useNavigation } from "expo-router";
import { Button, View } from "react-native";
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect } from "react";

const SolitaireScreen =() => {
  const navigation = useNavigation();

  useEffect(() => {
    ScreenOrientation.unlockAsync();
  }, [])
  

  const handleLayout = () => {
    console.log('layout');
  };

  return (
    <View onLayout={handleLayout} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="ゲームを始める"/>
      {/* <Button onPress={() => navigation.navigate('Notifications')} title="Go back home" /> */}
      {/* <Button onPress={() => navigation.goBack()} title="戻る" /> */}
    </View>
  );
}

export default SolitaireScreen;