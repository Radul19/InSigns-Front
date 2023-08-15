import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Keyboard,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import NotesIcon from "../../icons/notes.svg";
import HomeIcon from "../../icons/home.svg";
import { ww, wh } from "../../components/windowsSize";
import { Cross } from "../../components/MyIcons";

import completeHands from "../../images/completes.png";
import completeNums from "../../images/numCompletes.png";
import qcomplete from "../../images/qcomplete.png";

const GameLayout = ({ confirmResults, title, children, pos,loc }) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [openNote, setOpenNote] = useState(false);
  const toggleNote = () => {
    setOpenNote(!openNote);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <ScrollView style={st.rootView} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ paddingHorizontal: 24, paddingTop: 32, flex: 1 }}>
        <GameTopBar {...{ openNote, toggleNote, pos }} />
        <Text style={st.title}>{title}</Text>
        {children}
      </View>

      {((loc === 0) && openNote) && <Note1/>}
      {((loc === 1) && openNote) && <Note2/>}
      {((loc === 2) && openNote) && <Note3/>}

      <View style={{ paddingHorizontal: 24, marginTop: "auto" }}>
        {!isKeyboardVisible && <GameButton onPress={confirmResults} />}
      </View>
      {/* <View style={{ height: 48 }}></View> */}
    </ScrollView>
  );
};

export default GameLayout;

export const GameTopBar = ({ openNote, toggleNote, length, pos }) => {
  const navigation = useNavigation();
  const goHome = () => {
    navigation.navigate("Home");
  };
  return (
    <View
      style={{
        backgroundColor: "white",
        paddingVertical: 16,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Pressable
        onPress={goHome}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}
      >
        <HomeIcon width={32} height={32} />
      </Pressable>
      <View
        style={{
          width: "65%",
          borderRadius: 12,
          borderWidth: 2,
          borderColor: "#640C66",
          height: 32,
          paddingHorizontal: 6,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "#C18DD7",
            width: ((pos + 1) * 100) / 6 + "%",
            height: 18,
            borderRadius: 8,
          }}
        ></View>
      </View>
      <Pressable
        onPress={toggleNote}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}
      >
        {openNote ? <Cross size={32} /> : <NotesIcon width={32} height={32} />}
      </Pressable>
    </View>
  );
};

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

export const NotesScreen = () => {
  return (
    <View style={st.notes_screen}>
      <View style={st.top_line}></View>
      <Text style={st.note_title}>Abecedario</Text>
      <Text style={st.note_text}>
        Lorem ipsum dolor sit amet consectetur. Gravida cursus facilisis congue
        maecenas gravida placerat gravida. Elit dignissim urna nulla vestibulum
        ultricies blandit luctus elit varius. Sed mattis etiam diam in in
        malesuada ornare sed.
      </Text>
      <Text style={st.note_text}>
        Gravida molestie elit dui viverra libero varius. Vitae nunc ut lobortis
        tincidunt a. Amet non sit arcu egestas. Viverra augue tristique et in
        tellus est. Suscipit nullam fames id ipsum odio lectus erat. Blandit
        tincidunt facilisi sed egestas eleifend porta tincidunt ac.
      </Text>
    </View>
  );
};

const st = StyleSheet.create({
  rootView: {
    flex: 1,
    // width:ww,
    // height:wh,
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

  notes_screen: {
    position: "absolute",
    backgroundColor: "#C18DD7",
    paddingHorizontal: 24,
    // paddingTop: 24,
    bottom: 0,
    height: wh * 0.65,
    width: "100%",
    zIndex: 1000,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  top_line_ctn: {
    backgroundColor: "#C18DD7",
    paddingVertical:24,
    // alignContent:'center',
  },
  top_line: {
    height: 6,
    borderRadius: 12,
    width: 64,
    backgroundColor: "#eee",
    alignSelf: "center",
  },
  note_title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
    marginBottom: 12,
  },
  note_text: {
    fontFamily: "Poppins-Medium",
  },
  note_img1: {
    width: ww - 48,
    height:ww* 1.7,
    marginVertical:24,
  },
  note_img2: {
    width: ww - 48,
    height:ww* 1.3,
    marginVertical:24,
  },note_img3: {
    width: ww - 48,
    height:ww,
    marginVertical:24,
  },
});

export const Note1 = () => {
  return (
    <ScrollView style={st.notes_screen} stickyHeaderIndices={[0]}>
      <View style={st.top_line_ctn}>
        <View style={st.top_line}></View>
      </View>
      <Text style={st.note_title}>Abecedario</Text>
      <Text style={st.note_text}>
        Al igual que en el lenguaje hablado, en el lenguaje de señas existe el
        abecedario y este consta de 27 letras
      </Text>
      <Image source={completeHands} style={st.note_img1} resizeMode="contain" />
    </ScrollView>
  );
};
export const Note2 = () => {
  return (
    <ScrollView style={st.notes_screen} stickyHeaderIndices={[0]}>
      <View style={st.top_line_ctn}>
        <View style={st.top_line}></View>
      </View>
      <Text style={st.note_title}>Números</Text>
      <Text style={st.note_text}>
        La forma para contar en lenguaje de señas es muy particular pero
        sencilla. Solo debes recordar lo siguiente:
      </Text>
      <Text style={st.note_text}>
         - Del 1 al 5 se cuenta primero levantando uno a uno los dedos. Comenzando
        por el indice hasta el meñique y se finaliza con el pulgar
      </Text>
      <Text style={st.note_text}>
         - Del 6 al 9 se va tocando el dedo pulgar con cada uno de los otros dedos,
        comenzado del meñique al indice.
      </Text>
      <Text style={st.note_text}>
         - Para el número 10 se cierra el puño y con el puño cerrado primero se
        muestra el dorso de la mano y se gira para mostrar la “palma” de la mano
      </Text>
      <Image source={completeNums} style={st.note_img2} resizeMode="contain" />
    </ScrollView>
  );
};
export const Note3 = () => {
  return (
    <ScrollView style={st.notes_screen} stickyHeaderIndices={[0]}>
      <View style={st.top_line_ctn}>
        <View style={st.top_line}></View>
      </View>
      <Text style={st.note_title}>Preguntas</Text>
      <Text style={st.note_text}>
      Algo muy importante a tomar en cuenta es que al realizar las señas con sus movimientos, se debe hacer de manera calmada y limpia, para que así la otra persona pueda comprender que seña estamos haciendo.
      </Text>
      
      <Image source={qcomplete} style={st.note_img3} resizeMode="contain" />
     
    </ScrollView>
  );
};
