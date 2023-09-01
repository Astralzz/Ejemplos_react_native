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
import PaginaTema from "../pages/camara/PaginaTema";
import { usarTema } from "../components/theme/TemaApp";
import MenuPrincipal from "../components/menu/MenuPrincipal";

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
    nombre: "Resumen",
    textoMenu: "Resumen general",
    nombreIcono: "home-sharp",
    componente: ComponentePrueba,
  },
  {
    nombre: "Tema",
    textoMenu: "Cambiar temas",
    nombreIcono: "color-palette-sharp",
    componente: PaginaTema,
  },
];

// Todo ... RUTAS GLOBALES
const Routes: React.FC = () => {
  // * Variables
  const { tema } = usarTema();

  return (
    <Menu.Navigator
      initialRouteName="Inicio"
      drawerContent={(props) => (
        <MenuPrincipal paginas={paginasMenu} drawer={props} />
      )}
    >
      {paginasMenu.map((pagina, i) => {
        // Componente
        const Pagina: React.ComponentType<any> = pagina.componente;

        return (
          <Menu.Screen
            key={i}
            name={pagina.nombre}
            options={{
              headerTintColor: tema.colorsEncabezado.color_letra_encabezado,
              headerStyle: {
                backgroundColor: tema.colorsEncabezado.color_fondo_encabezado,
              },
            }}
          >
            {/* Pagina */}
            {() => <Pagina titulo={pagina.titulo ?? pagina.nombre} />}
          </Menu.Screen>
        );
      })}
    </Menu.Navigator>
  );
};

export default Routes;
