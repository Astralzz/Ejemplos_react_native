import React, { useState } from "react";
import { View, StyleSheet, Pressable, Text, Modal } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import ComponentError from "../../components/errors/ComponentError";
import { estilosModal } from "../../styles/global";
import { ScrollView } from "react-native-gesture-handler";
import ElementInput from "../../components/inputs/ElememtInput";
import { regexTitulo } from "../../variables/exprecionesRegulares";
import { ColorsModal, OtrosColores } from "../../styles/colorsApp";
import Usuario from "../../models/usuarios/Usuario";
import TarjetaUsuario from "./TarjetaUsuario";

// * Props
interface ModalCalificacionesProps {
  isVisible: boolean;
  cerrarModal: () => void;
  colors: {
    pagina: string;
    letra: string;
    colorsModal: ColorsModal;
    otros: OtrosColores;
  };
  listaUsuarios: Usuario[];
}

// Todo --> Modal de calificaciones
const ModalListaUsuarios: React.FC<ModalCalificacionesProps> = ({
  isVisible,
  cerrarModal,
  colors,
  listaUsuarios,
}) => {
  // * Variables
  const [textFiltro, setTextFiltro] = useState<string | null>(null);
  const [isTextFiltroValido, setTextFiltroValido] = useState<boolean>(false);

  // * Cuerpo modal
  const CuerpoUsuarios: React.FC = () => {
    // ? Un dato es erróneo
    if (!listaUsuarios) {
      return (
        <ComponentError
          titulo="Error"
          mensaje="La lista de usuarios no llego correctamente"
        />
      );
    }

    // ? Lista vacía
    if (listaUsuarios.length < 1) {
      return (
        <ComponentError
          titulo="Sin datos"
          mensaje="La lista de usuarios esta vacía"
        />
      );
    }

    // Lista de calificaciones
    return (
      <View style={estilo.cuerpo}>
        {/* Encabezado */}
        <View style={estilo.encabezado}>
          {/* Botones de accion */}
          <View style={estilo.caja_botones}></View>
        </View>

        {/* Lista de calificaciones */}
        <View style={estilo.lista_cal}>
          <ScrollView>
            <View>
              {listaUsuarios.map((usuario, i) => {
                return (
                  <TarjetaUsuario
                    key={i}
                    usuario={usuario}
                    colorLetra={colors.letra}
                  />
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={cerrarModal}
    >
      <View
        style={{
          ...estilosModal.contenedorCompleto,
          backgroundColor:
            colors.colorsModal.color_fondo_exterior ?? "rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Modal */}
        <View
          style={{
            ...estilosModal.contenedorModal,
            backgroundColor: colors.colorsModal.color_cuerpo,
          }}
        >
          {/* Encabezado */}
          <View
            style={{
              ...estilosModal.encabezado,
              backgroundColor: colors.colorsModal.color_encabezado,
            }}
          >
            {/* Titulo */}
            <Text
              style={{
                ...estilosModal.encabezadoTexto,
                color: colors.colorsModal.color_letra,
              }}
            >
              Lista de usuarios
            </Text>
            {/* Boton de cerrar */}
            <Pressable onPress={cerrarModal} style={estilosModal.cerrarBoton}>
              <Icon
                name="times"
                size={20}
                color={colors.colorsModal.color_boton_cerrar}
              />
            </Pressable>
          </View>

          {/* Cuerpo */}
          <View
            style={{
              ...estilosModal.cuerpoModal,
              backgroundColor: colors.colorsModal.color_cuerpo,
            }}
          >
            {/* Elemento de buscar */}
            {listaUsuarios && listaUsuarios.length > 10 && (
              <ElementInput
                longitudMax={35}
                expresionRegular={regexTitulo}
                tipoInput={"default"}
                valorPlaceholder="buscar usuario"
                valor={textFiltro}
                isValorValido={isTextFiltroValido}
                setValorValido={setTextFiltroValido}
                setValor={setTextFiltro}
                colores={{
                  colorLetra: colors.letra,
                  colorPlaceholder: colors.letra,
                }}
              />
            )}

            {/* Cuerpo calificaciones */}
            <ScrollView>
              <CuerpoUsuarios />
            </ScrollView>
          </View>

          {/* Pie de página o botón "Aceptar" */}
          <Pressable
            onPress={cerrarModal}
            style={{
              ...estilosModal.aceptarBoton,
              backgroundColor: colors.otros.colorExito,
            }}
          >
            <Text
              style={{
                ...estilosModal.aceptarBotonTexto,
                color: colors.colorsModal.color_letra,
              }}
            >
              Aceptar
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

// * Estilo
const estilo = StyleSheet.create({
  cuerpo: {},
  caja_botones: {
    marginTop: 10,
  },
  caja_sub_botones: {
    margin: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  boton_filtro: {
    padding: 6,
    borderRadius: 15,
  },
  encabezado: {},
  lista_cal: {},
});

export default ModalListaUsuarios;
