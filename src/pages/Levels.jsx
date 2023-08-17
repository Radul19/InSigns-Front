import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React, { useContext } from "react";
import { ScrollView } from "react-native";
import LeftArrow from "../icons/left.svg";
import Dots from "../icons/dots.svg";
import TrophyDark from "../icons/trophy_dark.svg";
import Road1 from "../images/road1.png";
import { LvlCheck, LvlLock, LvlReady, Star } from "../components/MyIcons";
import { ww, wh } from "../components/windowsSize";
import Context from "../components/Context";
// const ww = Dimensions.get("window").width;

const Levels = ({ navigation, route }) => {
  const {setLvlData,userData} = useContext(Context)
  const { image, bgc, bgcd, title, subtitle, stars, content,classIndex } = route.params;

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <View
        style={{
          flex: 1,
          backgroundColor: bgc,
        }}
      >
        <Image source={image} style={st.image} resizeMode="contain" />
        <Header {...{ navigation }} />
        <TopContent {...{ image, title, bgc,bgcd,content, subtitle, stars:userData[`class${classIndex}`] }} />
        <View style={st.content}>
          <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 16 }}>
            Contenido
          </Text>

          {content.map((item, index) => {
            let len = userData[`class${classIndex}`].length
            let state = 0

            if(len > index) state = 2
            if(len === index) state = 1

            return (
              <LvlCard
              bgcd={bgcd}
                num={"0" + JSON.stringify(index + 1)}
                {...{ navigation,index,item,setLvlData,userData,state }}
                key={index}
              />
            );
          })}
          {/*
          <LvlCard
            num="02"
            text="Lenguaje de Señas Venezolana"
            state={2}
            {...{ navigation }}
          />
          <LvlCard num="03" text="Perfil" state={1} {...{ navigation }} />
          <LvlCard num="04" text="Niveles" state={0} {...{ navigation }} />
          <LvlCard num="05" text="Recompensas" state={0} {...{ navigation }} /> */}
          {/* <LvlCard num="06" text="Accents" state={0} />
          <LvlCard num="07" text="More practices" state={0} /> */}
        </View>
      </View>
    </ScrollView>
  );
};

export default Levels;

const Header = ({ navigation }) => {
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingTop: 38,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Pressable
        style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1, padding: 4 })}
        onPress={goBack}
      >
        <LeftArrow width={32} height={32} />
      </Pressable>
      <Pressable
        style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1, padding: 4 })}
      >
        {/* <Dots width={24} height={24} /> */}
      </Pressable>
    </View>
  );
};

const TopContent = ({ image, title, bgc,bgcd, subtitle, stars ,content}) => {


  const countStars = ()=>{
    let count = 0
    stars?.forEach(element => {
        count += element
    });
    return count
  }
  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingBottom: 72,
      }}
    >
      <View style={{ marginTop: wh * 0.1, marginBottom: wh * 0.01 }}>
        <Text style={{ fontFamily: "Poppins-Medium", fontSize: 24 }}>
          {title}
        </Text>
        <Text
          style={{
            fontFamily: "Poppins-Regular",
            fontSize: 16,
            color: "#000000bf",
          }}
        >
          {subtitle}
        </Text>
      </View>
      <View style={{ flexDirection: "row", marginBottom: wh * 0.04 }}>
        <Star color={bgcd} size={32} />
        {/* <TrophyDark width={32} height={32} /> */}
        <Text
          style={{
            fontFamily: "Poppins-Regular",
            fontSize: 24,
            marginLeft: 12,
          }}
        >
          {countStars()}/{content.length * 3}
        </Text>
      </View>
    </View>
  );
};

const st = StyleSheet.create({
  image: {
    position: "absolute",
    width: ww,
    height: ww * 0.9,
    left: ww / 3,
    top: 56,
  },
  content: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    marginTop: -24,
    paddingTop: 32,
    paddingHorizontal: 24,
  },
});

/** item ===
 * state
 * title
 * levels
 */
const LvlCard = ({ num = "",item,navigation,index ,bgcd,setLvlData,userData,state}) => {

  

  const goGame = () => {
    if(state > 0 ){
      setLvlData({levels:[...item.levels],pos:0,stars:3,loc:item.loc,index:item.index})
      const gtype = item.levels[0].gameType
      navigation.navigate("Game"+JSON.stringify(gtype));
    }
  };
  return (
    <Pressable
      onPress={goGame}
      style={({ pressed }) => ({
        flexDirection: "row",
        // backgroundColor: "red",
        paddingVertical: 6,
        alignItems: "center",
        marginVertical: 4,
        opacity: pressed ? 0.5 : 1,
      })}
    >
      <Text
        style={{
          fontFamily: "Poppins-Medium",
          marginRight: 12,
          fontSize: 32,
          color: bgcd,
          opacity: state === 0 ? 0.6 : 1,
          width: 45,
          textAlign: "center",
        }}
      >
        {num}
      </Text>
      <Text
        style={{
          // backgroundColor:'red',
          fontFamily: "Poppins-Regular",
          fontSize: 16,
          opacity: item.state === 0 ? 0.6 : 1,
          width: "70%",
        }}
      >
        {item.title}
      </Text>
      <View style={{ marginLeft: "auto", marginRight: 12, marginTop: -4 }}>
        {state === 2 && <LvlCheck color={bgcd} />}
        {state === 1 && <LvlReady color={bgcd} />}
        {state === 0 && <LvlLock color="#191919" />}
      </View>
    </Pressable>
  );
};
