import {
  View,
  ScrollView,
  Dimensions,
  Text,
  TextInput,
  Image,
} from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
// import Text from "../components/Text";

import logo from "../images/Logo.png";
import capy from "../images/capyWelcome.png";

const ww = Dimensions.get("window").width;
const wh = Dimensions.get("window").height;

const Login = () => {
  return (
    <ScrollView style={{ width: ww, height: wh, backgroundColor: "#EEC1FB" }}>
      <Image
        resizeMode="contain"
        source={capy}
        style={{
          position: "absolute",
          width: 250,
          height: 250,
          right: "-10%",
          top: 90,
          zIndex: 50,
        }}
      />
      <View style={st.topCtn}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={logo} style={{ width: 67, height: 64 }} />
          <Text
            style={{
              fontFamily: "Poppins-Medium",
              fontSize: 24,
              marginLeft: 12,
              color: "#640D65",
            }}
          >
            EnSeñas
          </Text>
        </View>
        <Text
          style={{
            zIndex: 100,
            fontFamily: "Poppins-Medium",
            fontSize: 24,
            marginTop: 8,
            color: "#640D65",
          }}
        >
          Bienvenido!
        </Text>
        <Text
          style={{
            zIndex: 100,
            fontSize: 12,
            fontFamily: "Poppins-Medium",
            color: "#640d65bf",
            width:'75%'
          }}
        >
          Preparate con nuestras clases para divertirte mientras aprendes
        </Text>
      </View>
      <View style={st.bottomCtn}>
        <Text
          style={{
            fontFamily: "Poppins-Medium",
            marginBottom: 24,
            fontSize: 16,
          }}
        >
          Iniciar Sesion
        </Text>
        <TextInput style={st.input} placeholder="Username" />
        <TextInput style={st.input} placeholder="Password" />
        <View style={{ flexDirection: "row", marginLeft: 8, marginBottom: 52 }}>
          <View style={st.checkBox}></View>
          <Text
            style={{
              fontSize: 12,
              fontFamily: "Poppins-Regular",
              marginLeft: 8,
            }}
          >
            Recordar sesion
          </Text>
        </View>
        <View style={st.button}>
          <Text style={{ fontFamily: "Poppins-SemiBold",color:'#640D65' }}>Ingresar</Text>
        </View>
        <Text style={st.registerText}>
          No tienes una cuenta? <Text style={st.span}>Registrate Aquí</Text>{" "}
        </Text>
      </View>
    </ScrollView>
  );
};

export default Login;

const st = StyleSheet.create({
  topCtn: {
    height: wh * 0.4,
    width: "100%",
    backgroundColor: "#EEC1FB",
    paddingTop: 38,
    paddingHorizontal: 24,
  },
  bottomCtn: {
    zIndex: 200,
    height: wh * 0.64,
    width: "100%",
    borderTopStartRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#fff",
    paddingTop: 32,
    paddingHorizontal: 24,
  },
  input: {
    width: "100%",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#00000030",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 10,
    marginBottom: 18,
    alignContent: "center",
    fontFamily: "Poppins-Regular",
  },
  checkBox: {
    height: 16,
    width: 16,
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 4,
  },
  button: {
    width: "100%",
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: "#EEC1FB",
    marginTop: "auto",
    marginBottom: 14,
  },
  registerText: {
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    marginBottom: 32,
  },
  span: {
    fontFamily: "Poppins-SemiBold",
  },
});
