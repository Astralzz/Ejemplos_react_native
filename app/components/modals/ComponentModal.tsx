import React from "react";
import {
  Modal,
  StyleProp,
  Text,
  TextStyle,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { usarTema } from "../theme/TemaApp";
import { ColorsModal } from "../../styles/colorsApp";

// Props
interface ComponentModalProps {
  titulo: string;
  Cuerpo: React.FC;
  PieDePagina?: React.FC;
  extraStyle?: StyleProp<TextStyle>;
  style?: StyleProp<TextStyle>;
  visible: boolean;
  cerrarModal: () => void;
  isOcultarPie?: boolean;
}

const ComponentModal: React.FC<ComponentModalProps> = ({
  titulo,
  Cuerpo,
  PieDePagina,
  visible,
  cerrarModal,
  extraStyle,
  style,
  isOcultarPie = false,
}) => {
  // * Tema
  const { tema } = usarTema();
  const colorsModal = tema.colorsModal;
  const otros = tema.otros;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={cerrarModal}
    >
      <View
        style={{
          ...estilo.contenedorCompleto,
          backgroundColor:
            colorsModal.color_fondo_exterior ?? "rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Modal */}
        <View
          style={{
            ...estilo.contenedorModal,
            backgroundColor: colorsModal.color_cuerpo,
          }}
        >
          {/* Encabezado */}
          <View
            style={{
              ...estilo.encabezado,
              backgroundColor: colorsModal.color_encabezado,
            }}
          >
            <Text
              style={{
                ...estilo.encabezadoTexto,
                color: colorsModal.color_letra,
              }}
            >
              {titulo}
            </Text>
            {/* Boton de cerrar */}
            <Pressable onPress={cerrarModal} style={estilo.cerrarBoton}>
              <Icon
                name="times"
                size={20}
                color={colorsModal.color_boton_cerrar}
              />
            </Pressable>
          </View>

          {/* Cuerpo */}
          <View
            style={{
              ...estilo.cuerpoModal,
              backgroundColor: colorsModal.color_cuerpo,
            }}
          >
            <ScrollView>
              <Cuerpo />
            </ScrollView>
          </View>

          {/* Pie de página o botón "Aceptar" */}
          {PieDePagina ? (
            <View
              style={{
                ...estilo.pieDePagina,
                backgroundColor: colorsModal.color_pie_de_pagina,
              }}
            >
              <PieDePagina />
            </View>
          ) : (
            !isOcultarPie && (
              <Pressable
                onPress={cerrarModal}
                style={{
                  ...estilo.aceptarBoton,
                  backgroundColor: otros.colorExito,
                }}
              >
                <Text
                  style={{
                    ...estilo.aceptarBotonTexto,
                    color: colorsModal.color_letra,
                  }}
                >
                  Aceptar
                </Text>
              </Pressable>
            )
          )}
        </View>
      </View>
    </Modal>
  );
};

// * Estilo
const estilo = StyleSheet.create({
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

export default ComponentModal;
