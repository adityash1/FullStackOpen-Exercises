import React from "react";
import FormikTextInput from "./FormikTextInput";

import { View, Pressable, Text, StyleSheet } from "react-native";

import theme from "../theme";

const SignInForm = ({ handleSubmit }) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      padding: 15,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.black,
      borderRadius: 5,
      padding: 15,
      margin: 10,
    },
    button: {
      backgroundColor: theme.colors.buttonColor,
      borderRadius: 5,
      padding: 15,
      margin: 10,
    },
    buttonText: {
      color: theme.colors.white,
      textAlign: "center",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <FormikTextInput name="username" placeholder="Username" />
      </View>
      <View style={styles.input}>
        <FormikTextInput
          name="password"
          placeholder="Password"
          secureTextEntry
        />
      </View>
      <View style={styles.button}>
        <Pressable onPress={handleSubmit}>
          <Text style={styles.buttonText}>Sign in</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignInForm;
