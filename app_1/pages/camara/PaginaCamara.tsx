import React, { useState } from "react";
import { View, TouchableOpacity, Alert, Image, StyleSheet } from "react-native";
import GlobalStyles from "../../styles/global";
import { usarTema } from "../../components/theme/TemaApp";
import * as ImagePicker from "expo-image-picker";
import BotonIcono from "../../components/botones/BotonIcono";

// * Variables
const icono: string = "camera-sharp";

// * Estilo
const estilo = StyleSheet.create({
  imagen: {
    marginTop: 10,
    marginBottom: 30,
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});

// TODO ---> PAGINA CAMARA
const PaginaCamara: React.FC = () => {
  // * Tema
  const { tema } = usarTema();

  // * Variables
  const [imgSeleccionada, setImgSeleccionada] =
    useState<ImagePicker.ImagePickerResult | null>(null);

  // * Abrir cámara
  const abrirCamara = async (): Promise<void> => {
    // Pedimos permiso para acceder a la cámara
    const isPermisos: ImagePicker.CameraPermissionResponse =
      await ImagePicker.requestCameraPermissionsAsync();

    // ? No se dio el permiso
    if (!isPermisos.granted) {
      Alert.alert("Error", "El permiso para acceder a la cámara es requerido");
      return;
    }

    // Mostramos el launcher para acceder a la cámara
    const imgResult: ImagePicker.ImagePickerResult =
      await ImagePicker.launchCameraAsync();

    // ? El usuario cancelo la selección
    if (imgResult.canceled) {
      Alert.alert("Ups ⚠️", "Debes de tomar una foto 😠");
      return;
    }

    // Asignamos valor
    setImgSeleccionada(imgResult);
  };

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
          <TouchableOpacity onPress={abrirCamara}>
            <Image
              style={estilo.imagen}
              source={{ uri: imgSeleccionada.assets[0].uri }}
            />
          </TouchableOpacity>
        )}

        <BotonIcono
          onPress={abrirCamara}
          icono={icono}
          color={tema.colorsPagina.color_letra_paginas}
        />
      </View>
    </View>
  );
};

export default PaginaCamara;
