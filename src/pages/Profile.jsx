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
import React, { useEffect, useState } from "react";
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
import troph from "../images/troph.png";
import { avatarList } from "../components/LevelFile";
import { InputLarge } from "./Register";

const Profile = () => {
  const [editToggle, setEditToggle] = useState(false);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

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
    <View style={{ flex: 1 }}>
      <ScrollView style={st.rootView}>
        <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 32 }}>
          <Header {...{ editToggle, setEditToggle }} />
          {editToggle ? <UserEditable /> : <UserInfo />}
        </View>
        <View style={{ height: 48 }}></View>
      </ScrollView>
      {!isKeyboardVisible && <NavBar position={3} />}
    </View>
  );
};

const Header = ({ editToggle, setEditToggle }) => {
  const toggleEdit = () => {
    setEditToggle(!editToggle);
  };
  return (
    <View style={st.header}>
      {editToggle ? (
        <>
          <Pressable style={st.leftArrow} onPress={toggleEdit}>
            <LeftArrow />
          </Pressable>
          <Pressable style={st.gear}>
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

const UserInfo = () => {
  return (
    <>
      <View style={st.uinfo_top}>
        <Image source={ava1} style={st.uinfo_avatar} />
        <View style={st.uinfo_right}>
          <Text style={st.name}>Alex</Text>
          <Text style={st.email}>alex305@gmail.com</Text>
        </View>
      </View>

      <View style={st.uinfo_records}>
        <View style={st.record_box}>
          <Text style={st.big_num}>10</Text>
          <Text style={st.little_text}>Dias de racha</Text>
        </View>
        <View style={st.record_box}>
          <Text style={st.big_num}>%15</Text>
          <Text style={st.little_text}>Avance</Text>
        </View>
      </View>

      <BannerTitle text="Niveles Completados" />
      <LvlCompleteInfo index={1} lvlTitle="Vocales" completed={5} amount={5} />
      <LvlCompleteInfo index={2} lvlTitle="Números" completed={3} amount={5} />
      <LvlCompleteInfo
        index={3}
        lvlTitle="Preguntas"
        completed={0}
        amount={5}
      />
      <BannerTitle text="Logros" />
      <ArchItem index={1} lvlTitle="Abecedario" image={troph1} amount={9} />
      <ArchItem index={2} lvlTitle="Abecedario" image={troph} amount={5} />
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

const ArchItem = ({ image, index, lvlTitle, amount }) => {
  return (
    <View style={st.archItem_ctn}>
      <Image source={image} style={st.troph} />
      <View style={st.archItem_right}>
        <Text style={st.arch_title}>
          {index}. {lvlTitle}
        </Text>
        <Text style={st.arch_subtitle}>Estrellas conseguidas</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <StarFill />
          <Text style={st.arch_subtitle}>{amount}/15</Text>
        </View>
      </View>
    </View>
  );
};

const st = StyleSheet.create({
  rootView: {
    flex: 1,
    backgroundColor: "#eee",
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
const UserEditable = () => {
  const [name, setName] = useState("Alex");
  const [email, setEmail] = useState("alex305@gmail.com");
  const [pass, setPass] = useState("");
  const [passCon, setPassCon] = useState("");
  const [ava, setAva] = useState(0);
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
      <InputLarge
        value={value}
        placeholder={ph}
        secure={secure}
        handleChange={set}
      />
      {/* <TextInput value="" placeholder={ph} style={se.inpt_change} /> */}
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
  inpt_change: {},
});
