import Input from "@components/Input";
import Button from "@components/UI/Button";
import { LEXEND } from "@fonts/LEXEND";
import React, { useContext, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { UserContext } from "store/user-contex";
import { login } from "util/auth/auth";
import { useNavigation } from "@react-navigation/native";
import { COLOR } from "COLOR";
import RoleChoice from "@components/Auth/RoleChoice";
import LoadingOverlay from "@components/LoadingOverlay";
const LoginScreen = () => {
  const [formValue, setFormValue] = useState({
    enteredUsername: "",
    enteredPassword: "",
    role: "player",
  });
  const [loading, setLoading] = useState(false);
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

  const updateRole = (role) => {
    setFormValue((prev) => {
      return {
        ...prev,
        ["role"]: role,
      };
    });
  };

  const onSubmit = async () => {
    setLoading(true);
    const data = await login(
      formValue.enteredUsername,
      formValue.enteredPassword,
      formValue.role
    );
    if (data) {
      setLoading(false);
      if (!data.login_status) {
        Alert.alert("Something wrong", "Invalid username or password");
      } else {
        updateUser(data.data);
      }
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/vector_login.png")}
          style={styles.image}
        />
      </View>
      <View style={styles.formContainer}>
        <View>
          <Text
            style={[
              styles.text,
              { fontFamily: LEXEND.Bold, fontSize: 18, color: COLOR.second900 },
            ]}
          >
            Login to your account!
          </Text>
          <Text style={[styles.text, { fontSize: 15 }]}>
            Hello, Welcome Back
          </Text>
        </View>

        <RoleChoice choice={formValue.role} setChoice={updateRole}>
          Login as
        </RoleChoice>

        <Input
          label={"Username"}
          onUpdateValue={updateInputValueHandler.bind(this, "enteredUsername")}
        />
        <Input
          label={"Password"}
          onUpdateValue={updateInputValueHandler.bind(this, "enteredPassword")}
          isPassword={true}
        />

        <View style={{ flexDirection: "column", rowGap: 14 }}>
          <Button onPress={onSubmit} configGradient>
            Login
          </Button>
          <Text style={[styles.text, { textAlign: "center" }]}>
            Dont have an account?{" "}
            <Text
              style={[styles.text, { color: COLOR.base900 }]}
              onPress={() => nav.navigate("Register")}
            >
              Sign up
            </Text>
          </Text>
        </View>
      </View>
      {loading && <LoadingOverlay />}
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    flex: 1,
    justifyContent: "center",
    rowGap: 30,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "red",
    marginBottom: 12,
  },
  formContainer: {
    rowGap: 20,
    // backgroundColor: "green",
  },

  text: {
    fontSize: 12,
    color: COLOR.border,
    fontFamily: LEXEND.Regular,
  },

  image: {
    width: 200,
    height: 220,
    objectFit: "fill",
  },
  regisButton: {
    backgroundColor: "white",
    paddingVertical: 0,
    color: "white",
  },
  regisText: {
    fontFamily: LEXEND.Regular,
    color: "black",
    fontSize: 12,
  },
});
