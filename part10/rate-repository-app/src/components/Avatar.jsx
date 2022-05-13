import { StyleSheet, Image } from "react-native";

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
});

const Avatar = ({ url }) => {
  return (
    <Image
      style={styles.logo}
      source={{
        uri: url,
      }}
    />
  );
};

export default Avatar;
