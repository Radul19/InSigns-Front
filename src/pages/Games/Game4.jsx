import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { GameButton, GameTopBar } from "../../components/GameTopBar";
import GameLayout from "./GameLayout";
import N_Icon from "../../icons/n.svg";

/** MULTIPLE SELECTION 2 Little Cards */
const Game4 = () => {
  const [answer, setAnswer] = useState("0");
  const confirmResults = () => {};

  return (
    <GameLayout
      {...{ confirmResults, title: "Escribe la letra correspondiente" }}
    >
      <MultipleSelectionScreen2 {...{ answer, setAnswer }} />
    </GameLayout>
  );
};

export default Game4;

const MultipleSelectionScreen2 = ({ answer, setAnswer }) => {
  return (
    <View style={st.gameScreen}>
      <View style={st.card}>
        <N_Icon width={140} height={140} />
      </View>
      <View style={st.answer_ctn}>
        <AnswerCard {...{ value: "A", answer, setAnswer }} />
        <AnswerCard {...{ value: "B", answer, setAnswer }} />
        <AnswerCard {...{ value: "C", answer, setAnswer }} />
        <AnswerCard {...{ value: "D", answer, setAnswer }} />
      </View>
    </View>
  );
};

const AnswerCard = ({ value, answer, setAnswer }) => {
  const press = () => {
    setAnswer(value);
  };

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
        {value}
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
