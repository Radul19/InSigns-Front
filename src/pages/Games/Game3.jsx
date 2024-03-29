import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  GameButton,
  GameTopBar,
  ResultScreen,
} from "../../components/GameTopBar";
import GameLayout from "./GameLayout";
import N_Icon from "../../icons/n.svg";
import { fm, hc } from "../../components/Hands";
import Context from "../../components/Context";

const writeReverse = (aux) => {
  let text = aux.toUpperCase();
  switch (text) {
    case "¿QUIÉN?":
      return "q1";
      break;
    case "¿CÓMO?":
      return "q2";
      break;
    case "¿QUÉ?":
      return "q3";
      break;
    case "¿CUÁNTO?":
      return "q4";
      break;
    case "¿DÓNDE?":
      return "q5";
      break;
    case "¿CUÁL?":
      return "q6";
      break;
    case "¿CUÁNDO?":
      return "q7";
      break;
    case "¿POR QUÉ?":
      return "q8";
      break;
    case "MAMÁ":
      return "motherS";
      break;
    case "HOMBRE":
      return "manS";
      break;

    default:
      // return hc[value];
      break;
  }
};

/** WriteAnswer */
const Game3 = ({ navigation, route }) => {
  const [sChance, setSChance] = useState(true)
  const { lvlData, setLvlData } = useContext(Context);
  const { levels, stars, pos, loc } = lvlData;
  const [rmodal, setRmodal] = useState(0);

  const [answer, setAnswer] = useState("");
  const confirmResults = () => {
    let travel = 0;

    const noSpace = answer.replace(/\s/g, "");
    let realAnswer = loc === 2 || loc === 3 ? writeReverse(noSpace) : noSpace;
    if (realAnswer === levels[pos].answer[0]) {
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
      setAnswer("");
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <>
      <ResultScreen status={rmodal} setModal={setRmodal} />
      <GameLayout
        {...{ confirmResults, title: levels[pos].subtitle, pos, loc }}
      >
        <WriteAnswerScreen
          {...{ answer, setAnswer, lvlData: levels[pos], loc }}
        />
      </GameLayout>
    </>
  );
};

export default Game3;

const WriteAnswerScreen = ({ answer, setAnswer, lvlData, loc }) => {
  return (
    <View style={st.gameScreen}>
      <View style={st.card}>
        <View style={{ height: 170, width: 170 }}>
          {loc === 3 ? fm[lvlData.answer[0]] : hc[lvlData.answer[0]]}
        </View>
      </View>
      <TextInput
        value={answer}
        onChangeText={setAnswer}
        style={st.input}
        placeholder="Escribe tu respuesta..."
      />
      {/* <View  style={{height:500,backgroundColor:'red',width:'100%'}} ></View> */}
    </View>
  );
};

const st = StyleSheet.create({
  rootView: {
    // flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    marginBottom: 16,
  },
  gameScreen: {
    flex: 1,
    marginTop: 24,
    alignItems: "center",
  },
  card: {
    width: 210,
    height: 270,
    borderRadius: 18,
    backgroundColor: "#AD72DF",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    // backgroundColor:'red',
    width: "100%",
    marginTop: 48,
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderColor: "#640D65",
    fontFamily: "Poppins-Regular",
    marginBottom: 32,
    textAlign: "center",
  },
});
