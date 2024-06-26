import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LEXEND } from "@fonts/LEXEND";
import { COLOR } from "COLOR";

const Input = ({
  onUpdateValue,
  value,
  label,
  isPassword=false,
  keyboardType = "default",
  placeholder,
  multiline,
  inputContainerStyle,
  textInputStyle,
  onFocus
}) => {
  const [secure, setSecure] = useState(true);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <View>
        {label && <Text style={styles.label}>{label}</Text>}
        <View style={[styles.inputContainer, !multiline && {height:40},inputContainerStyle]}>
          <TextInput
          onFocus={onFocus}
            style={[styles.textInput,textInputStyle]}
            keyboardType={keyboardType}
            autoCapitalize="sentences"
            secureTextEntry={isPassword && secure}
            onChangeText={onUpdateValue}
            value={value}
            placeholder={placeholder}
            multiline={multiline}
          />
          {isPassword && (
            <Pressable onPress={() => setSecure(!secure)}>
              <Ionicons
                name={secure ? "eye" : "eye-off"}
                size={20}
                color={"#bdbdbd"}
              />
            </Pressable>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    rowGap: 8,
  },
  label: {
    fontFamily: LEXEND.Regular,
    color: COLOR.border,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 8,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLOR.border,
  },
  textInput: {
    width: "90%",
  },
});
