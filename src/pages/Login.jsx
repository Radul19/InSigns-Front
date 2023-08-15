import {
  View,
  ScrollView,
  Dimensions,
  Text,
  TextInput,
  Image,
  Pressable,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
// import Text from "../components/Text";

import logo from "../images/Logo.png";
import heroimage from "../images/login.png";
import LoadingScreen from "../components/LoadingScreen";
import { findUser, login } from "../components/api";
import Context from "../components/Context";
import { Done } from "../components/MyIcons";
import { getLocalData, storeLocalData } from "../components/localStorage";
import { CompleteScreen, ResultScreen } from "../components/GameTopBar";

const ww = Dimensions.get("window").width;
const wh = Dimensions.get("window").height;

const Login = ({ navigation }) => {
  const [errorDisplay, setErrorDisplay] = useState(false);
  const [load, setLoad] = useState(true);
  const { setUserData } = useContext(Context);

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    checkbox: false,
  });

  const handleUsername = (text) => {
    setInputs((prev) => ({ ...prev, username: text }));
  };
  const handlePass = (text) => {
    setInputs((prev) => ({ ...prev, password: text }));
  };
  const toggleCheck = () => {
    setInputs((prev) => ({ ...prev, checkbox: !prev.checkbox }));
  };

  const goRegister = () => {
    navigation.navigate("Register");
  };

  const goHome = async () => {

    setErrorDisplay(false);
    setLoad(true);
    const { data, status } = await login(inputs.username, inputs.password);
    console.log(data)
    console.log(status)
    setLoad(false);
    if (status === 200) {
      setInputs({
        username: "",
        password: "",
      });
      if (inputs.checkbox) {
        await storeLocalData("@user_id", data._id);
      }
        setUserData(data);
        navigation.navigate("Home");
        
        
      } else if (status === 404) {
        setErrorDisplay("Contraseña o datos incorrectos, intente nuevamente");
      }else if(status === 401){
      navigation.navigate("CodePage",{email:data.email,checkbox:inputs.checkbox});
    }
  };

  useEffect(() => {
    (async () => {
      const aux = await getLocalData("@user_id");
      if (aux) {
        const { status, data } = await findUser(aux);
        if (status === 200) {
          setUserData(data)
          setLoad(false)
          navigation.navigate("Home");
        }
      }else{
        setLoad(false)
      }
    })();
  }, []);

  return (
    <ScrollView style={{ backgroundColor: "#EEC1FB" }}>
      {/* <ResultScreen status={3}  /> */}
      <LoadingScreen {...{ load }} />
      <Header />
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
        <TextInput
          style={st.input}
          placeholder="Username"
          value={inputs.username}
          onChangeText={handleUsername}
        />
        <TextInput
          style={st.input}
          placeholder="Password"
          value={inputs.password}
          onChangeText={handlePass}
          secureTextEntry={true}
        />

        <Pressable
          onPress={toggleCheck}
          style={({ pressed }) => ({
            flexDirection: "row",
            marginLeft: 8,
            opacity: pressed ? 0.5 : 1,
          })}
        >
          <View
            style={[
              st.checkBox,
              { backgroundColor: inputs.checkbox ? "#000" : "#fff" },
            ]}
          >
            {inputs.checkbox && <Done size={12} color="#ffffff" />}
          </View>
          <Text
            style={{
              fontSize: 12,
              fontFamily: "Poppins-Regular",
              marginLeft: 8,
            }}
          >
            Recordar sesion
          </Text>
        </Pressable>
        <View style={{ height: 52 }} />
        <View style={{ marginTop: "auto" }} />

        <ErrorText errorDisplay={errorDisplay} />
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

const Header = () => {
  return (
    <>
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
    </>
  );
};

export const ErrorText = ({ errorDisplay }) => {
  return (
    <>{errorDisplay && <Text style={st.errorText}>{errorDisplay}</Text>}</>
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
    alignItems: "center",
    justifyContent: "center",
  },
  button: ({ pressed }) => ({
    width: "100%",
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: "#EEC1FB",
    // marginTop: "auto",
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
  errorText: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#d0342c",
    marginBottom: 12,
  },
});
