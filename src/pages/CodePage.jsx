import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import LoadingScreen from "../components/LoadingScreen";

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { wh, ww } from "../components/windowsSize";
import { Shield } from "../components/MyIcons";
import { verifyCode } from "../components/api";
import Context from "../components/Context";
import { ErrorText } from "./Login";
import { storeLocalData } from "../components/localStorage";

const CELL_COUNT = 6;

const CodePage = ({ navigation, route }) => {
  const email = route.params?.email;
  const checkbox = route.params?.checkbox;

  const { setUserData } = useContext(Context);

  const [load, setLoad] = useState(false);
  const [errorDisplay, setErrorDisplay] = useState(false);
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const sendCode = async () => {
    setErrorDisplay(false);
    if (value.length === 6) {
      setLoad(true);
      const { status, data } = await verifyCode(value);
      setLoad(false);
      if (status === 200) {
        if (checkbox) {
          await storeLocalData("@user_id", data._id);
        }
        setValue("")
        setUserData(data);
        navigation.navigate("Home");
      } else if (status === 404) {
        setErrorDisplay("Código incorrecto");
      }
    } else {
      setErrorDisplay("El código debe contener al menos 6 dígitos");
    }
  };

  const goBack = () => {
    setErrorDisplay(false)
    setValue("")
    navigation.navigate("Login");
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <LoadingScreen {...{ load }} />
      <View style={st.view}>
        <Header />
        <View style={st.bottom}>
          <View style={{ alignItems: "center" }}>
            <Shield />
          </View>
          <Text style={st.subtitle}>Verificacion de codigo por correo</Text>
          <CodeField
            ref={ref}
            {...props}
            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={st.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[
                  st.cell,
                  isFocused && st.focusCell,
                  symbol ? st.active : null,
                ]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
          <Text style={{ fontFamily: "Poppins-Regular" }}>
            Ingresa el código que se te envió al correo {email}
          </Text>
          <View
            style={{ marginVertical: 12, width: "95%", alignSelf: "center" }}
          ></View>
          <View
            style={{ marginTop: "auto"}}
          ></View>
          <ErrorText errorDisplay={errorDisplay} />
          <Buttons {...{ goBack, sendCode }} />
        </View>
      </View>
    </ScrollView>
  );
};

const Header = () => {
  return (
    <View style={st.top}>
      <Text style={st.title}>Ya casi terminamos tu registro</Text>
      <View style={st.box}></View>
    </View>
  );
};

const Buttons = ({ goBack, sendCode }) => {
  return (
    <>
      <Pressable style={st.button} onPress={sendCode}>
        <Text style={{ fontFamily: "Poppins-SemiBold", color: "#640D65" }}>
          Confirmar código
        </Text>
      </Pressable>
      <Pressable style={st.registerBtn} onPress={goBack}>
        {({ pressed }) => (
          <>
            {/* <Text style={st.registerText}>Ya tienes una cuenta?{"  "}</Text> */}
            <Text style={[st.span, { opacity: pressed ? 0.5 : 1 }]}>
              Regresar
            </Text>
          </>
        )}
      </Pressable>
    </>
  );
};

export default CodePage;

const st = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: { textAlign: "center", fontSize: 30 },
  codeFieldRoot: { marginTop: 0, width: "100%", marginBottom: 12 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 48,
    fontSize: 18,
    borderWidth: 2,
    borderColor: "#640D65",
    textAlign: "center",
    color: "#640D65",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    fontFamily: "Poppins-Regular",
    // backgroundColor:"#000",
  },
  focusCell: {
    // borderColor: "#FFAF0D",
    // color:"#FFAF0D"
  },
  active: {
    backgroundColor: "#640D65",
    color: "#fff",
  },
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
    height: wh * 0.25,
    backgroundColor: "#EEC1FB",
    // justifyContent:'center',
    // alignItems:'center',
    paddingHorizontal: 20,
    paddingTop: 48,
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
    alignSelf: "center",
    textAlign: "center",
    color: "#640D65",
    fontSize: 26,
    fontFamily: "Poppins-Medium",
    lineHeight: 38,
  },
  bottom: {
    // flex: 6,
    // marginTop: -24,
    // borderRadius: 24,
    height: wh * 0.75 + 28,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 16,
    // fontWeight: "900",
    fontFamily: "Poppins-Medium",
    marginTop: 16,
    marginBottom: 12,
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
  registerBtn: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 12,
    justifyContent: "center",
    paddingVertical: 12,
  },
  registerText: {
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    display: "flex",
  },
  span: {
    fontFamily: "Poppins-SemiBold",
  },
});
