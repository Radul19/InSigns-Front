import { View, Text } from "react-native";
import React from "react";
import { wh, ww } from "./windowsSize";

const LoadingScreen = ({ load }) => {
  return (
    <>
      {load && (
        <View
          style={{
            position: "absolute",
            zIndex:1000,
            height: '100%',
            width: '100%',
            backgroundColor: "#640D65",
            alignItems:'center',
            justifyContent:'center'
          }}
        >
            <Text style={{
                fontFamily:'Poppins-Regular',
                color:'#eee',
            }} >Cargando...</Text>
        </View>
      )}
    </>
  );
};

export default LoadingScreen;
