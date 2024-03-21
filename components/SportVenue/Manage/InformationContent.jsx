import React, { useState } from "react";
import {
  Modal,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLOR } from "COLOR";
import { LEXEND } from "@fonts/LEXEND";
import CustomModal from "@components/CustomModal";

const InfoWithButton = ({ value, icon, button }) => {
  return (
    <View style={styles.layout}>
      <View
        style={[
          { flexDirection: "row", columnGap: 5 },
          button && { width: "60%" },
        ]}
      >
        <Ionicons name={icon} size={22} color={COLOR.base900} />
        <Text style={styles.text}>{value}</Text>
      </View>
      {button && (
        <Pressable style={styles.buttonContainer}>
          <Text
            style={{
              fontFamily: LEXEND.Regular,
              fontSize: 10,
              color: COLOR.base700,
            }}
          >
            {button}
          </Text>
        </Pressable>
      )}
    </View>
  );
};

const ModalDetailInformation = ({ visible, visibleHandler }) => {
  const INFO_BUTTON = [
    {
      value: `Jl. Cisitu Lama Gg. 1 No.1, RT.006/RW.11, Dago, Kecamatan Coblong, Kota Bandung, Jawa Barat 40135`,
      button: "Open Map",
      icon: "location-outline",
    },
    {
      value: `+6988989989`,
      button: "Call",
      icon: "call-outline",
    },
    {
      value: `Lapang Badminton dengan 3 lapang yang  udah menggunakan karpet`,
      icon: "information-circle-outline",
    },
  ];
  return (
    <CustomModal style={{top:50,}}  visible={visible} animationType={"slide"} closeModal={()=>visibleHandler(false)} >
      <View style={stylesModal.container}>
        <View style={stylesModal.navContainer}>
          <Pressable onPress={() => visibleHandler(false)}>
            <Ionicons name="close" size={35} color={COLOR.base600} />
          </Pressable>
          <Text
            style={{
              fontFamily: LEXEND.SemiBold,
              color: COLOR.base900,
              fontSize: 20,
            }}
          >
            Detail Venue
          </Text>
        </View>
        <View>
          {INFO_BUTTON.map((info, i) => (
            <InfoWithButton key={i} {...info} />
          ))}
          <Text>Rule</Text>
          <Text>
            Wajib menggunakan sepatu badminton, tidak boleh menggunakan sepatu
            berdebu
          </Text>
        </View>
      </View>
    </CustomModal>
  );
};

const stylesModal = StyleSheet.create({
  
  container: {
    backgroundColor: "white",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    paddingHorizontal: 25,
    flex:1,
  },
  navContainer: {
    flexDirection: "row",
    paddingVertical: 8,
    alignItems: "center",
  },
});

const InformationContent = () => {
  const [modal, setModal] = useState(false);
  const INFO_BUTTON = [
    {
      value: `Jl. Cisitu Lama Gg. 1 No.1, RT.006/RW.11, Dago, Kecamatan Coblong, Kota Bandung, Jawa Barat 40135`,
      button: "Open Map",
      icon: "location-outline",
    },
    {
      value: `+6988989989`,
      button: "Call",
      icon: "call-outline",
    },
    {
      value: `Lapang Badminton dengan 3 lapang yang  udah menggunakan karpet`,
      icon: "information-circle-outline",
    },
  ];
  return (
    <View>
      <View style={styles.darkerContainer} />
      <View style={styles.container}>
        {INFO_BUTTON.map((info, i) => (
          <InfoWithButton key={i} {...info} />
        ))}
        <Text
          onPress={() => setModal(true)}
          style={[styles.text, styles.buttonRead]}
        >
          Read More
        </Text>
      </View>
      <ModalDetailInformation visible={modal} visibleHandler={setModal} />
      {/* <CustomModal></CustomModal> */}
    </View>
  );
};

export default InformationContent;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    rowGap: 12,
  },
  layout: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontFamily: LEXEND.Regular,
    fontSize: 12,
    color: COLOR.second700,
  },
  buttonContainer: {
    borderWidth: 2,
    borderColor: COLOR.base700,
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    paddingVertical: 5,
    borderRadius: 5,
  },
  buttonRead: {
    textAlign: "center",
    fontFamily: LEXEND.SemiBold,
    color: COLOR.base900,
  },
});
