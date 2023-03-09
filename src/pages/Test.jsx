import { Dimensions, StyleSheet, View, Text } from "react-native";
import React, { useMemo, useState } from "react";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Svg, { Line } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  useSharedValue,
} from "react-native-reanimated";

const ww = Dimensions.get("window").width;
const wh = Dimensions.get("window").height;
const fixWW = Math.floor(ww / 10);
const fixWH = Math.floor(wh / 10);
const topBoxes = Array.from({ length: fixWW }, (x) => (x = 1));
const sideBoxes = Array.from({ length: fixWH }, (x) => (x = 1));

const AnimatedLine = Animated.createAnimatedComponent(Line);

const testBoxes = [1, 2, 3, 4, 5];

const Test = () => {
  const [layout, setLayout] = useState();

  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => ({
    x2: positionX.value,
    y2: positionY.value,
    y1: startY.value,
  }));

  const panGesture = useMemo(() =>
    Gesture.Pan()
      .onStart((e) => {
        if (e.x < (ww - 48) * 0.35) {
          /** DEAM CALC HOLY SHIT */
          let spcBox = ww / testBoxes.length;
          let spcBetween = (layout?.height - spcBox * testBoxes.length) / 6;
          let boxIndex =
            Math.floor(e.y / (layout?.height / testBoxes.length)) + 1;
          startY.value =
            spcBetween * boxIndex + (spcBox * boxIndex - spcBox / 2);
        } else if (e.x > (ww - 48) * 0.65) {
          console.log("is on right side");
        }
      })
      .onUpdate((e) => {
        positionX.value = e.x;
        positionY.value = e.y;
      })
      .onEnd((e) => {
        if (e.x > (ww - 48) * 0.65) {
          let spcBox = ww / testBoxes.length;
          let spcBetween = (layout?.height - spcBox * testBoxes.length) / 6;
          let boxIndex =
            Math.floor(e.y / (layout?.height / testBoxes.length)) + 1;

          positionY.value =
            spcBetween * boxIndex + (spcBox * boxIndex - spcBox / 2);
          positionX.value = layout?.width - spcBox - 12;
        }
      })
  );

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: "100%",
          height: 100,
           backgroundColor: "#B73078"
        }}
      ></View>
      <Text
        style={{
          textAlign: "center",
          fontFamily: "Poppins-Regular",
          marginVertical: 12,
        }}
      >
        Une las palabras con las señas correspondientes
      </Text>
      <GestureHandlerRootView
        style={{ flex: 1, paddingHorizontal: 24, paddingBottom: 24 }}
      >
        <GestureDetector gesture={panGesture}>
          <View
            style={st.container}
            onLayout={(event) => {
              console.log(Math.floor(event.nativeEvent.layout.height));
              setLayout(event.nativeEvent.layout);
            }}
          >
           
            <Svg width="100%" height="100%">
              <AnimatedLine
                animatedProps={animatedProps}
                x1={ww / testBoxes.length + 12}
                stroke="black"
                // y1={line1}
              />

              <View style={st.subContainer}>
                <View style={st.leftSide}>
                  {testBoxes.map((item) => (
                    <View style={st.selectedBox} key={item}>
                      <View style={st.insideDot} />
                    </View>
                  ))}
                </View>
                <View style={st.rightSide}>
                  {testBoxes.map((item) => (
                    <View style={st.selectedBox} key={item}>
                      <View style={st.insideDotRight} />
                    </View>
                  ))}
                </View>
              </View>
            </Svg>
          </View>
        </GestureDetector>
      </GestureHandlerRootView>
    </View>
  );
};

const Ruler = () => {
  // console.log())
  // console.log(Math.floor(wh/10))

  return (
    <View style={rl.container}>
      {/* <View style={[rl.topBox,{left:0}]} ></View>
      <View style={[rl.topBox,{left:10}]} ></View>
      <View style={[rl.topBox,{left:20}]} ></View> */}
      {topBoxes?.map((item, index) => {
        return (
          <View
            style={[
              rl.topBox,
              {
                left: index * 10,
                backgroundColor: index % 5 === 0 ? "red" : "#00000020",
              },
            ]}
            key={index}
          ></View>
        );
      })}
      {sideBoxes?.map((item, index) => {
        return (
          <View
            style={[
              rl.sideBox,
              {
                top: index * 10,
                backgroundColor: index % 5 === 0 ? "red" : "#00000020",
              },
            ]}
            key={index}
          ></View>
        );
      })}
    </View>
  );
};

export default Test;

const st = StyleSheet.create({
  container: {
    // backgroundColor: "#F9DBBB",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    // height:'100%',
    // width:'100%',
    // paddingHorizontal: 24,
    // paddingVertical: 32,
  },
  subContainer: {
    // backgroundColor: "#F9DBBB",
    height: "100%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dragCtn: { flexDirection: "row", alignItems: "center" },
  box: {
    borderRadius: 10,
    backgroundColor: "#3E372F",
    height: 50,
    width: 50,
    position: "absolute",
    top: 0,
  },
  dot: {
    borderRadius: 100,
    width: 10,
    height: 10,
    // backgroundColor: "#3e372f",
    marginLeft: 12,
    borderWidth: 2,
    borderColor: "##3e372f",
  },
  dotRight: {
    borderRadius: 100,
    width: 10,
    height: 10,
    backgroundColor: "#3e372f",
    marginRight: 12,
  },
  aniBox: {
    backgroundColor: "#85586F",
    marginLeft: -12.5,
    marginTop: -12.5,
    height: 25,
    width: 25,
    position: "absolute",
  },
  leftSide: {
    height: "100%",
    // backgroundColor: "#394CDB",
    width: "35%",
    justifyContent: "space-evenly",
  },
  rightSide: {
    height: "100%",
    // backgroundColor: "#9561B4",
    width: "35%",
    alignItems: "flex-end",
    justifyContent: "space-evenly",
  },
  selectedBox: {
    height: ww / testBoxes.length,
    width: ww / testBoxes.length,
    borderRadius: 12,
    backgroundColor: "#3E372F",
  },
  insideDot: {
    height: 12,
    width: 12,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#3E372F",
    position: "absolute",
    right: -18,
    top: ww / testBoxes.length / 2 - 6,
  },
  insideDotRight: {
    height: 12,
    width: 12,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#3E372F",
    position: "absolute",
    left: -18,
    top: ww / testBoxes.length / 2 - 6,
  },
});

const rl = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: "#ffffff00",
    width: "100%",
    height: "100%",
  },
  topBox: {
    position: "absolute",
    width: 2,
    height: wh,
    backgroundColor: "black",
  },
  sideBox: {
    position: "absolute",
    width: ww,
    height: 2,
    backgroundColor: "black",
  },
});

/**
 * 582 / x = y (99)
 * evenly padding = ww / testBoxes.length
 */

/** DEAM CALC HOLY SHIT */
//  let spcBox = ww / testBoxes.length;
//  let spcBetween = (layout?.height - spcBox * testBoxes.length) / 6;
//  console.log(spcBetween * X + (spcBox * X - spcBox / 2));
// X = Index

/** KNOW THE BOX INDEX */

// console.log(
//   Math.floor(e.y / (layout?.height / testBoxes.length)) + 1
// );

/** ON START RECICLE */
// if (e.x < (ww - 48) * 0.35) {
//   /** DEAM CALC HOLY SHIT */
//   let spcBox = ww / testBoxes.length;
//   let spcBetween = (layout?.height - spcBox * testBoxes.length) / 6;
//   // console.log("is on left side");
//   // console.log(spcBetween * 3 + (spcBox * 3 - spcBox / 2));

//   // console.log(
//   //   ((layout?.height - ((ww / testBoxes.length)*testBoxes.length) ) / 6)+(ww / testBoxes.length) / 2
//   // );

//   // console.log(
//   //   (layout?.height - ((ww / testBoxes.length)*testBoxes.length) ) / 6
//   // );

//   let boxIndex =
//     Math.floor(e.y / (layout?.height / testBoxes.length)) + 1;
//   runOnJS(updateLine1)(
//     spcBetween * boxIndex + (spcBox * boxIndex - spcBox / 2)
//   );

//   // console.log(
//   //   Math.floor(e.y / (layout?.height / testBoxes.length)) + 1
//   // );

//   // if(e.y )
// } else if (e.x > (ww - 48) * 0.65) {
//   console.log("is on right side");
// }

/* ANG */
// let cata = e.x - 15;
// let cato = e.y - 15;
// let hipo = Math.sqrt(cato * cato + cata * cata);

// let seno = cato / hipo;
// let ang = (Math.asin(seno)) *  57.2958;
// angular.value = ang ;
