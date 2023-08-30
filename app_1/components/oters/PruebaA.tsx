import React, { useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  Text,
  View,
  Image,
  Alert,
  AlertButton,
  TouchableOpacity,
} from "react-native";
import AppStyles from "../../styles/appStyles";
import imgSh from "../../assets/imgs/shall.jpg";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";

// Timer
let intervalo: NodeJS.Timer | null = null;

// Todo, App
const PruebaA: React.FC = () => {
  // Contador
  const [cont, setCont] = useState<number>(0);
  const [imgSeleccionada, setImgSeleccionada] =
    useState<ImagePicker.ImagePickerResult | null>(null);

  // Referencia
  const isContadorAutomatico = useRef<boolean>(false);

  // * Limpiar contador
  const limpiarContador = (): void => {
    // ? Es menor a 0
    if (cont < 1) {
      Alert.alert("Error", "El contador ya está vacío");
      return;
    }

    // Botones de la alerta
    const botonesAlerta: AlertButton[] = [
      {
        text: "Sí",
        onPress: () => {
          setCont(0);
        },
      },
      {
        text: "No",
        onPress: () => {
          Alert.alert("Ok", "Operación cancelada");
        },
      },
    ];

    // Alerta
    Alert.alert("Hola", "¿Quieres limpiar el contador?", botonesAlerta);
  };

  // * Iniciar contador Automatico
  const iniciarContadorAutomatico = (): void => {
    // ? Existe referencia
    if (isContadorAutomatico.current) {
      Alert.alert("Error", "El contador ya está activo");
      return;
    }

    // Referencia true
    isContadorAutomatico.current = true;

    // ? Ya hay un timer
    if (!intervalo) {
      // Creamos timer
      intervalo = setInterval(() => {
        // ? Existe referencia
        if (isContadorAutomatico.current) {
          // Aumentamos 1
          setCont((prevCont) => prevCont + 1);
        }
      }, 500);
    }
  };

  // * Detener contador automático
  const detenerContadorAutomatico = (): void => {
    // ? No existe un timer
    if (!isContadorAutomatico.current) {
      Alert.alert("Error", "El contador ya está desactivado");
      return;
    }

    // Referencia falsa
    isContadorAutomatico.current = false;

    // Destruimos timer
    clearInterval(intervalo as NodeJS.Timeout);

    // Ponemos null
    intervalo = null;
  };

  // * Abrir selector de imágenes
  const abrirSeleccionDeImagenes = async (): Promise<void> => {
    // Pedimos permiso para acceder a los archivos
    const isPermisos: ImagePicker.MediaLibraryPermissionResponse =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    // ? No se dio el permiso
    if (!isPermisos.granted) {
      Alert.alert(
        "Error",
        "Los permisos para acceder a los archivos son requeridos"
      );
      return;
    }

    // Mostramos el launcher para acceder a la galería y obtenemos la img
    const imgResult: ImagePicker.ImagePickerResult =
      await ImagePicker.launchImageLibraryAsync();

    // ? El usuario cancelo la selección
    if (imgResult.canceled) {
      Alert.alert("Error", "Debes de seleccionar una imagen");
      return;
    }

    // Asignamos valor
    setImgSeleccionada(imgResult);
  };

  // * Abrir selector de imágenes
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
      Alert.alert("Error", "Debes de tomar una foto");
      return;
    }

    // Asignamos valor
    setImgSeleccionada(imgResult);
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

    // la img es nula
    if (!imgSeleccionada) {
      Alert.alert("Error", "Aun no as seleccionado una imagen");
      return;
    }

    // Compartimos
    await Sharing.shareAsync(imgSeleccionada.assets[0].uri);
  };

  return (
    <View style={AppStyles.contenedor}>
      {/* Imagen */}
      <Image style={AppStyles.imagen} source={imgSh} />

      {/* Textos */}
      <Text style={AppStyles.texto}>App React EDCC native</Text>
      <Text style={AppStyles.texto}>contador: {cont}</Text>

      {/* Botones simples */}
      <Button
        title="aumentar"
        onPress={() => setCont((prevCont) => prevCont + 1)}
      />
      <Button color={"red"} title="limpiar" onPress={limpiarContador} />

      {/* Botones con estilos */}
      <TouchableOpacity
        onPress={iniciarContadorAutomatico}
        style={AppStyles.botones}
      >
        <Text style={{ color: "white" }}>Contador automático</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={detenerContadorAutomatico}
        style={AppStyles.botones}
      >
        <Text style={{ color: "white" }}>Pausar contador</Text>
      </TouchableOpacity>

      {/* Imagen cambiante */}
      <TouchableOpacity onPress={abrirSeleccionDeImagenes}>
        <Image
          style={AppStyles.imagen}
          source={
            imgSeleccionada ? { uri: imgSeleccionada.assets[0].uri } : imgSh
          }
        />
      </TouchableOpacity>

      {/* Botones de Seleccion */}
      <TouchableOpacity
        onPress={abrirSeleccionDeImagenes}
        style={AppStyles.botones}
      >
        <Text style={{ color: "white" }}>Seleccionar imagen</Text>
      </TouchableOpacity>

      {/* Botones de Seleccion */}
      {imgSeleccionada && (
        <TouchableOpacity onPress={compartirImagen} style={AppStyles.botones}>
          <Text style={{ color: "white" }}>Compartir imagen</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PruebaA;
