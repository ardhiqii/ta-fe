import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { LEXEND } from "@fonts/LEXEND";
import { COLOR } from "COLOR";
import Input from "@components/Input";

export const ManagePlayer = ({ type, setStatus, status }) => {
  const [editName, setEditName] = useState(false);

  const player = "player" + type;
  const currScore = status?.[player].score;
  const currName = status?.[player].name;
  const isDefaultName = currName === "Player " + type;
  const changeScoreValue = parseInt(status?.changeScoreValue, 10);

  const changeName = (name) => {
    const newValue = {
      name: name,
      score: currScore,
    };
    setStatus((prev) => {
      return { ...prev, [player]: newValue };
    });
  };

  const changeScore = (score) => {
    if (score < 0) {
      return;
    }
    const newValue = {
      name: currName,
      score: score,
    };
    setStatus((prev) => {
      return { ...prev, [player]: newValue };
    });
  };

  const alertResetScore = () => {
    const mssg = `Are you sure want to reset score of ${currName}?`;
    Alert.alert("Confirmation", mssg, [
      {
        text: "Yes",
        onPress: () => {
          changeScore(0);
        },
      },
      {
        text: "No",
      },
    ]);
  };

  const alertResetName = () => {
    const defaultName = "Player " + type;
    const mssg = `Are you sure want to reset name of ${currName}?`;
    Alert.alert("Confirmation", mssg, [
      {
        text: "Yes",
        onPress: () => {
          changeName(defaultName);
          setEditName(false);
        },
      },
      {
        text:'No'
      }
    ]);
  };

  return (
    <View style={styles.manageContainer}>
      <View style={styles.nameContainer}>
        {editName && (
          <View
            style={{ flexDirection: "row", columnGap: 8, alignItems: "center" }}
          >
            <View style={{ width: "70%" }}>
              <Input
                value={currName}
                onUpdateValue={changeName}
                inputContainerStyle={styles.inputName}
                textInputStyle={styles.nameText}
              />
            </View>
            <View style={{ flexDirection: "row", columnGap: 4 }}>
              <Pressable
                onPress={() => setEditName(false)}
                style={[styles.buttonRetangle, { borderColor: "#3e82f5" }]}
              >
                <Text
                  style={{
                    fontFamily: LEXEND.Regular,
                    fontSize: 12,
                    color: "#3e82f5",
                  }}
                >
                  Done
                </Text>
              </Pressable>
              <Pressable
               onPress={alertResetName}
                style={[styles.buttonRetangle, { borderColor: COLOR.base900 }]}
              >
                <Text
                  style={{
                    fontFamily: LEXEND.Regular,
                    fontSize: 12,
                    color: COLOR.base900,
                  }}
                >
                  Reset
                </Text>
              </Pressable>
            </View>
          </View>
        )}

        {!editName && (
          <View
            style={{ flexDirection: "row", alignItems: "center", columnGap: 8 }}
          >
            <Text style={styles.nameText}>
              {currName}
              {!isDefaultName && (
                <Text style={{ fontFamily: LEXEND.Light, fontSize: 10 }}>
                  {" "}
                  - Player {type}
                </Text>
              )}
            </Text>
            <Pressable onPress={() => setEditName(true)}>
              <MaterialIcons name="mode-edit" size={18} color={COLOR.accent2} />
            </Pressable>
          </View>
        )}
      </View>
      <View style={{ rowGap: 4 }}>
        <View
          style={{ flexDirection: "row", alignItems: "center", columnGap: 14 }}
        >
          <View
            style={{ flexDirection: "row", columnGap: 4, alignItems: "center" }}
          >
            <Text style={{ fontFamily: LEXEND.Light, fontSize: 12 }}>
              Score:
            </Text>
            <Input
              value={currScore.toString()}
              onUpdateValue={changeScore}
              inputContainerStyle={styles.inputContainer}
              keyboardType="number-pad"
            />
          </View>

          <View style={{ flexDirection: "row", columnGap: 12 }}>
            <Pressable
              onPress={changeScore.bind(this, currScore - changeScoreValue)}
              style={[styles.button, { borderColor: COLOR.accent1 }]}
            >
              <Entypo name="minus" size={14} color={COLOR.accent1} />
            </Pressable>

            <Pressable
              onPress={changeScore.bind(this, currScore + changeScoreValue)}
              style={[styles.button, { borderColor: "#3e82f5" }]}
            >
              <Entypo name="plus" size={14} color={"#3e82f5"} />
            </Pressable>

            <Pressable
              onPress={alertResetScore}
              style={[styles.button, { borderColor: COLOR.base900 }]}
            >
              <Entypo name="ccw" size={14} color={COLOR.base900} />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  manageContainer: {
    borderBottomWidth: 1,
    paddingBottom: 8,
    rowGap: 4,
  },
  buttonRetangle: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    padding: 2,
    borderWidth: 1,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    width: 22,
    height: 22,
  },
  nameContainer: {
    flexDirection: "row",
    paddingVertical: 2,
    alignItems: "center",
  },
  nameText: {
    fontFamily: LEXEND.Regular,
    fontSize: 14,
  },
  inputContainer: {
    fontSize: 8,
    height: 20,
    width: 40,
    paddingVertical: 0,
    paddingHorizontal: 4,
  },
  inputName: {
    paddingVertical: 0,
    height: "auto",
    overflow: "hidden",
  },
});
