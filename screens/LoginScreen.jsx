import Input from "@components/Auth/Input";
import Button from "@components/UI/Button";
import { LEXEND } from "@fonts/LEXEND";
import React, { useContext, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { UserContext } from "store/user-contex";
import { login } from "util/auth/auth";
import { useNavigation } from "@react-navigation/native";
const LoginScreen = () => {
  const [formValue, setFormValue] = useState({
    enteredUsername: "",
    enteredPassword: "",
  });
  const { updateUser, user } = useContext(UserContext);
  const nav = useNavigation();
  const updateInputValueHandler = (inputIdentifier, value) => {
    setFormValue((prev) => {
      return {
        ...prev,
        [inputIdentifier]: value,
      };
    });
  };

  const onSubmit = async () => {
    const data = await login("devexample", "devexample");
    // const data = await login(
    //   formValue.enteredUsername,
    //   formValue.enteredPassword
    // );
    if (data) {
      if (!data.login_status) {
        Alert.alert("Something wrong", "Invalid username or password");
      } else {
        updateUser(data);
      }
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.text, { fontFamily: LEXEND.Black, fontSize: 18 }]}>
          Welcome
        </Text>
        <Text style={[styles.text, { fontSize: 18 }]}>
          Enter your details to log in.
        </Text>
      </View>
      <Input
        label={"Username"}
        onUpdateValue={updateInputValueHandler.bind(this, "enteredUsername")}
      />
      <Input
        label={"Password"}
        onUpdateValue={updateInputValueHandler.bind(this, "enteredPassword")}
        isPassword={true}
      />
      <View style={{ flexDirection: "column", rowGap: 4 }}>
        <Button onPress={onSubmit}>Login</Button>
        <Text style={[styles.text, { textAlign: "center" }]}>Or</Text>
        <Button
          customStyle={styles.regisButton}
          customStyleText={styles.regisText}
          onPress={() => {
            nav.navigate("Register");
          }}
        >
          Create a New Account
        </Button>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    justifyContent: "center",
    rowGap: 20,
  },
  text: {
    fontSize: 12,
    fontFamily: LEXEND.Regular,
  },
  regisButton: {
    backgroundColor: "tranparent",
    paddingVertical: 0,
  },
  regisText: {
    fontFamily: LEXEND.Regular,
    color: "black",
    fontSize: 12,
  },
});
