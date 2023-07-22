import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import { GameButton, GameTopBar } from "../../components/GameTopBar";
import GameLayout from "./GameLayout";
import N_Icon from "../../icons/n.svg";


/** WriteAnswer */
const Game3 = () => {
  const [answer, setAnswer] = useState("")
  const confirmResults = () => {};

  return (
    <GameLayout {...{confirmResults,title:"Escribe la letra correspondiente"}} >
      <WriteAnswerScreen {...{answer, setAnswer}} />
    </GameLayout>
  );
};

export default Game3;

const WriteAnswerScreen = ({answer,setAnswer}) => {
  return <View style={st.gameScreen} >
    <View style={st.card}>
    <N_Icon width={140} height={140} />
    </View>
    <TextInput value={answer} onChangeText={setAnswer} style={st.input} placeholder="Escribe tu respuesta..." />
    {/* <View  style={{height:500,backgroundColor:'red',width:'100%'}} ></View> */}
  </View>;
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
    alignItems:'center'
  },
  card:{
    width:180,
    height:240,
    borderRadius:18,
    backgroundColor:'#CEA6CE',
    alignItems:'center',
    justifyContent:'center',
  },
  input:{
    // backgroundColor:'red',
    width:"100%",
    marginTop:48,
    borderRadius:12,
    paddingVertical:6,
    paddingHorizontal:12,
    borderWidth:2,
    borderColor:'#640D65',
    fontFamily: "Poppins-Regular",
    marginBottom:32,

  }
});
