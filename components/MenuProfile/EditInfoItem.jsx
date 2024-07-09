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
            inputContainerStyle={styles.input}
            textInputStyle={styles.textInput}
            placeholder={data}
            value={value}
            onUpdateValue={setValue}
          />
        )}
      </View>
      {editable && (
        <View style={styles.editContainer}>
          {!editMode && (
            <Pressable onPress={() => setEditMode(!editMode)}>
              <Octicons name="pencil" size={18} color={COLOR.border} />
            </Pressable>
          )}
          {editMode && (
            <>
              <Pressable onPress={alertConfirm}>
                <Octicons name="check" size={18} color={COLOR.border} />
              </Pressable>
              <Pressable>
                <Octicons
                  onPress={() => setEditMode(!editMode)}
                  name="x"
                  size={18}
                  color={COLOR.border}
                />
              </Pressable>
            </>
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
});
