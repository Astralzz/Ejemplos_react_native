import React, { useState, useRef } from "react";
import { StyleProp, View, ViewStyle, Text, Button } from "react-native";
import GlobalStyles from "./styles/global";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PruebaA from "./components/oters/PruebaA";
import PaginationEjemplo from "./components/paginacion/PaginationEjemplo";

const App: React.FC = () => {
  return <PaginationEjemplo />;
};

export default App;
{
  /* <Stack.Screen name="Home">
{(props) => <HomeScreen {...props} extraData={someData} />}
</Stack.Screen> */
}
