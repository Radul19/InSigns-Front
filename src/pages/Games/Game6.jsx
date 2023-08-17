import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ResultScreen } from "../../components/GameTopBar";
import GameLayout from "./GameLayout";
import Context from "../../components/Context";
import { fm } from "../../components/Hands";
import { ww } from "../../components/windowsSize";
import plus from "../../images/plus.png";

const Game6 = ({ navigation }) => {
  const [sChance, setSChance] = useState(true);
  const { lvlData, setLvlData, userData } = useContext(Context);
  const { levels, stars, pos, loc } = lvlData;

  const [answer, setAnswer] = useState("");
  const [rmodal, setRmodal] = useState(false);

  const confirmResults = () => {
    let travel = 0;
    const noSpace = answer.replace(/\s/g, "");
    if (noSpace.toUpperCase() === levels[pos].answer[0]) {
      travel = 1;
    } else {
      if (sChance) {
        setSChance(false);
        travel = 5;
      } else {
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
    setAnswer("");
    setRmodal(travel);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setSChance(true);
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
        <FamilyGame2 {...{ answer, setAnswer, lvlData: levels[pos], loc }} />
      </GameLayout>
    </>
  );
};

const FamilyGame2 = ({ answer, setAnswer, lvlData, loc }) => {
  return (
    <View style={st.gameScreen}>
      <View style={st.card_ctn_top}>
        <View style={st.card1}>{fm[lvlData.options[0]]}</View>
      </View>
      <View style={st.card_ctn_bottom}>
        <View style={st.card2}>{fm[lvlData.options[1]]}</View>
        <Image style={{ height: 24, width: 24 }} source={plus}></Image>
        <View style={st.card2}>{fm[lvlData.options[2]]}</View>
      </View>
      <TextInput
        value={answer}
        onChangeText={setAnswer}
        style={st.input}
        placeholder="Escribe tu respuesta..."
      />
    </View>
  );
};

export default Game6;

const st = StyleSheet.create({
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
  card_ctn_top: {
    marginTop: -12,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  card_ctn_bottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: -24,
    // backgroundColor: "red",
  },
  card1: {
    width: ww * 0.52 * 0.73,
    height: ww * 0.52,
    borderRadius: 18,
    backgroundColor: "#FEC454",
    alignItems: "center",
    justifyContent: "center",
  },
  card2: {
    paddingHorizontal: 6,
    width: ww * 0.52 * 0.73,
    height: ww * 0.52,
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
    borderColor: "#3E372F",
    fontFamily: "Poppins-Regular",
    marginBottom: 32,
    textAlign: "center",
  },
});
