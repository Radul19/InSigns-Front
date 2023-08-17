import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  Keyboard,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import {
  ArrowDown,
  Done,
  Gear,
  LeftArrow,
  Pencil,
  StarFill,
} from "../components/MyIcons";
import ava1 from "../images/ava1.png";
import troph1 from "../images/troph1.png";
import troph2 from "../images/troph2.png";
import troph3 from "../images/troph3.png";
import troph4 from "../images/troph4.png";
import troph5 from "../images/troph5.png";
import troph from "../images/troph.png";
import { avatarList } from "../components/LevelFile";
import { InputLarge } from "./Register";
import Context from "../components/Context";
import { editUser } from "../components/api";
import LoadingScreen from "../components/LoadingScreen";
import { ErrorText } from "./Login";

const Profile = () => {
  const [editToggle, setEditToggle] = useState(false);
  const [errorDisplay, setErrorDisplay] = useState(false);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const { userData, setUserData } = useContext(Context);

  const [load, setLoad] = useState(false);

  const [name, setName] = useState(userData.username);
  const [email, setEmail] = useState(userData.email);
  const [pass, setPass] = useState("");
  const [passCon, setPassCon] = useState("");
  const [ava, setAva] = useState(userData.avatar);

  const updateUserData = async () => {
    if (editToggle === true) {
      setErrorDisplay(false);
      if (pass === passCon) {
        setLoad(true);
        const { status, data } = await editUser(
          ava,
          email,
          name,
          pass,
          userData._id
        );
        setLoad(false);
        if (status === 200) {
          // console.log(data)
          setPassCon("");
          setPass("");
          setUserData(data);
          setEditToggle(false);
        }
      } else {
        setErrorDisplay("Las contraseñas no coinciden");
      }
    } else {
      setEditToggle(true);
    }
  };

  useEffect(() => {
    // setName(userData.name)
    // setEmail(userData.email)
    // setAva(userData.avatar)

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

  const updateProps = {
    name,
    setName,
    email,
    setEmail,
    pass,
    setPass,
    passCon,
    setPassCon,
    ava,
    setAva,
    errorDisplay,
  };

  const headerProps = {
    editToggle,
    setEditToggle,
    updateUserData,
    setErrorDisplay,
    setPassCon,
    setPass,
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={st.rootView}>
        <LoadingScreen {...{ load }} />

        <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 32 }}>
          <Header {...headerProps} />
          {editToggle ? (
            <UserEditable {...updateProps} />
          ) : (
            <UserInfo {...{ userData }} />
          )}
        </View>
        <View style={{ height: 48 }}></View>
      </ScrollView>
      {!isKeyboardVisible && !load && <NavBar position={3} />}
    </View>
  );
};

const Header = ({
  editToggle,
  setEditToggle,
  updateUserData,
  setErrorDisplay,
  setPassCon,
  setPass,
}) => {
  const toggleEdit = () => {
    setErrorDisplay(false);
    setEditToggle(!editToggle);
    setPassCon("");
    setPass("");
  };
  return (
    <View style={st.header}>
      {editToggle ? (
        <>
          <Pressable style={st.leftArrow} onPress={toggleEdit}>
            <LeftArrow />
          </Pressable>
          <Pressable style={st.gear} onPress={updateUserData}>
            <Done />
          </Pressable>
        </>
      ) : (
        <Pressable style={st.gear} onPress={toggleEdit}>
          <Gear />
        </Pressable>
      )}
    </View>
  );
};

export default Profile;

const countStars = (item) => {
  let count = 0;
  item?.forEach((element) => {
    count += element;
  });
  return count;
};

const percent = (userD) => {
  let stars0 = countStars(userD.class0);
  let stars1 = countStars(userD.class1);
  let stars2 = countStars(userD.class2);
  let stars3 = countStars(userD.class3);
  const totalStars = stars0 + stars1 + stars2 + stars3;
  const totalLength =
    userD.class0.length +
    userD.class1.length +
    userD.class2.length +
    userD.class3.length;

  return Math.round((totalStars * 100) / totalLength/3);
};

const UserInfo = ({ userData }) => {
  useEffect(() => {}, [userData]);

  return (
    <>
      <View style={st.uinfo_top}>
        <Image source={avatarList[userData.avatar]} style={st.uinfo_avatar} />
        <View style={st.uinfo_right}>
          <Text style={st.name}>{userData.username}</Text>
          <Text style={st.email}>{userData.email}</Text>
        </View>
      </View>

      <View style={st.uinfo_records}>
        {/* <View style={st.record_box}>
          <Text style={st.big_num}>10</Text>
          <Text style={st.little_text}>Dias de racha</Text>
        </View> */}
        <View style={st.record_box}>
          <Text style={st.big_num}>%{percent(userData)}</Text>
          <Text style={st.little_text}>Avance</Text>
        </View>
      </View>

      <BannerTitle text="Niveles Completados" />
      <LvlCompleteInfo
        index={1}
        lvlTitle="Abecedario"
        completed={userData.class0.length}
        amount={4}
      />
      <LvlCompleteInfo
        index={2}
        lvlTitle="Números"
        completed={userData.class1.length}
        amount={2}
      />
      <LvlCompleteInfo
        index={3}
        lvlTitle="Preguntas"
        completed={userData.class2.length}
        amount={3}
      />
      <LvlCompleteInfo
        index={4}
        lvlTitle="Familia"
        completed={userData.class3.length}
        amount={3}
      />
      <BannerTitle text="Logros" />
      <ArchItem
        index={1}
        lvlTitle="Abecedario"
        image={troph2}
        amount={userData.class0}
        limit={12}
      />
      <ArchItem
        index={2}
        lvlTitle="Números"
        image={troph1}
        amount={userData.class1}
        limit={6}
      />
      <ArchItem
        index={3}
        lvlTitle="Preguntas"
        image={troph5}
        amount={userData.class2}
        limit={9}
      />
      <ArchItem
        index={4}
        lvlTitle="Familia"
        image={troph3}
        amount={userData.class3}
        limit={9}
      />
    </>
  );
};

const BannerTitle = ({ text }) => {
  return (
    <View style={st.banner}>
      <Text style={st.banner_text}>{text}</Text>
    </View>
  );
};

const LvlCompleteInfo = ({ index, lvlTitle, completed, amount }) => {
  return (
    <View style={st.lvlInfo_ctn}>
      <Text style={st.lvlInfo_left}>
        {index}. {lvlTitle}
      </Text>
      <Text style={st.lvlInfo_right}>
        {completed}/{amount} clases
      </Text>
    </View>
  );
};

const ArchItem = ({ image, index, lvlTitle, amount, limit }) => {
  return (
    <>
      {amount.length > 0 && (
        <View style={st.archItem_ctn}>
          <Image
            source={countStars(amount) === limit ? image : troph4}
            style={st.troph}
          />
          <View style={st.archItem_right}>
            <Text style={st.arch_title}>
              {index}. {lvlTitle}
            </Text>
            <Text style={st.arch_subtitle}>Estrellas conseguidas</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <StarFill color="#FFB431" />
              <Text style={st.arch_subtitle}>
                {countStars(amount)}/{limit}
              </Text>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

const st = StyleSheet.create({
  rootView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 42,
    alignItems: "center",
    flexDirection: "row",
  },
  gear: ({ pressed }) => ({
    opacity: pressed ? 0.5 : 1,
    marginLeft: "auto",
  }),
  leftArrow: ({ pressed }) => ({
    opacity: pressed ? 0.5 : 1,
    // marginLeft: "auto",
  }),

  /** UINFO_TOP */
  uinfo_top: {
    flexDirection: "row",
    marginTop: 12,
  },
  uinfo_avatar: {
    width: 120,
    height: 120,
  },
  uinfo_right: {
    justifyContent: "center",
    marginLeft: 24,
  },
  name: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 26,
  },
  email: {
    fontFamily: "Poppins-Regular",
  },

  /** UINFO RECORDS */
  uinfo_records: {
    marginTop: 32,
    // backgroundColor:'red',
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  record_box: {
    alignItems: "center",
  },
  big_num: {
    color: "#B679B6",
    fontFamily: "Poppins-Medium",
    fontSize: 50,
  },
  little_text: {
    marginTop: -12,
    fontFamily: "Poppins-Regular",
  },

  /** BANNERS AND ARCHIVMENTS */
  banner: {
    // height:42,
    backgroundColor: "#823A83",
    justifyContent: "center",
    borderRadius: 24,
    paddingLeft: 24,
    marginVertical: 24,
    paddingVertical: 8,
  },
  banner_text: {
    fontSize: 16,
    marginTop: 2,
    color: "#eee",
    fontFamily: "Poppins-Medium",
  },

  lvlInfo_ctn: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  lvlInfo_left: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
  lvlInfo_right: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#595959",
  },

  /** ARCHIVMENTS */
  archItem_ctn: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 24,
  },
  troph: {
    width: 72,
    height: 72,
  },
  archItem_right: {},
  arch_title: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
  },
  arch_subtitle: {
    fontFamily: "Poppins-Medium",
    color: "#595959",
  },
});

/** EDITABLE CONTENT */
const UserEditable = ({
  name,
  setName,
  email,
  setEmail,
  pass,
  setPass,
  passCon,
  setPassCon,
  ava,
  setAva,
  errorDisplay,
}) => {
  return (
    <>
      <View style={se.top_ctn}>
        <Image source={avatarList[ava]} style={se.edi_avatar} />
        <View style={se.input_ctn}>
          <TextInput
            style={se.input_name}
            value={name}
            onChangeText={setName}
          />
          <View style={se.pencil}>
            <Pencil />
          </View>
        </View>
        <Text style={{ fontFamily: "Poppins-Regular" }}>Cambiar Avatar</Text>
      </View>
      <View style={se.avatars_ctn}>
        {avatarList.map((img, index) => (
          <AvatarItem
            {...{ img, index, value: ava, set: setAva }}
            key={index}
          />
        ))}
      </View>
      <View style={{ marginTop: 24 }}>
        <InputTitle ph="correo" title="Correo" value={email} set={setEmail} />
        <InputTitle
          ph="*********"
          title="Contraseña"
          value={pass}
          secure={true}
          set={setPass}
        />
        <InputTitle
          ph="*********"
          title="Confirmar nueva contraseña"
          value={passCon}
          secure={true}
          set={setPassCon}
        />
      </View>
      <ErrorText errorDisplay={errorDisplay} />
    </>
  );
};

const AvatarItem = ({ img, index, value, set }) => {
  const press = () => {
    set(index);
  };
  return (
    <Pressable
      onPress={press}
      style={({ pressed }) => [
        se.avatar_item,
        {
          opacity: pressed ? 0.5 : 1,
          borderColor: index === value ? "#9D4D9E" : "#eeeeee00",
        },
      ]}
    >
      <Image source={img} style={se.avatar_img} />
    </Pressable>
  );
};

const InputTitle = ({ ph, title, value, secure, set }) => {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={se.inpt_title}>{title}</Text>
      {/* <InputLarge
        value={value}
        placeholder={ph}
        secure={secure}
        handleChange={set}
      /> */}
      <TextInput
        value={value}
        placeholder={ph}
        style={se.inpt_change}
        onChangeText={set}
        secureTextEntry={secure}
      />
    </View>
  );
};

const se = StyleSheet.create({
  top_ctn: {
    justifyContent: "center",
    alignItems: "center",
  },
  edi_avatar: { width: 120, height: 120 },
  input_ctn: {
    flexDirection: "row",
    marginVertical: 12,
    borderBottomColor: "#191919",
    borderBottomWidth: 2,
    paddingHorizontal: 32,
    marginBottom: 48,
    // width:'65%',
  },
  input_name: {
    // flex:1,
    textAlign: "center",
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
    // marginRight:-24
  },
  pencil: {
    position: "absolute",
    right: 0,
  },
  avatars_ctn: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 12,
  },
  avatar_item: {
    borderWidth: 2,
    borderRadius: 100,
    padding: 4,
    marginBottom: 24,
  },
  avatar_img: { width: 64, height: 64 },
  inpt_title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
  },
  inpt_change: {
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
});
