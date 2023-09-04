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
import * as ImagePicker from "expo-image-picker";
import ComponentModal from "../../components/modals/ComponentModal";
import Icon from "react-native-vector-icons/Ionicons";
import { ColorPagina } from "../../styles/colorsApp";
import { alertaBool } from "../../functions/alerts";
import * as Sharing from "expo-sharing";

// * Props de la Galeria
interface ModalGaleriaProps {
  listaImg: ImagePicker.ImagePickerResult[];
  colores: ColorPagina;
  actualizarLista: (lista: ImagePicker.ImagePickerResult[]) => void;
}

// Todo ---> Galeria de imgs
const ComponentGaleria: React.FC<ModalGaleriaProps> = ({
  listaImg,
  colores,
  actualizarLista,
}) => {
  // * Variables
  const [isModal, setModal] = useState<boolean>(false);
  const [imgSeleccionada, setImagSeleccionada] = useState<number>(-1);

  // * Acciones modal
  const cerrarModal = (): void => setModal(false);
  const abrirModal = (): void => setModal(true);

  // * Eliminar imagen
  const eliminarImagen = async () => {
    // Alerta
    const isEliminar: boolean = await alertaBool(
      "Seguro? ⚠️",
      "¿Estás seguro de eliminar esta imagen? 🥹🔴"
    );

    // ? No eliminar
    if (!isEliminar) {
      return;
    }

    // ? Es imagen valida
    if (imgSeleccionada >= 0 && imgSeleccionada < listaImg.length) {
      const nuevaListaImg = [...listaImg];
      nuevaListaImg.splice(imgSeleccionada, 1);
      setImagSeleccionada(-1);
      actualizarLista(nuevaListaImg);

      // ? La lista esta vacía
      if (nuevaListaImg.length === 0) {
        cerrarModal();
      }
    }
  };

  // * Compartir imagen
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

    // ? Img valida
    if (imgSeleccionada >= 0 && imgSeleccionada < listaImg.length) {
      // Compartimos
      await Sharing.shareAsync(listaImg[imgSeleccionada].assets[0].uri);
      return;
    }

    Alert.alert("Error", "Aun no as seleccionado una imagen");
    return;
  };

  // * Accion img
  const AccionImg: React.FC = () => {
    // ? No existe
    if (imgSeleccionada < 0 || imgSeleccionada >= listaImg.length) {
      return (
        <View>
          <Text>Error, la imagen seleccionada no existe</Text>
        </View>
      );
    }

    return (
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginLeft: "15%",
          marginRight: "15%",
          alignItems: "center",
        }}
      >
        {/* Boton de Compartir */}
        <Pressable onPress={compartirImagen}>
          <Icon
            name="share-social-sharp"
            size={40}
            color={colores.color_letra_paginas}
          />
        </Pressable>
        {/* Boton de eliminar */}
        <Pressable onPress={eliminarImagen}>
          <Icon
            name="trash-sharp"
            size={40}
            color={colores.color_letra_paginas}
          />
        </Pressable>
        {/* Boton de ver el nombre */}
        <Pressable
          onPress={() => {
            Alert.alert(
              "La url es:",
              `${listaImg[imgSeleccionada].assets[0].uri}`
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
      {/* Lista de Imagenes */}
      <ScrollView>
        <View style={estilo.contenedorImg}>
          {listaImg.map((imagen, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => {
                setImagSeleccionada(i);
                abrirModal();
              }}
              style={estilo.botonImg}
            >
              <Image
                source={{ uri: imagen.assets[0].uri }}
                style={estilo.imagen}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Modal de Galeria */}
        <ComponentModal
          visible={isModal}
          cerrarModal={cerrarModal}
          Cuerpo={AccionImg}
          titulo={"Accion imagen"}
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
  contenedorImg: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  botonImg: {
    width: "45%",
    marginBottom: 10,
  },
  imagen: {
    height: 150,
  },
});

export default ComponentGaleria;
