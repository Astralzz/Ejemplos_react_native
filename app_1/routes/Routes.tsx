import React from "react";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { View, Text } from "react-native";
import GlobalStyles from "../styles/global";
import Pagina from "../models/Pagina";
import MenuStyles from "../styles/menuStyles";
import EncabezadoMenu from "../components/menu/EncabezadoMenu";
import CuerpoMenu from "../components/menu/CuerpoMenu";

// * Variables
const Menu = createDrawerNavigator();

const ComponentePrueba: React.FC<{ titulo: string }> = ({ titulo }) => {
  return (
    <View style={GlobalStyles.contenedor_centrado}>
      <Text>{titulo ?? "???"}</Text>
    </View>
  );
};

// * Paginas del menu
const paginasMenu: Pagina[] = [
  {
    nombre: "Inicio",
    nombreIcono: "home-sharp",
    componente: ComponentePrueba,
  },
  {
    nombre: "Paginas",
    nombreIcono: "settings-sharp",
    componente: ComponentePrueba,
  },
];

// * Menu completo
const MenuCompleto: React.FC<DrawerContentComponentProps> = ({
  navigation,
}) => {
  return (
    <DrawerContentScrollView style={MenuStyles.global}>
      {/* ENCABEZADO */}
      <EncabezadoMenu
        titulo={"EDAIN JESUS"}
        subtitulo={"daiinxd13@gmail.cpm"}
      />

      {/* CUERPO */}
      <CuerpoMenu paginas={paginasMenu} navegador={navigation} />
    </DrawerContentScrollView>
  );
};

// Todo ... RUTAS GLOBALES
const Routes: React.FC = () => {
  return (
    <Menu.Navigator
      initialRouteName="Inicio"
      drawerContent={(props) => <MenuCompleto {...props} />}
    >
      {paginasMenu.map((pagina, i) => {
        // Componente
        const Componente: React.ComponentType<any> = pagina.componente;

        return (
          <Menu.Screen
            key={i}
            name={pagina.nombre}
            // options={
            //   {
            //     header: () => <View></View>
            //   }
            // }
          >
            {/* Pasa las propiedades al componente */}
            {() => <Componente titulo={pagina.titulo ?? pagina.nombre} />}
          </Menu.Screen>
        );
      })}
    </Menu.Navigator>
  );
};

export default Routes;
