import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";

import AppBarTab from "./AppBarTab";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 20,
    paddingTop: 20 + Constants.statusBarHeight,
    backgroundColor: theme.colors.black,
    opacity: 0.8,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab to="/">Repositories</AppBarTab>
        <AppBarTab to="/signin">Sign in</AppBarTab>
      </ScrollView>
    </View>
  );
};

export default AppBar;
