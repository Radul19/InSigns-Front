import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Image,
  Dimensions,
} from "react-native";
import React, { useContext } from "react";
import avatar from "../images/avatar.png";
import MenuIcon from "../icons/menu.svg";
import SearchIcon from "../icons/search.svg";
import Svg from "react-native-svg";

import lines from "../images/lines.png";
import { Pressable } from "react-native";
import { avatarList, levelFiles } from "../components/LevelFile";
import NavBar from "../components/NavBar";
import Context from "../components/Context";
import { Exit, Lock } from "../components/MyIcons";
import { deleteLocalData } from "../components/localStorage";

const emptyUser = {
  _id: "",
  name: "",
  email: "",
  username: "",
  genre: 0,
  birthdate: "",
  avatar: 0,
  class0: [],
  class1: [],
  class2: [],
  class3: [],
};

const getStars = (userData) => {
  let amount = 0;
  userData.class0.forEach((ele) => {
    amount += ele;
  });
  userData.class1.forEach((ele) => {
    amount += ele;
  });
  userData.class2.forEach((ele) => {
    amount += ele;
  });

  return amount;
};

const ww = Dimensions.get("window").width;

const Home2 = ({ navigation }) => {
  const { setUserData, userData } = useContext(Context);
  // console.log()
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={st.rootView}>
        <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 32 }}>
          <Header {...{ navigation, setUserData, userData }} />
          {/* <SearchBar /> */}
          <View style={{height:24}} ></View>
          <SubTitles {...{ userData }} />
          {/** LEVESL HELL */}
          <DisplayRoads {...{ navigation, setUserData, userData }} />
        </View>
        <View style={{ height: 48 }}></View>
      </ScrollView>
      <NavBar position={1} />
    </View>
  );
};

export default Home2;

const Header = ({ navigation, setUserData, userData }) => {
  const closeSession = async () => {
    setUserData(emptyUser);
    await deleteLocalData('@user_id')
    navigation.navigate("Login");
  };

  return (
    <View>
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 12,
          flexDirection: "row",
        }}
      >
        <Image
          style={{ width: 48, height: 48, borderRadius: 100 }}
          source={avatarList[userData.avatar]}
        />
        <Pressable
          onPress={closeSession}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
            // marginTop:-12
          })}
        >
          <Exit />
        </Pressable>
      </View>
      <View style={{ marginTop: 12 }}>
        <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 24 }}>
          Hey {userData.username},
        </Text>
        <Text style={{ fontFamily: "Poppins-Regular", fontSize: 16 }}>
          Que quieres aprender el dia de hoy?
        </Text>
      </View>
    </View>
  );
};

const SubTitles = ({ userData }) => {


  const totalClasses = () => {
    let aux0 = userData.class0.length
    let aux1 = userData.class1.length
    let aux2 = userData.class2.length
    let aux3 = userData.class3.length

    return aux0+aux1+aux2+aux3
  };

  return (
    <View
      style={{
        justifyContent: "space-between",
        flexDirection: "row",
        marginBottom: 12,
      }}
    >
      <Text style={{ fontFamily: "Poppins-Medium", fontSize: 16 }}>
        Niveles
      </Text>
      <Text
        style={{ fontFamily: "Poppins-Medium", fontSize: 12, color: "#808080" }}
      >
        {totalClasses()}/12 clases
      </Text>
    </View>
  );
};

const SearchBar = () => {
  return (
    <View style={{ marginTop: 24, marginBottom: 32 }}>
      <TextInput style={st.searchBar} placeholder="Buscar algun nivel..." />
      <View style={{ position: "absolute", left: 12, paddingVertical: 9 }}>
        <SearchIcon width={24} height={24} />
      </View>
    </View>
  );
};

const DisplayRoads = ({ navigation, setUserData, userData }) => {
  const goLevel = (item, index) => {
    navigation.navigate("Levels", { ...item, classIndex: index });
  };
  return (
    <View style={st.cardsCtn}>
      {levelFiles.map((item, index) => (
        <Pressable
          onPress={() => {
            if (getStars(userData) >= item.req) {
              goLevel(item, index);
            }
          }}
          key={index}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.5 : 1,
              backgroundColor: item.bgc,
            },
            st.card,
            (index + 1) % 2 ? st.card_left : st.card_right,
          ]}
        >
          {getStars(userData) >= item.req ? (
            false
          ) : (
            <View style={st.lock}>
              <Lock />
            </View>
          )}

          <Text style={{ fontFamily: "Poppins-Regular" }}>{item.title}</Text>
          <Text
            style={{
              fontFamily: "Poppins-Regular",
              fontSize: 11,
              color: "#191919bf",
            }}
          >
            {item.subtitle}
          </Text>
          <Image
            source={item.image}
            style={st.card_image}
            resizeMode="contain"
          />
        </Pressable>
      ))}
    </View>
  );
};

const st = StyleSheet.create({
  rootView: {
    flex: 1,
    backgroundColor: "white",
  },
  searchBar: {
    borderRadius: 12,
    backgroundColor: "#F7F8FB",
    paddingVertical: 8,
    paddingLeft: 45,
    fontFamily: "Poppins-Regular",
  },
  cardsCtn: {
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "space-between",
    flexDirection: "row",
    // backgroundColor:'red'
  },
  card: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    width: ww * 0.39,
    height: ww * 0.39 + (ww * 0.39) / 3,
    borderRadius: 12,
  },
  card_left: { marginBottom: 48 },
  card_right: { marginTop: 48 },
  card_image: {
    width: "100%",
    height: "100%",
    marginTop: "-10%",
  },
  lock: {
    position: "absolute",
    backgroundColor: "#00000090",
    width: ww * 0.39,
    height: ww * 0.39 + (ww * 0.39) / 3,
    borderRadius: 12,
    zIndex: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});

/** line  */
/**
 *  <View
        style={{
          position: "absolute",
          backgroundColor: "white",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={lines}
          style={{
            // backgroundColor: "red",
            width: "80%",
            height: "70%",
          }}
          resizeMode="contain"
        />
      </View>
 */
