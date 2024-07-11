import React, { useContext, useState } from "react";
import { Text, View } from "react-native";
import EditInfoItem from "./EditInfoItem";
import { LEXEND } from "@fonts/LEXEND";
import { UserContext } from "store/user-contex";
import { Player } from "util/player/player";
import LoadingOverlay from "@components/LoadingOverlay";

const EditInfoProfile = () => {
  const { user, updateWithCertainType } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name,
    phone: user?.phone,
  });

  const updateValue = async (type, value) => {
    setLoading(true);
    const updateData = {
      username: null,
      phone: null,
      name: null,
    };
    updateData[type] = value;

    try {
      const { data } = await Player.Profile.editUserInfo(
        user.token,
        updateData.username,
        updateData.name,
        updateData.phone
      );
      if (data) {
        updateWithCertainType("name", data.name);
        updateWithCertainType("phone", data.phone);
        setProfileData((prev) => {
          return { ...prev, [type]: value };
        });
      }
    } catch (error) {
      console.log("ERROR updateValue in EditInfoProfile", error);
    }
    setLoading(false);
  };
  return (
    <>
      <View style={{ rowGap: 8 }}>
        <View>
          <Text style={{ fontFamily: LEXEND.SemiBold, fontSize: 14 }}>
            Info Profile
          </Text>
        </View>
        <View style={{ rowGap: 10 }}>
          <EditInfoItem
            label={"Username"}
            data={user?.username}
            editable={false}
          />
          <EditInfoItem
            label={"Name"}
            data={profileData.name}
            updateValue={updateValue.bind(this, "name")}
          />
          <EditInfoItem
            label={"Phone Number"}
            data={profileData.phone}
            updateValue={updateValue.bind(this, "phone")}
          />
        </View>
      </View>
      {loading && <LoadingOverlay />}
    </>
  );
};

export default EditInfoProfile;
