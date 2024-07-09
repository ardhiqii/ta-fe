import React, { useContext, useState } from "react";
import { Text, View } from "react-native";
import EditInfoItem from "./EditInfoItem";
import { LEXEND } from "@fonts/LEXEND";
import { UserContext } from "store/user-contex";

const EditInfoProfile = () => {
  const { user } = useContext(UserContext);
  const [profileData, setProfileData] = useState({
    name: user?.name,
    phone: user?.phone,
  });

  const updateValue = (type, value) => {
    setProfileData((prev) => {
      return { ...prev, [type]: value };
    });
  };
  return (
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
  );
};

export default EditInfoProfile;
