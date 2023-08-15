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
import { useContext, useState } from "react";
import { ArrowDown } from "../components/MyIcons";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment/moment";
import { createUser } from "../components/api";
import LoadingScreen from "../components/LoadingScreen";
import Context from "../components/Context";


const emptyData = {
  name: "",
  second_name: "",
  genre: 0,
  birthdate: "",
  username: "",
  email: "",
  password: "",
  confirmPass: "", 
}

const Register = ({ navigation }) => {

  const [load, setLoad] = useState(false)
  const {setUserData} = useContext(Context)

  const goLogin = () => {
    // console.log(inputs);
    navigation.navigate("Login");
  };

  // const [inputs, setInputs] = useState({
  //   name: "Prueba",
  //   second_name: "Uno",
  //   genre: 1,
  //   birthdate: "13/3/2003",
  //   username: "usprueba",
  //   email: "pb@gmail.com",
  //   password: "123123",
  //   confirmPass: "123123",
  // });
  const [inputs, setInputs] = useState({
    name: "",
    second_name: "",
    genre: 0,
    birthdate: "",
    username: "",
    email: "",
    password: "",
    confirmPass: "",
  });

  const handleChange = (name, data) => {
    setInputs({ ...inputs, [name]: data });
  };

  const validateData =()=>{
    let aux = true
    for (const key in inputs) {
      if(inputs[key] === emptyData[key]){
        aux = false
      }
    }

    if(inputs.password !== inputs.confirmPass){
      aux = false
    }


    return aux
  }

  const registerUser = async ()=>{
    const confirm = validateData()

    const {confirmPass,...allData} = inputs

    if(confirm){
      setLoad(true)
      const {status,data} = await createUser({...allData})
      setLoad(false)
      if(status === 200){
        // console.log(data)
        navigation.navigate("CodePage",{email:data.email,checkbox:false})
        // setUserData(data)
        // navigation.navigate("Home")
      }

    }else{
      console.log('error in data')
    }

  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <LoadingScreen {...{load}} />
      <View style={st.view}>
        <Header />
        <View style={st.bottom}>
          <Text style={st.subtitle}>Registrarse</Text>
          <InputLarge
            {...{ handleChange, inputs }}
            name="name"
            placeholder="Nombre"
          />
          <InputLarge
            {...{ handleChange, inputs }}
            name="second_name"
            placeholder="Apellido"
          />
          <Dinputs {...{inputs,handleChange}} />
          <InputLarge
            {...{ handleChange, inputs }}
            name="username"
            placeholder="Nombre de usuario"
          />
          <InputLarge
            {...{ handleChange, inputs }}
            name="email"
            placeholder="Correo"
          />
          <InputLarge
            {...{ handleChange, inputs }}
            name="password"
            placeholder="Contraseña"
            secure={true}
          />
          <InputLarge
            {...{ handleChange, inputs }}
            name="confirmPass"
            placeholder="Confirmar Contraseña"
            secure={true}
          />
          <View style={{ height: 48 }} />

          {/* BOTTOM CONTENT */}
          <Buttons {...{ goLogin,registerUser }} />
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

const Buttons = ({ goLogin,registerUser }) => {
  return (
    <>
      <Pressable style={st.button} onPress={registerUser} >
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

const Dinputs = ({inputs,handleChange}) => {
  const [openDP, setOpenDP] = useState(false);
  const toggleDP = () => {
    setOpenDP(!openDP);
  };


  const [active, setActive] = useState(false);
  const toggleActive = () => {
    setActive(!active);
  };


  const changeDate = (data) => {
    const newDate = moment(data.nativeEvent.timestamp).format("DD/MM/YYYY");
    handleChange('birthdate',newDate)
    // setDate(newDate);
    setOpenDP(!openDP);
  };

  const returnGenre =()=>{
    switch (inputs.genre) {
      case 0:
        return 'Genero'
        break;
      case 1:
        return 'Masculino'
        break;
      case 2:
        return 'Femenino'
        break;
      case 3:
        return 'Otros'
        break;
    
      default:
        break;
    }
  }

  return (
    <View style={st.dinputs}>
      {openDP && <RNDateTimePicker value={new Date()} onChange={changeDate} />}
      <View style={{ width: "47%", display: "flex", flexDirection: "row" }}>
        <Pressable
          style={[
            st.input,
            st.inputSelect,
            {
              borderColor: active ? "#000" : "#BFBFBF",
              borderBottomLeftRadius: active ? 0 : 12,
              borderBottomRightRadius: active ? 0 : 12,
            },
          ]}
          onPress={toggleActive}
        >
          <Text
            style={{
              fontFamily: "Poppins-Regular",
              color: active || inputs.genre > 0 ? "#000" : "#00000060",
              fontSize: 12,
            }}
          >
            {returnGenre()}
          </Text>
          <ArrowDown />
        </Pressable>
        {active && (
          <View style={st.absoluteCtn}>
            {/* <View style={st.firstSpace}></View> */}
            <View style={st.spacesCtn}>
              <SelectGenre text="Masculino" value={1} {...{handleChange,setActive}} />
              <View style={st.spaces}></View>
              <SelectGenre text="Femenino" value={2} {...{handleChange,setActive}} />
              {/* <Text style={st.selectItem}>Femenino</Text> */}
              <View style={st.spaces}></View>
              <SelectGenre text="Otros" value={3} {...{handleChange,setActive}} />
            </View>
          </View>
        )}
      </View>
      <Pressable style={[st.input, st.inputSmall]} onPress={toggleDP}>
        <Text
          style={[
            st.dym,
            { color: inputs.birthdate === "" ? "#A5A5A5" : "#191919" },
          ]}
        >
          {inputs.birthdate === "" ? "dd/mm/yyyy" : inputs.birthdate }
        </Text>
      </Pressable>
      {/* <TextInput
        style={[st.input, st.inputSmall]}
        placeholder="dd/mm/yyyy"
        value=""
        onChangeText={handleChange}
      /> */}
    </View>
  );
};

const SelectGenre = ({ text,value,handleChange,setActive }) => {
  return (
    <Pressable
    onPress={()=>{
      handleChange('genre',value)
      setActive(false)
    }}
      style={({ pressed }) => [
        st.selectItem,
        {
          opacity: pressed ? 0.5 : 1,
        },
      ]}
    >
      <Text
        style={{
          alignItems: "center",
          fontFamily: "Poppins-Regular",
          fontSize: 12,
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
};

export const InputLarge = ({
  placeholder,
  inputs,
  handleChange,
  secure = false,
  name,
}) => {
  return (
    <TextInput
      style={st.input}
      {...{ placeholder, value: inputs[name] }}
      onChangeText={(text) => {
        handleChange(name, text);
      }}
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
    height: 58,
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
    justifyContent: "center",
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
    top: 46,
    backgroundColor: "green",
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
    // borderColor: "#000",
    borderColor: "red",
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
  dym: {
    textAlign: "center",
    fontFamily: "Poppins-Regular",
    // fontSize: 12,
  },
});
