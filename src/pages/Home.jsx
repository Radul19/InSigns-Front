import { View, Text, Image } from "react-native";
import React, { useRef, useState } from "react";
import { Dimensions, TouchableOpacity, StyleSheet, Button } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";


import image1 from "../images/Open1.png";
import image2 from "../images/Open2.png";
import image3 from "../images/Open3.png";
import image4 from "../images/Open4.png";

const text1 =
  "Welcome to our app where you can learn with fun classes how to spell sign language wihtout spend a single cent";
const text2 = "Build on top of our users need you can upgrade all your knowledge and share progress with friends";
const text3 = "Few steps are needed to set up your account, going straight foward to the fun!";
const text4 = "Keep in touch with the updates, this app is still in development so turn on the notification and enjoy the app";

const ww = Dimensions.get("window").width;
const wh = Dimensions.get("window").height;

const dotsColors = ["#773E23", "#111876", "#19660F", "#7A1B52"];

const Home = () => {
  const [dotPos, setDotPos] = useState(0);

  const offset = useSharedValue(ww * 1.5);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withSpring(offset.value, { damping: 20 }) }],
      //   transform: [{ translateX: offset.value }],
    };
  });

  const press = () => {
    // offset.value = withSpring(Math.random());
    if (offset.value <= ww * -1.5) {
      offset.value = ww * 1.5;
    } else {
      offset.value = offset.value - ww;
    }
  };

  const updateDots = (value) => {
    console.log("wtf: " + value);
    setDotPos(value);
  };

  const panGesture = Gesture.Pan().onEnd((e) => {
    if (e.translationX > 75) {
      if (offset.value < ww * 1.5) {
        offset.value = offset.value + ww;
        runOnJS(updateDots)(dotPos - 1);
      }
      console.log("swipe to left");
    } else if (e.translationX < -75) {
      if (offset.value > ww * -1.5) {
        offset.value = offset.value - ww;
        runOnJS(updateDots)(dotPos + 1);
      }
      console.log("swipe to right");
    }
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[
            {
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            },
            animatedStyles,
          ]}
        >
          <Page text={text1} bg="#B3815E" img={image1} />
          <Page text={text2} bg="#5D6FF7" img={image2} />
          <Page text={text3} bg="#439A27" img={image3} />
          <Page text={text4} bg="#FF8EA5" img={image4} />
        </Animated.View>
      </GestureDetector>
      <View style={st.dotsCtn}>
        <Dot value={dotPos} state={0} />
        <Dot value={dotPos} state={1} />
        <Dot value={dotPos} state={2} />
        <Dot value={dotPos} state={3} />
      </View>
    </GestureHandlerRootView>
  );
};

export default Home;

const Page = ({ text, bg, img }) => {
  return (
    <View style={{ ...st.pages, backgroundColor: bg }}>
      <Image style={{ ...st.imageBox }} source={img} resizeMode="contain" />
      <Text style={st.text}>{text}</Text>
    </View>
  );
};

const Dot = ({ value, state }) => {
  return (
    <View
      style={[
        st.dot,
        {
          transform: value === state ? [{ scale: 1.3 }] : [],
          backgroundColor: dotsColors[value],
        },
      ]}
    >
      {/* {value === state && <View style={st.dotIn}></View>} */}
    </View>
  );
};

const st = StyleSheet.create({
  pages: {
    height: "100%",
    width: ww,
    alignItems: "center",
    // justifyContent: "center",
    paddingTop: "40%",
  },
  text: {
    fontFamily: "Poppins-Regular",
    color: "white",
    marginTop: 48,
    paddingHorizontal: 12,
    textAlign: "center",
    fontSize: 18,
  },
  btn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: "#905B3B",
  },
  box: {
    width: 50,
    height: 50,
    backgroundColor: "#ff6a00",
  },
  dotsCtn: {
    // backgroundColor:'#ff6a00',
    height: "10%",
    width: "100%",
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: "15%",
  },
  dot: {
    height: 12,
    width: 12,
    backgroundColor: "#905B3B",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  dotIn: {
    height: 6,
    width: 6,
    // backgroundColor: "#B3815E",
    borderRadius: 50,
  },
  imageBox: {
    width: ww * 0.75,
    height: ww * 0.75,
    // backgroundColor: "red",
  },
});
