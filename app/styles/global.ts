import { StyleSheet } from "react-native";

// * Estilos globales
const GlobalStyles = StyleSheet.create({
  contenedor_centrado: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

// * Estilo
export const estilosModal = StyleSheet.create({
  contenedorCompleto: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contenedorModal: {
    width: "80%",
    borderRadius: 8,
    padding: 16,
  },
  encabezado: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  encabezadoTexto: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cerrarBoton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  cuerpoModal: {
    maxHeight: "85%",
    // flex: 1,
  },
  pieDePagina: {
    marginTop: 16,
  },
  aceptarBoton: {
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  aceptarBotonTexto: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default GlobalStyles;
