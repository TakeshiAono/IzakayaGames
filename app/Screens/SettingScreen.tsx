import { useNavigation } from "expo-router";
import { Button, View } from "react-native";

const SettingScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="設定をする" />
    </View>
  );
};

export default SettingScreen;
