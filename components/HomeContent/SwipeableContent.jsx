import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const SwipeableContent = ({ renderItem, data, gap=5, customStyle }) => {
  return (
    <FlatList
      contentContainerStyle={[
        styles.container,
        customStyle,
        { columnGap: gap },
      ]}
      data={data}
      keyExtractor={(item) => item.id}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={renderItem}

    />
  );
};

export default SwipeableContent;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
  },
});
