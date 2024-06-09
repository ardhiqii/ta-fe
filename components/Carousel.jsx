import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const viewConfigRef = { viewAreaCoveragePercentThreshold: 95 };

const { width, height } = Dimensions.get("window");

const IMAGES = [
  "https://www.dbl.id/thumbs/extra-large/uploads/post/2021/11/16/GOR%20ARCAMANIK.jpg",
  "https://www.dbl.id/thumbs/extra-large/uploads/post/2019/08/23/WhatsApp_Image_2019-08-23_at_11.13_.55_1.jpeg",
  "https://asset.kompas.com/crops/eEQhYCh92WNZ8JU0fuEU21jJ1Dk=/0x0:783x522/750x500/data/photo/2019/06/24/3545145307.jpg",
];

const Carousel = ({ renderItem, data }) => {
  let flatListRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {}, [currentIndex]);

  const onViewRef = useRef(({ changed }) => {
    if (changed[0].isViewable) {
      setCurrentIndex(changed[0].index);
    }
  });
  // const renderItem = ({ item }) => {
  //   return (
  //     <Pressable style={styles.imageContainer}>
  //       <Image source={{ uri: item }} style={styles.image} />
  //     </Pressable>
  //   );
  // };

  const Dots = () => {
    return (
      <View style={styles.dotsContainer}>
        <View style={{flexDirection:'row', backgroundColor: "#00000063",padding:4, borderRadius:8}}>
          {data.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                { opacity: index === currentIndex ? 1 : 0.5 },
              ]}
            />
          ))}
        </View>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        ref={(ref) => {
          flatListRef.current = ref;
        }}
        viewabilityConfig={viewConfigRef}
        onViewableItemsChanged={onViewRef.current}
        contentContainerStyle={styles.carousel}
      />
      <Dots />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  carousel: {
    alignItems: "center",
  },
  imageContainer: {
    height: 216,
    width,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    top: -20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: "white",
    marginHorizontal: 4,
  },
});
