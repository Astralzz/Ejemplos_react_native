import React from "react";
import {
  View,
  Text,
  GestureResponderEvent,
  TouchableOpacity,
} from "react-native";
import MenuStyles from "../../styles/menuStyles";
import Pagina from "../../models/Pagina";
import Icon from "react-native-vector-icons/Ionicons";
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";
import { ColorsMenu } from "../../styles/colorsApp";

// * Variables
const Estilo = MenuStyles.cuerpo;

// * Items del menu
const ItemMenu: React.FC<{
  etiqueta: string;
  icono: string;
  accion: (event: GestureResponderEvent) => void;
  tema: ColorsMenu;
}> = ({ etiqueta, icono, accion, tema }) => {
  return (
    <TouchableOpacity onPress={accion} style={MenuStyles.cuerpo.boton_item}>
      <Icon
        name={icono}
        style={[Estilo.icono, { color: tema.color_letra_menu }]}
      />
      <Text style={[Estilo.etiqueta, { color: tema.color_letra_menu }]}>
        {etiqueta}
      </Text>
    </TouchableOpacity>
  );
};

// * Props
interface CuerpoProps {
  paginas: Pagina[];
  navegador: DrawerNavigationHelpers;
  tema: ColorsMenu;
}

// Todo ---> Menu lateral
const CuerpoMenu: React.FC<CuerpoProps> = ({ paginas, navegador, tema }) => {
  return (
    <View style={Estilo.global}>
      {paginas.map((pagina, i) => {
        return (
          <ItemMenu
            key={i}
            etiqueta={pagina.textoMenu ?? pagina.nombre}
            icono={pagina.nombreIcono}
            accion={() => navegador.navigate(pagina.nombre)}
            tema={tema}
          />
        );
      })}
    </View>
  );
};

export default CuerpoMenu;
