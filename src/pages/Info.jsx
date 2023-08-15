import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { wh, ww } from "../components/windowsSize";
import infoimg from "../images/info.png";
import { ArrowDown } from "../components/MyIcons";
const Info = () => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={{ flex: 1 }}>
          <Header />
          <ContentCtn />
        </View>
        <View style={{ height: 48 }}></View>
      </ScrollView>
      <NavBar position={2} />
    </View>
  );
};

export default Info;

const Header = () => {
  return (
    <View style={st.header}>
      <Text style={st.title}>
        Aprende más sobre el gran mundo del Lenguaje de Señas
      </Text>
      <Image style={st.infoimg} source={infoimg} />
    </View>
  );
};

const ContentCtn = () => {
  return (
    <View style={st.content_ctn}>
      <DropdownItem
        title="Comunicación Gestual:"
        content="La expresión facial es un elemento de la lengua no manual que se conforma por los movimientos que las personas realizan con los labios, posiciones de la lengua, movimientos de los ojos, entre otros, utilizados para enfatizar la información y la fluidez. Esta puede ir acompañada de expresión corporal o movimiento de las manos para expresar emociones o actitudes de manera más intensa."
      />
      <DropdownItem
        title="Comunicación Corporal:"
        content="La expresión corporal engloba todos los movimientos que una persona puede realizar con el cuerpo y que pretende comunicar algo. Por ejemplo el mover el cuerpo de acuerdo a la graduación de intensidad, velocidad o tamaño del movimiento al interpretar, permite comunicar cuántas personas hablan, el tipo de personalidad, la emoción detrás del mensaje, y así brindar información a la persona sin tener conocimiento de seña alguna."
      />
      <DropdownItem
        title="¿Qué es el lenguaje de señas?"
        content="Es el lenguaje oficial de las personas sordas, sin embargo también puede ser utilizado por personas que posean algún tipo de discapacidad para poder comunicarse con palabras. Como sustituto del lenguaje oral, este también cumple las funciones necesarias para permitir la comunicación con libertad, logrando elaborar ideas y enriquecer el pensamiento de la persona que lo emplea."
      />
      <DropdownItem
        title="Estructura de LSV"
        content="El lenguaje de señas es expresivo en su totalidad, y no sólo muestra propiedades organizativas complejas, también cuenta con una estructura gramatical independiente de la expresión oral. A continuación se muestra la estructura del LSV: Objeto + Sujeto + Verbo. 
        También tiene un orden al momento de expresar las ideas:
        1.Cronología (Tiempo)
        2.Circunstancia (Situación o mensaje principal)
        3.Causa-Efecto (Resultado)"
      />
    </View>
  );
};

const DropdownItem = ({ title, content }) => {
  const [ellipsis, setEllipsis] = useState(3);
  const toggleView = () => {
    if (ellipsis === 3) {
      setEllipsis(99);
    } else {
      setEllipsis(3);
    }
  };

  return (
    <View style={st.drop_item}>
      <Text style={st.di_title}>{title}</Text>
      <Text style={st.di_content} numberOfLines={ellipsis}>
        {content}
      </Text>
      <Pressable style={st.readmore} onPress={toggleView}>
        <Text style={{ fontFamily: "Poppins-Regular", color: "#595959" }}>
          {ellipsis === 3 ? "Leer más" : "Leer Menos"}
        </Text>
        <View style={ellipsis === 99 && st.rotate} >
        <ArrowDown color="#595959" />
        </View>
      </Pressable>
      <View style={st.line}></View>
    </View>
  );
};

const st = StyleSheet.create({
  header: {
    backgroundColor: "#EEC1FB",
    paddingTop: 48,
    alignItems: "center",
    height: wh * 0.33,
  },
  title: {
    color: "#640D65",
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
    width: "90%",
  },
  infoimg: {
    width: ww,
    height: ww * 0.444,
    position: "absolute",
    bottom: 0,
    marginBottom: -16,
  },

  content_ctn: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: -20,
    minHeight: wh * 0.7,
    // height:200,
    // width:ww,
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    paddingTop: 42,
    paddingHorizontal: 24,
  },
  drop_item: {},
  di_title: {
    color: "#485AA8",
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    marginBottom: 8,
  },
  di_content: {
    fontFamily: "Poppins-Regular",
    marginLeft: 12,
  },
  readmore: ({ pressed }) => ({
    flexDirection: "row",
    paddingVertical: 12,
    marginLeft: "auto",
    opacity: pressed ? 0.5 : 1,
  }),
  line: {
    height: 1,
    width: "100%",
    backgroundColor: "#B3B3B3",
    marginBottom: 32,
  },
  rotate:{
    transform:[{rotate:'180deg'}]
  }
});
