import React, { useState } from "react";
import { View, TouchableOpacity, Alert, Image, StyleSheet } from "react-native";
import GlobalStyles from "../../styles/global";
import { usarTema } from "../../components/theme/TemaApp";
import * as ImagePicker from "expo-image-picker";
import BotonIcono from "../../components/botones/BotonIcono";
import ModalGaleria from "./ModalGaleria";

// * Variables
const iconoAgregar: string = "add-sharp";
const iconoVer: string = "images-sharp";

// * Estilo
const estilo = StyleSheet.create({
  imagen: {
    marginTop: 10,
    marginBottom: 30,
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  contenedor_botones: {
    width: "100%",
    flexDirection: "row",
  },
});

// TODO ---> PAGINA GALERIA
const PaginaGaleria: React.FC = () => {
  // * Tema
  const { tema } = usarTema();

  // * Variables
  const [isModal, setModal] = useState<boolean>(false);
  const [imgSeleccionada, setImgSeleccionada] =
    useState<ImagePicker.ImagePickerResult | null>(null);
  const [listaImg, setListaImg] = useState<ImagePicker.ImagePickerResult[]>([]);

  // * Abrir selector de imágenes
  const abrirSeleccionDeImagenes = async (): Promise<void> => {
    // Pedimos permiso para acceder a los archivos
    const isPermisos: ImagePicker.MediaLibraryPermissionResponse =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    // ? No se dio el permiso
    if (!isPermisos.granted) {
      Alert.alert(
        "¡Ups!",
        "Los permisos para acceder a los archivos son requeridos, 🥹"
      );
      return;
    }

    // Mostramos el launcher para acceder a la galería y obtenemos la img
    const imgResult: ImagePicker.ImagePickerResult =
      await ImagePicker.launchImageLibraryAsync();

    // ? El usuario cancelo la selección
    if (imgResult.canceled) {
      Alert.alert("¡Ups ⚠️!", "Debes de seleccionar una imagen 😠");
      return;
    }

    // Asignamos valor
    setImgSeleccionada(imgResult);

    // Aumentamos lista
    setListaImg([...listaImg, imgResult]);
  };

  // * Acciones modal
  const cerrarModal = (): void => setModal(false);
  const abrirModal = (): void => setModal(true);
  return (
    <View
      style={[
        GlobalStyles.contenedor_centrado,
        { backgroundColor: tema.colorsPagina.color_fondo_pagina },
      ]}
    >
      {/* Boton y texto */}
      <View style={{ alignItems: "center" }}>
        {/* Imagen cambiante */}
        {imgSeleccionada && (
          <TouchableOpacity onPress={abrirSeleccionDeImagenes}>
            <Image
              style={estilo.imagen}
              source={{ uri: imgSeleccionada.assets[0].uri }}
            />
          </TouchableOpacity>
        )}

        <View style={estilo.contenedor_botones}>
          <BotonIcono
            onPress={abrirSeleccionDeImagenes}
            icono={iconoAgregar}
            color={tema.colorsPagina.color_letra_paginas}
            estiloExtra={{ marginRight: 15 }}
          />

          <BotonIcono
            onPress={abrirModal}
            icono={iconoVer}
            color={tema.colorsPagina.color_letra_paginas}
          />
        </View>
      </View>

      {/* Modal */}
      <ModalGaleria
        visible={isModal}
        cerrarModal={cerrarModal}
        listaImg={listaImg}
      />
    </View>
  );
};

export default PaginaGaleria;
