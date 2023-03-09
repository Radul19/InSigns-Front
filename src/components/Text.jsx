import { Text as RnText, TextProps } from "react-native";
import React from "react";

const Text = ({children,...props}) => {
  return <RnText style={{fontFamily:'Poppins-Regular'}}  {...props} >{children}</RnText>;
};

export default Text;
