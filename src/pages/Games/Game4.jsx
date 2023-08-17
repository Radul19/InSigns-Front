import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { GameButton, GameTopBar, ResultScreen } from "../../components/GameTopBar";
import GameLayout from "./GameLayout";
import { fm, hc } from "../../components/Hands";
import Context from "../../components/Context";

/** MULTIPLE SELECTION 2 Little Cards */
const Game4 = ({navigation, route}) => {
  const [sChance, setSChance] = useState(true)
  const { lvlData,setLvlData} = useContext(Context)
  const {levels,stars,pos,loc} = lvlData

  const [rmodal, setRmodal] = useState(0)
  const [answer, setAnswer] = useState("");
  const confirmResults = () => {

    let travel = 0

     if (answer === levels[pos].answer[0]){
      travel = 1
      
    }else{
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

    setRmodal(travel)

  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setSChance(true)
      setRmodal(0);
      setAnswer("")
  });
  
    return unsubscribe
  }, [navigation])


  return (<>
  <ResultScreen status={rmodal} setModal={setRmodal}/>
    <GameLayout {...{ confirmResults, title: levels[pos].subtitle,pos,loc }}>
      <MultipleSelectionScreen2
        {...{ answer, setAnswer, lvlData: levels[pos],loc }}
      />
    </GameLayout>
  </>
  );
};

export default Game4;

const MultipleSelectionScreen2 = ({ answer, setAnswer, lvlData,loc }) => {
  const { options,answer:realAnswer } = lvlData;
  return (
    <View style={st.gameScreen}>
      <View style={st.card}>
        <View style={{height:140,width:140}} >
          {loc === 3 ? fm[realAnswer[0]] :hc[realAnswer[0]]}
        </View>
        {/* <N_Icon width={140} height={140} /> */}
      </View>
      <View style={st.answer_ctn}>
        <AnswerCard {...{ value: options[0], answer, setAnswer,loc }} />
        <AnswerCard {...{ value: options[1], answer, setAnswer,loc }} />
        <AnswerCard {...{ value: options[2], answer, setAnswer,loc }} />
        <AnswerCard {...{ value: options[3], answer, setAnswer,loc }} />
      </View>
    </View>
  );
};

const AnswerCard = ({ value, answer, setAnswer,loc }) => {
  const press = () => {
    setAnswer(value);
  };

  
  const verifyText=()=>{
    switch (value) {
      case 'q1':
        return '¿Quién?'
        break;
      case 'q2':
        return '¿Cómo?'
        break;
      case 'q3':
        return '¿Qué?'
        break;
      case 'q4':
        return '¿Cuánto?'
        break;
      case 'q5':
        return '¿Dónde?'
        break;
      case 'q6':
        return '¿Cuál?'
        break;
      case 'q7':
        return '¿Cuándo?'
        break;
      case 'q8':
        return '¿Por qué?'
        break;
      case 'sisS':
        return 'Hermana'
        break;
      case 'famS':
        return 'Familia'
        break;
      case 'fatherS':
        return 'Papá'
        break;
      case 'daugS':
        return 'Hija'
        break;
    
      default:
        return hc[value]
        break;
    }
  }

  return (
    <Pressable
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.5 : 1,
          backgroundColor: answer === value ? "#746357" : "#eeeeee00",
        },
        st.answer_card,
      ]}
      onPress={press}
    >
      <Text style={[st.text, { color: answer === value ? "#fff" : "#191919" }]}>
      {loc === 2 || loc === 3 ? verifyText() : value}
      </Text>
    </Pressable>
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
    width: 180,
    height: 240,
    borderRadius: 18,
    backgroundColor: "#F8E4A5",
    alignItems: "center",
    justifyContent: "center",
  },
  answer_ctn: {
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
    marginTop: 48,
  },
  answer_card: {
    width: 130,
    paddingVertical: 6,
    borderColor: "#746357",
    borderWidth: 3,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Poppins-SemiBold",
  },
});
