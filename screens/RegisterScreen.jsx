import Input from '@components/Auth/Input'
import { LEXEND } from '@fonts/LEXEND'
import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { UserContext } from 'store/user-contex'
import { useNavigation } from "@react-navigation/native";
import Button from '@components/UI/Button'
import { register } from 'util/auth/auth'

const RegisterScreen = () => {
  const [formValue, setFormValue] = useState({
    enteredUsername: "",
    enteredPassword: "",
    enteredName:"",
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
      try{
        const data = await register(formValue.enteredName,formValue.enteredUsername,formValue.enteredPassword)
        if(data){
          if(data.register_status){
            nav.navigate("Login")
          }
        }
      }catch(e){

      }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.text, { fontFamily: LEXEND.Black, fontSize: 18 }]}>
          Welcome New User
        </Text>
        <Text style={[styles.text, { fontSize: 18 }]}>
          Enter your details to register.
        </Text>
      </View>
      <Input
        label={"Name"}
        onUpdateValue={updateInputValueHandler.bind(this, "enteredName")}
      />
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
        <Button onPress={onSubmit}>Register</Button>
        <Text style={[styles.text, { textAlign: "center" }]}>Or</Text>
        <Button
          customStyle={styles.regisButton}
          customStyleText={styles.regisText}
          onPress={() => {
            nav.navigate("Login");
          }}
        >
          Log in
        </Button>
      </View>
    </View>
  )
}

export default RegisterScreen

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
})