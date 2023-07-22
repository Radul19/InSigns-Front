import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import NotesIcon from "../../icons/notes.svg";
import HomeIcon from "../../icons/home.svg";
import { ww, wh } from "../../components/windowsSize";
import { Cross } from "../../components/MyIcons";

const GameLayout = ({ confirmResults, title, children }) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [openNote, setOpenNote] = useState(false);
  const toggleNote = () => {
    setOpenNote(!openNote);
  };

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
    <ScrollView style={st.rootView} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ paddingHorizontal: 24, paddingTop: 32, flex: 1 }}>
        <GameTopBar {...{ openNote, toggleNote }} />
        <Text style={st.title}>{title}</Text>
        {children}
      </View>
      {openNote && <NotesScreen />}
      <View style={{ paddingHorizontal: 24, marginTop: "auto" }}>
        {!isKeyboardVisible && <GameButton onPress={confirmResults} />}
      </View>
      {/* <View style={{ height: 48 }}></View> */}
    </ScrollView>
  );
};

export default GameLayout;

export const GameTopBar = ({ openNote, toggleNote }) => {
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
      <Pressable
        onPress={toggleNote}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}
      >
        {openNote ? <Cross size={32} /> : <NotesIcon width={32} height={32} />}
      </Pressable>
    </View>
  );
};

export const GameButton = ({ onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [
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
      ]}
      {...{ onPress }}
    >
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

export const NotesScreen = () => {
  return (
    <View style={st.notes_screen}>
      <View style={st.top_line}></View>
      <Text style={st.note_title}>Abecedario</Text>
      <Text style={st.note_text}>
        Lorem ipsum dolor sit amet consectetur. Gravida cursus facilisis congue
        maecenas gravida placerat gravida. Elit dignissim urna nulla vestibulum
        ultricies blandit luctus elit varius. Sed mattis etiam diam in in
        malesuada ornare sed.
      </Text>
      <Text style={st.note_text}>
        Gravida molestie elit dui viverra libero varius. Vitae nunc ut lobortis
        tincidunt a. Amet non sit arcu egestas. Viverra augue tristique et in
        tellus est. Suscipit nullam fames id ipsum odio lectus erat. Blandit
        tincidunt facilisi sed egestas eleifend porta tincidunt ac.
      </Text>
    </View>
  );
};

const st = StyleSheet.create({
  rootView: {
    flex: 1,
    // width:ww,
    // height:wh,
    backgroundColor: "white",
  },
  title: {
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    marginBottom: 16,
  },
  gameScreen: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 16,
    marginTop: 24,
  },

  notes_screen: {
    position: "absolute",
    backgroundColor: "#C18DD7",
    paddingHorizontal: 24,
    paddingTop: 24,
    bottom: 0,
    height: wh * 0.65,
    width: "100%",
    zIndex: 1000,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  top_line: {
    height: 6,
    borderRadius: 12,
    width: 64,
    backgroundColor: "#eee",
    alignSelf: "center",
    marginBottom: 24,
  },
  note_title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
    marginBottom: 12,
  },
  note_text: {
    fontFamily: "Poppins-Medium",
  },
});
