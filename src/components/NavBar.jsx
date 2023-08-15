import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import HomeIcon from "../icons/home.svg";
import NotesIcon from "../icons/notes.svg";
import UserBoxIcon from "../icons/userbox.svg";
import { Shadow } from "react-native-shadow-2";

const NavBar = ({ position }) => {
  const navigation = useNavigation();
  const goHome = () => {
    navigation.navigate("Home")
  };
  const goProfile = () => {
    navigation.navigate("Profile")
  };
  const goNotes = () => {
    navigation.navigate("Info")
  };
  return (
    <Shadow >
      <View style={st.navBar_ctn}>
        <Pressable onPress={goHome} style={st.icon}>
          <HomeIcon width={24} height={24} />
          {position === 1 && <View style={st.dot} />}
        </Pressable>
        <Pressable onPress={goNotes} style={st.icon}>
          <NotesIcon width={24} height={24} />
          {position === 2 && <View style={st.dot} />}
        </Pressable>
        <Pressable onPress={goProfile} style={st.icon}>
          <UserBoxIcon width={24} height={24} />
          {position === 3 && <View style={st.dot} />}
        </Pressable>
      </View>
    </Shadow>
  );
};

export default NavBar;

const st = StyleSheet.create({
  navBar_ctn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    width: '100%',
    paddingHorizontal: 30,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  icon: ({ pressed }) => ({
    opacity: pressed ? 0.5 : 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
  }),
  dot: {
    position: "absolute",
    width: 6,
    height: 6,
    backgroundColor: "#640C66",
    bottom: 8,
    alignSelf: "center",
    borderRadius: 6,
  },
});
