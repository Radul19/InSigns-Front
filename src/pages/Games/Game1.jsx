import { View, Text, Dimensions } from "react-native";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
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
import {
  GameButton,
  ResultScreen,
  WinScreen,
} from "../../components/GameTopBar";

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
import {
  GameTopBar,
  Note1,
  Note2,
  Note3,
  Note4,
  NotesScreen,
} from "./GameLayout";
import { fm, hc } from "../../components/Hands";
import Context from "../../components/Context";
import { useNextGame } from "./Game2";
const AnimatedLine = Animated.createAnimatedComponent(Line);

const ww = Math.floor(Dimensions.get("window").width);
const wh = Math.floor(Dimensions.get("window").height);
const fixWW = ww - 48;
const fixWH = wh - 48;

let spcBox = fixWW * 0.25;
let spcBetween = spcBox * 0.25;

const Game1 = ({ navigation, route }) => {
  const [sChance, setSChance] = useState(true)

  const [rmodal, setRmodal] = useState(0);
  const { lvlData, setLvlData } = useContext(Context);
  const { levels, stars, pos, loc } = lvlData;
  const [results, setResults] = useState([]);
  const [openNote, setOpenNote] = useState(false);

  // const nextGame = useNextGame()

  const toggleNote = () => {
    setOpenNote(!openNote);
  };
  const scrollRef = useRef(null);

  const updateScroll = (y) => {
    scrollRef.current?.scrollTo({ y, animated: true });
  };

  const confirmResults = () => {
    const aux = levels[pos].options;
    const realResults = [
      aux[results[0]],
      aux[results[1]],
      aux[results[2]],
      aux[results[3]],
    ];
    let testb = true;

    levels[pos].answer.forEach((item, index) => {
      if (item !== realResults[index]) {
        testb = false;
      }
    });

    let travel = 0;
    if (testb) {
      // if (true) {
      travel = 1;
    } else {
      if(sChance){
        setSChance(false)
        travel = 5
      }else{
        travel = 2;
        setLvlData((prev) => ({ ...prev, stars: stars - 0.5 }));
      }
    }

    if (lvlData.pos + 1 === lvlData.levels.length) {
      if (lvlData.stars <= 1) {

        travel = 4;
      } else {
        travel = 3;
      }
    }

    setRmodal(travel);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setSChance(true)
      setRmodal(0);
      setResults([]);
    });

    return unsubscribe;
  }, [navigation]);

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
        <GameTopBar {...{ openNote, toggleNote, length: levels.length, pos }} />
        <Text style={st.title}>{levels[pos].subtitle}</Text>
        <View style={{ flex: 1 }}>
          <LinesGameScreen
            answers={levels[pos].answer}
            options={levels[pos].options}
            {...{ results, setResults, updateScroll, loc }}
          />
        </View>
        <GameButton onPress={confirmResults} />
      </ScrollView>
      <ResultScreen status={rmodal} setModal={setRmodal} {...{sChance,setSChance}} />

      {loc === 0 && openNote && <Note1 />}
      {loc === 1 && openNote && <Note2 />}
      {loc === 2 && openNote && <Note3 />}
      {loc === 3 && openNote && <Note4 />}
    </GestureHandlerRootView>
  );
};

const LinesGameScreen = ({
  answers,
  options,
  updateScroll,
  results,
  setResults,
  loc,
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
          let boxIndex = Math.floor(e.y / (layout?.height / answers.length));
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
            let boxIndex = Math.floor(e.y / (layout?.height / answers.length));
            if (boxIndex < answers.length) {
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
            {answers?.map((item, index) => (
              <Box key={index} value={item} index={index} loc={loc} />
            ))}
          </View>
          <View style={st.gameBoxSide}>
            {options?.map((item, index) => (
              <Box key={index} value={item} index={index} right loc={loc} />
            ))}
          </View>
        </View>
      </Svg>
    </GestureDetector>
  );
};

const Box = ({ right = false, index, value, loc }) => {
  const verifyText = () => {
    switch (value) {
      case "q1":
        return "¿Quién?";
        break;
      case "q2":
        return "¿Cómo?";
        break;
      case "q3":
        return "¿Qué?";
        break;
      case "q4":
        return "¿Cuánto?";
        break;
      case "q5":
        return "¿Dónde?";
        break;
      case "q6":
        return "¿Cuál?";
        break;
      case "q7":
        return "¿Cuándo?";
        break;
      case "q8":
        return "¿Por qué?";
        break;
      case "fatherS":
        return "Papá";
        break;
      case "olderS":
        return "Abuelo";
        break;
      case "sonS":
        return "Hijo";
        break;
      case "hermS":
        return "Hermano";
        break;

      default:
        // return hc[value];
        break;
    }
  };
  return (
    <View
      style={{
        width: fixWW * 0.25,
        height: fixWW * 0.25,
        marginVertical: fixWW * 0.25 * 0.25,
        borderRadius: 12,
        borderWidth: right ? 0 : 1,
        borderColor: "black",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* <View style={{ width:48, height: 48,alignItems:'center',justifyContent:'center' }}> */}
      <View
        style={{
          width: loc === 3 || (loc === 2 && right) ? 120 : 48,
          height: loc === 3 || (loc === 2 && right) ? 64 : 48,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {right ? (
          <Text
            style={{
              fontFamily: "Poppins-Regular",
              fontSize: loc === 2 || loc === 3 ? 18 : 32,
              textAlign: "center",
            }}
          >
            {loc === 2 || loc === 3 ? verifyText() : value}
          </Text>
        ) : (
          <>{loc === 3 ? fm[value] : hc[value]}</>
        )}
      </View>
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

const AnswerLine = ({ item, index }) => {
  return (
    <>
      {item === undefined ? (
        false
      ) : (
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
      )}
    </>
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
