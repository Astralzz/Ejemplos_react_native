import React from "react";
import {
  Modal,
  StyleProp,
  Text,
  TextStyle,
  View,
  ScrollView,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { usarTema } from "../theme/TemaApp";
import { estilosModal } from "../../styles/global";

// * Props
interface ComponentModalProps {
  titulo: string;
  Cuerpo: React.FC;
  PieDePagina?: React.FC;
  extraStyle?: StyleProp<TextStyle>;
  style?: StyleProp<TextStyle>;
  visible: boolean;
  cerrarModal: () => void;
  isOcultarPie?: boolean;
  accionPie?: () => void;
}

// Todo -> Componente del modal
const ComponentModal: React.FC<ComponentModalProps> = ({
  titulo,
  Cuerpo,
  PieDePagina,
  visible,
  cerrarModal,
  extraStyle,
  style,
  isOcultarPie = false,
  accionPie,
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
          ...estilosModal.contenedorCompleto,
          backgroundColor:
            colorsModal.color_fondo_exterior ?? "rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Modal */}
        <View
          style={{
            ...estilosModal.contenedorModal,
            backgroundColor: colorsModal.color_cuerpo,
          }}
        >
          {/* Encabezado */}
          <View
            style={{
              ...estilosModal.encabezado,
              backgroundColor: colorsModal.color_encabezado,
            }}
          >
            <Text
              style={{
                ...estilosModal.encabezadoTexto,
                color: colorsModal.color_letra,
              }}
            >
              {titulo}
            </Text>
            {/* Boton de cerrar */}
            <Pressable onPress={cerrarModal} style={estilosModal.cerrarBoton}>
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
              ...estilosModal.cuerpoModal,
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
                ...estilosModal.pieDePagina,
                backgroundColor: colorsModal.color_pie_de_pagina,
              }}
            >
              <PieDePagina />
            </View>
          ) : (
            !isOcultarPie && (
              <Pressable
                onPress={() => {
                  // ? Accion
                  if (accionPie) {
                    accionPie();
                    return;
                  }

                  cerrarModal();
                }}
                style={{
                  ...estilosModal.aceptarBoton,
                  backgroundColor: otros.colorExito,
                }}
              >
                <Text
                  style={{
                    ...estilosModal.aceptarBotonTexto,
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

export default ComponentModal;
