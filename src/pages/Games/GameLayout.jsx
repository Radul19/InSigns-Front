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

import q1 from "../../images/HandsQuestions/q1.png";
import q2 from "../../images/HandsQuestions/q2.png";
import q3 from "../../images/HandsQuestions/q3.png";
import q4 from "../../images/HandsQuestions/q4.png";
import q5 from "../../images/HandsQuestions/q5.png";
import q6 from "../../images/HandsQuestions/q6.png";
import q7 from "../../images/HandsQuestions/q7.png";
import q8 from "../../images/HandsQuestions/q8.png";
import { fm } from "../../components/Hands";

import plus from "../../images/plus.png";
import equal from "../../images/equal.png";
import { fn } from "moment/moment";

const GameLayout = ({ confirmResults, title, children, pos, loc }) => {
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

      {loc === 0 && openNote && <Note1 />}
      {loc === 1 && openNote && <Note2 />}
      {loc === 2 && openNote && <Note3 />}
      {loc === 3 && openNote && <Note4 />}

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
    paddingVertical: 24,
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
    height: ww * 1.7,
    marginVertical: 24,
  },
  note_img2: {
    width: ww - 48,
    height: ww * 1.3,
    marginVertical: 24,
  },
  note_img3: {
    width: ww - 48,
    height: ww,
    marginVertical: 24,
  },
  note_img4: {
    width: (ww - 24) * 0.25,
    height: ww * 0.3,
    backgroundColor: "#9B50D3",
    borderRadius: 12,
    padding: 6,
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
        - Del 1 al 5 se cuenta primero levantando uno a uno los dedos.
        Comenzando por el indice hasta el meñique y se finaliza con el pulgar
      </Text>
      <Text style={st.note_text}>
        - Del 6 al 9 se va tocando el dedo pulgar con cada uno de los otros
        dedos, comenzado del meñique al indice.
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
        Algo muy importante a tomar en cuenta es que al realizar las señas con
        sus movimientos, se debe hacer de manera calmada y limpia, para que así
        la otra persona pueda comprender que seña estamos haciendo.
      </Text>
      <NoteText3
        title="¿Quién?"
        text="Con el puño cerrado tocamos la barbilla con el dedo pulgar y llevamos la mano hacia el frente."
        img={q1}
      />
      <NoteText3
        title="¿Cómo?"
        text="Unimos nuestros dedos y rotamos de dentro hacia afuera."
        img={q2}
      />
      <NoteText3
        title="¿Qué?"
        text="Primero la palma de la mano esta hacia abajo y con un movimiento sutil de la mano volteamos para mostrar la palma."
        img={q3}
      />
      <NoteText3
        title="¿Cuánto?"
        text="Se hace la simulación de estar contando con los dedos. Es decir, el dedo pulgar toca cada uno de los dedos comenzando por el meñique."
        img={q4}
      />
      <NoteText3
        title="¿Dónde?"
        text="Con la mano abierta hacia abajo y los dedos juntos se hace la forma de un circulo."
        img={q5}
      />
      <NoteText3
        title="¿Cuál?"
        text="Con ambas manos abiertas y las palmas hacia abajo se hace el movimiento de voltear ambas manos para mostrar las palmas. Esta seña representa dos opciones a escoger, es por ello que se utiliza para preguntar ¿Cuál?."
        img={q6}
      />
      <NoteText3
        title="¿Cuándo?"
        text="Con la mano abierta y los dedos relajados se dibuja en el aire un círculo hacía adelante."
        img={q7}
      />
      <NoteText3
        title="¿Por Qué?"
        text="La mano derecha da un toque al dorso de la mano izquierda y luego se muestra la palma de la mano derecha."
        img={q8}
      />
      {/* <Image source={qcomplete} style={st.note_img3} resizeMode="contain" /> */}
    </ScrollView>
  );
};

const NoteText3 = ({ title = "", text = "", img }) => {
  return (
    <View style={{ marginVertical: 12 }}>
      <Text style={st.note_text}>
        {" "}
        - <Text style={{ fontFamily: "Poppins-SemiBold" }}>{title}: </Text>
        {text}
      </Text>
      <Image
        style={{ height: 64, width: 64, marginTop: 6, alignSelf: "center" }}
        source={img}
      />
    </View>
  );
};

export const Note4 = () => {
  return (
    <ScrollView style={st.notes_screen} stickyHeaderIndices={[0]}>
      <View style={st.top_line_ctn}>
        <View style={st.top_line}></View>
      </View>
      <Text style={st.note_title}>Familia</Text>
      <Text style={st.note_text}>
        Existen señas compuestas de 2 movimientos como se observa en este nivel.
        Algunos ejemplos son: Mamá, Papá, Hombre, entre otros.
      </Text>
      <Text style={st.note_text}>
        Es importante también conocer que existen señas generales como: Hermano,
        Abuelo o hijo. Que pueden ser utilizadas en conversaciones donde no sea
        necesario especificar el género. Sin embargo si se desea especificar si
        se habla de femenino o masculino se emplean 2 señas, por ejemplo:
      </Text>
      <Text style={[st.note_text, { marginTop: 12 }]}>
        - Seña de "hijo" (general) + Seña de "mujer" = Hija
      </Text>
      <ImagesNote4 img1={fm.sonS} img2={fm.womanS} img3={fm.daugI} />
      <Text style={[st.note_text, { marginTop: 12 }]}>
        - Seña de "abuelo" (general) + Seña de "mujer" = Abuela
      </Text>
      <ImagesNote4 img1={fm.olderS} img2={fm.womanS} img3={fm.gmaI} />
      <Text style={[st.note_text, { marginTop: 12 }]}>
        - Seña de "Hermano" (general) + Seña de "Hombre" = Hermano (Varón)
      </Text>
      <ImagesNote4 img1={fm.hermS} img2={fm.manS} img3={fm.broI} />
      <Text style={[st.note_text, { marginTop: 12,marginBottom:64 }]}>
        Como resumen, si se desea identificar el género solo se debe utilizar la
        seña general + la seña de hombre o mujer según sea el caso.
      </Text>
    </ScrollView>
  );
};

const ImagesNote4 = ({ img1, img2, img3 }) => {
  return (
    <View
      style={{ flexDirection: "row", alignItems: "center", marginVertical: 12 }}
    >
      <View style={st.note_img4}>{img1}</View>
      <Image source={plus} style={{ width: 24, height: 24 }} />
      <View style={st.note_img4}>{img2}</View>
      <Image source={equal} style={{ width: 24, height: 24 }} />
      <View style={[st.note_img4, { backgroundColor: "#FEC454" }]}>{img3}</View>
    </View>
  );
};
