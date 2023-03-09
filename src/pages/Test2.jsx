import { View, Text } from "react-native";
import React, { useEffect, useMemo } from "react";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Svg, { Line } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const AnimatedLine = Animated.createAnimatedComponent(Line);

const Test2 = () => {
  const positionX = useSharedValue(100);
  const positionY = useSharedValue(100);

  const animatedProps = useAnimatedProps(() => ({
    x2: positionX.value,
    y2: positionY.value,

    // transform: [
    //   { translateX: positionX.value },
    //   { translateY: positionY.value },
    // ],
  }));

  const panGesture = useMemo(() =>
    Gesture.Pan()
      .onStart((e) => {})
      .onUpdate((e) => {
        positionX.value = e.x;
        positionY.value = e.y;
      })
      .onEnd((e) => {})
  );

  return (
    <View style={{ flex: 1 }}>
      <GestureHandlerRootView
        style={{
          flex: 1,
          paddingHorizontal: 24,
          paddingBottom: 24,
          paddingTop: 42,
        }}
      >
        <GestureDetector gesture={panGesture}>
          <View style={{ flex: 1, backgroundColor: "#FF87A3" }}>
            <Svg>
              <AnimatedLine animatedProps={animatedProps} x1="0" y1="0" stroke='black' />
              {/* <Animated.View
                style={[
                  { width: 20, height: 20, backgroundColor: "#7A125E" },
                  animatedStyle,
                ]}
              ></Animated.View> */}
            </Svg>
          </View>
        </GestureDetector>
      </GestureHandlerRootView>
    </View>
  );
};

export default Test2;

const MyLine = ({ positionX, positionY }) => {
  useEffect(() => {
    console.log(positionX.value);
  }, [positionX.value, positionY.value]);

  return (
    <Line
      x1={0}
      y1={0}
      x2={positionX.value}
      y2={positionY.value}
      stroke="#7A125E"
    ></Line>
  );
};
