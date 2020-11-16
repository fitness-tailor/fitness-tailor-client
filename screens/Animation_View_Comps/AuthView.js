import React, { useState, useEffect } from "react";
import { Animated, Text, View } from "react-native";

// This Component is exactly like a View element
// With Fading in capabilities
export default function FadeInView({ style, children, easing = null }) {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      easing: easing,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={{
        ...style,
        opacity: fadeAnim,
      }}
    >
      {children}
    </Animated.View>
  );
}
