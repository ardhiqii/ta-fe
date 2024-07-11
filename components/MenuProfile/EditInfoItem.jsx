import Input from "@components/Input";
import { LEXEND } from "@fonts/LEXEND";
import React, { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { COLOR } from "COLOR";
const EditInfoItem = ({ label, data, updateValue, editable = true }) => {
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState("");

  const alertConfirm = () => {
    Alert.alert("Confirmation", "Are you sure?", [
      {
        text: "Yes",
        onPress: () => {
          updateValue(value);
          setValue("");
          setEditMode(false);
        },
      },
      {
        text: "No",
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={[styles.text]}>{label}</Text>
      </View>
      <View style={styles.inputContainer}>
        {!editMode && <Text style={[styles.text]}>{data}</Text>}
        {editMode && (
          <Input
            keyboardType={label === "Phone Number" ? "number-pad" : "default"}
            inputContainerStyle={styles.input}
            textInputStyle={styles.textInput}
            placeholder={data}
            value={value}
            onUpdateValue={setValue}
          />
        )}
        {editMode && (
          <View style={{ flexDirection: "row", columnGap: 8 }}>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                { borderColor: COLOR.base900 },
                pressed && { opacity: 0.7, backgroundColor: "#7676764e" },
              ]}
              onPress={alertConfirm}
            >
              <Text style={[styles.buttonText, { color: COLOR.base900 }]}>
                Done
              </Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                { borderColor: COLOR.accent1 },
                pressed && { opacity: 0.7, backgroundColor: "#7676764e" },
              ]}
              onPress={() => setEditMode(!editMode)}
            >
              <Text style={[styles.buttonText, { color: COLOR.accent1 }]}>
                Cancel
              </Text>
            </Pressable>
          </View>
        )}
      </View>
      {editable && (
        <View style={styles.editContainer}>
          {!editMode && (
            <Pressable onPress={() => setEditMode(!editMode)}>
              <Octicons name="pencil" size={18} color={COLOR.border} />
            </Pressable>
          )}
        </View>
      )}
      {!editable && <View style={{ width: 18, height: 18 }} />}
    </View>
  );
};

export default EditInfoItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  labelContainer: {
    flex: 1,
  },
  inputContainer: {
    flex: 2,
    marginRight: 8,
    rowGap: 10,
  },
  editContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 14,
  },
  input: {
    paddingVertical: 0,
    height: "auto",
  },
  textInput: {
    fontFamily: LEXEND.Light,
    fontSize: 12,
  },
  text: {
    fontFamily: LEXEND.Light,
    fontSize: 12,
  },
  button: {
    borderWidth: 1,
    width: 60,
    paddingVertical: 2,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: LEXEND.Regular,
    fontSize: 12,
  },
});
