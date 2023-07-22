import {
  View,
  ScrollView,
  Dimensions,
  Text,
  TextInput,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
// import Text from "../components/Text";

import logo from "../images/Logo.png";
import heroimage from "../images/login.png";

const ww = Dimensions.get("window").width;
const wh = Dimensions.get("window").height;

const Login = ({ navigation }) => {
  const goRegister = () => {
    navigation.navigate("Register");
  };

  const goHome = () => {
    navigation.navigate("Home");
  };
  return (
    <ScrollView style={{ backgroundColor: "#EEC1FB" }}>
      <Image
        resizeMode="contain"
        source={heroimage}
        style={{
          position: "absolute",
          width: ww * 0.76,
          height: ww * 0.76,
          right: "-15%",
          top: 60,
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
            width: "60%",
          }}
        >
          Prepárate con nuestras clases para divertirte mientras aprendes LSV
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
        <Pressable style={st.button} onPress={goHome}>
          <Text style={{ fontFamily: "Poppins-SemiBold", color: "#640D65" }}>
            Ingresar
          </Text>
        </Pressable>
        <Pressable style={st.registerBtn} onPress={goRegister}>
          {({ pressed }) => (
            <>
              <Text style={st.registerText}>No tienes una cuenta?{"  "}</Text>
              <Text style={[st.span, { opacity: pressed ? 0.5 : 1 }]}>
                Registrate
              </Text>
            </>
          )}
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Login;

const st = StyleSheet.create({
  topCtn: {
    height: wh * 0.35,
    width: "100%",
    backgroundColor: "#EEC1FB",
    paddingTop: 38,
    paddingHorizontal: 24,
  },
  bottomCtn: {
    zIndex: 200,
    minHeight: wh * 0.65 + 38,
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
    paddingTop: 10,
    paddingBottom: 8,
    marginBottom: 18,
    alignContent: "center",
    fontFamily: "Poppins-Regular",
    fontSize: 12,
  },
  checkBox: {
    height: 16,
    width: 16,
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 4,
  },
  button: ({ pressed }) => ({
    width: "100%",
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: "#EEC1FB",
    marginTop: "auto",
    marginBottom: 14,
    opacity: pressed ? 0.5 : 1,
  }),
  registerText: {
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    // marginBottom: 32,
  },
  span: {
    fontFamily: "Poppins-SemiBold",
  },
  registerBtn: {
    // backgroundColor: "red",
    display: "flex",
    flexDirection: "row",
    marginBottom: 12,
    justifyContent: "center",
    paddingVertical: 12,
  },
});
