import { View, StyleSheet } from "react-native";

import Avatar from "./Avatar";
import Tag from "./Tag";
import DataBlock from "./DataBlock";

import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  main: {
    flexDirection: "row",
  },
  description: {
    marginLeft: 20,
    flex: 1,
  },
  data: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
});

const getFormatNumber = (number) => {
  const roundedNumber = Math.round(number / 100) / 10;
  return `${roundedNumber.toString()}k`;
};

const RepositoryItem = ({ item }) => (
  <View style={styles.container}>
    <View style={styles.main}>
      <Avatar url={item.ownerAvatarUrl} />
      <View style={styles.description}>
        <Text subheading bold>
          {item.fullName}
        </Text>
        <Text secondary>{item.description}</Text>
        <Tag>{item.language}</Tag>
      </View>
    </View>
    <View style={styles.data}>
      <DataBlock data={getFormatNumber(item.stargazersCount)} label="Stars" />
      <DataBlock data={getFormatNumber(item.forksCount)} label="Forks" />
      <DataBlock data={item.reviewCount} label="Reviews" />
      <DataBlock data={item.ratingAverage} label="Rating" />
    </View>
  </View>
);

export default RepositoryItem;
