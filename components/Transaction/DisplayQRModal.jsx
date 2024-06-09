import CustomModal from "@components/CustomModal";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Player } from "util/player/player";

const DisplayQRModal = ({ visible, closeModal,token,idReservation }) => {
  const [loading,setLoading] = useState(true)
  const [imageUrl, setImageUrl] = useState("")

  const fetchQR = async () =>{
    setLoading(true)
    try {
      const resp = await Player.Booking.getReservationQR(token,idReservation)
      if(resp.get_status){
        setImageUrl(resp.data.url_qr)
      }
    } catch (e) {
      console.log("Error occured fetchQR DisplayQRModal",e);
    }
    setLoading(false)
  }

  useEffect(()=>{
    fetchQR()
  },[])
  return (
    <CustomModal
      style={styles.outerModal}
      visible={visible}
      closeModal={closeModal}
    >
      <View style={styles.modalContainer}>
        {loading && <Text>Loading</Text>}
        {!loading && <View style={styles.imageContainer}>
          <Image
            source={{
              uri: imageUrl,
            }}
            style={styles.image}
          />
        </View>}
      </View>
    </CustomModal>
  );
};

export default DisplayQRModal;

const styles = StyleSheet.create({
  outerModal: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    width: 300,
    height: 300,
    borderRadius: 10,
    overflow: "hidden",
  },
  imageContainer: {
    borderColor: "#eceff1",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
});
