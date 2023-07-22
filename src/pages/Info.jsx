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
        title="Comunicacion Gestual"
        content="La expresión facial es un elemento de la lengua no manual que se conforma por los movimientos que las personas realizan Lorem ipsum dolor sit amet consectetur. Gravida cursus facilisis congue maecenas gravida placerat gravida. Elit dignissim urna nulla vestibulum ultricies blandit luctus elit varius. Sed mattis etiam diam in in malesuada ornare sed. "
      />
      <DropdownItem
        title="Comunicación Corporal"
        content="La expresión corporal engloba todos los movimientos que una persona puede realizar con el cuerpo y que prende comunicar algo gravida molestie elit dui viverra libero varius. Vitae nunc ut lobortis tincidunt a. Amet non sit arcu egestas. Viverra augue tristique et in tellus est. Suscipit nullam fames id ipsum odio lectus erat. Blandit tincidunt facilisi sed egestas eleifend porta tincidunt ac. "
      />
      <DropdownItem
        title="¿Qué es el lenguaje de señas?"
        content="Es el lenguaje oficial de las personas sordas, sin embargo también puede serutilizado por personas que posean algún tipo de discapacidad elit dignissim urna nulla vestibulum ultricies blandit luctus elit varius. Sed mattis etiam diam in in malesuada ornare sed. 
        "
      />
      <DropdownItem
        title="Estructura de LSV"
        content="Lorem ipsum dolor sit amet consectetur. Gravida cursus facilisis congue maecenas gravida placerat gravida. Elit dignissim urna nulla vestibulum ultricies blandit luctus elit varius. Sed mattis etiam diam in in malesuada ornare sed. 

        Gravida molestie elit dui viverra libero varius. Vitae nunc ut lobortis tincidunt a. Amet non sit arcu egestas. Viverra augue tristique et in tellus est. Suscipit nullam fames id ipsum odio lectus erat. Blandit tincidunt facilisi sed egestas eleifend porta tincidunt ac."
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
