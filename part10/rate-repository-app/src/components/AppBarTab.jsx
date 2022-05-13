import { Text, View, Pressable, StyleSheet } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: theme.colors.dark,
    paddingTop: 40 + Constants.statusBarHeight,
    opacity: 0.8,
  },
});

const AppBarTab = ({ children }) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => {}}>
        <Text primary heading bold style={{ color: "#fff" }}>
          {children}
        </Text>
      </Pressable>
    </View>
  );
};

export default AppBarTab;
