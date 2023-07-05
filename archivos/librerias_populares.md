# Librerías populares react native / Expo

## Expo image picker

### Librería para seleccionar imágenes de la galería

[Link oficial](https://docs.expo.dev/versions/latest/sdk/imagepicker/)

    npx expo install expo-image-picker

### Ejemplo de expo image picker

```ts
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
```

## Expo Sharing

### Librería para compartir datos en dispositivos móviles

[Link oficial](https://docs.expo.dev/versions/latest/sdk/sharing/)

    npx expo install expo-sharing

### Ejemplo de expo Sharing

```ts
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
```
