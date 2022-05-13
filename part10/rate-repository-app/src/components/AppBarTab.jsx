import { View, Pressable, StyleSheet, ImageComponent } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";

import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: theme.colors.black,
    paddingTop: 30 + Constants.statusBarHeight,
    opacity: 0.8,
  },
});

const AppBarTab = ({ children }) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => {}}>
        <Text heading bold style={{ color: "#fff" }}>
          {children}
        </Text>
      </Pressable>
    </View>
  );
};

export default AppBarTab;
