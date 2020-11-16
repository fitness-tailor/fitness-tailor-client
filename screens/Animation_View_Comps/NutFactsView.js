import React, { useState, useEffect } from "react";
import {
  Animated,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

// This Component is exactly like a View element
// With Fading in capabilities
export default function NutFactsView({ style, children, easing = null }) {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnimY] = useState(new Animated.Value(0));
  const [viewVisible, setViewVisible] = useState(false);
  const [height, setHeight] = useState("10%");

  // let actualHeight = viewVisible ? "0%" : "100%";

  useEffect(() => {
    if (viewVisible) {
      setHeight("100%");
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1500,
          easing: easing,
          useNativeDriver: true,
        }),

        Animated.timing(scaleAnimY, {
          toValue: 1,
          duration: 1500,
          easing: easing,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      setHeight("10%");
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1500,
          easing: easing,
          useNativeDriver: true,
        }),

        Animated.timing(scaleAnimY, {
          toValue: 0,
          duration: 1500,
          easing: easing,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [viewVisible]);

  const changeFactsVisibility = () => {
    setViewVisible(!viewVisible);
  };

  let displayArrow = viewVisible ? (
    <Entypo name="chevron-thin-up" size={36} color="black" />
  ) : (
    <Entypo name="chevron-thin-down" size={36} color="black" />
  );

  return (
    <View>
      <Animated.View
        style={{
          ...style,
          opacity: fadeAnim,
          transform: [{ scaleY: scaleAnimY }],
          height: height,
        }}
      >
        {children}
      </Animated.View>

      <TouchableOpacity style={styles.chevron} onPress={changeFactsVisibility}>
        {displayArrow}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  chevron: {
    alignItems: "center",
    paddingVertical: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 5,
    backgroundColor: "blue",
    width: "100%",
  },
});
