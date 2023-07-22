import { View, Text, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import HomeIcon from "../icons/home.svg";
import NotesIcon from "../icons/notes.svg";

export const GameTopBar = () => {
  const navigation = useNavigation();
  const goHome = () => {
    navigation.navigate("Home");
  };
  return (
    <View
      style={{
        backgroundColor: "white",
        paddingVertical: 16,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Pressable
        onPress={goHome}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}
      >
        <HomeIcon width={32} height={32} />
      </Pressable>
      <View
        style={{
          width: "65%",
          borderRadius: 12,
          borderWidth: 2,
          borderColor: "#640C66",
          height: 32,
          paddingHorizontal: 6,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "#C18DD7",
            width: "30%",
            height: 18,
            borderRadius: 8,
          }}
        ></View>
      </View>
      <NotesIcon width={32} height={32} />
    </View>
  );
};

export const GameButton = ({onPress}) => {
  return (
    <Pressable style={({ pressed }) => [
      {
        marginVertical: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#640C66",
        width: "100%",
        paddingVertical: 12,
        alignItems: "center",
        backgroundColor: pressed ? "#640C66" : "white",
      },
    ]} {...{onPress}}>
      {({ pressed }) => (
        <Text
          style={{
            fontFamily: "Poppins-Regular",
            color: pressed ? "white" : "#640C66",
          }}
        >
          Confirmar
        </Text>
      )}
    </Pressable>
  );
};
