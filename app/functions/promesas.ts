import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

// * Abrir selector de imágenes
export const abrirSeleccionDeImagenes =
  async (): Promise<ImagePicker.ImagePickerResult | null> => {
    try {
      // Pedimos permiso para acceder a los archivos
      const isPermisos: ImagePicker.MediaLibraryPermissionResponse =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      // ? No se dio el permiso
      if (!isPermisos.granted) {
        throw new Error(
          "Los permisos para acceder a los archivos son requeridos, 🥹"
        );
      }

      // Mostramos el launcher para acceder a la galería y obtenemos la img
      const imgResult: ImagePicker.ImagePickerResult =
        await ImagePicker.launchImageLibraryAsync();

      // ? El usuario cancelo la selección
      if (imgResult.canceled) {
        throw new Error("Debes de seleccionar una imagen 😠");
      }

      // Asignamos valor
      return imgResult;
    } catch (error: unknown) {
      Alert.alert("¡Ups ⚠️!", String(error));
      return null;
    }
  };
