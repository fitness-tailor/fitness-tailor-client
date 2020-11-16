import React, { useState, useEffect } from "react";
import {
  Animated,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Easing,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

// This Component is exactly like a View element
// With Fading in capabilities
export default function NutFactsView({ style, children, easing = null }) {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnimY] = useState(new Animated.Value(0));
  const [viewVisible, setViewVisible] = useState(false);
  const [viewHeight, setViewHeight] = useState("0%");

  // let actualHeight = viewVisible ? "0%" : "100%";

  useEffect(() => {
    if (viewVisible) {
      setViewHeight(null);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.In,
        useNativeDriver: true,
      }).start();
    } else {
      setViewHeight("0%");
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        easing: Easing.In,
        useNativeDriver: true,
      }).start();
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
      <View style={{ height: viewHeight }}>
        <Animated.View
          style={{
            ...style,
            opacity: fadeAnim,
            transform: [
              {
                scaleY: fadeAnim.interpolate({
                  inputRange: [0, 0.1, 1],
                  outputRange: [0, 0.7, 1],
                }),
              },
            ],
          }}
        >
          {children}
        </Animated.View>
      </View>

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
    marginVertical: 5,
    backgroundColor: "#FAFAFF",
    width: "100%",
  },
});
