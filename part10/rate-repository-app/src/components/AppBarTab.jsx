import { Pressable, StyleSheet } from "react-native";
import { Link } from "react-router-native";

import Text from "./Text";

import theme from "../theme";

const styles = StyleSheet.create({
  tab: {
    color: theme.colors.white,
    marginLeft: 20,
  },
});

const AppBarTab = ({ to, children }) => {
  return (
    <Pressable>
      <Link to={to}>
        <Text heading bold style={styles.tab}>
          {children}
        </Text>
      </Link>
    </Pressable>
  );
};

export default AppBarTab;
