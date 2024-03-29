import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import GameLayout from "./GameLayout";
import { fm, hc } from "../../components/Hands";
import Context from "../../components/Context";
import { ResultScreen } from "../../components/GameTopBar";
/** MultipleSelectionScreen Big Cards */
const Game2 = ({ navigation, route }) => {
  const [sChance, setSChance] = useState(true)
  const { lvlData, setLvlData } = useContext(Context);
  const { levels, stars,pos,loc } = lvlData;


  const [answer, setAnswer] = useState("");
  const [rmodal, setRmodal] = useState(0);


  const confirmResults = () => {
    let travel = 0;
    if (answer === levels[pos].answer[0]) {
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
      if(lvlData.stars <= 1){
        travel = 4
      }else{
        travel = 3
      }
    }
    setRmodal(travel);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setSChance(true)
      setRmodal(0);
      setAnswer("")
  });
  
    return unsubscribe
  }, [navigation])

  return (
    <>
      <ResultScreen status={rmodal} setModal={setRmodal}/>
      <GameLayout {...{ confirmResults, title: levels[pos].subtitle, pos,loc }}>
        <MultipleSelectionScreen
          {...{ answer, setAnswer, lvlData: levels[pos],loc }}
        />
      </GameLayout>
    </>
  );
};

export default Game2;

const MultipleSelectionScreen = ({ answer, setAnswer, lvlData,loc }) => {
  const { options } = lvlData;
  return (
    <View style={st.gameScreen}>
      <Card
        c="#FEC454"
        bc="#746357"
        {...{ answer, setAnswer, value: options[0],loc }}
      />
      <Card
        c="#AD72DF"
        bc="#640C66"
        {...{ answer, setAnswer, value: options[1],loc }}
      />
      <Card
        c="#AD72DF"
        bc="#640C66"
        {...{ answer, setAnswer, value: options[2],loc }}
      />
      <Card
        c="#FEC454"
        bc="#746357"
        {...{ answer, setAnswer, value: options[3],loc }}
      />
    </View>
  );
};

const Card = ({ c, bc, value, setAnswer, answer,loc }) => {
  const press = () => {
    setAnswer(value);
  };

  return (
    <Pressable
      style={[
        st.border,
        {
          borderColor: value === answer ? bc : "#ffffff00",
        },
      ]}
      onPress={press}
    >
      <View style={[st.card, { backgroundColor: c }]}>
        <View style={{ height: 100, width: 100 }}>{loc === 3 ?fm[value] :hc[value]}</View>
        {/* <N_Icon width={72} height={72} /> */}
      </View>
    </Pressable>
  );
};

const st = StyleSheet.create({
  rootView: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    marginBottom: 16,
  },
  gameScreen: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 16,
    marginTop: 24,
  },
  border: {
    borderRadius: 18,
    padding: 8,
    borderWidth: 4,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    marginTop: 12,
  },
  card: {
    backgroundColor: "#CEA6CE",
    width: 120,
    height: 160,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
});
