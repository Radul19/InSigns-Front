import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import avatar from "../images/avatar.png";
import MenuIcon from "../icons/menu.svg";
import SearchIcon from "../icons/search.svg";
import Svg from "react-native-svg";

import lines from "../images/lines.png";
import { Pressable } from "react-native";

/** LEVEL FILES */
const levelFiles = [
  {
    image: require("../images/road1.png"),
    bgc: "#F9DBBB",
    title: "Nivel 1",
    subtitle: "Abecedario",
  },
  {
    image: require("../images/road2.png"),
    bgc: "#F8AAA2",
    title: "Nivel 2",
    subtitle: "Abecedario",
  },
  {
    image: require("../images/road3.png"),
    bgc: "#C3D6B8",
    title: "Nivel 3",
    subtitle: "Abecedario",
  },
  {
    image: require("../images/road4.png"),
    bgc: "#85586F",
    title: "Nivel 4",
    subtitle: "Abecedario",
  },
];

const ww = Dimensions.get("window").width;

const Home2 = () => {
  return (
    <ScrollView style={st.rootView}>
      <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 32 }}>
        <Header />
        <SearchBar />
        <SubTitles />
        {/** LEVESL HELL */}
        <DisplayRoads />
        {/* <Image source={road1} ></Image> */}
      </View>
      <View style={{ height: 48 }}></View>
    </ScrollView>
  );
};

export default Home2;

const Header = () => {
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
          source={avatar}
        />
        <MenuIcon width={24} height={24} />
      </View>
      <View style={{ marginTop: 12 }}>
        <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 24 }}>
          Hey Alex,
        </Text>
        <Text style={{ fontFamily: "Poppins-Regular", fontSize: 16 }}>
          What do you want to learn today?
        </Text>
      </View>
    </View>
  );
};

const SubTitles = () => {
  return (
    <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
      <Text style={{ fontFamily: "Poppins-Medium", fontSize: 16 }}>Levels</Text>
      <Text
        style={{ fontFamily: "Poppins-Medium", fontSize: 12, color: "#808080" }}
      >
        2/8 classes
      </Text>
    </View>
  );
};

const SearchBar = () => {
  return (
    <View style={{ marginTop: 24, marginBottom: 32 }}>
      <TextInput style={st.searchBar} placeholder="Search for anything" />
      <View style={{ position: "absolute", left: 12, paddingVertical: 9 }}>
        <SearchIcon width={24} height={24} />
      </View>
    </View>
  );
};

const DisplayRoads = () => {
  return (
    <View style={st.cardsCtn}>
      {levelFiles.map((item, index) => (
        <Pressable
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
          <Text style={{ fontFamily: "Poppins-Regular" }}>{item.title}</Text>
          <Text
            style={{
              fontFamily: "Poppins-Regular",
              fontSize: 12,
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
    width: ww * 0.38,
    height: ww * 0.38 + (ww * 0.38) / 3,
    borderRadius: 12,
  },
  card_left: { marginBottom: 48 },
  card_right: { marginTop: 48 },
  card_image: {
    width: "100%",
    height: "100%",
    marginTop: "-10%",
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
