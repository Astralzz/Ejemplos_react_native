import React from "react";
import { View, Image, Text, StyleProp, ViewStyle } from "react-native";
import MenuStyles from "../../styles/menuStyles";
import VariablesColors, { ColorsMenu } from "../../styles/colorsApp";

// * Variables
const ImgEncabezado = require("../../assets/imgs/shall.jpg");
const estilo = MenuStyles.encabezado;

// * Props
interface EncabezadoProps {
  titulo: string;
  subtitulo: string;
  tema: ColorsMenu;
}

// Todo ---> Menu lateral
const EncabezadoMenu: React.FC<EncabezadoProps> = ({
  titulo,
  subtitulo,
  tema,
}) => {
  return (
    <View style={[estilo.global, {borderBottomColor:tema.color_separador_menu}]}>
      <Image style={estilo.imagen} source={ImgEncabezado} />
      <Text style={[estilo.titulo, { color: tema.color_letra_menu }]}>
        {titulo}
      </Text>
      <Text style={[estilo.subTitulo, { color: tema.color_letra_menu }]}>
        {subtitulo}
      </Text>
    </View>
  );
};

export default EncabezadoMenu;
