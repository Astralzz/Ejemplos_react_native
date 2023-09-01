import React from "react";
import { View, Image, Text } from "react-native";
import MenuStyles from "../../styles/menuStyles";

// * Variables
const ImgEncabezado = require("../../assets/imgs/shall.jpg");
const Estilo = MenuStyles.encabezado;

// * Props
interface EncabezadoProps {
  titulo: string;
  subtitulo: string;
}

// Todo ---> Menu lateral
const EncabezadoMenu: React.FC<EncabezadoProps> = ({ titulo, subtitulo }) => {
  return (
    <View style={Estilo.global}>
      <Image style={Estilo.imagen} source={ImgEncabezado} />
      <Text style={Estilo.titulo}>{titulo}</Text>
      <Text style={Estilo.subTitulo}>{subtitulo}</Text>
    </View>
  );
};

export default EncabezadoMenu;
