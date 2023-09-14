import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import ComponentModal from "../../components/modals/ComponentModal";
import Icon from "react-native-vector-icons/Ionicons";
import { ColorPagina } from "../../styles/colorsApp";
import { alertaBool } from "../../functions/alerts";
import * as Sharing from "expo-sharing";
import ComponentQr, {
  ComponentQrProps,
} from "../../components/oters/ComponentQr";

// * Props de la Galeria
interface ModalGaleriaProps {
  listaQr: ComponentQrProps[];
  colores: ColorPagina;
  actualizarLista: (lista: ComponentQrProps[]) => void;
  visualizarQr: (data: ComponentQrProps) => void;
}

// Todo ---> Galeria de imgs
const ComponentListaQr: React.FC<ModalGaleriaProps> = ({
  listaQr,
  colores,
  actualizarLista,
  visualizarQr,
}) => {
  // * Variables
  const [isModal, setModal] = useState<boolean>(false);
  const [qrSeleccionado, setQrSeleccionado] = useState<number>(-1);

  // * Acciones modal
  const cerrarModal = (): void => setModal(false);
  const abrirModal = (): void => setModal(true);

  // * Eliminar QR
  const eliminarQr = async () => {
    // Alerta
    const isEliminar: boolean = await alertaBool(
      "Seguro? ⚠️",
      "¿Estás seguro de eliminar este QR? 🥹🔴"
    );

    // ? No eliminar
    if (!isEliminar) {
      return;
    }

    // ? Es imagen valida
    if (qrSeleccionado >= 0 && qrSeleccionado < listaQr.length) {
      const nuevaListaQr = [...listaQr];
      nuevaListaQr.splice(qrSeleccionado, 1);
      setQrSeleccionado(-1);
      actualizarLista(nuevaListaQr);

      // ? La lista esta vacía
      if (nuevaListaQr.length === 0) {
        cerrarModal();
      }
    }
  };

  // * Compartir QR
  const compartirImagen = async (): Promise<void> => {
    // Si es compatible
    const isCompatible: boolean = await Sharing.isAvailableAsync();

    // ? No es compatible
    if (!isCompatible) {
      Alert.alert(
        "Error",
        "La opción de compartir no está disponible en este dispositivo"
      );
      return;
    }

    // ? Qr valido
    if (qrSeleccionado >= 0 && qrSeleccionado < listaQr.length) {
      // Compartimos
      //   await Sharing.shareAsync(listaQr[qrSeleccionado].assets[0].uri);
      return;
    }

    Alert.alert("Error", "Aun no as seleccionado una imagen");
    return;
  };

  // * Accion img
  const AccionQr: React.FC = () => {
    // ? No existe
    if (qrSeleccionado < 0 || qrSeleccionado >= listaQr.length) {
      return (
        <View>
          <Text>Error, El qr seleccionado no existe</Text>
        </View>
      );
    }

    return (
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginLeft: "10%",
          marginRight: "10%",
          alignItems: "center",
        }}
      >
        {/* Boton de ver */}
        <Pressable
          onPress={() => {
            // ? No hay uno seleccionado
            if (qrSeleccionado < 0) {
              Alert.alert("Error 🔴", "No se encontró un qr que ver 🥹");
              return;
            }

            visualizarQr(listaQr[qrSeleccionado]);
            cerrarModal();
          }}
        >
          <Icon
            name="eye-sharp"
            size={40}
            color={colores.color_letra_paginas}
          />
        </Pressable>
        {/* Boton de Compartir */}
        <Pressable onPress={compartirImagen}>
          <Icon
            name="share-social-sharp"
            size={40}
            color={colores.color_letra_paginas}
          />
        </Pressable>
        {/* Boton de eliminar */}
        <Pressable onPress={eliminarQr}>
          <Icon
            name="trash-sharp"
            size={40}
            color={colores.color_letra_paginas}
          />
        </Pressable>
        {/* Boton de ver los datos nombre */}
        <Pressable
          onPress={() => {
            Alert.alert(
              "El datos de QR es:",
              `${listaQr[qrSeleccionado].datos}`
            );
          }}
        >
          <Icon
            name="text-sharp"
            size={40}
            color={colores.color_letra_paginas}
          />
        </Pressable>
      </View>
    );
  };

  return (
    <View style={estilo.cuerpo}>
      {/* Lista de Qr */}
      <ScrollView>
        <View style={estilo.contenedorQr}>
          {listaQr.map((qr, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => {
                setQrSeleccionado(i);
                abrirModal();
              }}
              style={estilo.botonQr}
            >
              <ComponentQr
                {...qr}
                tamano={100}
                tamBorde={0}
                logo={qr.logo ? { ...qr.logo, tamano: 100 / 4 } : undefined}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Modal de Galeria */}
        <ComponentModal
          visible={isModal}
          cerrarModal={cerrarModal}
          Cuerpo={AccionQr}
          titulo={"Accion Qr"}
        />
      </ScrollView>
    </View>
  );
};

// * Estilo
const estilo = StyleSheet.create({
  cuerpo: {
    borderRadius: 20,
    alignItems: "center",
  },
  contenedorQr: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  botonQr: {
    width: "45%",
    marginBottom: 10,
  },
  qr: {
    height: 150,
  },
});

export default ComponentListaQr;
