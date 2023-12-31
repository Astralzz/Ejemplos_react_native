import { ImageStyle, StyleProp, TextStyle } from "react-native";

// * Encabezado
interface EncabezadoMenu {
  global: StyleProp<TextStyle>;
  imagen: StyleProp<ImageStyle>;
  titulo: StyleProp<TextStyle>;
  subTitulo: StyleProp<TextStyle>;
}

// * Cuerpo
interface CuerpoMenu {
  global: StyleProp<TextStyle>;
  boton_item: StyleProp<TextStyle>;
  etiqueta: StyleProp<TextStyle>;
  icono: StyleProp<TextStyle>;
}

// * Componentes
interface EstiloMenu {
  global: StyleProp<TextStyle>;
  encabezado: EncabezadoMenu;
  cuerpo: CuerpoMenu;
}

// * Estilos globales
const MenuStyles: EstiloMenu = {
  global: {
    borderWidth: 2,
  },

  // * Encabezado
  encabezado: {
    global: {
      marginBottom: 25,
      backgroundColor: "transparent",
      textAlign: "center",
      alignItems: "center",
      justifyContent:"center",
      padding: 5,
      borderBottomWidth: 1,
    },
    imagen: {
      marginTop: 10,
      marginBottom: 10,
      width: 100,
      height: 100,
      borderRadius: 50,
      resizeMode: "contain",
    },
    titulo: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 5,
    },
    subTitulo: {
      fontSize: 14,
      fontWeight: "bold",
      marginBottom: 10,
    },
  },

  // * Cuerpo
  cuerpo: {
    global: {
      backgroundColor: "transparent",
    },
    boton_item: {
      marginLeft: 20,
      padding: 10,
      flexDirection: "row",
      width: "80%",
      backgroundColor: "transparent",
      alignItems: "center",
      borderRadius: 15,
    },
    etiqueta: {
      marginLeft: 15,
      fontSize: 15,
    },
    icono: {
      marginLeft: 10,
      fontSize: 20,
    },
  },
};

export default MenuStyles;
