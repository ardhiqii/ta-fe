import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const SwipeableContent = ({ renderItem, data, gap=5, customStyle }) => {
  const keyExtractor = (item, idx) => `${Object.keys(item)}-${idx}`
  return (
    <FlatList
      contentContainerStyle={[
        styles.container,
        customStyle,
        { columnGap: gap },
      ]}
      data={data}
      keyExtractor={keyExtractor}
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
