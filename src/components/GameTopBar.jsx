import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import HomeIcon from "../icons/home.svg";
import NotesIcon from "../icons/notes.svg";
import win1 from "../images/win1.png";
import win2 from "../images/win2.png";
import win3 from "../images/win3.png";
import win4 from "../images/win4.png";
import lose1 from "../images/lose1.png";
import lose2 from "../images/lose2.png";
import lose3 from "../images/lose3.png";
import lose4 from "../images/lose4.png";
import trophimg from "../images/troph.png";
import failureimg from "../images/failure.png";
import Context from "./Context";
import { levelFiles } from "./LevelFile";
import { StarFill, StarFillCut } from "./MyIcons";
import { levelComplete } from "./api";

export const GameButton = ({ onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          marginVertical: 24,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: "#640C66",
          width: "100%",
          paddingVertical: 12,
          alignItems: "center",
          backgroundColor: pressed ? "#640C66" : "white",
        },
      ]}
      {...{ onPress }}
    >
      {({ pressed }) => (
        <Text
          style={{
            fontFamily: "Poppins-Regular",
            color: pressed ? "white" : "#640C66",
          }}
        >
          Confirmar
        </Text>
      )}
    </Pressable>
  );
};

const winsArr = [
  {
    image: win1,
    text: "¡Eres lo máximo!",
  },
  {
    image: win2,
    text: "¡Increíble!",
  },
  {
    image: win3,
    text: "¡Lo lograste!",
  },
  {
    image: win4,
    text: "¡Sigue asi!",
  },
];
const loseArr = [
  {
    image: lose1,
    text: "¡Oh no!",
  },
  {
    image: lose2,
    text: "Sigue intentando",
  },
  {
    image: lose3,
    text: "¡Busca otra respuesta!",
  },
  {
    image: lose4,
    text: "Intenta otra vez",
  },
];

function getRandom(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

const randomWin = () => {
  const aux = getRandom(0, 3);
  return winsArr[aux];
};
const randomLose = () => {
  const aux = getRandom(0, 3);
  return loseArr[aux];
};

const FailureScreen = ({setModal}) => {
  const { lvlData } = useContext(Context);
  const { stars } = lvlData;

  return (
    <View style={st.modalCtn}>
      <View style={st.top}>
        <Image source={failureimg} style={{ height: 336, width: 302 }} />
      </View>
      <View style={st.bottom}>
        <Text style={st.bigText}>Nivel fallido</Text>
        <View style={st.stars_ctn}>
          {stars === 0.5 && <StarFillCut color="#FFB431" size={48} />}
          {stars >= 1 && <StarFill color="#FFB431" size={48} />}
          {stars === 1.5 && <StarFillCut color="#FFB431" size={48} />}
          {stars >= 2 && <StarFill color="#FFB431" size={48} />}
          {stars === 2.5 && <StarFillCut color="#FFB431" size={48} />}
          {stars === 3 && <StarFill color="#FFB431" size={48} />}
        </View>
        <NextGameBtn setModal={setModal} />
      </View>
    </View>
  );
};
const CompleteScreen = ({setModal}) => {
  const { lvlData } = useContext(Context);
  const { stars } = lvlData;

  return (
    <View style={st.modalCtn}>
      <View style={st.top}>
        <Image source={trophimg} />
      </View>
      <View style={st.bottom}>
        <Text style={st.bigText}>!Nivel Completado!</Text>
        <View style={st.stars_ctn}>
          {stars === 0.5 && <StarFillCut color="#FFB431" size={48} />}
          {stars >= 1 && <StarFill color="#FFB431" size={48} />}
          {stars === 1.5 && <StarFillCut color="#FFB431" size={48} />}
          {stars >= 2 && <StarFill color="#FFB431" size={48} />}
          {stars === 2.5 && <StarFillCut color="#FFB431" size={48} />}
          {stars === 3 && <StarFill color="#FFB431" size={48} />}
        </View>
        <NextGameBtn setModal={setModal} />
      </View>
    </View>
  );
};
const WinScreen = ({setModal}) => {
  const [info, setInfo] = useState({
    image: false,
    text: "",
  });
  useEffect(() => {
    setInfo(randomWin());
    return () => {
      setInfo({
        image: false,
        text: "",
      });
    };
  }, []);
  return (
    <View style={st.modalCtn}>
      <View style={st.top}>
      {info.image && <Image source={info.image} />}
      </View>
      <View style={st.bottom}>
        <Text style={st.bigText}>{info.text}</Text>
        <NextGameBtn setModal={setModal} />
      </View>
    </View>
  );
};

const LoseScreen = ({setModal}) => {
  const [info, setInfo] = useState({
    image: false,
    text: "",
  });
  useEffect(() => {
    setInfo(randomLose());
    return () => {
      setInfo({
        image: false,
        text: "",
      });
    };
  }, []);

  return (
    <View style={st.modalCtn}>
      <View style={st.top}>{info.image && <Image source={info.image} />}</View>
      <View style={st.bottom}>
        <Text style={st.bigText}>{info.text}</Text>
        <NextGameBtn setModal={setModal} />
      </View>
    </View>
  );
};
const LoseScreen2 = ({setModal}) => {
  const [info, setInfo] = useState({
    image: false,
    text: "",
  });
  useEffect(() => {
    setInfo(randomLose());
    return () => {
      setInfo({
        image: false,
        text: "",
      });
    };
  }, []);

  return (
    <View style={st.modalCtn}>
      <View style={st.top}>{info.image && <Image source={info.image} />}</View>
      <View style={st.bottom}>
        <Text style={st.bigText}>{info.text}</Text>
        <NextGameBtn setModal={setModal} sChance={true} />
      </View>
    </View>
  );
};

const NextGameBtn = ({setModal,sChance=false}) => {
  const nextGame = useNextGame();
  return (
    <Pressable onPress={()=>{
      if(sChance){
        setModal(0)
      }else{
        setModal(0)
        nextGame()
      }

    }}>
      {({ pressed }) => (
        <View
          style={[
            st.btnext,
            {
              opacity: pressed ? 0.5 : 1,
            },
          ]}
        >
          <Text style={st.btntext}>Siguiente</Text>
        </View>
      )}
    </Pressable>
  );
};

export const ResultScreen = ({ status = 0,setModal }) => {

  return (
    <>
      {status === 1 && <WinScreen setModal={setModal} />}
      {status === 2 && <LoseScreen setModal={setModal} />}
      {status === 5 && <LoseScreen2 setModal={setModal} />}
      {status === 3 && <CompleteScreen setModal={setModal} />}
      {status === 4 && <FailureScreen setModal={setModal} />}
    </>
  );
};

const useNextGame = () => {
  const { lvlData, setLvlData, userData, setUserData } = useContext(Context);
  const nav = useNavigation();

  const nextGame = async () => {
    /** CHECK IF FINAL LVL */
    if (lvlData.pos + 1 === lvlData.levels.length) {

      /** CHECK STARS */
      let aux = { ...userData };
      const upgradeBool =  aux[`class${lvlData.loc}`][lvlData.index] < lvlData.stars;
      
      if (lvlData.stars > 1 && upgradeBool) {
        const { status, data } = await levelComplete(
          userData._id,
          lvlData.loc,
          lvlData.index,
          lvlData.stars
          );
          if (status === 200) {
          aux[`class${lvlData.loc}`][lvlData.index] = lvlData.stars;
          setUserData(aux);
        }
      }
      nav.navigate("Levels", {
        ...levelFiles[lvlData.loc],
        classIndex: lvlData.loc,
      });
    } else {
      setLvlData({ ...lvlData, pos: lvlData.pos + 1 });
      nav.navigate(
        "Game" + JSON.stringify(lvlData.levels[lvlData.pos + 1].gameType)
      );
    }
  };

  return nextGame;
};

const st = StyleSheet.create({
  modalCtn: {
    position: "absolute",
    zIndex: 1000,
    backgroundColor: "#000000AB",
    width: "100%",
    height: "100%",
    paddingVertical: 48,
  },
  top: {
    flex: 6,
    // backgroundColor:'red',
    alignItems: "center",
    justifyContent: "center",
  },
  bottom: {
    flex: 4,
    // backgroundColor:'blue',
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  bigText: {
    fontSize: 42,
    color: "#eee",
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
  },
  btnext: {
    borderWidth: 2,
    borderColor: "#640C66",
    backgroundColor: "#FEB4FF",
    alignItems: "center",
    justifyContent: "center",
    width: 320,
    paddingVertical: 12,
    borderRadius: 12,
    // marginTop:36,
  },
  btntext: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: "#640C66",
  },
  stars_ctn: {
    flexDirection: "row",
    marginBottom: 12,
  },
});
