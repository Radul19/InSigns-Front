import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import React, { useState } from "react";
import { GameTopBar, GameButton } from "../../components/GameTopBar";
import N_Icon from "../../icons/n.svg";
import GameLayout from "./GameLayout";

/** MultipleSelectionScreen Big Cards */
const Game2 = () => {
  const [answer, setAnswer] = useState(0);

  const confirmResults = () => {};

  return (
    <GameLayout
      {...{ confirmResults, title: "¿Cuál es la seña de la letra B?" }}
    >
      <MultipleSelectionScreen {...{ answer, setAnswer }} />
    </GameLayout>
  );
};

export default Game2;

const MultipleSelectionScreen = ({ answer, setAnswer }) => {
  return (
    <View style={st.gameScreen}>
      <Card c="#F8E4A5" bc="#746357" {...{ answer, setAnswer, value: 1 }} />
      <Card c="#CEA6CE" bc="#640C66" {...{ answer, setAnswer, value: 2 }} />
      <Card c="#CEA6CE" bc="#640C66" {...{ answer, setAnswer, value: 3 }} />
      <Card c="#F8E4A5" bc="#746357" {...{ answer, setAnswer, value: 4 }} />
    </View>
  );
};

const Card = ({ c, bc, value, setAnswer, answer }) => {
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
        <N_Icon width={72} height={72} />
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
