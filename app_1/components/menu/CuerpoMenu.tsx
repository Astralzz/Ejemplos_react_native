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

// * Variables
const Estilo = MenuStyles.cuerpo;

// * Items del menu
const ItemMenu: React.FC<{
  etiqueta: string;
  icono: string;
  accion: (event: GestureResponderEvent) => void;
}> = ({ etiqueta, icono, accion }) => {
  return (
    <TouchableOpacity onPress={accion} style={MenuStyles.cuerpo.boton_item}>
      <Icon name={icono} style={Estilo.icono} />
      <Text style={Estilo.etiqueta}>{etiqueta}</Text>
    </TouchableOpacity>
  );
};

// * Props
interface CuerpoProps {
  paginas: Pagina[];
  navegador: DrawerNavigationHelpers;
}

// Todo ---> Menu lateral
const CuerpoMenu: React.FC<CuerpoProps> = ({ paginas, navegador }) => {
  
  return (
    <View style={Estilo.global}>
      {paginas.map((pagina, i) => {
        return (
          <ItemMenu
            key={i}
            etiqueta={pagina.nombre}
            icono={pagina.nombreIcono}
            accion={() => navegador.navigate(pagina.nombre)}
          />
        );
      })}
    </View>
  );
};

export default CuerpoMenu;
