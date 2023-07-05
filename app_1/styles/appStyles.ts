import { StyleSheet } from "react-native";

// * Estilos
const AppStyles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  texto: {
    fontSize: 23,
    color: "red",
    backgroundColor: "transparent",
  },
  imagen: {
    marginTop: 20,
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: "contain",
  },
  botones: {
    marginTop: 10,
    padding: 10,
    width: "100%",
    height: 60,
    backgroundColor: "#01A9DB",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AppStyles;
