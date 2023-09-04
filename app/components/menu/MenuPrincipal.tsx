import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import React from "react";
import MenuStyles from "../../styles/menuStyles";
import EncabezadoMenu from "./EncabezadoMenu";
import CuerpoMenu from "./CuerpoMenu";
import Pagina from "../../models/Pagina";
import VariablesColors, { ColorsMenu } from "../../styles/colorsApp";
import { StyleProp, ViewStyle } from "react-native";
import { usarTema } from "../theme/TemaApp";

// * Props
interface MenuCompletoProps {
  drawer: DrawerContentComponentProps;
  paginas: Pagina[];
}

// * Menu completo
const MenuPrincipal: React.FC<MenuCompletoProps> = ({
  drawer,
  paginas,
}) => {

// * Variables
  const { tema } = usarTema();
  const colorsMenu:ColorsMenu = tema.colorsMenu;

  // * Estilo
  const estiloMenu: StyleProp<ViewStyle> = {
    ...MenuStyles.cuerpo,
    backgroundColor: colorsMenu.color_menu_principal,
  };

  return (
    <DrawerContentScrollView style={estiloMenu}>
      {/* ENCABEZADO */}
      <EncabezadoMenu
        titulo={"EDAIN JESUS"}
        subtitulo={"daiinxd13@gmail.com"}
        tema={colorsMenu}
      />

      {/* CUERPO */}
      <CuerpoMenu
        paginas={paginas}
        navegador={drawer.navigation}
        tema={colorsMenu}
      />
    </DrawerContentScrollView>
  );
};

export default MenuPrincipal;
