import Input from "@components/Input";
import { LEXEND } from "@fonts/LEXEND";
import React, { useContext, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { UserContext } from "store/user-contex";
import { useNavigation } from "@react-navigation/native";
import Button from "@components/UI/Button";
import { register } from "util/auth/auth";
import RoleChoice from "@components/Auth/RoleChoice";
import { COLOR } from "COLOR";
import LoadingOverlay from "@components/LoadingOverlay";

const RegisterScreen = () => {
  const [formValue, setFormValue] = useState({
    enteredUsername: "",
    enteredPassword: "",
    enteredName: "",
    enteredPhone: "",
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
    try {
      const data = await register(
        formValue.enteredName,
        formValue.enteredUsername,
        formValue.enteredPassword,
        formValue.enteredPhone,
        formValue.role
      );
      if (data) {
        if (data.register_status) {
          nav.navigate("Login");
        } else {
          Alert.alert("Something wrong", "Try again to register");
        }
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={10}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/vector_register.png")}
            style={styles.image}
          />
        </View>

        <View>
          <Text
            style={[
              styles.text,
              { fontFamily: LEXEND.Bold, fontSize: 18, color: COLOR.second900 },
            ]}
          >
            Let's get started!
          </Text>
          <Text style={[styles.text, { fontSize: 15 }]}>
            Create an account as {formValue.role}
          </Text>
        </View>
        <RoleChoice setChoice={updateRole} choice={formValue.role}>
          Account as
        </RoleChoice>
        <View style={styles.formContainer}>
          <Input
            label={"Name"}
            onUpdateValue={updateInputValueHandler.bind(this, "enteredName")}
          />
          <Input
            label={"Username"}
            onUpdateValue={updateInputValueHandler.bind(
              this,
              "enteredUsername"
            )}
          />
          <Input
            label={"Password"}
            onUpdateValue={updateInputValueHandler.bind(
              this,
              "enteredPassword"
            )}
            isPassword={true}
          />

          <Input
            label={"Phone Number"}
            onUpdateValue={updateInputValueHandler.bind(this, "enteredPhone")}
            keyboardType="phone-pad"
          />
        </View>
        <View style={{ flexDirection: "column", rowGap: 14 }}>
          <Button onPress={onSubmit} configGradient>
            Sign Up
          </Button>

          <Text style={[styles.text, { textAlign: "center" }]}>
            Dont have an account?{" "}
            <Text
              style={[styles.text, { color: COLOR.base900 }]}
              onPress={() => nav.navigate("Login")}
            >
              Sign in
            </Text>
          </Text>
        </View>
        {loading && <LoadingOverlay />}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    justifyContent: "center",
    paddingHorizontal: 25,
    paddingTop: 50,
    paddingBottom: 80,
    rowGap: 20,
    // backgroundColor: "blue",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    overflow: "hidden",
    // backgroundColor: "red",
  },
  formContainer: {
    rowGap: 20,
  },
  image: {
    width: 200,
    height: 240,
    objectFit: "fill",
  },
  text: {
    fontSize: 12,
    fontFamily: LEXEND.Regular,
    color: COLOR.border,
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
