import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import heroimg from "../images/register.png";
import { ww, wh } from "../components/windowsSize";
import { useState } from "react";
import { ArrowDown } from "../components/MyIcons";

const Register = ({ navigation }) => {
  const goLogin = () => {
    navigation.navigate("Login");
  };
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={st.view}>
        <Header />
        <View style={st.bottom}>
          <Text style={st.subtitle}>Registrarse</Text>
          <InputLarge placeholder="Nombre" />
          <InputLarge placeholder="Apellido" />
          <Dinputs />
          <InputLarge placeholder="Edad" />
          <InputLarge placeholder="Nombredeusuario" />
          <InputLarge placeholder="Correo" />
          <InputLarge placeholder="Contraseña" />
          <InputLarge placeholder="Confirmarcontraseña" />
          <View style={{ height: 48 }} />

          {/* BOTTOM CONTENT */}
          <Buttons {...{ goLogin }} />
        </View>
      </View>
    </ScrollView>
  );
};

const Header = () => {
  return (
    <View style={st.top}>
      <Image source={heroimg} style={st.heroimg} />
      <Text style={st.title}>
        Descubre una nueva alternativa de comunicación!
      </Text>
      <View style={st.box}></View>
    </View>
  );
};

const Buttons = ({ goLogin }) => {
  return (
    <>
      <Pressable style={st.button}>
        <Text style={{ fontFamily: "Poppins-SemiBold", color: "#640D65" }}>
          Registrarse
        </Text>
      </Pressable>
      <Pressable style={st.registerBtn} onPress={goLogin}>
        {({ pressed }) => (
          <>
            <Text style={st.registerText}>Ya tienes una cuenta?{"  "}</Text>
            <Text style={[st.span, { opacity: pressed ? 0.5 : 1 }]}>
              Inicia Sesion
            </Text>
          </>
        )}
      </Pressable>
    </>
  );
};

const Dinputs = () => {
  const [active, setActive] = useState(false);
  const toggleActive = () => {
    setActive(!active);
  };
  return (
    <View style={st.dinputs}>
      <View style={{ width: "47%", display: "flex", flexDirection: "row" }}>
        <Pressable
          style={[
            st.input,
            st.inputSelect,
            { borderColor: active ? "#000" : "#BFBFBF" },
          ]}
          onPress={toggleActive}
        >
          <Text
            style={{
              fontFamily: "Poppins-Regular",
              color: "#00000060",
              fontSize: 12,
            }}
          >
            Genero
          </Text>
          <ArrowDown />
        </Pressable>
        {active && (
          <View style={st.absoluteCtn}>
            <View style={st.firstSpace}></View>
            <View style={st.spacesCtn}>
              <Text style={st.selectItem}>Masculino</Text>
              <View style={st.spaces}></View>
              <Text style={st.selectItem}>Femenino</Text>
              <View style={st.spaces}></View>
              <Text style={st.selectItem}>Otros</Text>
            </View>
          </View>
        )}
      </View>
      <TextInput
        style={[st.input, st.inputSmall]}
        placeholder="dd/mm/yyyy"
        value=""
        // onChangeText={handleChange}
      />
    </View>
  );
};
export const InputLarge = ({ placeholder, value, handleChange,secure=false }) => {
  return (
    <TextInput
      style={st.input}
      {...{ placeholder, value }}
      onChangeText={handleChange}
      secureTextEntry={secure}
    />
  );
};

export default Register;

const st = StyleSheet.create({
  scroll: {
    // flex: 1,
  },
  view: {
    flex: 1,
    // height:'100%',
    width: "100%",
    // height: wh * 2,
    backgroundColor: "#123123",
    position: "relative",
  },
  top: {
    height: wh * 0.35,
    backgroundColor: "#EEC1FB",
    // justifyContent:'center',
    paddingHorizontal: 20,
    paddingTop: 48,
  },
  heroimg: {
    position: "absolute",
    height: ww * 0.5 * 0.9,
    width: ww * 0.9,
    zIndex: 200,
    // top: "11%",
    bottom: 0,
    left: "-18%",
  },
  box: {
    width: ww,
    position: "absolute",
    height: wh * 0.05,
    backgroundColor: "#fff",
    bottom: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  title: {
    width: "90%",
    alignSelf: "flex-end",
    textAlign: "right",
    color: "#640D65",
    fontSize: 26,
    fontFamily: "Poppins-Medium",
    lineHeight: 38,
  },
  bottom: {
    // flex: 6,
    // marginTop: -24,
    // borderRadius: 24,
    // height: wh * 0.7,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 16,
    // fontWeight: "900",
    fontFamily: "Poppins-Medium",
    marginTop: 16,
    marginBottom: 24,
  },
  dinputs: {
    position: "relative",
    zIndex: 100,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputSelect: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#000",
    // paddingTop:8,
  },
  inputSmall: {
    width: "47%",
    textAlign: "center",
  },
  input: {
    width: "100%",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#BFBFBF",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 8,
    marginBottom: 12,
    alignContent: "center",
    fontFamily: "Poppins-Regular",
    fontSize: 12,
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
    display: "flex",
  },
  span: {
    fontFamily: "Poppins-SemiBold",
  },
  registerBtn: ({ pressed }) => ({
    // backgroundColor: "red",
    display: "flex",
    flexDirection: "row",
    marginBottom: 12,
    justifyContent: "center",
    paddingVertical: 12,
  }),
  absoluteCtn: {
    position: "absolute",
    // height:100,
    width: "100%",
    top: "60%",
    // backgroundColor:'#fff',
    // borderWidth:2,
    borderTopWidth: 0,
    borderColor: "#000",
    zIndex: 100,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  selectItem: {
    width: "100%",
    backgroundColor: "#fff",
    // borderRadius: 12,
    // marginTop:-12,
    paddingTop: 12,
    borderWidth: 2,
    borderTopWidth: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderColor: "#000",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 10,
    alignContent: "center",
    fontFamily: "Poppins-Regular",
    fontSize: 12,
  },
  firstSpace: {
    marginTop: -12,
    height: 26,
    width: "100%",
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: "#000",
  },
  spacesCtn: {
    display: "flex",
    backgroundColor: "#fff",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  spaces: {
    marginTop: -12,
    height: 12,
    width: "100%",
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: "#000",
  },
});
