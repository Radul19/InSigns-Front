import { View, Text, Dimensions } from "react-native";
import React, { useMemo, useRef, useState } from "react";
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  runOnJS,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { GameButton } from "../../components/GameTopBar";

/** ICONS */
import Svg, { Line } from "react-native-svg";
import N_Icon from "../../icons/n.svg";
import N_Letter from "../../icons/letterN.svg";
import I_Icon from "../../icons/i.svg";
import I_Letter from "../../icons/letterI.svg";
import R_Icon from "../../icons/r.svg";
import R_Letter from "../../icons/letterR.svg";
import Z_Icon from "../../icons/z.svg";
import Z_Letter from "../../icons/letterZ.svg";

const files1 = [N_Icon, I_Icon, R_Icon, Z_Icon];
const files2 = [N_Letter, I_Letter, R_Letter, Z_Letter];

import { Pressable } from "react-native";
import { GameTopBar, NotesScreen } from "./GameLayout";
const AnimatedLine = Animated.createAnimatedComponent(Line);

const ww = Math.floor(Dimensions.get("window").width);
const wh = Math.floor(Dimensions.get("window").height);
const fixWW = ww - 48;
const fixWH = wh - 48;

const opt1 = [1, 2, 3, 4];
const opt2 = [3, 1, 2, 4];

let spcBox = fixWW * 0.25;
let spcBetween = spcBox * 0.25;

const Game1 = ({ navigation }) => {
  const [results, setResults] = useState([]);
  const [openNote, setOpenNote] = useState(false);
  const toggleNote = () => {
    setOpenNote(!openNote);
  };

  const scrollRef = useRef(null);

  const confirmResults = () => {};

  const updateScroll = (y) => {
    scrollRef.current?.scrollTo({ y, animated: true });
  };

  return (
    <GestureHandlerRootView style={st.rootView}>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{
          width: "100%",
          paddingHorizontal: 24,
          paddingTop: 32,
        }}
      >
        <GameTopBar {...{ openNote, toggleNote }} />
        <Text style={st.title}>
          Une las señas con las letras correspondientes
        </Text>
        <View style={{ flex: 1 }}>
          <LinesGameScreen
            options1={opt1}
            options2={opt2}
            {...{ results, setResults, updateScroll }}
          />
        </View>
        <GameButton onPress={confirmResults} />
      </ScrollView>
      {openNote && <NotesScreen />}
    </GestureHandlerRootView>
  );
};

const LinesGameScreen = ({
  options1,
  options2,
  updateScroll,
  results,
  setResults,
}) => {
  // {"height": 468, "width": 312, "x": 0, "y": 0}
  const [layout, setLayout] = useState();

  const scrollStart = useSharedValue(0);

  const startY = useSharedValue(-10);
  const posX = useSharedValue(0);
  const posY = useSharedValue(0);

  const leftStart = useSharedValue(false);

  const animatedProps = useAnimatedProps(() => ({
    x2: posX.value,
    y2: posY.value,
    y1: startY.value,
  }));

  const panGestureRef = useRef(Gesture.Pan());

  const updateLine = (start, end) => {
    let copyResults = [...results];
    if (end != -1) {
      let findIndex = copyResults.indexOf(end);
      if (findIndex != -1) {
        copyResults[findIndex] = -1;
      }
    }
    copyResults[start] = end;
    setResults(copyResults);
  };

  const panGesture = useMemo(() =>
    Gesture.Pan()
      .onStart((e) => {
        if (e.x < (ww - 48) * 0.35) {
          /** DEAM CALC HOLY SHIT */
          let boxIndex = Math.floor(e.y / (layout?.height / options1.length));
          leftStart.value = boxIndex + 1;
          startY.value =
            spcBox / 2 + spcBetween + (spcBox + spcBetween * 2) * boxIndex + 1;
          runOnJS(updateLine)(boxIndex, -1);
        } else {
          leftStart.value = false;
          scrollStart.value = e.y;
        }

        /**else if (e.x > (ww - 48) * 0.65) {
          console.log("rightSide");
          (fixWW * 25)
        } */
      })
      .onUpdate((e) => {
        if (leftStart.value) {
          posX.value = e.x;
          posY.value = e.y;
        }
      })
      .onEnd((e) => {
        if (leftStart.value) {
          if (e.x > (ww - 48) * 0.65) {
            let boxIndex = Math.floor(e.y / (layout?.height / options1.length));
            if (boxIndex < options1.length) {
              runOnJS(updateLine)(leftStart.value - 1, boxIndex);
            }
          }
        } else {
          runOnJS(updateScroll)(scrollStart.value - e.y);
        }

        posX.value = 0;
        posY.value = 0;
        startY.value = -10;
        leftStart.value = false;
      })
      .withRef(panGestureRef)
  );

  const animatedStye = useAnimatedStyle(() => ({
    transform: [{ translateX: posX.value }, { translateY: posY.value }],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Svg>
        <AnimatedLine
          animatedProps={animatedProps}
          x1={fixWW * 0.25 + 17}
          stroke="black"
        />
        {results.map((item, index) => (
          <AnswerLine key={index} {...{ item, index }} />
        ))}
        <View
          onLayout={(e) => {
            setLayout(e.nativeEvent.layout);
          }}
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <View style={st.gameBoxSide}>
            {options1.map((item, index) => (
              <Box key={index} item={item} index={index} />
            ))}
          </View>
          <View style={st.gameBoxSide}>
            {options1.map((item, index) => (
              <Box key={index} item={item} index={index} right />
            ))}
          </View>
        </View>
      </Svg>
    </GestureDetector>
  );
};

const Box = ({ right = false, index }) => {
  const MyIcon = right ? files2[index] : files1[index];
  return (
    <View
      style={{
        width: fixWW * 0.25,
        height: fixWW * 0.25,
        marginVertical: fixWW * 0.25 * 0.25,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "black",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <MyIcon width="48" height="48" />
      {right ? (
        <View
          style={{
            position: "absolute",
            borderWidth: 1,
            borderRadius: 12,
            borderColor: "#191919",
            justifyContent: "center",
            alignItems: "center",
            width: 12,
            height: 12,
            top: (fixWW * 0.25) / 2 - 6,
            left: -24,
          }}
        >
          <View
            style={{
              backgroundColor: "#640C66",
              width: 6,
              height: 6,
              borderRadius: 12,
            }}
          />
        </View>
      ) : (
        <View
          style={{
            position: "absolute",
            borderWidth: 1,
            borderRadius: 12,
            borderColor: "#191919",
            justifyContent: "center",
            alignItems: "center",
            width: 12,
            height: 12,
            top: (fixWW * 0.25) / 2 - 6,
            right: -24,
          }}
        >
          <View
            style={{
              backgroundColor: "#640C66",
              width: 6,
              height: 6,
              borderRadius: 12,
            }}
          />
        </View>
      )}
    </View>
  );
};

const AnswerLine = ({ item = 0, index }) => {
  return (
    <Line
      x1={fixWW * 0.25 + 17}
      y1={spcBox / 2 + spcBetween + (spcBox + spcBetween * 2) * index + 1}
      x2={item === -1 ? fixWW * 0.25 + 17 : fixWW * 0.75 - 17}
      y2={
        item === -1
          ? spcBox / 2 + spcBetween + (spcBox + spcBetween * 2) * index + 1
          : spcBox / 2 + spcBetween + (spcBox + spcBetween * 2) * item + 1
      }
      // x1={100}
      // y1={100}
      // x2={150}
      // y2={150}
      stroke="black"
    />
  );
};

export default Game1;

const st = StyleSheet.create({
  rootView: {
    flex: 1,
    // paddingHorizontal: 24,
    // paddingTop: 32,
    backgroundColor: "white",
  },
  title: {
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    marginBottom: 16,
  },
  gameBoxSide: {
    width: "25%",
    height: "100%",
  },
});

/**
 * (spcBetween + (spcBox / 2)) ---first space
 * (spcBox + spcBetween * 2) ---space between boxes
 * (spcBox / 2 + fixWW * 0.25 * 0.25) +  ---first space +
 * (spcBox + (fixWW * 0.25 * 0.25) * 2) * boxIndex
 * + 1 --- extra pixel
 */

/**    "react-native-reanimated": "^2.14.4", */
