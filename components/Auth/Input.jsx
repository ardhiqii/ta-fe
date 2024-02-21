import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LEXEND } from "@fonts/LEXEND";

const Input = ({
  onUpdateValue,
  value,
  label,
  isPassword,
  keyboardType = "default",
}) => {
  const [secure, setSecure] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          keyboardType={keyboardType}
          autoCapitalize="sentences"
          secureTextEntry={isPassword && secure}
          onChangeText={onUpdateValue}
          value={value}
        />
        {isPassword && (
          <Pressable onPress={() => setSecure(!secure)}>
            <Ionicons name={secure ? "eye" :"eye-off"} size={25} color={"#bdbdbd"} />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  label:{
    fontFamily:LEXEND.Regular
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: "#bdbdbd",
  },
  textInput: {
    width: "90%",
  },
});
