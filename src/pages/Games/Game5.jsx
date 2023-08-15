import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ResultScreen } from "../../components/GameTopBar";
import GameLayout from "./GameLayout";
import Context from "../../components/Context";
import { fm } from "../../components/Hands";
import { ww } from "../../components/windowsSize";

const Game5 = ({navigation}) => {
  const { lvlData, setLvlData ,userData} = useContext(Context);
  const { levels, stars, pos, loc } = lvlData;

  const [answer, setAnswer] = useState("");
  const [rmodal, setRmodal] = useState(false);

  const confirmResults = () => {
    // console.log(userData)
    let travel = 0;
    if ( answer.toUpperCase() === levels[pos].answer[0]) {
      travel = 1
    } else {
      
      setLvlData((prev) => ({ ...prev, stars: stars - 0.5 }));
      travel = 2
    }

    if (lvlData.pos + 1 === lvlData.levels.length) {
      if(lvlData.stars <= 1){
        travel = 4
      }else{
        travel = 3
      }
    }
    setAnswer("")
    setRmodal(travel);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
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
        <FamilyGame1 {...{ answer, setAnswer, lvlData: levels[pos], loc }} />
      </GameLayout>
    </>
  );
};

const FamilyGame1 = ({ answer, setAnswer, lvlData, loc }) => {
  return (
    <View style={st.gameScreen}>
      <View style={st.card_ctn}>
        <View style={st.card1}>{fm[lvlData.options[0]]}</View>
        <View style={st.card2}>{fm[lvlData.options[1]]}</View>
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

export default Game5;

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
  card_ctn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    // backgroundColor: "red",
  },
  card1: {
    width: ww * 0.55 * 0.75,
    height: ww * 0.55,
    borderRadius: 18,
    backgroundColor: "#FEC454",
    alignItems: "center",
    justifyContent: "center",
  },
  card2: {
    width: ww * 0.55 * 0.75,
    height: ww * 0.55,
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
